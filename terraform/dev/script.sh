export PATH=$PATH:/usr/bin

sudo apt-get update

sudo apt-get -y install make

sudo apt-get -y install docker.io

sudo apt-get -y install git

sudo apt-get -y install nginx

sudo cp -f /home/nginx.conf /etc/nginx/nginx.conf

sudo service nginx restart

sudo service docker restart

make -C /home -f deploy.mk deploy
