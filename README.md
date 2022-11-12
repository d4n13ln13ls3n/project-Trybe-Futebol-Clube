# Project Trybe Futebol Clube
Projeto desenvolvido no módulo de Back End da [Trybe](https://www.betrybe.com/). 

## ✏ Informações sobre o projeto
O objetivo deste projeto de Back End foi criar um site informativo sobre partidas e classificações de futebol.
- Foi construída uma API (utilizando o método TDD) e integradas - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados MySQL.
- Foi construído um back-end dockerizado utilizando modelagem de dados através do Sequelize, capaz de ser consumido por um Front End já provido nesse projeto pela Trybe.
- Para adicionar uma partida, foi necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. 
- O back end implementou regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
</br>
- A aplicação foi desenvolvida com <strong>Node.js e TypeScript</strong>, utilizando a <strong>arquitetura MSC</strong> (Model, Service, Controller) e <strong>MySQL</strong> para realizar o CRUD (Create, Read, Update and Delete) dos itens.
- Para fazer validações de entrada, foi utilizada a biblioteca <strong>Joi</strong> e para a gerar e autenticar token foi utilizado o JSON Web Token - <strong>JWT</strong>.

 <details>
 <summary> 🇬🇧 English here</summary>
 ## ✏ Information about the project</br>
 The goal of this back-end project was to an informative website on matches and rankings of soccer. </br>
  - An API was built (using Test-driven Development - TDD) and integrated - through docker-compose - so it worked consuming data from a MySQL database.</br>
  - A dockerized back end was built using data modeling through Sequelize, able to be consumed by a Front End already supplied for this project by Trybe.</br>
  - To add a match, it was necessary to have a token, therefore the user should be logged in to make alterations.</br>
  - The back end implemented business rules to adequately populate the table available in the Front End, which is displayed to the user accessing the system.</br>
 </br>
 - The application was developed with <strong>Node.js and Typescript</strong>, using <strong>MSC architecture</strong> (Model, Service and Controller) and <strong>MySQL</strong> to perform CRUD (Create, Read, Update and Delete) operations.</br>
 - To validate data input, the <strong>Joi</strong> library was used and to generate and authenticate tokens JSON Web Token - <strong>JWT</strong>.
 </details>
 
## 🛸 Principais tecnologias utilizadas / Main technologies used: 
- [Docker](https://www.docker.com/);
- [Express.js](https://expressjs.com/);
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript);
- [Joi](https://joi.dev/api/?v=17.6.0);
- [JWT(Autenticação)](https://jwt.io/);
- [MYSQL](https://www.mysql.com/);
- [mysql2](https://www.npmjs.com/package/mysql2);
- [Node.js](https://nodejs.org/en/);
- [Sequelize](https://sequelize.org/)
- [TypeScript](https://www.typescriptlang.org/)

## ⚙ Instruções para rodar o projeto em sua máquina

<strong>1. Fazer o git clone na sua máquina e entrar no diretório:</strong>
 - Lembre-se de clonar o repositório no diretório desejado na sua máquina!
 ```
 git clone git@github.com:d4n13ln13ls3n/project-Trybe-Futebol-Clube.git
 cd project-Trybe-Futebol-Clube
