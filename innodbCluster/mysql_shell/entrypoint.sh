#!/bin/bash
set -e

start=`date +%s`
echo 'Waiting to the instances to load...'
# Waiting until database has really started
while ! mysqladmin ping -h inno_server_01 --silent; do
    sleep 0.5
done
while ! mysqladmin ping -h inno_server_02 --silent; do
    sleep 0.5
done
while ! mysqladmin ping -h inno_server_03 --silent; do
    sleep 0.5
done

mysqlsh --uri root:root@inno_server_01:3306 --py --file=/create_cluster.py

FILE=RUN_SQL
if test -f "$FILE"; then
    echo 'Runnins SQL file'
    mysqlsh --uri root:root@inno_server_01:3306 --sql < code.sql
fi

end=`date +%s`

runtime=$((end-start))
echo "Done in ${runtime} seconds"

sleep infinity