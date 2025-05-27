# reminder-db/Dockerfile
FROM mysql:8.0

ENV MYSQL_DATABASE=reminder \
    MYSQL_USER=reminderuser \
    MYSQL_PASSWORD=secretpassword \
    MYSQL_ROOT_PASSWORD=rootpass

VOLUME ["/var/lib/mysql"]

EXPOSE 3306
