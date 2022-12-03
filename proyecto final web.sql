CREATE DATABASE  IF NOT EXISTS `proyecto_final_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `proyecto_final_web`;
-- MariaDB dump 10.19  Distrib 10.4.22-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: proyecto_final_web
-- ------------------------------------------------------
-- Server version	10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `deportista`
--

DROP TABLE IF EXISTS `deportista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deportista` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1,
  `vp_genero` bigint(20) NOT NULL,
  `vp_deporte` bigint(20) NOT NULL,
  `id_equipos` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_equipos` (`id_equipos`),
  CONSTRAINT `deportista_ibfk_1` FOREIGN KEY (`id_equipos`) REFERENCES `equipo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deportista`
--

LOCK TABLES `deportista` WRITE;
/*!40000 ALTER TABLE `deportista` DISABLE KEYS */;
INSERT INTO `deportista` VALUES (1,'Juan','2022-12-09',1,3,2,7);
/*!40000 ALTER TABLE `deportista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipo`
--

DROP TABLE IF EXISTS `equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1,
  `vp_deporte` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES (1,'test',-1,1),(2,'test',-1,1),(3,'test',-1,1),(4,'test',-1,1),(5,'Wayepo',-1,1),(6,'test',-1,1),(7,'test',1,1);
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametro`
--

DROP TABLE IF EXISTS `parametro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parametro` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametro`
--

LOCK TABLES `parametro` WRITE;
/*!40000 ALTER TABLE `parametro` DISABLE KEYS */;
INSERT INTO `parametro` VALUES (1,'Deporte',1),(2,'Genero',1);
/*!40000 ALTER TABLE `parametro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `premio`
--

DROP TABLE IF EXISTS `premio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `premio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1,
  `id_deportistas` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_deportistas` (`id_deportistas`),
  CONSTRAINT `premio_ibfk_1` FOREIGN KEY (`id_deportistas`) REFERENCES `deportista` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `premio`
--

LOCK TABLES `premio` WRITE;
/*!40000 ALTER TABLE `premio` DISABLE KEYS */;
INSERT INTO `premio` VALUES (1,'test','2000-01-04',1,1);
/*!40000 ALTER TABLE `premio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valor_parametro`
--

DROP TABLE IF EXISTS `valor_parametro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `valor_parametro` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `valor_parametro` varchar(500) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1,
  `id_parametros` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_parametros` (`id_parametros`),
  CONSTRAINT `valor_parametro_ibfk_1` FOREIGN KEY (`id_parametros`) REFERENCES `parametro` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valor_parametro`
--

LOCK TABLES `valor_parametro` WRITE;
/*!40000 ALTER TABLE `valor_parametro` DISABLE KEYS */;
INSERT INTO `valor_parametro` VALUES (1,'Fútbol',1,1),(2,'Baloncesto',1,1),(3,'Masculino',1,2),(4,'Femenino',1,2),(5,'Otro',1,2);
/*!40000 ALTER TABLE `valor_parametro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-03  7:09:44
