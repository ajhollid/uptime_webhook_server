#!/bin/sh
echo "Stopping All Containers"
rm /home/ubuntu/output.log

echo "Redeploying @ $(date)" >>/home/ubuntu/output.log

docker_stop_and_remove_all.sh >>/home/ubuntu/output.log

echo "Confirm no images running" >>/home/ubuntu/output.log
docker ps -a >>/home/ubuntu/output.log

echo "Pulling repo" >>/home/ubuntu/output.log

cd bluewave-uptime
git pull -v >>/home/ubuntu/output.log

echo "Building Images" >>/home/ubuntu/output.log
cd Docker

./build_images.sh >>/home/ubuntu/output.log

echo "Starting Images" >>//home/ubuntu/output.log

docker compose up -d >>/home/ubuntu/output.log
