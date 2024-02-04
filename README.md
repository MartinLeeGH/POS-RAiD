
# POS-RAiD 
POS-RAiD is a simple Point-of-Sale (POS) system that enables a user to manage their sales transactions. 

## 1. Software Architecture

### Frontend
 - **Frontend** : [NextJS](https://nextjs.org/docs)
- **UI framework** : [Tailwindcss](https://tailwindcss.com/docs/installation)
 
### Backend
 - **Backend** : [NextJS](https://nextjs.org/docs)
 - **Database** : [MySQL](https://dev.mysql.com/)
 - **Object Relational Mapping (ORM) framework** :  [Prisma](https://www.prisma.io/docs)
 
### Others
 - **Testing framework** : [Jest](https://jestjs.io/docs/getting-started)

## 2. Project Setup

### A. Prerequisites
 - **Nodejs**
 - **Npm**
 - **MySQL** 

### B. Starting up application
1. After cloning this repository, open up a **terminal** in the project folder and install node modules (*only required for the first time*) :
```bash
	npm  i
```
2. In the same **terminal**, run the following command to start the server : 
```bash
	npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### C. Setting up database
**Prisma** will be used here to create the table schemas also also to pre-populate the data in the database.

1. Create the table schemas :
```bash
	npx prisma migrate dev --name init
```

> The same command can also be used whenever there is an update to the table schemas

2. Pre-populate the data:
```bash
	npx prisma db seed
```

> refer to the file ***/prisma/seed.ts*** for more information regarding the data to be pre-populated

### D. Setting up Jest (Test framework)

1. Install Jest :
```bash
	npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```
2. Execute test :
```bash
	npm test
```
> commands can be found in ***package.json***

 
## 3. Misc

### A. Logging into the system
**POS system** can only be accessed after you login with a **valid employee id**
> There are 5 employee records already pre-populated in the system. You can
> choose to login with any of the following employee id:

    100001, 100002, 100003, 100004, 100005


