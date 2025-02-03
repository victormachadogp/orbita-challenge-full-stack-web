# Desafio de Matrícula de Alunos - Grupo A Educação

## Visão Geral

Este projeto tem como objetivo desenvolver uma aplicação para o cadastro e gestão de matrículas de alunos em turmas online.

### Backend:

- **Linguagem**: TypeScript
- **Framework**: Node.js com Express
- **Banco de Dados**: PostgreSQL
- **ORM**: Sequelize
- **Validação**: Joi
- **Testes**: Jest e Supertest
- **Gerenciamento de Ambiente**: dotenv

### Frontend:

- **Linguagem**: TypeScript
- **Framework**: Vue.js 3
- **UI Framework**: Vuetify
- **Gerenciamento de Estado**: Pinia
- **Requisições HTTP**: Axios
- **Testes**: Vitest e Cypress

## Decisões Arquiteturais

- Arquitetura baseada em camadas: Controladores, Serviços, Modelos
- Uso de TypeScript para tipagem forte
- ORM Sequelize para abstração do banco de dados
- Joi para validação de entrada

## Bibliotecas de Terceiros

- Express.js: Framework web
- Sequelize: ORM para PostgreSQL
- Joi: Validação de dados
- pg: Driver PostgreSQL
- dotenv: Gerenciamento de variáveis de ambiente

## Melhorias Potenciais

- Implementar autenticação JWT
- Adicionar testes de integração
- Implementar tratamento de erros mais robusto
- Adicionar validação de unicidade de CPF/RA
- Configurar migrations do Sequelize

## Estrutura do Projeto

### Backend:

O backend segue uma arquitetura baseada em camadas:

- **Controllers**: Responsáveis por receber as requisições HTTP e chamar os serviços apropriados.
- **Services**: Contêm a lógica de negócio da aplicação.
- **Models**: Representam as entidades do banco de dados e utilizam o Sequelize para interação.
- **Routes**: Define as rotas da API.

Estrutura de diretórios do backend:

```
server/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.ts
│   ├── database.ts
│   ├── server.ts
├── tests/
├── Dockerfile
├── package.json
└── tsconfig.json
```

### Frontend:

O frontend segue a estrutura padrão de um projeto Vue 3:

```
client/
├── src/
│   ├── components/
│   ├── views/
│   ├── store/
│   ├── router/
│   ├── main.ts
├── public/
├── package.json
└── vite.config.ts
```

## Justificativas

### Convenções de Nomenclatura

Na comunidade TypeScript e JavaScript, a escolha da convenção de nomenclatura dos arquivos é essencial para garantir padronização e manutenção eficiente do código. Neste projeto, no backend, adotei a convenção `dot-notation` para os nomes de arquivos e a nomenclatura descritiva para indicar a responsabilidade de cada arquivo.

#### Exemplo de Estrutura de Arquivos

```bash
src/
├── controllers/
│   └── student.controller.ts # Controlador de matrículas
│
├── services/
│   └── student.service.ts   # Serviço de matrículas
│
├── routes/
│   └── student.routes.ts    # Rotas de matrículas
```

### Benefícios da Nomenclatura Adotada

1. **Clareza Imediata de Propósito**

   - Exemplo: `student.routes.ts`
     - `student` indica o contexto/domínio
     - `routes` revela a responsabilidade específica do arquivo
     - `.ts` identifica o uso do TypeScript

2. **Organização Sistemática**
   - Seguir padrões de nomenclatura melhora a navegação no projeto e facilita a compreensão da arquitetura.
   - A padronização também auxilia na ordenação alfabética dos arquivos, otimizando buscas e revisões de código.

## Endpoints da API

### Alunos

- **POST /students** - Cria um novo aluno
- **GET /students** - Lista todos os alunos
- **GET /students/:id** - Retorna um aluno específico
- **PUT /students/:id** - Atualiza um aluno
- **DELETE /students/:id** - Remove um aluno

## Configuração e Execução

### Banco de Dados

1. Inicie o servidor PostgreSQL em sua máquina
2. Crie um novo banco de dados:
   ```sql
   CREATE DATABASE student_registration;
   ```

### Backend

1. Clone o repositório:
   ```sh
   git clone <repo-url>
   ```
2. Acesse o diretório do backend:
   ```sh
   cd server
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente em um arquivo `.env`:
   ```
   DB_NAME=student_registration
   DB_USER=postgres
   DB_PASS=postgres
   PORT=3000
   ```
5. Inicie o servidor:
   ```sh
   npm run dev
   ```

### Frontend

1. Acesse o diretório do frontend:
   ```sh
   cd client
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente em um arquivo `.env`:
   ```
   VITE_API_URL=http://localhost:3000
   ```
4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
