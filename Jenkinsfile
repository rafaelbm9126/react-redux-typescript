pipeline {
  agent none
  environment {
    // -------------------------------- //
    COMMAND="make -C /home -f deploy.mk update"
    // -------------------------------- //
    FOLDER_WORK = "/var/jenkins_home/workspace/${JOB_NAME}"
    ENV_ORIGIN  = "/var/jenkins_home/environment/${JOB_NAME}"
  }
  stages {
    stage("Compile Process") {
      agent {
        docker {
          image "node:latest"
          args "-p 3000:3000 --env-file=${ENV_ORIGIN}/.env"
        }
      }
      stages {
        stage("environment") {
          steps {
            sh "cp -f ${ENV_ORIGIN}/.env ${FOLDER_WORK}"
            sh "cp -f ${ENV_ORIGIN}/credential.json ${FOLDER_WORK}"
          }
        }
        stage("install dependencies") {
          steps {
          sh "cd app && npm install"
          }
        }
        stage("build source") {
          steps {
            sh "cd app && npm run build"
          }
        }
      }
    }
    stage("Create Image") {
      agent any
      stages {
        stage("Build Image") {
          steps {
            sh "make -C ${FOLDER_WORK} build.image"
          }
        }
        stage("Credentials") {
          steps {
            sh "make -C ${FOLDER_WORK} credentials"
          }
        }
        stage("Push Image") {
          steps {
            sh "make -C ${FOLDER_WORK} push.image"
          }
        }
      }
    }
    stage("Deploy Instance") {
      agent any
      stages {
        stage("Deploy") {
          when { expression { return DEPLOY_FILES == 'ON' }}
          steps {
            script {
              sh "ssh -o StrictHostKeyChecking=no -i /home/.ssh/${KEY_SHH_SERVER} root@${IP_SERVER} ${COMMAND}"
            }
          }
        }
      }
    }
  }
}
