curl --proto "https" -o "/tmp/ecs-anywhere-install.sh" "https://amazon-ecs-agent.s3.amazonaws.com/ecs-anywhere-install-latest.sh" && bash /tmp/ecs-anywhere-install.sh --region "ap-southeast-1" --cluster "express-app-ecs" --activation-id "37d63c3b-47aa-4071-8989-41277ed1704e" --activation-code "CwBzS8bAtXDb6BRMJNEJ"

JENKINS PLUGIN 

1. Amazon ECR plugin
2. Docker plugin
3. Amazon Web Services SDK :: All
4. CloudBees Docker Build and Publish plugin
5. Docker Pipeline
6. Pipeline: AWS Steps


INSTALL:

- install: docker 
- install: aws cli
- install: 'jq' 
>  $ sudo dnf makecache 

> $ sudo dnf install jq
