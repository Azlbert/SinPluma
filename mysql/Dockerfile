FROM    mysql:8.0.15

ENV     MYSQL_ROOT_PASSWORD secretpw
ENV     MYSQL_DATABASE      sinplumadb
ENV     MYSQL_USER          dbuser
ENV     MYSQL_PASSWORD      dbpassword

COPY    ./sql_builder   /docker-entrypoint-initdb.d

#mysql -u root -p (MYSQL_ROOT_PASSWORD)
EXPOSE  3306