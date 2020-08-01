include /home/.env
export  $(shell sed 's/=.*//' /home/.env)

define load_key_value
	$(eval KEY_VALUE := $(shell cat /home/credential.json))
endef

prune:
	docker ps -aq -f name=${PROJECT_NAME} -f publish=3000 -f status=running | xargs -r docker stop
	docker image prune -a -f

credentials:
	$(call load_key_value)
	docker login -u _json_key -p '${KEY_VALUE}' https://gcr.io

deploy: credentials
	docker pull ${IMG_NAME}:${IMG_VERSION}
	docker run -d --rm --name=${CONTAINER} -p 4000:4000 --env-file=/home/.env ${IMG_NAME}:${IMG_VERSION}

update: prune deploy
