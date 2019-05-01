FROM mysql:8.0.15

ENV MYSQL_ROOT_PASSWORD my-secret-pw
ENV MYSQL_DATABASE      sinpluma
ENV MYSQL_USER          dbuser
ENV MYSQL_PASSWORD      dbpassword

COPY ./test_db /docker-entrypoint-initdb.d

#mysql -u root -p (MYSQL_ROOT_PASSWORD)
EXPOSE 3306