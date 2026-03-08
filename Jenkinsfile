pipeline {
    agent any

    environment {
        APP_NAME = "sevenwonders"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Run Node.js inside Docker manually
                sh 'docker run --rm -v $PWD:/app -w /app node:20 npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${APP_NAME}:latest .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d --name ${APP_NAME} -p 3000:80 ${APP_NAME}:latest'
            }
        }
    }
}
