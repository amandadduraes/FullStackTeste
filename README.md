# FullStackTeste
 
Este repositório contém a implementação de um CRUD simples para categorias, com código, título e descrição, apresentando uma interface web desenvolvida com React. Além disso, a aplicação fornece uma REST API para as operações CRUD de categorias. O banco de dados utilizado é o PostgreSQL.

Tecnologias Utilizadas:
Frontend: React
Backend: Node.js
Framework Web Backend: Express
Banco de Dados: PostgreSQL
Funcionalidades Principais:
Criação, leitura, atualização e exclusão (CRUD) de categorias.
Interface web para interação com o usuário com as funcionalidades: 
Filtragem, ordenação ( clicando na th) 
API REST para manipulação de dados.
Estrutura do Projeto:
frontend/: Contém o código do frontend desenvolvido em React.
backend/: Contém o código do backend desenvolvido em Node.js com Express.
database/: Scripts e arquivos relacionados ao banco de dados PostgreSQL.

Banco:

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT
);

INSERT INTO categorias (codigo, titulo, descricao) VALUES
(1, 'Eletrônicos', 'Produtos eletrônicos como smartphones, tablets e laptops'),
(2, 'Roupas', 'Roupas de moda masculina, feminina e infantil'),
(3, 'Livros', 'Livros de diferentes gêneros como ficção, não-ficção, romance, etc.'),
(4, 'Alimentos', 'Diversos alimentos como frutas, legumes, carne, laticínios, etc.'),
(5, 'Móveis', 'Móveis para casa, incluindo sofás, mesas, cadeiras, camas, etc.'),
(6, 'Acessórios', 'Acessórios diversos como bolsas, carteiras, relógios, joias, etc.');

Como Executar o Projeto:
Clone este repositório em sua máquina local.
Configure o banco de dados PostgreSQL e as credenciais de conexão no arquivo de configuração.
Execute o backend utilizando npm start na pasta backend/.
Execute o frontend utilizando npm start na pasta frontend/.
Acesse a aplicação em um navegador web no endereço local.
Este projeto é uma implementação básica de um CRUD e pode ser expandido e customizado conforme necessário. Sinta-se à vontade para explorar o código e contribuir com novas funcionalidades ou melhorias.
