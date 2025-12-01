CREATE DATABASE  IF NOT EXISTS `cei` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cei`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: cei
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno` (
  `id_aluno` int NOT NULL AUTO_INCREMENT,
  `fk_id_turma` int NOT NULL,
  `nome_aluno` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `data_nascimento` date NOT NULL,
  PRIMARY KEY (`id_aluno`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `fk_id_turma` (`fk_id_turma`),
  CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`fk_id_turma`) REFERENCES `turma` (`id_turma`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (1,1,'Aluanan Angel de Sousa','10000000001','2008-01-01'),(2,1,'Ana Carolina de Oliveira Monteiro','10000000002','2008-01-01'),(3,1,'Anna Vitoria Martins Ramos','10000000003','2008-01-01'),(4,1,'Arthur Cintra de Lacerda','10000000004','2008-01-01'),(5,1,'Arthur Cintra Faleiros','10000000005','2008-01-01'),(6,1,'Arthur Marques Santos','10000000006','2008-01-01'),(7,1,'Bryan Miguel Moreira','10000000007','2008-01-01'),(8,1,'Davi Azevedo Goncalves','10000000008','2008-01-01'),(9,1,'Eduardo Augusto Tognati','10000000009','2008-01-01'),(10,1,'Flavio Henrique de Souza Filho','10000000010','2008-01-01'),(11,1,'Gabriel Braz Menezes','10000000011','2008-01-01'),(12,1,'Gabriel Rossi Ventura','10000000012','2008-01-01'),(13,1,'Guilherme Bazon Garcia Neves','10000000013','2008-01-01'),(14,1,'Joao Victor Oliveira Silva','10000000014','2008-01-01'),(15,1,'Jose Victor Faccirolli','10000000015','2008-01-01'),(16,1,'Kauan Borges Plaza','10000000016','2008-01-01'),(17,1,'Kauan Henrique Mello Silva','10000000017','2008-01-01'),(18,1,'Keliyah Cristine de Oliveira Martins','10000000018','2008-01-01'),(19,1,'Leonardo Alves da Silva','10000000019','2008-01-01'),(20,1,'Luis Pedro Franca Paulino','10000000020','2008-01-01'),(21,1,'Luiz Felipe Campos Margato','10000000021','2008-01-01'),(22,1,'Maria Vitoria Sampaio de Sousa','10000000022','2008-01-01'),(23,1,'Pedro Galindo Tavares','10000000023','2008-01-01'),(24,1,'Rafael Caires dos Santos','10000000024','2008-01-01'),(25,1,'Rafael Mendes Neves','10000000025','2008-01-01'),(26,1,'Renan Vieira Mobrise','10000000026','2008-01-01'),(27,1,'Sofia Siqueira Belchior','10000000027','2008-01-01'),(28,1,'Sophia de Oliveira Ferreira','10000000028','2008-01-01'),(29,1,'Ulisses Santini Gomes','10000000029','2008-01-01'),(30,1,'Vinicius Soares Peroni','10000000030','2008-01-01');
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ocorrencia`
--

DROP TABLE IF EXISTS `ocorrencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ocorrencia` (
  `id_ocorrencia` int NOT NULL AUTO_INCREMENT,
  `fk_id_aluno` int NOT NULL,
  `fk_id_usuario` int NOT NULL,
  `data_ocorrencia` datetime NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_ocorrencia`),
  KEY `fk_id_aluno` (`fk_id_aluno`),
  KEY `fk_id_usuario` (`fk_id_usuario`),
  CONSTRAINT `ocorrencia_ibfk_1` FOREIGN KEY (`fk_id_aluno`) REFERENCES `aluno` (`id_aluno`),
  CONSTRAINT `ocorrencia_ibfk_2` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocorrencia`
--

LOCK TABLES `ocorrencia` WRITE;
/*!40000 ALTER TABLE `ocorrencia` DISABLE KEYS */;
INSERT INTO `ocorrencia` VALUES (1,1,1,'2025-10-09 08:15:00','Aluno sem uniforme completo.'),(2,9,2,'2025-10-09 09:40:00','Conversando em sala.'),(3,26,1,'2025-10-08 07:10:00','Chegou 10 minutos atrasado.');
/*!40000 ALTER TABLE `ocorrencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turma`
--

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turma` (
  `id_turma` int NOT NULL AUTO_INCREMENT,
  `nome_turma` varchar(25) NOT NULL,
  `curso` varchar(50) NOT NULL,
  PRIMARY KEY (`id_turma`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turma`
--

LOCK TABLES `turma` WRITE;
/*!40000 ALTER TABLE `turma` DISABLE KEYS */;
INSERT INTO `turma` VALUES (1,'1C','desenvolvimento de sistemas');
/*!40000 ALTER TABLE `turma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Adriano Donizete','adriano10@docente.senai.com','dredre'),(2,'Euller Ferreira','euller7@docente.senai.com','oiler');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_detalhes_ocorrencias`
--

DROP TABLE IF EXISTS `vw_detalhes_ocorrencias`;
/*!50001 DROP VIEW IF EXISTS `vw_detalhes_ocorrencias`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_detalhes_ocorrencias` AS SELECT 
 1 AS `id_ocorrencia`,
 1 AS `data_ocorrencia`,
 1 AS `descricao`,
 1 AS `id_aluno`,
 1 AS `nome_aluno`,
 1 AS `nome_turma`,
 1 AS `nome_usuario`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'cei'
--

--
-- Dumping routines for database 'cei'
--
/*!50003 DROP PROCEDURE IF EXISTS `prcd_nova_ocorrencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`alunods`@`localhost` PROCEDURE `proc_nova_ocorrencia`(
    IN p_id_aluno INT,
    IN p_id_usuario INT,
    IN p_descricao TEXT
)
BEGIN
    INSERT INTO ocorrencia (fk_id_aluno, fk_id_usuario, data_ocorrencia, descricao)
    VALUES (p_id_aluno, p_id_usuario, NOW(), p_descricao);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vw_detalhes_ocorrencias`
--

/*!50001 DROP VIEW IF EXISTS `vw_detalhes_ocorrencias`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`alunods`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_detalhes_ocorrencias` AS select `o`.`id_ocorrencia` AS `id_ocorrencia`,`o`.`data_ocorrencia` AS `data_ocorrencia`,`o`.`descricao` AS `descricao`,`a`.`id_aluno` AS `id_aluno`,`a`.`nome_aluno` AS `nome_aluno`,`t`.`nome_turma` AS `nome_turma`,`u`.`nome_usuario` AS `nome_usuario` from (((`ocorrencia` `o` join `aluno` `a` on((`o`.`fk_id_aluno` = `a`.`id_aluno`))) join `turma` `t` on((`a`.`fk_id_turma` = `t`.`id_turma`))) join `usuario` `u` on((`o`.`fk_id_usuario` = `u`.`id_usuario`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-30 20:01:46
