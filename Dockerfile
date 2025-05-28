# syntax=docker/dockerfile:1

# ----------------------------
# Backend Stage (PHP + Composer)
# ----------------------------
    FROM php:8.2-apache AS backend

    # Install system dependencies
    RUN apt-get update && apt-get install -y \
        libzip-dev zip unzip git curl libpng-dev libonig-dev libxml2-dev \
        && docker-php-ext-install pdo pdo_mysql zip
    
    # Set working directory for backend
    WORKDIR /var/www/html
    
    # Copy backend source code and composer files
    COPY app/ ./
    COPY .env.production /var/www/html/.env
    COPY composer.json composer.lock ./
    
    # Install Composer
    COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
    RUN composer install --no-dev --optimize-autoloader
    
    # ----------------------------
    # Frontend Stage (React)
    # ----------------------------
    FROM node:18 AS frontend
    
    WORKDIR /app
    COPY react-app/ ./
    # Explicitly set environment for production
    ENV NODE_ENV=production
    RUN npm install && npm run build
    
    # ----------------------------
    # Final Stage (Apache + All Assets)
    # ----------------------------
    FROM php:8.2-apache
    
    # Copy backend files including vendor/ from backend stage
    COPY --from=backend /var/www/html /var/www/html
    
    # Copy frontend React build into public/
    COPY --from=frontend /app/build /var/www/html/public
    
    # Set Apache DocumentRoot to /public
    RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf
    
    # Update Apache to listen on Fly.io internal port 8080
    RUN sed -i 's/80/8080/g' /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf
    
    # Enable mod_rewrite
    RUN a2enmod rewrite
    
    # Avoid ServerName warning
    RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
    
    # Set permissions
    RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www
    
    EXPOSE 8080
    
    CMD ["apache2-foreground"]
    