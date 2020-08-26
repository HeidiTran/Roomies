# Roomies - a CS375 Project 


## **Development setup**

1. Download PostgreSQL version 12.4
https://www.postgresql.org/download/

2. Create a Database name roomies and create tables by running the SQL script Database/create_tables.sql ---> You should now have 4 tables in your roomies database.

3. Go to roomies-server folder and create a file name env.json. Note: _accessTokenSecret_ can be any string. (_This would be use as salt_)
```json
{
	"user": "postgres",
	"host": "localhost",
	"database": "roomies",
	"password": "YOUR-DB-PASSWORD",
	"port": 5432,
	"accessTokenSecret": "ACCESS-TOKEN"
}
```

4. In the roomies-server folder, restore all NPM packages by running

```shell
npm install
```

5. This project was generated with [Angular CLI](https://cli.angular.io/) version 8.3.9. Install the Angular CLI using NPM ([Node.js](https://nodejs.org/en/) >= 10 required)

```shell
npm install -g @angular/cli@8.3.9 
```

6. In the roomies-client folder, restore all NPM packages by running

```shell
npm install
```

7. Start the Express server by going into the roomies-server folder and run the following command

```shell
npm start
```
You should see "Listening at: http://localhost:3000"

8. Finally, run this command in the roomies-client folder 
```shell
ng serve --open
```

The web app should automatically open up for you. 

_Note: The app will automatically reload if you change any of the source files._