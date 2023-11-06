# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

orm comands 

typeorm migration:create ./src/infra/database/orm/migration/<nome-migration>
typeorm migration:run -d <path-to-file>/data-source.ts