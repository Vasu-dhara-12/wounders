pipeline {
    agent {
        docker { 
            image 'node:20'  // Use the Node.js version you need
            args '-u root:root' // optional: run as root if you need permissions
        }
    }

    environment {
        // Any environment variables you need
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
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${APP_NAME}:latest .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d --name ${APP_NAME} -p 3000:3000 ${APP_NAME}:latest'
            }
        }
    }

    post {
        always {
            sh 'docker ps -a' // optional: list containers
        }
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
