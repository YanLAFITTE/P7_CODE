## Groupomania P7

This is the backend fot the Groupomania project

### Technologies used

- Node.js, Express, JWT, Multer
- MySQL hosted on PlanetScale
- Prisma for ORM

### How to use

1. `git clone` this repo
2. `npm install`
3. rename the `.env.developpement`file into `.env`
4. populate it with your personal environement variables
5. the project was tested with the online MySQL database: PlanetScale

### How to use the Prisma to interact with database

The database schema is inside `schema.prisma`

if you vant to change it, you have to run `npx prisma db push`