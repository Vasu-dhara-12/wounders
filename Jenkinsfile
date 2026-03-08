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

        stage('Ensure package.json') {
            steps {
                script {
                    // Check if package.json exists; if not, create a basic one
                    if (!fileExists('package.json')) {
                        writeFile file: 'package.json', text: '''{
  "name": "sevenwonders",
  "version": "1.0.0",
  "description": "Auto-generated package.json",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {}
}'''
                        // Also create a placeholder index.js
                        writeFile file: 'index.js', text: '''console.log("Hello World!");'''
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
                sh 'docker build -t ${APP_NAME}:latest .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d --name ${APP_NAME} -p 3000:80${APP_NAME}:latest'
            }
        }
    }
}
