-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: j9b206.p.ssafy.io    Database: gappa
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BATCH_JOB_EXECUTION`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `VERSION` bigint DEFAULT NULL,
  `JOB_INSTANCE_ID` bigint NOT NULL,
  `CREATE_TIME` datetime(6) NOT NULL,
  `START_TIME` datetime(6) DEFAULT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  `JOB_CONFIGURATION_LOCATION` varchar(2500) DEFAULT NULL,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  KEY `JOB_INST_EXEC_FK` (`JOB_INSTANCE_ID`),
  CONSTRAINT `JOB_INST_EXEC_FK` FOREIGN KEY (`JOB_INSTANCE_ID`) REFERENCES `BATCH_JOB_INSTANCE` (`JOB_INSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION`
--

LOCK TABLES `BATCH_JOB_EXECUTION` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION` VALUES (1,2,1,'2023-10-04 05:40:00.189000','2023-10-04 05:40:00.327000','2023-10-04 05:40:01.231000','COMPLETED','COMPLETED','','2023-10-04 05:40:01.231000',NULL),(2,2,2,'2023-10-04 06:25:00.209000','2023-10-04 06:25:00.351000','2023-10-04 06:25:01.324000','COMPLETED','COMPLETED','','2023-10-04 06:25:01.340000',NULL),(3,2,3,'2023-10-04 07:17:01.794000','2023-10-04 07:17:03.068000','2023-10-04 07:17:04.401000','COMPLETED','COMPLETED','','2023-10-04 07:17:04.401000',NULL),(4,2,4,'2023-10-04 15:00:00.040000','2023-10-04 15:00:00.111000','2023-10-04 15:00:00.226000','COMPLETED','COMPLETED','','2023-10-04 15:00:00.227000',NULL),(5,2,5,'2023-10-04 15:00:00.255000','2023-10-04 15:00:00.275000','2023-10-04 15:00:00.392000','COMPLETED','COMPLETED','','2023-10-04 15:00:00.392000',NULL),(6,2,6,'2023-10-04 15:00:00.147000','2023-10-04 15:00:00.257000','2023-10-04 15:00:00.725000','COMPLETED','COMPLETED','','2023-10-04 15:00:00.733000',NULL),(7,2,7,'2023-10-04 19:30:05.124000','2023-10-04 19:30:05.235000','2023-10-04 19:30:06.232000','COMPLETED','COMPLETED','','2023-10-04 19:30:06.239000',NULL),(8,2,8,'2023-10-05 00:00:00.023000','2023-10-05 00:00:00.048000','2023-10-05 00:00:00.664000','COMPLETED','COMPLETED','','2023-10-05 00:00:00.665000',NULL),(9,2,9,'2023-10-05 00:00:00.693000','2023-10-05 00:00:00.712000','2023-10-05 00:00:00.803000','COMPLETED','COMPLETED','','2023-10-05 00:00:00.804000',NULL),(10,2,10,'2023-10-05 00:00:05.103000','2023-10-05 00:00:05.191000','2023-10-05 00:00:06.526000','COMPLETED','COMPLETED','','2023-10-05 00:00:06.533000',NULL),(11,2,11,'2023-10-05 01:45:00.209000','2023-10-05 01:45:00.440000','2023-10-05 01:45:03.403000','COMPLETED','COMPLETED','','2023-10-05 01:45:03.413000',NULL),(12,2,12,'2023-10-05 01:47:00.172000','2023-10-05 01:47:00.322000','2023-10-05 01:47:02.399000','COMPLETED','COMPLETED','','2023-10-05 01:47:02.409000',NULL),(13,2,13,'2023-10-05 02:58:26.269000','2023-10-05 02:58:26.473000','2023-10-05 02:58:27.116000','COMPLETED','COMPLETED','','2023-10-05 02:58:27.126000',NULL),(14,2,14,'2023-10-05 02:58:27.314000','2023-10-05 02:58:27.409000','2023-10-05 02:58:27.948000','COMPLETED','COMPLETED','','2023-10-05 02:58:27.957000',NULL),(15,2,15,'2023-10-05 02:58:28.151000','2023-10-05 02:58:28.248000','2023-10-05 02:58:28.804000','COMPLETED','COMPLETED','','2023-10-05 02:58:28.811000',NULL),(16,2,16,'2023-10-05 03:06:38.779000','2023-10-05 03:06:38.919000','2023-10-05 03:06:39.480000','COMPLETED','COMPLETED','','2023-10-05 03:06:39.489000',NULL),(17,2,17,'2023-10-05 03:06:39.740000','2023-10-05 03:06:39.848000','2023-10-05 03:06:40.423000','COMPLETED','COMPLETED','','2023-10-05 03:06:40.433000',NULL),(18,2,18,'2023-10-05 03:06:40.669000','2023-10-05 03:06:40.770000','2023-10-05 03:06:41.329000','COMPLETED','COMPLETED','','2023-10-05 03:06:41.338000',NULL),(19,2,16,'2023-10-05 03:11:23.021000','2023-10-05 03:11:23.193000','2023-10-05 03:11:23.331000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-10-05 03:11:23.341000',NULL),(20,2,17,'2023-10-05 03:11:23.723000','2023-10-05 03:11:23.835000','2023-10-05 03:11:23.979000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-10-05 03:11:23.991000',NULL),(21,2,18,'2023-10-05 03:11:24.343000','2023-10-05 03:11:24.475000','2023-10-05 03:11:24.610000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-10-05 03:11:24.620000',NULL);
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_CONTEXT`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_CONTEXT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_CONTEXT` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_CTX_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_CONTEXT`
--

LOCK TABLES `BATCH_JOB_EXECUTION_CONTEXT` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_CONTEXT` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_CONTEXT` VALUES (1,'{\"@class\":\"java.util.HashMap\"}',NULL),(2,'{\"@class\":\"java.util.HashMap\"}',NULL),(3,'{\"@class\":\"java.util.HashMap\"}',NULL),(4,'{\"@class\":\"java.util.HashMap\"}',NULL),(5,'{\"@class\":\"java.util.HashMap\"}',NULL),(6,'{\"@class\":\"java.util.HashMap\"}',NULL),(7,'{\"@class\":\"java.util.HashMap\"}',NULL),(8,'{\"@class\":\"java.util.HashMap\"}',NULL),(9,'{\"@class\":\"java.util.HashMap\"}',NULL),(10,'{\"@class\":\"java.util.HashMap\"}',NULL),(11,'{\"@class\":\"java.util.HashMap\"}',NULL),(12,'{\"@class\":\"java.util.HashMap\"}',NULL),(13,'{\"@class\":\"java.util.HashMap\"}',NULL),(14,'{\"@class\":\"java.util.HashMap\"}',NULL),(15,'{\"@class\":\"java.util.HashMap\"}',NULL),(16,'{\"@class\":\"java.util.HashMap\"}',NULL),(17,'{\"@class\":\"java.util.HashMap\"}',NULL),(18,'{\"@class\":\"java.util.HashMap\"}',NULL),(19,'{\"@class\":\"java.util.HashMap\"}',NULL),(20,'{\"@class\":\"java.util.HashMap\"}',NULL),(21,'{\"@class\":\"java.util.HashMap\"}',NULL);
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_CONTEXT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_PARAMS`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_PARAMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_PARAMS` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `TYPE_CD` varchar(6) NOT NULL,
  `KEY_NAME` varchar(100) NOT NULL,
  `STRING_VAL` varchar(250) DEFAULT NULL,
  `DATE_VAL` datetime(6) DEFAULT NULL,
  `LONG_VAL` bigint DEFAULT NULL,
  `DOUBLE_VAL` double DEFAULT NULL,
  `IDENTIFYING` char(1) NOT NULL,
  KEY `JOB_EXEC_PARAMS_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_PARAMS_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_PARAMS`
--

LOCK TABLES `BATCH_JOB_EXECUTION_PARAMS` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_PARAMS` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_PARAMS` VALUES (1,'DATE','time','','2023-10-04 05:40:00.004000',0,0,'Y'),(2,'DATE','time','','2023-10-04 06:25:00.032000',0,0,'Y'),(3,'DATE','time','','2023-10-04 07:17:00.027000',0,0,'Y'),(4,'DATE','time','','2023-10-04 15:00:00.000000',0,0,'Y'),(5,'DATE','time','','2023-10-04 15:00:00.000000',0,0,'Y'),(6,'DATE','time','','2023-10-04 15:00:00.012000',0,0,'Y'),(7,'DATE','time','','2023-10-04 19:30:04.995000',0,0,'Y'),(8,'DATE','time','','2023-10-05 00:00:00.000000',0,0,'Y'),(9,'DATE','time','','2023-10-05 00:00:00.675000',0,0,'Y'),(10,'DATE','time','','2023-10-05 00:00:04.992000',0,0,'Y'),(11,'DATE','time','','2023-10-05 01:45:00.012000',0,0,'Y'),(12,'DATE','time','','2023-10-05 01:47:00.004000',0,0,'Y'),(13,'DATE','time','','2023-10-05 02:58:25.906000',0,0,'Y'),(14,'DATE','time','','2023-10-05 02:58:27.181000',0,0,'Y'),(15,'DATE','time','','2023-10-05 02:58:28.012000',0,0,'Y');
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_PARAMS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_SEQ`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_SEQ`
--

LOCK TABLES `BATCH_JOB_EXECUTION_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_SEQ` VALUES (21,'0');
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_INSTANCE`
--

