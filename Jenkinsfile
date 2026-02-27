pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo "📥 Checking out repository..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing npm dependencies..."
                sh """
                    cd ${WORKSPACE}
                    npm ci
                """
            }
        }

        stage('Start App') {
            steps {
                echo "🚀 Starting Next.js app in background..."
                sh """
                    cd ${WORKSPACE}
                    nohup npm run dev > app.log 2>&1 &
                """
            }
        }

        stage('Wait for App') {
            steps {
                echo "⏳ Waiting for app to be ready on http://localhost:3000..."
                sh """
                    for i in {1..30}; do
                        if curl -s http://localhost:3000 > /dev/null; then
                            echo 'App is ready!'
                            break
                        else
                            echo 'Waiting for app...'
                            sleep 2
                        fi
                    done
                """
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "🧪 Running Cypress tests..."
                sh """
                    cd ${WORKSPACE}
                    npx cypress run --config-file cypress.config.js
                """
            }
        }
    }

    post {
        success {
            echo '✅ Cypress tests passed!'
        }
        failure {
            echo '❌ Cypress tests failed! Check logs above.'
        }
    }
}