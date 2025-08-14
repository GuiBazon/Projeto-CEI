CREATE DATABASE IF NOT EXISTS sprint2;
USE sprint2;

-- suas tabelas já criadas + tabela de usuários pra login
CREATE TABLE IF NOT EXISTS salas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  id_sala INT,
  FOREIGN KEY (id_sala) REFERENCES salas(id)
);

CREATE TABLE IF NOT EXISTS tipos_ocorrencia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS ocorrencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_aluno INT,
  id_tipo INT,
  data_ocorrencia DATE,
  FOREIGN KEY (id_aluno) REFERENCES alunos(id),
  FOREIGN KEY (id_tipo) REFERENCES tipos_ocorrencia(id)
);

-- tabela de usuários (simples, texto puro). OK pra teste/curso.
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) UNIQUE,
  senha VARCHAR(100),
  nome VARCHAR(100),
  papel VARCHAR(20)  -- ex: professor, admin
);

-- dados iniciais
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



-- usuário de teste: usuario = professor, senha = 1234
INSERT INTO usuarios (usuario, senha, nome, papel) VALUES ('professor', '1234', 'Professor Teste', 'professor');



INSERT INTO ocorrencias (id_aluno, id_tipo, data_ocorrencia)
VALUES (
  (SELECT id FROM alunos WHERE nome = 'Guilherme Bazon Garcia Neves'),
  (SELECT id FROM tipos_ocorrencia WHERE nome = 'Celular'),
  '2025-08-14'
);

SELECT * FROM ocorrencias;