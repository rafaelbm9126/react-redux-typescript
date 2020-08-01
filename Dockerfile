FROM    node:latest
EXPOSE  3000
ADD    ./app /app/
WORKDIR /app
RUN     npm install --only=prod
CMD     [ "npm", "start" ]
