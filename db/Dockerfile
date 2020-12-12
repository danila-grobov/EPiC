FROM mysql:8 AS db
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=EPiC
COPY config.sql /docker-entrypoint-initdb.d/
EXPOSE 3306