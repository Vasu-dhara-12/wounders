pipeline {
    agent any

    environment {
        APP_NAME = "wondersbeauty"
        DOCKER_USER = "vasudhara"
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Ensure package.json') {
            steps {
                script {
                    if (!fileExists('package.json')) {

                        writeFile file: 'package.json', text: '''{
  "name": "wondersbeauty",
  "version": "1.0.0",
  "description": "Auto-generated package.json",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}'''

                        writeFile file: 'index.js', text: '''
const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send("Hello from Wonders Beauty Container!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
'''
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'docker run --rm -v $PWD:/app -w /app node:20 npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh 'docker push ${IMAGE_NAME}:latest'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f ${APP_NAME} || true
                docker run -d --name ${APP_NAME} -p 3000:80 ${IMAGE_NAME}:latest
                '''
            }
        }
    }
}
