#!/usr/local/bin/groovy

pipeline {
    agent any

      tools {nodejs "nodejs"}

    environment{
        DOCKER_IMAGE = "pesto"
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
        
       stage('Build') {
            steps {
                // Build a Docker image for your Express application
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

      stage('Deploy') {
            steps {
                // Deploy the Docker container using the built image
                sh "docker run -d -p 3000:3000 $DOCKER_IMAGE"
            }
        }
    }

    post {
        always {
            sh 'docker rmi pesto'
        }
    }
}
