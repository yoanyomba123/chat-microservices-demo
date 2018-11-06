#!/bin/bash
set -m

cmd="mongod --bind_ip_all"
if [ "$AUTH" == "yes" ]; then
    cmd="$cmd --auth"
fi

if [ "$JOURNALING" == "no" ]; then
    cmd="$cmd --nojournal"
fi

$cmd &

set_mongodb_password.sh

fg