DROP TABLE IF EXISTS `BATCH_JOB_INSTANCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_INSTANCE` (
  `JOB_INSTANCE_ID` bigint NOT NULL,
  `VERSION` bigint DEFAULT NULL,
  `JOB_NAME` varchar(100) NOT NULL,
  `JOB_KEY` varchar(32) NOT NULL,
  PRIMARY KEY (`JOB_INSTANCE_ID`),
  UNIQUE KEY `JOB_INST_UN` (`JOB_NAME`,`JOB_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_INSTANCE`
--

LOCK TABLES `BATCH_JOB_INSTANCE` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_INSTANCE` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_INSTANCE` VALUES (1,0,'afterPeriodLoanJob','6f22d9ad05fcfbc17363a152a3458451'),(2,0,'afterPeriodLoanJob','77e33f60f0846de51870bfad74c444e1'),(3,0,'afterPeriodLoanJob','4223ec57837e719563d12f29410ee719'),(4,0,'inactiveUserJob','a0dfc5784d40aa83e2882a7949ffac24'),(5,0,'changeLoanStatusJob','a0dfc5784d40aa83e2882a7949ffac24'),(6,0,'inactiveUserJob','c5daee6ddefbd63bad0b20706ecacd06'),(7,0,'afterPeriodLoanJob','c5a0aff369643e8b6567f26d2853fd5f'),(8,0,'beforePeriodLoanJob','f4f44de9b43f375da4c07feb80bc583a'),(9,0,'afterPeriodLoanJob','5ee7492e4d8f91f4546e93730f2bb014'),(10,0,'beforePeriodLoanJob','40d5ab94f0279418b9bf0ccb00f10f87'),(11,0,'beforePeriodLoanJob','1a458d3038e5767201f307cfd5c98f0d'),(12,0,'beforePeriodLoanJob','ac9a063814d49fb2dbb134000dbbfd44'),(13,0,'inactiveUserJob','9e9949e76d1525848a3c631862099acc'),(14,0,'afterPeriodLoanJob','84aff19d3e17536dcca983e7ba12e826'),(15,0,'beforePeriodLoanJob','30745dbe3517798e3754b9326a3e1109'),(16,0,'afterPeriodLoanJob','d41d8cd98f00b204e9800998ecf8427e'),(17,0,'beforePeriodLoanJob','d41d8cd98f00b204e9800998ecf8427e'),(18,0,'inactiveUserJob','d41d8cd98f00b204e9800998ecf8427e');
/*!40000 ALTER TABLE `BATCH_JOB_INSTANCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_SEQ`
--

DROP TABLE IF EXISTS `BATCH_JOB_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_SEQ`
--

LOCK TABLES `BATCH_JOB_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_SEQ` VALUES (18,'0');
/*!40000 ALTER TABLE `BATCH_JOB_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION` (
  `STEP_EXECUTION_ID` bigint NOT NULL,
  `VERSION` bigint NOT NULL,
  `STEP_NAME` varchar(100) NOT NULL,
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `START_TIME` datetime(6) NOT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `COMMIT_COUNT` bigint DEFAULT NULL,
  `READ_COUNT` bigint DEFAULT NULL,
  `FILTER_COUNT` bigint DEFAULT NULL,
  `WRITE_COUNT` bigint DEFAULT NULL,
  `READ_SKIP_COUNT` bigint DEFAULT NULL,
  `WRITE_SKIP_COUNT` bigint DEFAULT NULL,
  `PROCESS_SKIP_COUNT` bigint DEFAULT NULL,
  `ROLLBACK_COUNT` bigint DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  KEY `JOB_EXEC_STEP_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_STEP_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION`
--

LOCK TABLES `BATCH_STEP_EXECUTION` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION` VALUES (1,4,'afterPeriodLoanStep',1,'2023-10-04 05:40:00.591000','2023-10-04 05:40:01.136000','COMPLETED',2,1,0,1,0,0,0,0,'COMPLETED','','2023-10-04 05:40:01.136000'),(2,4,'afterPeriodLoanStep',2,'2023-10-04 06:25:00.609000','2023-10-04 06:25:01.229000','COMPLETED',2,1,0,1,0,0,0,0,'COMPLETED','','2023-10-04 06:25:01.245000'),(3,4,'afterPeriodLoanStep',3,'2023-10-04 07:17:03.384000','2023-10-04 07:17:04.289000','COMPLETED',2,1,0,1,0,0,0,0,'COMPLETED','','2023-10-04 07:17:04.289000'),(4,3,'inactiveUserStep',4,'2023-10-04 15:00:00.157000','2023-10-04 15:00:00.211000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-04 15:00:00.212000'),(5,3,'changeLoanStatusStep',5,'2023-10-04 15:00:00.310000','2023-10-04 15:00:00.380000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-04 15:00:00.381000'),(6,3,'inactiveUserStep',6,'2023-10-04 15:00:00.460000','2023-10-04 15:00:00.648000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-04 15:00:00.656000'),(7,6,'afterPeriodLoanStep',7,'2023-10-04 19:30:05.420000','2023-10-04 19:30:06.165000','COMPLETED',4,3,0,3,0,0,0,0,'COMPLETED','','2023-10-04 19:30:06.173000'),(8,3,'beforePeriodLoanStep',8,'2023-10-05 00:00:00.084000','2023-10-05 00:00:00.652000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 00:00:00.653000'),(9,3,'afterPeriodLoanStep',9,'2023-10-05 00:00:00.753000','2023-10-05 00:00:00.788000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 00:00:00.789000'),(10,3,'beforePeriodLoanStep',10,'2023-10-05 00:00:05.504000','2023-10-05 00:00:06.450000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 00:00:06.457000'),(11,3,'beforePeriodLoanStep',11,'2023-10-05 01:45:00.730000','2023-10-05 01:45:03.287000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 01:45:03.297000'),(12,3,'beforePeriodLoanStep',12,'2023-10-05 01:47:00.581000','2023-10-05 01:47:02.298000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 01:47:02.307000'),(13,3,'inactiveUserStep',13,'2023-10-05 02:58:26.712000','2023-10-05 02:58:27.026000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 02:58:27.036000'),(14,3,'afterPeriodLoanStep',14,'2023-10-05 02:58:27.648000','2023-10-05 02:58:27.856000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 02:58:27.865000'),(15,3,'beforePeriodLoanStep',15,'2023-10-05 02:58:28.506000','2023-10-05 02:58:28.711000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 02:58:28.719000'),(16,3,'afterPeriodLoanStep',16,'2023-10-05 03:06:39.162000','2023-10-05 03:06:39.386000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 03:06:39.398000'),(17,3,'beforePeriodLoanStep',17,'2023-10-05 03:06:40.109000','2023-10-05 03:06:40.327000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 03:06:40.337000'),(18,3,'inactiveUserStep',18,'2023-10-05 03:06:41.017000','2023-10-05 03:06:41.243000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-10-05 03:06:41.252000');
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION_CONTEXT`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION_CONTEXT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION_CONTEXT` (
  `STEP_EXECUTION_ID` bigint NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  CONSTRAINT `STEP_EXEC_CTX_FK` FOREIGN KEY (`STEP_EXECUTION_ID`) REFERENCES `BATCH_STEP_EXECUTION` (`STEP_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION_CONTEXT`
--

LOCK TABLES `BATCH_STEP_EXECUTION_CONTEXT` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_CONTEXT` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION_CONTEXT` VALUES (1,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"org.springframework.batch.core.step.item.ChunkOrientedTasklet\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(2,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"org.springframework.batch.core.step.item.ChunkOrientedTasklet\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(3,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"org.springframework.batch.core.step.item.ChunkOrientedTasklet\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(4,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1208/0x000000084090c440\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(5,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1205/0x000000084090c840\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(6,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1281/0x000000080093a040\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(7,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"org.springframework.batch.core.step.item.ChunkOrientedTasklet\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(8,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1207/0x000000084090c040\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(9,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"org.springframework.batch.core.step.item.ChunkOrientedTasklet\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(10,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1299/0x0000000800987040\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(11,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1281/0x0000000800932040\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(12,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1281/0x000000080093a040\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(13,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1281/0x0000000800932040\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(14,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"org.springframework.batch.core.step.item.ChunkOrientedTasklet\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(15,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1280/0x0000000800932c40\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(16,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"org.springframework.batch.core.step.item.ChunkOrientedTasklet\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(17,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1224/0x0000000800a47840\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(18,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.sixheadword.gappa.config.Batch.step.StepConfig$$Lambda$1225/0x0000000800a47c40\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL);
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_CONTEXT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION_SEQ`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION_SEQ`
--

LOCK TABLES `BATCH_STEP_EXECUTION_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION_SEQ` VALUES (18,'0');
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_seq` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(50) NOT NULL,
  `balance` bigint NOT NULL,
  `bank` varchar(25) NOT NULL,
  `rep_account` bit(1) NOT NULL,
  `user_seq` bigint NOT NULL,
  PRIMARY KEY (`account_seq`),
  KEY `FKn7l2jgnu7u2c9fxkl0q13q8v4` (`user_seq`),
  CONSTRAINT `FKn7l2jgnu7u2c9fxkl0q13q8v4` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'800918-79-200846',1000000,'KB국민은행',_binary '\0',1),(2,'702554-40-425759',1000000,'KEB하나은행',_binary '\0',1),(3,'485048-24-826508',900000,'신한은행',_binary '',1),(4,'379132-15-832291',1000000,'우리은행',_binary '\0',1),(5,'447449-66-833225',1000000,'가파은행',_binary '\0',1),(6,'302726-82-400099',1000000,'싸피은행',_binary '\0',1),(7,'556077-50-956358',1100000,'KB국민은행',_binary '',2),(8,'722391-90-692554',1000000,'KEB하나은행',_binary '\0',2),(9,'548949-65-383056',1000000,'신한은행',_binary '\0',2),(10,'829204-96-993721',1000000,'우리은행',_binary '\0',2),(11,'733498-93-684779',1000000,'가파은행',_binary '\0',2),(12,'298050-46-763237',1000000,'싸피은행',_binary '\0',2),(13,'889099-60-404632',1010000,'KB국민은행',_binary '',3),(14,'413937-87-177263',1000000,'KEB하나은행',_binary '\0',3),(15,'612061-74-335869',1000000,'신한은행',_binary '\0',3),(16,'692619-93-406822',1000000,'우리은행',_binary '\0',3),(17,'440361-49-990253',1000000,'가파은행',_binary '\0',3),(18,'895431-23-837160',901210,'싸피은행',_binary '\0',3),(19,'233875-34-170969',998790,'KB국민은행',_binary '',4),(20,'181902-65-545218',1000000,'KEB하나은행',_binary '\0',4),(21,'487333-40-789767',1000000,'신한은행',_binary '\0',4),(22,'784325-21-340866',1000000,'우리은행',_binary '\0',4),(23,'313420-11-505526',1000000,'가파은행',_binary '\0',4),(24,'355473-19-215711',1000000,'싸피은행',_binary '\0',4),(25,'646568-94-688519',1000000,'KB국민은행',_binary '\0',5),(26,'774267-92-591867',1000000,'KEB하나은행',_binary '\0',5),(27,'301845-84-106871',1000000,'신한은행',_binary '\0',5),(28,'670918-77-493529',1000000,'우리은행',_binary '\0',5),(29,'643849-68-287862',1000000,'가파은행',_binary '\0',5),(30,'789793-73-884134',1000000,'싸피은행',_binary '\0',5),(31,'217454-64-374338',1090000,'KB국민은행',_binary '',6),(32,'368445-93-789725',1000000,'KEB하나은행',_binary '\0',6),(33,'703398-36-496167',1000000,'신한은행',_binary '\0',6),(34,'508706-42-719222',1000000,'우리은행',_binary '\0',6),(35,'248634-86-827892',1000000,'가파은행',_binary '\0',6),(36,'820731-92-360120',1000000,'싸피은행',_binary '\0',6);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_history`
--

DROP TABLE IF EXISTS `account_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_history` (
  `account_history_seq` bigint NOT NULL AUTO_INCREMENT,
  `account_type` bit(1) NOT NULL,
  `amount` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `new_balance` bigint NOT NULL,
  `old_balance` bigint NOT NULL,
  `account_seq` bigint DEFAULT NULL,
  `to_user` bigint DEFAULT NULL,
  PRIMARY KEY (`account_history_seq`),
  KEY `FKkxyjuxii7rr5yq0sd9c5jnkkl` (`account_seq`),
  KEY `FKofqosntchbkh3wxgdh15vrjhj` (`to_user`),
  CONSTRAINT `FKkxyjuxii7rr5yq0sd9c5jnkkl` FOREIGN KEY (`account_seq`) REFERENCES `account` (`account_seq`) ON DELETE CASCADE,
  CONSTRAINT `FKofqosntchbkh3wxgdh15vrjhj` FOREIGN KEY (`to_user`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_history`
--

LOCK TABLES `account_history` WRITE;
/*!40000 ALTER TABLE `account_history` DISABLE KEYS */;
INSERT INTO `account_history` VALUES (1,_binary '',50000,'2023-10-04 03:51:38.920555',950000,1000000,3,2),(2,_binary '\0',50000,'2023-10-04 03:51:38.947242',1050000,1000000,7,1),(3,_binary '',111111,'2023-10-04 03:59:44.092823',938889,1050000,7,6),(4,_binary '\0',111111,'2023-10-04 03:59:44.122592',1111111,1000000,31,2),(5,_binary '',100000,'2023-10-04 03:59:56.896737',1011111,1111111,31,2),(6,_binary '\0',100000,'2023-10-04 03:59:56.898974',1038889,938889,7,6),(7,_binary '',100000,'2023-10-04 05:35:27.622648',900000,1000000,19,3),(8,_binary '\0',100000,'2023-10-04 05:35:27.648557',1100000,1000000,18,4),(9,_binary '',200000,'2023-10-04 05:35:47.043429',700000,900000,19,3),(10,_binary '\0',200000,'2023-10-04 05:35:47.046041',1300000,1100000,18,4),(11,_binary '',200000,'2023-10-04 05:41:19.899296',1001210,1201210,18,4),(12,_binary '\0',200000,'2023-10-04 05:41:19.902010',998790,798790,19,3),(13,_binary '',100000,'2023-10-04 05:46:25.257641',938889,1038889,7,1),(14,_binary '\0',100000,'2023-10-04 05:46:25.259862',1050000,950000,3,2),(15,_binary '',100000,'2023-10-04 05:52:46.032683',838889,938889,7,1),(16,_binary '\0',100000,'2023-10-04 05:52:46.070264',1150000,1050000,3,2),(17,_binary '',150000,'2023-10-04 05:57:28.003617',1000000,1150000,3,2),(18,_binary '\0',150000,'2023-10-04 05:57:28.005744',988889,838889,7,1),(19,_binary '',100000,'2023-10-04 06:11:00.629338',901210,1001210,18,6),(20,_binary '\0',100000,'2023-10-04 06:11:00.631784',1111111,1011111,31,3),(21,_binary '',200000,'2023-10-04 06:23:10.330825',911111,1111111,31,4),(22,_binary '\0',200000,'2023-10-04 06:23:10.374716',1198790,998790,19,6),(23,_binary '\0',200000,'2023-10-04 06:25:01.008292',998790,1198790,19,6),(24,_binary '',200000,'2023-10-04 06:25:01.024225',1111111,911111,31,4),(25,_binary '',350000,'2023-10-04 07:16:21.006737',638889,988889,7,1),(26,_binary '\0',350000,'2023-10-04 07:16:21.034448',1350000,1000000,3,2),(27,_binary '',350000,'2023-10-04 07:17:03.971678',1000000,1350000,3,2),(28,_binary '\0',350000,'2023-10-04 07:17:03.987388',988889,638889,7,1),(29,_binary '',11111,'2023-10-04 07:18:17.465993',1100000,1111111,31,2),(30,_binary '\0',11111,'2023-10-04 07:18:17.469776',1000000,988889,7,6),(31,_binary '',50000,'2023-10-04 10:59:15.490057',950000,1000000,13,4),(32,_binary '\0',50000,'2023-10-04 10:59:15.513451',1048790,998790,19,3),(33,_binary '',50000,'2023-10-04 12:23:06.554317',998790,1048790,19,3),(34,_binary '\0',50000,'2023-10-04 12:23:06.615055',1000000,950000,13,4),(35,_binary '',10000,'2023-10-04 13:26:23.420142',1090000,1100000,31,3),(36,_binary '\0',10000,'2023-10-04 13:26:23.448025',1010000,1000000,13,6),(37,_binary '',50000,'2023-10-05 01:24:50.784046',948790,998790,19,3),(38,_binary '\0',50000,'2023-10-05 01:24:50.806847',1060000,1010000,13,4),(41,_binary '',50000,'2023-10-05 03:10:46.393843',1010000,1060000,13,4),(42,_binary '\0',50000,'2023-10-05 03:10:46.398099',998790,948790,19,3);
/*!40000 ALTER TABLE `account_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_rating`
--

DROP TABLE IF EXISTS `credit_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit_rating` (
  `credit_rating_seq` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `score_end_range` int NOT NULL,
  `score_start_range` int NOT NULL,
  PRIMARY KEY (`credit_rating_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_rating`
--

LOCK TABLES `credit_rating` WRITE;
/*!40000 ALTER TABLE `credit_rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_list`
--

DROP TABLE IF EXISTS `friend_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_list` (
  `friend_list_seq` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) NOT NULL,
  `from_user` bigint DEFAULT NULL,
  `to_user` bigint DEFAULT NULL,
  PRIMARY KEY (`friend_list_seq`),
  KEY `FK3xmkyv6arhmtx9jmvv953vb25` (`from_user`),
  KEY `FK9ar6qns8cllljpadp3mp0iy6f` (`to_user`),
  CONSTRAINT `FK3xmkyv6arhmtx9jmvv953vb25` FOREIGN KEY (`from_user`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE,
  CONSTRAINT `FK9ar6qns8cllljpadp3mp0iy6f` FOREIGN KEY (`to_user`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_list`
--

LOCK TABLES `friend_list` WRITE;
/*!40000 ALTER TABLE `friend_list` DISABLE KEYS */;
INSERT INTO `friend_list` VALUES (1,'2023-10-04 03:46:41.171722',2,1),(2,'2023-10-04 03:46:41.882032',4,1),(4,'2023-10-04 03:57:53.105395',4,2),(5,'2023-10-04 03:59:23.843749',4,3),(13,'2023-10-04 06:16:02.545263',5,1),(14,'2023-10-04 06:17:17.778306',5,2),(16,'2023-10-04 06:18:48.943051',5,6),(20,'2023-10-04 13:23:22.001126',4,6),(21,'2023-10-04 15:33:22.731724',5,4),(22,'2023-10-04 15:33:23.669772',5,4),(23,'2023-10-04 15:33:23.889805',5,4),(24,'2023-10-04 15:33:25.081461',5,4),(25,'2023-10-04 15:33:25.586632',5,4);
/*!40000 ALTER TABLE `friend_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_request`
--

DROP TABLE IF EXISTS `friend_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_request` (
  `friend_request_seq` bigint NOT NULL AUTO_INCREMENT,
  `request_date` datetime(6) NOT NULL,
  `state` char(1) NOT NULL,
  `from_user` bigint DEFAULT NULL,
  `to_user` bigint DEFAULT NULL,
  PRIMARY KEY (`friend_request_seq`),
  KEY `FKd8yath1poomfe69so4tnf78ps` (`from_user`),
  KEY `FKjj5hcpsly9th6a601t7nfjql8` (`to_user`),
  CONSTRAINT `FKd8yath1poomfe69so4tnf78ps` FOREIGN KEY (`from_user`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE,
  CONSTRAINT `FKjj5hcpsly9th6a601t7nfjql8` FOREIGN KEY (`to_user`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_request`
--

LOCK TABLES `friend_request` WRITE;
/*!40000 ALTER TABLE `friend_request` DISABLE KEYS */;
INSERT INTO `friend_request` VALUES (1,'2023-10-04 03:18:50.695428','A',4,1),(2,'2023-10-04 03:19:01.482440','A',4,2),(3,'2023-10-04 03:19:08.270907','A',4,3),(4,'2023-10-04 03:19:15.037452','D',4,5),(5,'2023-10-04 03:19:45.476523','D',4,6),(6,'2023-10-04 03:43:49.292938','A',2,1),(7,'2023-10-04 03:56:58.130015','D',6,2),(8,'2023-10-04 04:00:52.654155','D',6,3),(9,'2023-10-04 04:10:38.542529','D',6,4),(10,'2023-10-04 04:16:52.857956','A',4,6),(11,'2023-10-04 04:17:54.913426','R',4,6),(12,'2023-10-04 04:26:39.023172','A',4,6),(13,'2023-10-04 04:27:06.594548','A',4,6),(14,'2023-10-04 04:28:00.605429','R',4,6),(15,'2023-10-04 04:30:38.126857','A',4,6),(16,'2023-10-04 04:40:15.745744','R',4,6),(17,'2023-10-04 05:50:59.324321','R',4,6),(18,'2023-10-04 05:55:32.173468','A',4,6),(19,'2023-10-04 06:12:40.829828','A',5,1),(20,'2023-10-04 06:13:26.253834','A',5,2),(21,'2023-10-04 06:13:41.060567','D',5,3),(22,'2023-10-04 06:13:42.524542','A',5,6),(23,'2023-10-04 08:13:24.091989','D',2,6),(24,'2023-10-04 08:13:57.636570','R',2,6),(25,'2023-10-04 12:06:44.329049','A',4,6),(26,'2023-10-04 12:07:49.563731','A',4,6),(27,'2023-10-04 12:10:29.391114','A',4,6),(28,'2023-10-04 15:33:15.797365','A',5,4);
/*!40000 ALTER TABLE `friend_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `loan_seq` bigint NOT NULL AUTO_INCREMENT,
  `expired_date` datetime(6) DEFAULT NULL,
  `interest` bigint NOT NULL,
  `loan_other_reason` varchar(100) DEFAULT NULL,
  `loan_reason_category` varchar(50) NOT NULL,
  `principal` bigint NOT NULL,
  `redemption_date` datetime(6) NOT NULL,
  `redemption_money` bigint NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `status` char(1) NOT NULL,
  `from_user` bigint DEFAULT NULL,
  `to_user` bigint DEFAULT NULL,
  PRIMARY KEY (`loan_seq`),
  KEY `FKgwreok52fciij5au3y071mk1f` (`from_user`),
  KEY `FK7mnuiref9mgvg7vphar6lhuq8` (`to_user`),
  CONSTRAINT `FK7mnuiref9mgvg7vphar6lhuq8` FOREIGN KEY (`to_user`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE,
  CONSTRAINT `FKgwreok52fciij5au3y071mk1f` FOREIGN KEY (`from_user`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (1,'2023-10-04 19:30:05.501724',27,'푸하','월세 대출',50000,'2023-10-04 12:51:00.000000',50000,'2023-10-04 03:51:38.890901','C',2,1),(2,'2023-10-04 19:30:05.745015',54,'히히','월세 대출',100000,'2023-10-04 12:53:00.000000',100000,'2023-10-04 05:46:25.253983','C',1,2),(3,'2023-10-04 07:18:17.480638',61,'생활비','생활비 대출',111111,'2023-10-07 00:00:00.000000',111111,'2023-10-04 03:59:44.038159','C',6,2),(4,NULL,27,'동익','기타 사유',50000,'2023-10-07 00:00:00.000000',0,'2023-10-04 00:00:00.000000','F',6,3),(5,'2023-10-05 03:10:46.401435',27,'ee','취미 생활 대출',50000,'2023-10-28 00:00:00.000000',50000,'2023-10-04 12:23:06.464457','C',3,4),(6,'2023-10-04 05:41:19.909260',110,'ee','생활비 대출',200000,'2023-10-28 00:00:00.000000',200000,'2023-10-04 05:35:47.038591','C',3,4),(7,'2023-10-04 05:40:00.711001',55,'eeee','취미 생활 대출',100000,'2023-10-27 00:00:00.000000',98790,'2023-10-04 05:35:27.579001','C',3,4),(8,NULL,55,'aa','취미 생활 대출',100000,'2023-10-07 00:00:00.000000',10000,'2023-10-04 06:11:00.625866','O',6,3),(9,'2023-10-04 19:30:05.924645',54,'히히','월세 대출',100000,'2023-10-04 14:51:00.000000',100000,'2023-10-04 05:52:45.991760','C',1,2),(10,NULL,54,'히히','월세 대출',100000,'2023-10-05 14:51:00.000000',0,'2023-10-04 14:51:00.000000','W',2,1),(11,NULL,54,'히히','월세 대출',150000,'2023-10-05 14:55:00.000000',0,'2023-10-04 05:57:28.000146','O',2,1),(12,NULL,54,'히히','월세 대출',150000,'2023-10-05 14:55:00.000000',0,'2023-10-04 14:55:00.000000','W',1,2),(13,NULL,55,'ㅁㄴ','생활비 대출',100000,'2023-10-05 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',4,5),(14,'2023-10-04 06:25:00.736338',110,'ㅇㅋ','생활비 대출',200000,'2023-10-05 00:00:00.000000',200000,'2023-10-04 06:23:10.261866','C',4,6),(15,NULL,55,'ㅋㅋ','관리비 대출',100000,'2023-10-05 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',4,5),(16,NULL,27,'ㅋㅋ','생활비 대출',50000,'2023-10-05 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',4,5),(17,NULL,27,'ㅋㅋ','생활비 대출',50000,'2023-10-05 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',4,5),(18,NULL,110,'ㅎㅎ','월세 대출',200000,'2023-11-25 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',3,4),(19,NULL,55,'','생활비 대출',100000,'2023-10-05 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',1,2),(20,'2023-10-04 07:17:03.525398',192,'','관리비 대출',350000,'2023-10-05 00:00:00.000000',350000,'2023-10-04 07:16:20.970997','C',1,2),(21,NULL,55,'ㅁㄴㅇ','관리비 대출',100000,'2023-10-05 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',4,6),(22,NULL,55,'a','경조사비 대출',100000,'2023-10-28 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',3,4),(23,NULL,55,'ee','기타 사유',100000,'2023-10-27 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',3,4),(24,NULL,55,'ㅋㅋ','관리비 대출',100000,'2023-10-05 00:00:00.000000',0,'2023-10-04 00:00:00.000000','F',4,3),(25,'2023-10-05 01:24:50.820589',27,'ㅋㅋ','월세 대출',50000,'2023-10-05 00:00:00.000000',50000,'2023-10-04 10:59:15.459735','C',4,3),(26,NULL,27,'','생활비 대출',50000,'2023-11-18 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',3,4),(27,NULL,55,'','생활비 대출',100000,'2023-10-21 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',3,4),(28,NULL,33,'ㅋㅋㅋ몰루','경조사비 대출',60000,'2023-11-30 00:00:00.000000',0,'2023-10-04 00:00:00.000000','W',3,4),(29,NULL,27,'gg','취미 생활 대출',50002,'2023-10-21 00:00:00.000000',0,'2023-10-05 00:00:00.000000','W',5,4),(30,NULL,55,'gg','비상금 대출',100000,'2023-10-18 00:00:00.000000',0,'2023-10-05 00:00:00.000000','W',5,4),(31,NULL,82,'생활비가 부족해요','생활비 대출',150000,'2023-10-26 00:00:00.000000',0,'2023-10-05 00:00:00.000000','W',3,4);
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_history`
--

DROP TABLE IF EXISTS `loan_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_history` (
  `loan_history_seq` bigint NOT NULL AUTO_INCREMENT,
  `amount` bigint NOT NULL,
  `new_redemption_money` bigint NOT NULL,
  `old_redemption_money` bigint NOT NULL,
  `transaction_date` datetime(6) NOT NULL,
  `type` varchar(255) NOT NULL,
  `loan_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`loan_history_seq`),
  KEY `FKe3ig061h3nnrky2quqw37vsv5` (`loan_seq`),
  CONSTRAINT `FKe3ig061h3nnrky2quqw37vsv5` FOREIGN KEY (`loan_seq`) REFERENCES `loan` (`loan_seq`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_history`
--

LOCK TABLES `loan_history` WRITE;
/*!40000 ALTER TABLE `loan_history` DISABLE KEYS */;
INSERT INTO `loan_history` VALUES (1,100000,100000,0,'2023-10-04 03:59:56.900763','REDEMPTION',NULL),(2,98790,98790,0,'2023-10-04 05:40:00.711001','REDEMPTION',7),(3,200000,200000,0,'2023-10-04 05:41:19.903722','REDEMPTION',NULL),(4,200000,200000,0,'2023-10-04 06:25:00.736338','REDEMPTION',14),(5,350000,350000,0,'2023-10-04 07:17:03.525398','REDEMPTION',20),(6,11111,111111,100000,'2023-10-04 07:18:17.472631','REDEMPTION',NULL),(7,10000,10000,0,'2023-10-04 13:26:23.450278','REDEMPTION',NULL),(8,50000,50000,0,'2023-10-04 19:30:05.501724','REDEMPTION',1),(9,100000,100000,0,'2023-10-04 19:30:05.745015','REDEMPTION',2),(10,100000,100000,0,'2023-10-04 19:30:05.924645','REDEMPTION',9),(11,50000,50000,0,'2023-10-05 01:24:50.808554','REDEMPTION',NULL),(13,50000,50000,0,'2023-10-05 03:10:46.399779','REDEMPTION',NULL);
/*!40000 ALTER TABLE `loan_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_alarm`
--

DROP TABLE IF EXISTS `message_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_alarm` (
  `message_alarm_seq` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(100) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `reg_date` datetime(6) NOT NULL,
  `user_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`message_alarm_seq`),
  KEY `FKo4l9px5s0559dg2t4egr8fapp` (`user_seq`),
  CONSTRAINT `FKo4l9px5s0559dg2t4egr8fapp` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_alarm`
--

LOCK TABLES `message_alarm` WRITE;
/*!40000 ALTER TABLE `message_alarm` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms`
--

DROP TABLE IF EXISTS `terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terms` (
  `terms_seq` bigint NOT NULL AUTO_INCREMENT,
  `required` char(1) NOT NULL,
  `terms_content` varchar(100) NOT NULL,
  `terms_name` varchar(30) NOT NULL,
  PRIMARY KEY (`terms_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms`
--

LOCK TABLES `terms` WRITE;
/*!40000 ALTER TABLE `terms` DISABLE KEYS */;
/*!40000 ALTER TABLE `terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms_history`
--

DROP TABLE IF EXISTS `terms_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terms_history` (
  `terms_seq` bigint NOT NULL,
  `user_seq` bigint NOT NULL,
  `agree_date` datetime(6) NOT NULL,
  `state` char(1) NOT NULL,
  `terms_terms_seq` bigint NOT NULL,
  `user_user_seq` bigint NOT NULL,
  PRIMARY KEY (`terms_seq`,`user_seq`),
  KEY `FKoj4tvl42qr77o6s3l19k96w3g` (`terms_terms_seq`),
  KEY `FKkpw5e9ka0peqjq802qgitu4wh` (`user_user_seq`),
  CONSTRAINT `FKkpw5e9ka0peqjq802qgitu4wh` FOREIGN KEY (`user_user_seq`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE,
  CONSTRAINT `FKoj4tvl42qr77o6s3l19k96w3g` FOREIGN KEY (`terms_terms_seq`) REFERENCES `terms` (`terms_seq`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms_history`
--

LOCK TABLES `terms_history` WRITE;
/*!40000 ALTER TABLE `terms_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `terms_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(100) NOT NULL,
  `address_detail` varchar(100) NOT NULL,
  `credit_score` int NOT NULL,
  `expired_at` datetime(6) DEFAULT NULL,
  `login_id` varchar(45) NOT NULL,
  `login_password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `pin_password` varchar(255) DEFAULT NULL,
  `profile_img` varchar(100) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `state` bit(1) NOT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `UK_6ntlp6n5ltjg6hhxl66jj5u0l` (`login_id`),
  UNIQUE KEY `UK_589idila9li6a4arw1t8ht1gx` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'대전광역시 유성구 덕명동','101동 101호',50,NULL,'chlgksdbs','$2a$10$q7DlH6uqeoQOjO0VGYgqGe7upPOS.TA52nziWFc1z4iUlC4E5NE7m','최한윤','01062057949','$2a$10$WI33/97918EdNgUT8qhdAOxT3yb7pGfY0ESrIDz.0NP7hpKYQVZze','GappaMascot.png',NULL,_binary ''),(2,'대전광역시 유성구 덕명동','101동 102호',50,NULL,'zosunny','$2a$10$2epxYBd/RWR32P/MuCasaOqzzkr96vpNT4LOpuIu0k4wwmDdo3AVW','조해린','01000000000','$2a$10$.8q7UyuMDoD8/cORNje6POB9tvMmY40SnoNNPAsHHjofalI8MQznK','GappaMascot.png',NULL,_binary ''),(3,'대전광역시 유성구 덕명동','101동 103호',50,NULL,'w8h0412','$2a$10$Oih5.SFv/Oape1m7svpKOuwge3uMih6qb0py8ImrpgKxxvcfFtMyK','김동익','01089536705','$2a$10$tX7UgWSqjeqiLlRUDIXoXu/JykoMlB0QIX2tnMswjCbZJZcQ.Zw4O','GappaMascot.png',NULL,_binary ''),(4,'대전광역시 유성구 덕명동','101동 104호',67,NULL,'gkfdkdle','$2a$10$a2ZqO/aon0i6PbPpr0pape9Jcfzzukj1xeTMXCGZcj.hkjxdPDRrq','김동현','01073877808','$2a$10$O.tVfR5vStgNfcTY7ogVguUcL.MyXH4Cr2B8bkb.2.6fRUuRzl8NK','GappaMascot.png',NULL,_binary ''),(5,'대전광역시 유성구 덕명동','101동 105호',50,NULL,'dragontig98','$2a$10$Em9L3hMexOOEElaFz9XcqO5JGDQFd1ZaEn/amW3nQ/8XwAVza1uv.','김용범','01034663046','$2a$10$AsI/Ig4wc/l1CwzKJGONieSh83xwKXA5Kxn/DqYG8prPfjygD2pOe','GappaMascot.png',NULL,_binary ''),(6,'대전광역시 유성구 덕명동','101동 106호',50,NULL,'junghun2581','$2a$10$1nBL7qa6LbEzBn96MiMd4uD.5YnUuie2pFR3g7NeGCfk5KWcA5PaK','김정훈','01024126237','$2a$10$IXME6VwDJ8JzESBHfzu1cOUomKITBoGEE5GkXYi8G471XtXg5lRWO','GappaMascot.png',NULL,_binary '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_alarm`
--

DROP TABLE IF EXISTS `web_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `web_alarm` (
  `web_alarm_seq` bigint NOT NULL AUTO_INCREMENT,
  `alarm_category` char(1) NOT NULL,
  `alarm_content` varchar(255) NOT NULL,
  `is_read` bit(1) NOT NULL,
  `read_date` datetime(6) DEFAULT NULL,
  `reg_date` datetime(6) NOT NULL,
  `from_user` bigint NOT NULL,
  `to_user` bigint NOT NULL,
  PRIMARY KEY (`web_alarm_seq`),
  KEY `FKmq62jp597j53c55yw6brarkdq` (`from_user`),
  KEY `FKmd51fdwkdegt49uobpg3huc3p` (`to_user`),
  CONSTRAINT `FKmd51fdwkdegt49uobpg3huc3p` FOREIGN KEY (`to_user`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE,
  CONSTRAINT `FKmq62jp597j53c55yw6brarkdq` FOREIGN KEY (`from_user`) REFERENCES `user` (`user_seq`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_alarm`
--

LOCK TABLES `web_alarm` WRITE;
/*!40000 ALTER TABLE `web_alarm` DISABLE KEYS */;
INSERT INTO `web_alarm` VALUES (1,'F','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 03:18:50.708720',4,1),(2,'F','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 03:19:01.484376',4,2),(3,'F','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 03:19:08.272775',4,3),(4,'F','김동현님이 친구 신청을 했어요!',_binary '\0',NULL,'2023-10-04 03:19:15.039351',4,5),(5,'F','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 03:19:45.478513',4,6),(6,'F','조해린님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 03:43:49.308562',2,1),(7,'F','최한윤님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 03:46:41.175912',1,2),(8,'F','최한윤님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 03:46:41.885929',1,4),(9,'R','최한윤님이 50,000원을 빌려줬어요!',_binary '',NULL,'2023-10-04 03:51:38.955887',1,2),(10,'F','김정훈님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 03:56:58.131756',6,2),(11,'F','조해린님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 03:57:52.109896',2,6),(12,'F','조해린님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 03:57:53.114656',2,4),(13,'A','김정훈님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 03:59:16.190861',6,2),(14,'F','김동익님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 03:59:23.850148',3,4),(15,'R','조해린님이 111,111원을 빌려줬어요!',_binary '',NULL,'2023-10-04 03:59:44.150249',2,6),(16,'P','김정훈님이 100,000원을 상환했어요!',_binary '',NULL,'2023-10-04 03:59:56.905914',6,2),(17,'F','김정훈님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:00:52.656319',6,3),(18,'F','김동익님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 04:01:08.506585',3,6),(19,'A','김정훈님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 04:01:14.116894',6,3),(20,'R','김동익님에게 50,000원 대출이 거절됐어요',_binary '',NULL,'2023-10-04 04:01:33.115195',3,6),(21,'F','김동현님이 친구요청을 거절했어요',_binary '',NULL,'2023-10-04 04:10:09.512691',6,4),(22,'F','김정훈님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:10:38.544267',6,4),(23,'F','김정훈님이 친구요청을 거절했어요',_binary '',NULL,'2023-10-04 04:16:28.653042',4,6),(24,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:16:52.860330',4,6),(25,'F','김정훈님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 04:17:30.149773',6,4),(26,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:17:54.915801',4,6),(27,'F','김동현님이 친구요청을 거절했어요',_binary '',NULL,'2023-10-04 04:22:59.283218',6,4),(28,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:26:39.025446',4,6),(29,'F','김정훈님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 04:26:45.044499',6,4),(30,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:27:06.596742',4,6),(31,'F','김정훈님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 04:27:11.675159',6,4),(32,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:28:00.607279',4,6),(33,'F','김동현님이 친구요청을 거절했어요',_binary '',NULL,'2023-10-04 04:28:07.033763',6,4),(34,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:30:38.128575',4,6),(35,'F','김정훈님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 04:35:44.647149',6,4),(36,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 04:40:15.747859',4,6),(37,'F','김동현님이 친구요청을 거절했어요',_binary '',NULL,'2023-10-04 04:40:20.911604',6,4),(38,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 05:24:31.341871',3,4),(39,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 05:29:37.527087',3,4),(40,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 05:34:45.535931',3,4),(41,'R','김동현님이 100,000원을 빌려줬어요!',_binary '',NULL,'2023-10-04 05:35:27.661198',4,3),(42,'R','김동현님이 200,000원을 빌려줬어요!',_binary '',NULL,'2023-10-04 05:35:47.047886',4,3),(43,'C','김동익님이 200,000원 대출 상환을 완료했어요!',_binary '',NULL,'2023-10-04 05:41:19.909525',3,4),(44,'A','김정훈님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 05:43:42.693244',6,3),(45,'R','조해린님이 100,000원을 빌려줬어요!',_binary '\0',NULL,'2023-10-04 05:46:25.261578',2,1),(46,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 05:50:59.352173',4,6),(47,'F','김정훈님이 친구요청을 거절했어요',_binary '',NULL,'2023-10-04 05:52:00.422936',6,4),(48,'R','조해린님이 100,000원을 빌려줬어요!',_binary '\0',NULL,'2023-10-04 05:52:46.081027',2,1),(49,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 05:55:32.175873',4,6),(50,'F','김정훈님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 05:56:13.332248',6,4),(51,'R','최한윤님이 150,000원을 빌려줬어요!',_binary '\0',NULL,'2023-10-04 05:57:28.007506',1,2),(52,'F','김용범님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 06:05:09.309018',5,4),(53,'R','김동익님이 100,000원을 빌려줬어요!',_binary '\0',NULL,'2023-10-04 06:11:00.633372',3,6),(54,'Q','김동익님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 06:12:40.831647',3,3),(55,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 06:13:26.255495',4,3),(56,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 06:13:41.062239',4,4),(57,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 06:13:42.526208',4,4),(58,'F','최한윤님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 06:16:02.549035',1,5),(59,'F','조해린님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 06:17:17.814015',2,5),(60,'F','김동익님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 06:18:15.155925',3,5),(61,'F','김정훈님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 06:18:48.972063',6,5),(62,'A','김동현님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 06:20:26.310089',4,5),(63,'A','김동현님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 06:22:46.719765',4,6),(64,'R','김정훈님이 200,000원을 빌려줬어요!',_binary '',NULL,'2023-10-04 06:23:10.395502',6,4),(65,'A','김동현님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 06:31:10.842787',4,5),(66,'A','김동현님이 대출 신청을 보냈어요!',_binary '\0',NULL,'2023-10-04 06:31:35.480902',4,5),(67,'A','김동현님이 대출 신청을 보냈어요!',_binary '\0',NULL,'2023-10-04 06:34:41.234877',4,5),(68,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 07:03:54.680749',3,4),(69,'A','최한윤님이 대출 신청을 보냈어요!',_binary '\0',NULL,'2023-10-04 07:13:39.224305',1,2),(70,'A','최한윤님이 대출 신청을 보냈어요!',_binary '\0',NULL,'2023-10-04 07:14:14.685050',1,2),(71,'R','조해린님이 350,000원을 빌려줬어요!',_binary '\0',NULL,'2023-10-04 07:16:21.043252',2,1),(72,'C','최한윤님에게 대출 금액 350000(원)이 입급 되었습니다.',_binary '\0',NULL,'2023-10-04 07:17:03.829632',2,1),(73,'C','조해린님에게 대출 금액 350000(원)이 강제 상환 되었습니다.',_binary '',NULL,'2023-10-04 07:17:03.829632',1,2),(74,'C','김정훈님이 111,111원 대출 상환을 완료했어요!',_binary '\0',NULL,'2023-10-04 07:18:17.481058',6,2),(75,'A','김동현님이 대출 신청을 보냈어요!',_binary '\0',NULL,'2023-10-04 07:42:31.693641',4,6),(76,'Q','조해린님이 친구 신청을 했어요!',_binary '\0',NULL,'2023-10-04 08:13:24.111570',2,6),(77,'F','김정훈님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 08:13:32.934909',6,2),(78,'Q','조해린님이 친구 신청을 했어요!',_binary '\0',NULL,'2023-10-04 08:13:57.638690',2,6),(79,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 08:24:43.913231',3,4),(80,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 08:33:35.657039',3,4),(81,'A','김동현님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 10:48:41.300045',4,3),(82,'A','김동현님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 10:49:32.445523',4,3),(83,'R','김동익님에게 100,000원 대출이 거절됐어요',_binary '',NULL,'2023-10-04 10:57:49.096239',3,4),(84,'R','김동익님이 50,000원을 빌려줬어요!',_binary '',NULL,'2023-10-04 10:59:15.515337',3,4),(85,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 10:59:49.234927',3,4),(86,'F','김정훈님이 친구요청을 거절했어요',_binary '\0',NULL,'2023-10-04 12:05:31.093298',6,2),(87,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 12:06:44.331308',4,6),(88,'F','김정훈님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 12:07:00.178794',6,4),(89,'Q','김동현님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 12:07:49.566096',4,6),(90,'F','김정훈님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 12:07:59.794627',6,4),(91,'Q','김동현님이 친구 신청을 했어요!',_binary '\0',NULL,'2023-10-04 12:10:29.393024',4,6),(92,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 12:16:44.958280',3,4),(93,'A','김동익님이 대출 신청을 보냈어요!',_binary '',NULL,'2023-10-04 12:19:04.210916',3,4),(94,'R','김동현님이 50,000원을 빌려줬어요!',_binary '\0',NULL,'2023-10-04 12:23:06.625508',4,3),(95,'F','김정훈님이 친구요청을 승인했어요!',_binary '',NULL,'2023-10-04 13:23:22.023537',6,4),(96,'P','김정훈님이 10,000원을 상환했어요!',_binary '\0',NULL,'2023-10-04 13:26:23.465914',6,3),(97,'Q','김용범님이 친구 신청을 했어요!',_binary '',NULL,'2023-10-04 15:33:15.807924',5,4),(98,'F','김동현님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 15:33:22.735443',4,5),(99,'F','김동현님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 15:33:23.673928',4,5),(100,'F','김동현님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 15:33:23.892846',4,5),(101,'F','김동현님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 15:33:25.086800',4,5),(102,'F','김동현님이 친구요청을 승인했어요!',_binary '\0',NULL,'2023-10-04 15:33:25.589637',4,5),(103,'A','김용범님이 대출 신청을 보냈어요!',_binary '\0',NULL,'2023-10-04 15:39:23.272171',5,4),(104,'A','김용범님이 대출 신청을 보냈어요!',_binary '\0',NULL,'2023-10-04 15:40:09.134778',5,4),(105,'P','김동익님과의 대출 기간이 0일 남았습니다. 50000(원)에 대한 상환이 필요합니다!',_binary '\0',NULL,'2023-10-05 00:00:00.632612',3,4),(106,'P','김동익님과의 대출 기간이 0일 남았습니다. 50000(원)에 대한 상환이 필요합니다!',_binary '\0',NULL,'2023-10-05 00:00:06.356203',3,4),(107,'A','김동익님이 대출 신청을 보냈어요!',_binary '\0',NULL,'2023-10-05 01:23:56.049200',3,4),(108,'C','김동현님이 50,000원 대출 상환을 완료했어요!',_binary '\0',NULL,'2023-10-05 01:24:50.820976',4,3),(110,'P','김동익님과의 대출 기간이 -1일 남았습니다. 90000(원)에 대한 상환이 필요합니다!',_binary '\0',NULL,'2023-10-05 01:45:03.100302',3,6),(111,'P','최한윤님과의 대출 기간이 0일 남았습니다. 150000(원)에 대한 상환이 필요합니다!',_binary '\0',NULL,'2023-10-05 01:45:03.150590',1,2),(112,'P','김동익님과의 대출 기간이 1일 남았습니다. 90000(원)에 대한 상환이 필요합니다!',_binary '\0',NULL,'2023-10-05 01:47:02.136832',3,6),(113,'P','최한윤님과의 대출 기간이 0일 남았습니다. 150000(원)에 대한 상환이 필요합니다!',_binary '\0',NULL,'2023-10-05 01:47:02.170542',1,2),(114,'C','김동익님이 50,000원 대출 상환을 완료했어요!',_binary '\0',NULL,'2023-10-05 03:10:46.401473',3,4);
/*!40000 ALTER TABLE `web_alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gappa'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05 12:57:21
