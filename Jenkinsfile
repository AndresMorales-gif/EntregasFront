pipeline {
  agent {
    label 'Slave_Induccion'
  }

  stages {
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }    

    stage('esLint') {
      steps {
        sh 'npm run lint'
      }
    }


    stage('Test') {
      steps {
        sh 'npm run test -- --watch=false --browsers ChromeHeadless'
      }
    }
 
   stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Static Code Analysis') {
      steps{
        echo '------------>Análisis de código estático<------------'
            withSonarQubeEnv('Sonar') {
                sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
            }
      }
    }
  }

  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
      mail(
        to: 'andres.morales@ceiba.com.co',
        body:"Something is wrong with ${env.BUILD_URL}",
        subject: "Failed Pipeline:${currentBuild.fullDisplayName}"
      )
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }

}