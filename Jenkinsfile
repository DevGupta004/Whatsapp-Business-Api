
pipeline {

  environment {
    dirName = 'mott/backend/multi-banner-ads'
    projectName = 'multi-banner-ads'
    pathName = 'multi-banner-ads'
    projectType = "express"

    def groovy = load 'jenkins/init.groovy'
    helper = groovy.init(env.BRANCH_NAME)
    ltemp = helper.loadEnv( dirName, projectName, projectType, pathName)
    cluster = helper.builderhandler(env.BRANCH_NAME)

  }
  agent any
  stages {
    stage('Building image') {
      steps{
        dir("$dirName") {
            script {
              echo "env.BRANCH_NAME and branch is ${env.BRANCH_NAME} ${env.BRANCH_NAME == "qa"} : ${env.BRANCH_NAME}"
              if (env.PREBUILD) {
                echo "skipping docker building image ${imagename}"
              } else {
                dockerImage = docker.build(imagename, buildParams )
              }
            }
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          if (env.PREBUILD) {
            echo "skipping docker deploy image ${imagename} BUILD_NUMBER: ${BUILD_NUMBER}"
          } else {
              docker.withRegistry( '', registryCredential ) {
              dockerImage.push("$BUILD_NUMBER")
              dockerImage.push('latest')
            }
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        script {
          if (env.PREBUILD) {
            echo "skipping unused docker image ${imagename}"
          } else {
              sh "docker rmi $imagename:$BUILD_NUMBER"
              sh "docker rmi $imagename:latest"
          }
        }
      }
    }
    stage('Apply Kubernetes files') {
      steps{
            script {
                   sh "echo 'builing on $cluster cluster'"

                   if (cluster == 'e2e') {
                      sh "cat jenkins/kube-setup-jk-temp.yaml"
                      sh "kubectl apply -f jenkins/kube-setup-jk-temp.yaml"
                   }

                   if (cluster == 'gke') {
                      step([
                            $class: 'KubernetesEngineBuilder',
                            projectId: 'mogi-gc',
                            clusterName: "$clusterName",
                            location: 'asia-south1-a',
                            manifestPattern: 'jenkins/kube-setup-jk-temp.yaml',
                            credentialsId: 'jenkins-sa',
                            verifyDeployments: false
                      ])
                      step([
                            $class: 'KubernetesEngineBuilder',
                            projectId: 'mogi-gc',
                            clusterName: "$clusterName",
                            location: 'asia-south1-a',
                            manifestPattern: 'jenkins/kube-setup-jk-temp-vpa.yaml',
                            credentialsId: 'jenkins-sa',
                            verifyDeployments: false
                          ])
                   }
            }
      }
    }
  }
  post {
        always {
            echo "This will always run ${currentBuild.currentResult} ${env.JOB_NAME}"
            script {
              def externalMethods = load 'jenkins/helper.groovy'
              ltemp = externalMethods.sendToSlack( "$projectName Build ${currentBuild.currentResult} for $namespace env<br> check logs https://jci.mogiio.com/job/admin-portal/job/$BRANCH_NAME/$BUILD_NUMBER/console", "jenkinsLogsChannel" )

            }
        }
    }
}
