.DEFAULT_GOAL := help

include .env
export  $(shell sed 's/=.*//' .env)

install: ## Service Install Dependencies
	docker run -it --rm \
	--name=${PROJECT_NAME}-service \
	-v ${PWD}:/var/app \
	-w /var/app \
	--env-file=${PWD}/.env \
	node:latest \
	npm install

compile: ## Service Compile To Production
	docker run -it --rm \
	--name=${PROJECT_NAME}-service \
	-v ${PWD}:/var/app \
	-w /var/app \
	--env-file=${PWD}/.env \
	node:latest \
	npm run build

up: ## Run Container Production
	docker run -d --rm \
	--name=${PROJECT_NAME} \
	-p 9000:3000 \
	-v ${PWD}:/var/app \
	-w /var/app \
	--env-file=${PWD}/.env \
	node:latest \
	npm run start

up-it-dev: ## Run Container Development (iterative)
	docker run -it --rm \
	--name=${PROJECT_NAME} \
	-p 3001:3000 \
	-v ${PWD}:/var/app \
	-w /var/app \
	--env-file=${PWD}/.env \
	node:latest \
	npm run dev

down: ## Down Container
	docker ps -aq -f name=${PROJECT_NAME} -f status=running | xargs -r docker stop

logs: ## Show Logs Container
	docker logs ${PROJECT_NAME} --details --follow --tail="all"

define load_key_value
	$(eval KEY_VALUE := $(shell cat ${DIR_KEY}))
endef

build.image:
	docker build -t ${IMG_NAME}:${IMG_VERSION} .

credentials:
	$(call load_key_value)
	docker login -u _json_key -p '${KEY_VALUE}' https://gcr.io

push.image:
	docker push ${IMG_NAME}:${IMG_VERSION}

help: ## Help Make's Tags
	@printf "\033[31m%-22s %-59s %s\033[0m\n" "Target" " Help"; \
	printf "\033[31m%-22s %-59s %s\033[0m\n"  "------" " ----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-22s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'
