## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina ou docker desktop.

## Variáveis de Ambiente

Para rodar esse projeto, atente-se ao docker-compose para as envs do projeto

```bash
    DB_DATABASE=""
    DB_USERNAME=""
    DB_PASSWORD=""
    DB_HOST=""
    DB_PORT=""
    PORT=""
    CORS_ORIGIN=""
    GEMINI_API_KEY=""
    FILE_IO_API_KEY=""
```

## Usando docker

1. Crie a imagem do docker e rode o container com o comando:

```bash
  npm run docker:up
```

2. Aguarde e o server estará online e exposto na porta 3333:

## Usando localmente

1. Instale as dependências utilizando o NPM:

```bash
 npm i
```

2. Execute o seguinte comando para rodar o build:

```bash
    npm run build
```

3. Execute o seguinte comando para rodar o server:

```bash
    npm run dev
```

4. Aguarde e o server estará online e exposto na porta 3333:

#### Documentação da API, segue collection do postman para ver as API'S:

- [link para a collection](https://www.postman.com/security-technologist-45772221/shopper/collection/3o3ca5x/shopper)

[banco](https://drive.google.com/file/d/1zPBV5dqOT-3umAMWC1Pcu2UAMACJWP4X/view?usp=sharing)
