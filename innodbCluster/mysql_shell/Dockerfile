FROM oraclelinux:7-slim

COPY mysql80-community-release-el7-3.noarch.rpm /mysql80-community-release-el7-3.noarch.rpm

RUN rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
RUN yum -y install mysql-shell
RUN yum -y install mysql

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh