lesMails = 'Madiagne.Sylla@orange-sonatel.com, MelchisedeckFolloh.MABIALA@orange-sonatel.com'
pipeline {
    /* choisir un slave Jenkins qui a le label php7 */
    agent  {
        label 'dst-preprod'
    }
    environment {
        IMAGE = 'registry.tools.orange-sonatel.com/dd/gsecu-frontend'
        VERSION = readMavenPom().getVersion()
        NAME = readMavenPom().getArtifactId()
        PROJECT_ENV = 'gsecu-front-preprod'
        ENV_APP = 'preprod'
        VERSION_REC = readMavenPom().getVersion()
        PROJECT_REC = 'dstgsecu-rec'
        DC="frontend"
    }
    tools {
        maven "Maven_3.3.9"
    }
    stages {
        stage('Installation des packets') {
            steps {
                sh 'set +ex ; export NVM_DIR="$HOME/.nvm"; . ~/.nvm/nvm.sh; . ~/.profile ;nvm use v14.17.4 ;npm install;npm run build; set -ex'
                stash includes: '**/*', name: 'app'
            }
        }
        stage('Deploy IN Dev') {
            when {
                anyOf { branch 'develop' }
            }
            steps {
                sh 'docker ps -qa -f name=${NAME} | xargs --no-run-if-empty docker rm -f'
                sh 'docker images -f reference=${IMAGE} -qa | xargs --no-run-if-empty docker rmi'
                sh 'docker build --no-cache -t ${IMAGE}:${VERSION} .'
                sh 'docker push ${IMAGE}:${VERSION}'
                sh 'docker run --name=${NAME} -d --restart=always --memory-reservation=1000M --memory=1500M -p 2315:22 -p 8015:80 ${IMAGE}:${VERSION}'
            }
        }
        // stage(' Build Docker image for REC') {
        //     when {anyOf { branch 'master' }}
        //     steps {
        //         sh 'docker build  --no-cache -t ${IMAGE}:${VERSION_REC} .'
        //         sh 'docker push ${IMAGE}:${VERSION_REC}'
        //         script {
        //             BUILD_CONFIG_REC = sh(
        //                 script: 'ruby -ryaml -rjson -e "puts JSON.pretty_generate(YAML.load(ARGF))" /var/openshift/qredic/rec/${DC}-deployment.yaml',
        //                 returnStdout: true
        //             )
        //         }
        //     }
        // }
        // stage('Malaw4 REC - Deploy') {
        // 	when {anyOf { branch 'master' }}
        //     agent {label 'malaw4-rec'}
        //     steps {
        //     	writeFile file: "${DC}-deployment.json", text: "${BUILD_CONFIG_REC}"
        //         script {
        //         	  openshift.withCluster() {
        //             	  openshift.withProject("${PROJECT_REC}") {
        //                 	  def created = openshift.raw('apply', '-f ${DC}-deployment.json')
        //                       openshift.selector("dc", "${DC}").rollout().latest()
        //                 }
        //             }
        //         }
        //     }
        // }
    }
    post {
        changed { emailext attachLog: true, body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT',  to: lesMails }
        failure { emailext attachLog: true, body: '$DEFAULT_CONTENT', subject: '$DEFAULT_SUBJECT',  to: lesMails }
    }
}
