create database cei;
use cei;

create table salas (
  id_turma int auto_increment primary key,
  nome_turma varchar(50) not null
);

create table usuario (
  id_usuario int auto_increment primary key,
  nome_usuario varchar(100) not null
)

create table alunos (
  id_aluno int auto_increment primary key,
  nome_aluno varchar(100) not null,
  fk_id_turma int not null,
  foreign key (fk_id_turma) references turma(id_turma)
);

create table tipos_ocorrencia (
  id_tipo_ocorrencia int auto_increment primary key,
  tipo varchar(50) not null
);

create table ocorrencias (
  id_ocorrencia int auto_increment primary key,
  fk_id_aluno int not null,
  fk_id_tipo int not null,
  data_ocorrencia date not null,
  foreign key (fk_id_aluno) references alunos(id_aluno),
  foreign key (fk_id_tipo) references tipos_ocorrencia(id_tipo_ocorrencia)
);

insert into turma (nome_turma) values ('1C-DS');

insert into tipos_ocorrencia (tipo) values
('Uniforme'),
('Comportamento'),
('Atraso'),
('Dormiu'),
('Celular');

insert into alunos (nome_aluno, fk_id_sala) values
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