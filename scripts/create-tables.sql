-- Create database for industrial production monitoring
CREATE DATABASE IF NOT EXISTS industrial_production;
USE industrial_production;

-- Press 1 Tables
CREATE TABLE IF NOT EXISTS press1_pb (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press1_pm (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press1_mem (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press1_cm (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

-- Press 2 Tables
CREATE TABLE IF NOT EXISTS press2_pb (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press2_pm (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press2_mem (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press2_cm (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

-- Press 3 Tables
CREATE TABLE IF NOT EXISTS press3_pb (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press3_pm (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press3_mem (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press3_cm (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

-- Press 4 Tables
CREATE TABLE IF NOT EXISTS press4_pb (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press4_pm (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press4_mem (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);

CREATE TABLE IF NOT EXISTS press4_cm (
  id INT PRIMARY KEY AUTO_INCREMENT,
  DateTime DATETIME NOT NULL,
  Value FLOAT NOT NULL,
  Quality INT NOT NULL DEFAULT 1,
  INDEX idx_datetime (DateTime),
  INDEX idx_quality (Quality)
);
