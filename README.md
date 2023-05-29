## POC-tasklist

Este projeto é uma prova de conceito (POC), criada com o objetivo de colocar em prática conceitos que vinham sendo estudados, incluindo o uso de middlewares, como autenticação com JWT e RequestLogger. A seguir, você encontrará todas as informações sobre esta API, bem como instruções sobre como executá-la em sua própria máquina.

## Indice

- [POC-tasklist](#POC-tasklist)
- [Índice](#indice)
- [Sobre](#sobre)
- [Características](#características)
- [Setup](#setup)
  - [Pré-requisitos](#pré-requisitos)
  - [Instruções](#instruções)
- [Start](#start)
- [Tecnologias](#tecnologias)
- [Ambiente](#ambiente)

## Sobre

A tasklist é uma aplicação desenvolvida para auxiliar no gerenciamento de tarefas diárias de usuários. Com ela, é possível criar e gerenciar uma lista de tarefas pendentes, alterar o status das tarefas para concluídas, excluir tarefas, além de permitir a consulta das tarefas pendentes e o cadastro de novos usuários. A aplicação ainda oferece a possibilidade de alteração das informações de usuário, como nome e senha.

## Características

- Cadastro de usuários.
- Cadastro de tarefas.
- Consulta de tarefas.
- Alteração de status de tarefas.
- Exclusão de tarefas.
- Alteração de informações de usuário.
- Autenticação.
- Criptografia de senha.
- Environment.
- Migrations, para facilitar criação de tabelas no banco de dados.
- RequestLogger.

## Setup

### Pré-requisitos

- [Node 16.0.0 LTS](https://nodejs.org/en/) -> Para rodar a aplicação
- [NPM](https://www.npmjs.com) -> Para instalar e usar os scripts package.json
- [SQL](https://www.postgresql.org/) -> Um sql de sua preferência, para configurar localmente e persistir os dados no banco da dados, recomendo o postgres.
- [Insomnia](https://insomnia.rest/download) -> Software de requisições HTTP, para consumir a API.

### Instruções

Feito os pré-requisitos, o próximo passo é seguir estas instruções:

1. Clonar o repositório.
2. Abra o terminal na pasta raiz do projeto e digite "npm install" para instalar todas as dependências.
3. Crie um arquivo chamado ".env" na raiz do projeto.
4. Use o seguinte código no arquivo criado:

# LOCAL

```env
DB_USER='<YOUR_USER>'
DB_PWD='<YOUR_PASSWORD>'
DB_NAME='<DATABASE_NAME>'
DB_HOST=localhost
DB_DIALECT='<ONE_OF: mysql | postgres | sqlite | mariadb | mssql | db2 | snowflake | oracle>'
PORT="3333"
SECRET="6e550a642f3d5f2d2a364ab96697080f"
EXPIRES_IN="1d"
VERSION=1.0.0
```

Para cada variável de ambiente você precisa substituir por seus **próprios dados configurados**.

5. Após substituir os valores das variaveis de ambiente, abra o terminal na raiz do projeto e digite "npx sequelize-cli db:migrate" para criar todas as tabelas no banco de dados.
6. Com a configuração concluída, você só precisa testar a execução do **npm run dev**
7. Se tudo estiver OK, você deve testar o status do servidor através do endpoint: **seu_dominio:sua_porta/health** que retorna um JSON com informações básicas como: `{ "uptime": 1.432175383, "message": "OK", "version": "1.0.0","timestamp": 1677000014598 }`.
8. Divirta-se! :D

## Start

Feito as instruções, agora é a hora de usar o nosso sistema:

1. Health check:

   ```
   curl --request GET
   --url http://{{base_url}}/health
   ```

2. Create User:

   ```
   curl --request POST
   --url http://{{base_url}}/users
   --header 'Content-Type: application/json'
   --data '{
   	"name": "Lucio",
   	"email": "luciosilva@hotmail.com",
   	"password": "pa$$word"
   }'
   ```

3. Update User:

```
curl --request PUT
--url http://{{base_url}}/users
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjc2OTEyMjQxLCJleHAiOjE2NzY5OTg2NDF9.qbX0tUL7VH8AcpGxv9xSF6c2Zsbkhhop7hYxTzcxWgM'
--header 'Content-Type: application/json'
--data '{
  "name": "Lucio Santos",
  "oldPassword": "pa$$word",
  "password": "1234567",
  "confirmPassword": "1234567"
}'
```

4. Session:

```
curl --request POST
--url http://{{base_url}}/sessions
--header 'Content-Type: application/json'
--data '{
	"email": "luciosilva@gmail.com",
	"password": "pa$$word"
}'
```

5. Create Task:

```
curl --request POST
  --url http://{{base_url}}/tasks
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjc2OTk4NDQ5LCJleHAiOjE2NzcwODQ4NDl9.6tg2X5rspkjiPdQhFEd0H6NKt4KwBNANYQUv2ONkDW0'
  --header 'Content-Type: application/json'
  --data '{
	"task": "Estudar matemática."
}'

```

6. Update Task:

```
curl --request PUT
  --url http://{{base_url}}/tasks/:id
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjc2OTE1MjY2LCJleHAiOjE2NzcwMDE2NjZ9.Op27y2CbvC9niibETu2uv_5JgKm3t8Eb23D1mzXlijw'
  --header 'Content-Type: application/json'
  --data '{
	"check": true
}'
```

7. List all:

```
curl --request GET
  --url http://{{base_url}}/tasks
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjc2OTk4NDQ5LCJleHAiOjE2NzcwODQ4NDl9.6tg2X5rspkjiPdQhFEd0H6NKt4KwBNANYQUv2ONkDW0'
```

8. Delete Task:

```
curl --request DELETE
  --url http://{{base_url}}/tasks/:id
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjc2OTE1MjY2LCJleHAiOjE2NzcwMDE2NjZ9.Op27y2CbvC9niibETu2uv_5JgKm3t8Eb23D1mzXlijw'
```

## Tecnologias

- :star: Node.js
- :star: Express
- :star: Sequelize
- :star: PostgreSQL

## Ambiente

- :desktop_computer: Visual Studio Code para codificação
- :desktop_computer: Postbird para gerenciamento de banco de dados
- :desktop_computer: Insomnia para testes de API
- :desktop_computer: Github para versionamento de código
- :desktop_computer: Spotify para focar
- :desktop_computer: Stack Overflow & ChatGPT para debug

```

```
