Allmax team test todo project.\
Note: The project only contains logic and no visual improvements\
To run:\
1. Install MongoDB\
2. If needed, specify alternate path for your Data directory and run mongod.exe(\
ex.: 'C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath d:\test\mongodb\data' )\
From root directory:\
3. Run 'npm install'\
4. Run 'npm run app'\

To seed the database with data, run 'npm run seedDB'
Script creates 4 accounts: user1, user2, admin1, admin2, all with 'password' password,\
and assigns number of todos to each.

