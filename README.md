curl --proto "https" -o "/tmp/ecs-anywhere-install.sh" "https://amazon-ecs-agent.s3.amazonaws.com/ecs-anywhere-install-latest.sh" && bash /tmp/ecs-anywhere-install.sh --region "ap-southeast-1" --cluster "express-app-ecs" --activation-id "37d63c3b-47aa-4071-8989-41277ed1704e" --activation-code "CwBzS8bAtXDb6BRMJNEJ"

1. copy file
> cp .env.example .env
2. create network
> docker create network mongodb-network
2. create express app:
> docker build -t ecs_app  .
> docker run --name ecs_app -p 8089:8088 -d --network mongodb-network ecs_app
3. start mongo
> docker run --name mongodb \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=password \
-e MONGO_INITDB_DATABASE=my-db \
--network mongodb-network \
-p 27017:27017 \
-d mongo

3. start mongo-express: https://stackoverflow.com/questions/60748269/mongo-express-started-by-docker-compose-causing-error-mongoerror-failed-to-co
> docker run --name mongodb-express -p 8086:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=root \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_URL=mongodb://root:password@mongodb:27017/ \
-e ME_CONFIG_BASICAUTH_USERNAME=root \
-e ME_CONFIG_BASICAUTH_PASSWORD=password \
--network mongodb-network \
-d mongo-express
