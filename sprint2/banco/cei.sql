create database cei;
use cei;

create table usuario (
  id_usuario int auto_increment primary key,
  nome_usuario varchar(100) not null,
  email varchar(100) not null unique,
  senha varchar(100) not null
);

create table turma (
  id_turma int auto_increment primary key,
  nome_turma varchar(25) not null,
  curso varchar(50) not null
);

create table aluno (
  id_aluno int auto_increment primary key,
  fk_id_turma int not null,
  nome_aluno varchar(100) not null,
  cpf char(11) not null unique,
  data_nascimento date not null,
  foreign key (fk_id_turma) references turma(id_turma)
);

create table ocorrencia (
  id_ocorrencia int auto_increment primary key,
  fk_id_aluno int not null,
  fk_id_usuario int not null,
  tipo_ocorrencia enum('celular', 'uniforme', 'comportamento', 'atraso', 'dormiu') not null,
  data_ocorrencia datetime not null,
  descricao varchar(100),
  foreign key (fk_id_aluno) references aluno(id_aluno),
  foreign key (fk_id_usuario) references usuario(id_usuario)
);

-- populando tabela usuario
insert into usuario (nome_usuario, email, senha) values
('Adriano Donizete', 'adriano.donizete@docente.senai.com', 'dridrilegal123'),
('Euller Ferreira', 'euller.ferreira@docente.senai.com', 'eu77ffgameplays');

-- populando tabela turma
insert into turma (nome_turma, curso) values
('1C', 'desenvolvimento de sistemas');

-- populando tabela aluno
insert into aluno (fk_id_turma, nome_aluno, cpf, data_nascimento) values
(1, 'Aluanan Angel de Sousa', '10000000001', '2008-01-01'),
(1, 'Ana Carolina de Oliveira Monteiro', '10000000002', '2008-01-01'),
(1, 'Anna Vitoria Martins Ramos', '10000000003', '2008-01-01'),
(1, 'Arthur Cintra de Lacerda', '10000000004', '2008-01-01'),
(1, 'Arthur Cintra Faleiros', '10000000005', '2008-01-01'),
(1, 'Arthur Marques Santos', '10000000006', '2008-01-01'),
(1, 'Bryan Miguel Moreira', '10000000007', '2008-01-01'),
(1, 'Davi Azevedo Goncalves', '10000000008', '2008-01-01'),
(1, 'Eduardo Augusto Tognati', '10000000009', '2008-01-01'),
(1, 'Flavio Henrique de Souza Filho', '10000000010', '2008-01-01'),
(1, 'Gabriel Braz Menezes', '10000000011', '2008-01-01'),
(1, 'Gabriel Rossi Ventura', '10000000012', '2008-01-01'),
(1, 'Guilherme Bazon Garcia Neves', '10000000013', '2008-01-01'),
(1, 'Joao Victor Oliveira Silva', '10000000014', '2008-01-01'),
(1, 'Jose Victor Faccirolli', '10000000015', '2008-01-01'),
(1, 'Kauan Borges Plaza', '10000000016', '2008-01-01'),
(1, 'Kauan Henrique Mello Silva', '10000000017', '2008-01-01'),
(1, 'Keliyah Cristine de Oliveira Martins', '10000000018', '2008-01-01'),
(1, 'Leonardo Alves da Silva', '10000000019', '2008-01-01'),
(1, 'Luis Pedro Franca Paulino', '10000000020', '2008-01-01'),
(1, 'Luiz Felipe Campos Margato', '10000000021', '2008-01-01'),
(1, 'Maria Vitoria Sampaio de Sousa', '10000000022', '2008-01-01'),
(1, 'Pedro Galindo Tavares', '10000000023', '2008-01-01'),
(1, 'Rafael Caires dos Santos', '10000000024', '2008-01-01'),
(1, 'Rafael Mendes Neves', '10000000025', '2008-01-01'),
(1, 'Renan Vieira Mobrise', '10000000026', '2008-01-01'),
(1, 'Sofia Siqueira Belchior', '10000000027', '2008-01-01'),
(1, 'Sophia de Oliveira Ferreira', '10000000028', '2008-01-01'),
(1, 'Ulisses Santini Gomes', '10000000029', '2008-01-01'),
(1, 'Vinicius Soares Peroni', '10000000030', '2008-01-01');

-- populando tabela ocorrencia (exemplo)
insert into ocorrencia (fk_id_aluno, fk_id_usuario, tipo_ocorrencia, data_ocorrencia, descricao) values
(1, 1, 'uniforme', '2025-10-09 08:15:00', 'Aluno sem uniforme completo.'),
(9, 2, 'comportamento', '2025-10-09 09:40:00', 'Conversando em sala.'),
(26, 1, 'atraso', '2025-10-08 07:10:00', 'Chegou 10 minutos atrasado.');