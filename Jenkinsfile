pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                git clone https://github.com/sanjaisak/express-demo.git
                dir("expres-demo"){
                    sh 'npm i'
                    sh 'npm run start'
                }
            }
        }
    }
}
