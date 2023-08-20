#!/usr/local/bin/groovy

pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        stage('Checkout') {
            steps {
                // Cleanup workspace cache before build
                cleanWs()
                script {
                    def branch = "*/main";
                    echo "Checking out changes for ${branch}"
                    def scmVars = checkout([
                        $class: 'GitSCM',
                        branches: [[name: branch]],
                        doGenerateSubmoduleConfigurations: false,
                        extensions: [
                            [$class: 'CleanBeforeCheckout'],
                            [$class: 'CloneOption', timeout: 20]
                        ],
                        submoduleCfg: [],
                        userRemoteConfigs: [
                            [
                                url: 'https://github.com/sanjaisak/express-demo.git'
                            ]
                        ]
                    ])

                    // Push the GIT variables into the environment for us
                    // to use in later stages (for example for ci-build-email)
                    env.GIT_BRANCH = scmVars.GIT_BRANCH
                    env.GIT_COMMIT = scmVars.GIT_COMMIT
                    env.GIT_PREVIOUS_COMMIT = scmVars.GIT_PREVIOUS_COMMIT
                    env.GIT_PREVIOUS_SUCCESSFUL_COMMIT = scmVars.GIT_PREVIOUS_SUCCESSFUL_COMMIT

                    // We need COMMIT_ID when publishing package (publishSite.js)
                    // We could probably use GIT_COMMIT, but it isn't clear if
                    // GIT_COMMIT will always have the value we need or not.
                    env.COMMIT_ID = sh(returnStdout: true, script: 'git rev-parse HEAD')
                }
            }
        }
        stage('Setup'){
            steps{
                sh 'npm ci'
                }
            }

        stage('deploy'){
            steps{
                sh 'npm run start'
                }
            }
    }
}
