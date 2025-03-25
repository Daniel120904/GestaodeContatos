Gestão de Contatos

Um sistema web para cadastro e gerenciamento de clientes e seus contatos, desenvolvido com **Spring Boot (Back-end) e React (Front-end)**.

Tecnologias Utilizadas:

- **Back-end:** Java, Spring Boot, Spring Data JPA, Hibernate, MySQL
- **Front-end:** React, Vite, Axios
- **Banco de Dados:** MySQL

Estrutura do Projeto

gestaocontatos-frontend/src
components
     #ClienteForm.jsx: Contém os metodos e interface do formulario do cliente
    ClienteList.jsx: Contém os metodos e interface do da listagem de todos os clientes
    ContatoForm.jsx: Contém a interface do formulario do contato
    EditarCliente.jsx: Contém os metodos e interface do formulario para editar o cliente e contatos
Service
    api.js: Contém a configuração para acesso aos dados 
utils
    validacoes.js: Contém os metodos para as interfaces
App.jsx: Cnteém a interface da pagina inicial
index.css: Contém os estilos para as interfaces
index.html: Cóntem o html da pagina

src/main/java
com
    xemplo
        gestaocontatos
            controller:  Contém os endpoints para API 
            model: Contém as classes que representam as entidades do banco de dados
                Cliente.java: Contém os atributos do cliente
                Contato.java: Contém os atributos do contato
            repository: Contém as interfaces que estendem JpaRepository para acesso aos dados 
                ClienteRepository.java: estende os dados do cliente para a inteface
            service: Contém a lógica de negócio
                ClienteService.java: Contem os metodos para o cliente
            GestaoContatosApplication.java

**Configuração do Ambiente**

Clonar o repositório:
git clone https://github.com/Daniel120904/GestaodeContatos.git

cd gestao-contatos

Criar o banco no MySQL:
mysql -u root -p gestao_contatos < script.sql
Ou pode ser usados os script para criar o banco de dados no MYSQLWorkBench:
CREATE DATABASE gestao_contatos;
USE gestao_contatos;

Conecção do banco:
Em gestaocontatos/src/main/resources/application-properties, sertifiquiser de mudar as configurações do MySQL para o seu usuario e sua senha

Script de população do banco para testes:
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

Execução:
Executar o Back-end (Spring Boot):
mvn spring-boot:run ou em sua IDE, rode a classe main GestaocontatosApplication
O servidor estará disponível em http://localhost:8080

Executar o Front-end (React):
cd gestao-contatos-frontend
npm install
npm run dev
O sistema estará disponível em http://localhost:5173
