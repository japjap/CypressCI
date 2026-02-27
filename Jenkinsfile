pipeline {
    agent any

    tools {
        nodejs "node18"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies"
                sh '''
                  node -v
                  npm -v
                  npm ci || npm install
                '''
            }
        }

        stage('Start App') {
            steps {
                echo "🚀 Starting Next.js app"
                sh '''
                  npm run dev &
                '''
            }
        }

        stage('Wait for App') {
            steps {
                echo "⏳ Waiting for app on http://localhost:3000"
                sh '''
                  for i in {1..30}; do
                    if curl -s http://localhost:3000 > /dev/null; then
                      echo "✅ App is ready"
                      break
                    fi
                    echo "⏳ Waiting for app..."
                    sleep 2
                  done
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "🧪 Running Cypress tests"
                sh '''
                  npx cypress run
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
        }
        success {
            echo '✅ Cypress tests passed'
        }
        failure {
            echo '❌ Cypress tests failed'
        }
    }
}