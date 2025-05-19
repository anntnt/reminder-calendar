# ----------------------------
# PHP backend (Eloquent)
# ----------------------------
    FROM php:8.2-apache AS backend

    # Install PHP system dependencies
    RUN apt-get update && apt-get install -y \
        libzip-dev zip unzip git curl libpng-dev libonig-dev libxml2-dev \
        && docker-php-ext-install pdo pdo_mysql zip
    
    # Enable Apache Rewrite Module
    RUN a2enmod rewrite
    
    # Set working dir for Composer
    WORKDIR /var/www
    
    # Copy Composer files from project root
    COPY composer.json composer.lock ./
    
    # Install Composer (from official image)
    COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
    RUN composer install --no-dev --optimize-autoloader
    
    # Copy backend source code
    COPY app/ html/
    
    # ----------------------------
    # React frontend
    # ----------------------------
    FROM node:18 AS frontend
    
    WORKDIR /app
    COPY react-app/ .
    
    RUN npm install && npm run build
    
    # ----------------------------
    # Final Image (PHP + React)
    # ----------------------------
    FROM php:8.2-apache
    
    # Copy backend with dependencies
    COPY --from=backend /var/www/html /var/www/html
    COPY --from=backend /var/www/vendor /var/www/vendor
    
    # Copy React frontend build into public folder
    COPY --from=frontend /app/build /var/www/html

    
    WORKDIR /var/www/html
    
    # Tell Apache to listen on port 8080 (Fly expects this)
    RUN sed -i 's/80/8080/g' /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf
    
    # Set permissions
    RUN chown -R www-data:www-data /var/www \
        && chmod -R 755 /var/www
    
    EXPOSE 8080
    
    CMD ["apache2-foreground"]
    