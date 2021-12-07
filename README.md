<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" height="64">
  <img src="./docs/vercel-logotype-dark.png" height="64" />
  <img alt="Logo" src="https://create-react-app.dev/img/logo.svg" height="64" />
</p>


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# bordadoos-frontend

## Scripts de inicialização

```yarn install``` para instalar as dependências
```yarn dev``` para iniciar em modo de desenvolvimento

```yarn prisma generate``` para gerar typescript dos modelos do banco de dados
```yarn prisma migrate dev``` para gerar tabelas no banco de dados **(*)**


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Iniciar database (*)

1) Configure no arquivo `.env` a variável `DATABASE_URL` para o funcionamento do [Prisma.io](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

2) Configure também no arquivo `.env` as variáveis para container do [Docker](https://www.docker.com/): `POSTGRES_DB`, `POSTGRES_USER` e `POSTGRES_PASSWORD`.

ex.:
```
DATABASE_URL="postgresql://bordadoos:123456@localhost:5432/bordadoos"

POSTGRES_DB=bordadoos
POSTGRES_USER=bordadoos
POSTGRES_PASSWORD=123456
```


3) Rode o docker compose na raiz do diretório

```
docker-compose -f "docker-compose.yml" up -d --build
```



