# Wait until group replication has finished starting
import time
import os

mysql = {
    'root_password' : os.environ['CLUSTER_ADMIN_USER'],
    'port' : os.environ['MYSQL_PORT'],
}

cluster = {
    'admin_user' : os.environ['CLUSTER_ADMIN_USER'],
    'admin_user_password' : os.environ['CLUSTER_ADMIN_PASSWORD'],
    'name' : os.environ['CLUSTER_NAME'],
}

""" def get_uri(conf:):
    return '' """

if False:
    dba = None

def create_cluster():
    global cluster
    options = {
        "clusterAdmin": "'cluster_adm'@'%'", 
        "clusterAdminPassword": cluster['admin_user_password']
    }

    dba.configure_instance('root:root@inno_server_01:3306',options)
    dba.configure_instance('root:root@inno_server_02:3306',options)
    dba.configure_instance('root:root@inno_server_03:3306',options) 


    dba.check_instance_configuration('cluster_adm:password@inno_server_01:3306')
    dba.check_instance_configuration('cluster_adm:password@inno_server_02:3306')
    dba.check_instance_configuration('cluster_adm:password@inno_server_03:3306') 


    # create cluster (in mysql_master session)
    cluster = dba.create_cluster(cluster['name'])

    # add slaves
    options = {
        "recoveryMethod":"clone"
    }
    cluster.add_instance('cluster_adm:password@inno_server_02:3306',options)
    cluster.add_instance('cluster_adm:password@inno_server_03:3306',options)

    open("RUN_SQL", "w")
    print('A cluster with the name "' + cluster['name'] + '" was created.')

def reboot_cluster_from_complete_outage():
    global cluster
    dba.reboot_cluster_from_complete_outage(cluster['name'],{'rejoinInstances':['inno_server_02:3306','inno_server_02:3306']})
    cluster = dba.get_cluster(cluster['name'])
    cluster.status()
    print('Cluster recovered!')

keep_waiting = True
t = 0

print('Waiting until group replication is ready...')
while keep_waiting:
    time.sleep(1)
    t += 1
    try:
        cluster = dba.get_cluster(cluster['name'])
    except SystemError as e:
        x = str(e).replace("\n","")
        if x != 'RuntimeError: Dba.get_cluster: Cannot perform operation while group replication is starting up':
            keep_waiting = False
    else:
        keep_waiting = False

print("Time taken " + str(t) + ".")
print('Loading the cluster...')

try:
    cluster = dba.get_cluster(cluster['name'])
except SystemError as e:
    x = str(e).replace("\n","")
    print(x)
    if x == 'SystemError: RuntimeError: Dba.get_cluster: This function is not available through a session to a standalone instance (metadata exists, instance belongs to that metadata, but GR is not active)' or x == 'RuntimeError: Dba.get_cluster: This function is not available through a session to a standalone instance (metadata exists, instance belongs to that metadata, but GR is not active)':
        print('A dead cluster was found. Restarting...')
        reboot_cluster_from_complete_outage()
    elif x == 'SystemError: RuntimeError: Dba.get_cluster: This function is not available through a session to a standalone instance' or x == 'RuntimeError: Dba.get_cluster: This function is not available through a session to a standalone instance':
        print('There is any cluster. Creating a new one')
        create_cluster()
else:
    print('Executed without any problem')
