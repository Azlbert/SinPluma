FROM oraclelinux:8.1

COPY mysql-shell-8.0.19-1.el8.x86_64.rpm                /mysql-shell.rpm
COPY mysql-community-common-8.0.19-1.el8.x86_64.rpm     /mysql-common.rpm
COPY mysql-community-libs-8.0.19-1.el8.x86_64.rpm       /mysql-community-libs.rpm
COPY mysql-community-client-8.0.19-1.el8.x86_64.rpm     /mysql-client.rpm

RUN yum -y install mysql-shell.rpm
RUN yum -y install mysql-common.rpm
RUN yum -y install mysql-community-libs.rpm
RUN yum -y install mysql-client.rpm

RUN rm mysql-shell.rpm
RUN rm mysql-common.rpm
RUN rm mysql-community-libs.rpm
RUN rm mysql-client.rpm

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh