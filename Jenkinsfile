#!/usr/local/bin/groovy

pipeline {
    agent any

      tools {nodejs "nodejs"}

    environment{
        DOCKER_IMAGE = "your-docker-image-name"
    }

    stages {
        stage('Checkout') {
            steps {
                // Cleanup workspace cache before build
                cleanWs()
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/sanjaisak/express-demo.git']]])
                }
            }
        }
        stage('Setup'){
            steps{
                sh 'npm ci'
                }
            }

       stage('Build') {
            steps {
                sh 'sudo usermod -aG docker $USER'
                // Build a Docker image for your Express application
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

      stage('Deploy') {
            steps {
                // Deploy the Docker container using the built image
                sh "docker run -d -p 3000:3000 --name your-container-name $DOCKER_IMAGE"
            }
        }
    }

    post {
        always {
            // Stop and remove the Docker container after deployment
            sh 'docker stop your-container-name'
            sh 'docker rm your-container-name'
        }
    }
}
