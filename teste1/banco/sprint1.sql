CREATE DATABASE sprint1;
USE sprint1;



-- Criar tabela de salas
CREATE TABLE salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50)
);

-- Criar tabela de alunos
CREATE TABLE alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  id_sala INT,
  FOREIGN KEY (id_sala) REFERENCES salas(id)
);

-- Criar tipos de ocorrência
CREATE TABLE tipos_ocorrencia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50)
);

-- Criar tabela de ocorrências
CREATE TABLE ocorrencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_aluno INT,
  id_tipo INT,
  data_ocorrencia DATE,
  FOREIGN KEY (id_aluno) REFERENCES alunos(id),
  FOREIGN KEY (id_tipo) REFERENCES tipos_ocorrencia(id)
);



INSERT INTO salas (nome) VALUES ('1C-DS');



INSERT INTO tipos_ocorrencia (nome) VALUES
('Uniforme'),
('Comportamento'),
('Atraso'),
('Dormiu'),
('Celular');



INSERT INTO alunos (nome, id_sala) VALUES
('Aluanan Angel de Sousa', 1),
('Ana Carolina de Oliveira Monteiro', 1),
('Anna Vitória Martins Ramos', 1),
('Arthur Cintra de Lacerda', 1),
('Arthur Cintra Faleiros', 1),
('Arthur Marques Santos', 1),
('Bryan Miguel Moreira', 1),
('Davi Azevedo Gonçalves', 1),
('Eduardo Augusto Tognati', 1),
('Flavio Henrique de Souza Filho', 1),
('Gabriel Braz Menezes', 1),
('Gabriel Rossi Ventura', 1),
('Guilherme Bazon Garcia Neves', 1),
('João Victor Oliveira Silva', 1),
('José Victor Faccirolli', 1),
('Kauan Borges Plaza', 1),
('Kauan Henrique Mello Silva', 1),
('Keliyah Cristine de Oliveira Martins', 1),
('Leonardo Alves da Silva', 1),
('Luís Pedro França Paulino', 1),
('Luiz Felipe Campos Margato', 1),
('Maria Vitória Sampaio de Sousa', 1),
('Pedro Galindo Tavares', 1),
('Rafael Caires dos Santos', 1),
('Rafael Mendes Neves', 1),
('Renan Vieira Mobrise', 1),
('Sofia Siqueira Belchior', 1),
('Sophia de Oliveira Ferreira', 1),
('Ulisses Santini Gomes', 1),
('Vinícius Soares Peroni', 1);

