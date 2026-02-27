pipeline {
    agent any

    tools {
        nodejs "node22"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Start App') {
            steps {
                sh 'npm run start &'
                sleep 10
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
    }
}