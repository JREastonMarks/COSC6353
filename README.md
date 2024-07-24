# COSC6353

docker run --name event-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=eventmanager -e MYSQL_USER=eventmanager -e MYSQL_PASSWORD=eventpassword -d mysql:8.4.1
