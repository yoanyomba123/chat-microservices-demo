#!/bin/bash

if [ -f /.mongodb_password_set ]; then
	echo "MongoDB password already set!"
	exit 0
fi

# Admin User
MONGODB_ADMIN_USER=${MONGODB_ADMIN_USER:-"root"}
MONGODB_ADMIN_PASS=${MONGODB_ADMIN_PASS:-"wiR5a3Gr68OBl5X"}

# Application Database User
MONGODB_APPLICATION_DATABASE=${MONGODB_APPLICATION_DATABASE:-"authms"}
MONGODB_APPLICATION_USER=${MONGODB_APPLICATION_USER:-"higuita"}
MONGODB_APPLICATION_PASS=${MONGODB_APPLICATION_PASS:-"scorpionKick"}

# Wait for MongoDB to boot
RET=1
while [[ RET -ne 0 ]] ; do
    echo "=> Waiting for confirmation of MongoDB service startup..."
    sleep 5
    mongo admin --eval "help" >/dev/null 2>&1
    RET=$?
done

if [[ $MONGODB_ADMIN_PASS == "" ]] ; then
  echo "=> You must specifity MONGODB_ADMIN_PASS environment variable."
  exit 1
fi

# Create the admin user
echo "=> Creating admin user with a password in MongoDB"
mongo admin --eval "db.createUser({user: '$MONGODB_ADMIN_USER', pwd: '$MONGODB_ADMIN_PASS', roles:[{role:'root',db:'admin'}]});"
sleep 3

echo "========================================================================"
echo "$MONGODB_ADMIN_USER user created!"
echo "========================================================================"

if [ "$MONGODB_APPLICATION_DATABASE" != "admin" ]; then
    echo "=> Creating an ${MONGODB_APPLICATION_DATABASE} user with a password in MongoDB"
    mongo admin -u "$MONGODB_ADMIN_USER" -p "$MONGODB_ADMIN_PASS" << EOF
use $MONGODB_APPLICATION_DATABASE
db.createUser({user: '$MONGODB_APPLICATION_USER', pwd: '$MONGODB_APPLICATION_PASS', roles:[{role:'dbOwner', db:'$MONGODB_APPLICATION_DATABASE'}]})
EOF

echo "========================================================================"
echo "$MONGODB_APPLICATION_USER user created in $MONGODB_APPLICATION_DATABASE!"
echo "========================================================================"
else
  echo "=> Skipping App database and user creation."
fi

sleep 1
touch /data/db/.mongodb_password_set
echo "=> Done!"
