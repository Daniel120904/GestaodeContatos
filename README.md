# Gestão de Contatos

Um sistema web para cadastro e gerenciamento de clientes e seus contatos, desenvolvido com **Spring Boot (Back-end) e React (Front-end)**.

---

## Tecnologias Utilizadas

- **Back-end:** Java, Spring Boot, Spring Data JPA, Hibernate, MySQL  
- **Front-end:** React, Vite, Axios  
- **Banco de Dados:** MySQL  

---
```
## Estrutura do Projeto
---
gestaocontatos-frontend/
│── src/
│   ├── components/              # Componentes React
│   │   ├── ClienteForm.jsx       # Formulário de cadastro de clientes
│   │   ├── ClienteList.jsx       # Lista de clientes cadastrados
│   │   ├── ContatoForm.jsx       # Formulário para adicionar contatos
│   │   ├── EditarCliente.jsx     # Formulário de edição de cliente e contatos
│   ├── service/
│   │   ├── api.js                # Configuração de acesso aos dados (API)
│   ├── utils/
│   │   ├── validacoes.js          # Métodos de validação e sanitização
│   ├── App.jsx                   # Interface da página inicial
│   ├── index.css                 # Estilos globais do projeto
│   ├── index.html                # Estrutura HTML da aplicação
│
src/main/java/com/exemplo/gestaocontatos/
│   ├── controller/                # Endpoints da API
│   ├── model/                     # Representação das entidades do banco de dados
│   │   ├── Cliente.java           # Atributos do cliente
│   │   ├── Contato.java           # Atributos do contato
│   ├── repository/                 # Interfaces que estendem JpaRepository
│   │   ├── ClienteRepository.java  # Interface para operações com Cliente
│   ├── service/                    # Lógica de negócio
│   │   ├── ClienteService.java     # Métodos para gerenciar clientes
│   ├── GestaoContatosApplication.java # Classe principal do Spring Boot
---
```
## **Configuração do Ambiente**

### **Clonar o Repositório**
```
git clone https://github.com/Daniel120904/GestaodeContatos.git
cd gestao-contatos

Criar o Banco no MySQL
Opção 1: Rodar o Script SQL no Terminal
mysql -u root -p gestao_contatos < script.sql

Opção 2: Criar e Popular Manualmente no MySQL Workbench
CREATE DATABASE gestao_contatos;
USE gestao_contatos;

Configuração do Banco
No arquivo gestaocontatos-backend/src/main/resources/application.properties, certifique-se de alterar as credenciais do MySQL para seu usuário e senha.

Script de População do Banco para Testes

INSERT INTO cliente (nome, cpf, data_nascimento, endereco) VALUES
('João Silva', '123.456.789-00', '1990-05-15', 'Rua das Flores, 123'),
('Maria Oliveira', '987.654.321-00', '1985-08-20', 'Avenida Principal, 456'),
('Carlos Souza', '111.222.333-44', '2000-01-01', 'Rua Teste, 789'),
('Ana Costa', '555.666.777-88', '1995-12-25', 'Avenida Secundária, 101'),
('Pedro Santos', '999.888.777-66', '1980-03-10', 'Rua dos Sonhos, 202');

INSERT INTO contato (cliente_id, tipo, valor, observacao) VALUES
(1, 'Telefone', '(11) 99999-9999', 'Celular pessoal'),
(1, 'E-mail', 'joao.silva@exemplo.com', 'E-mail principal'),
(2, 'Telefone', '(21) 88888-8888', 'Celular de trabalho'),
(3, 'E-mail', 'carlos.souza@exemplo.com', 'E-mail pessoal'),
(4, 'Telefone', '(31) 77777-7777', 'Celular residencial'),
(5, 'E-mail', 'pedro.santos@exemplo.com', 'E-mail corporativo');

Execução do Projeto

**Pré-requisitos para Rodar o Projeto**
Antes de executar a aplicação, certifique-se de que possui os seguintes softwares instalados:

### **Back-end (Spring Boot)**
- [Java JDK 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)  
- [Apache Maven](https://maven.apache.org/download.cgi)  
- [MySQL Server](https://dev.mysql.com/downloads/installer/)  

**Para instalar dependências do Spring Boot**, basta rodar o comando:  
mvn clean install

Front-end (React)
- Node.js (v16+)
- [Gerenciador de pacotes npm (vem com o Node.js)]

Executar o Back-end (Spring Boot):
cd gestaocontatos-src
mvn spring-boot:run
Ou execute a classe GestaoContatosApplication na sua IDE

O servidor estará disponível em http://localhost:8080

Executar o Front-end (React):
cd gestaocontatos-frontend
npm install
npm run dev

O sistema estará disponível em http://localhost:5173
