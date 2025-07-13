FROM php:8.2-apache

# Install PHP extensions and system tools
RUN apt-get update && apt-get install -y \
    unzip \
    libzip-dev \
    zip \
    git \
    curl \
    && docker-php-ext-install zip pdo pdo_mysql

# Enable mod_rewrite for Apache
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy full application (source + composer.json + vendor)
COPY . /var/www/html




# Point Apache to serve from /backend/public
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/backend/public|g' /etc/apache2/sites-available/000-default.conf && \
    sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf && \
    echo "ServerName localhost" >> /etc/apache2/apache2.conf


EXPOSE 80
