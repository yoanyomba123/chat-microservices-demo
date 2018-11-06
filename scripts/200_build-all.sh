#!/bin/sh
echo "Building images..."
scripts/201_build-base.sh
scripts/202_build-chat.sh
scripts/203_build-front-end.sh
scripts/204_build-auth.sh
