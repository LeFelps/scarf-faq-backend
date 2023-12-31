## Setup do projeto (backend)

Após clonar ou baixar o repositorio, execute os seguintes passos no prompt de comando na pasta root do projeto

### Instalação

```bash
# instalação de dependências
yarn
#ou
npm install
```

### Variáveis de ambiente

Esse projeto utiliza de variáveis de ambiente para fazer a separação de informações como a url e credenciais do banco de dados. <br/>
Será necessario criar um arquivo .env no root do projeto com esses valores para que ele funcione corretamente

Os valores devem ser os seguintes para utilizar o banco mongoDB configurado no Atlas 

```
DB_URI=mongodb+srv://admin:iCCcwsMVRDn62Uwq@scarf-faq.wen42q4.mongodb.net/scarf_faq
PORT=5050
```

### Rodando o projeto

```bash
# script para rodar o projeto em desenvolvimento 
yarn dev
#ou
npm run dev

# script para fazer o build e rodar o projeto
yarn build && yarn start
#ou
npm run dev && npm run start

```


Após executado, o projeto sera acessivel em [http://localhost:5050](http://localhost:5050).

***IMPORTANTE*** <br/> 
O projeto requer que o frontend esteja rodando para funcionar corretamente.

## Frontend

O frontend desse projeto esta separado em [outro repositorio](https://github.com/LeFelps/scarf-faq). <br/>
É necessário rodar os dois projetos simultaneamente.
