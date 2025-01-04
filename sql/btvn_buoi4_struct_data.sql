-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.6.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for karaoke
CREATE DATABASE IF NOT EXISTS `karaoke` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `karaoke`;

-- Dumping structure for table karaoke.chi_tiet_su_dung_dv
CREATE TABLE IF NOT EXISTS `chi_tiet_su_dung_dv` (
  `MaDatPhong` varchar(10) NOT NULL,
  `MaDV` varchar(10) NOT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  KEY `MaDatPhong` (`MaDatPhong`),
  KEY `MaDV` (`MaDV`),
  CONSTRAINT `FK_chi_tiet_su_dung_dv_dat_phong` FOREIGN KEY (`MaDatPhong`) REFERENCES `dat_phong` (`MaDatPhong`) ON DELETE CASCADE,
  CONSTRAINT `FK_chi_tiet_su_dung_dv_dich_vu_di_kem` FOREIGN KEY (`MaDV`) REFERENCES `dich_vu_di_kem` (`MaDV`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table karaoke.chi_tiet_su_dung_dv: ~5 rows (approximately)
INSERT INTO `chi_tiet_su_dung_dv` (`MaDatPhong`, `MaDV`, `SoLuong`) VALUES
	('DP0001', 'DV001', 20),
	('DP0001', 'DV003', 3),
	('DP0001', 'DV002', 10),
	('DP0003', 'DV003', 2),
	('DP0003', 'DV004', 10);

-- Dumping structure for table karaoke.dat_phong
CREATE TABLE IF NOT EXISTS `dat_phong` (
  `MaDatPhong` varchar(10) NOT NULL DEFAULT '',
  `MaPhong` varchar(10) NOT NULL DEFAULT '',
  `MaKH` varchar(10) NOT NULL DEFAULT '',
  `NgayDat` date DEFAULT NULL,
  `GioBatDau` time DEFAULT NULL,
  `GioKetThuc` time DEFAULT NULL,
  `TienDatCoc` int(11) DEFAULT NULL,
  `GhiChu` text DEFAULT NULL,
  `TrangThaiDat` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MaDatPhong`),
  KEY `FK_dat_phong_phong` (`MaPhong`),
  KEY `FK_dat_phong_khach_hang` (`MaKH`),
  CONSTRAINT `FK_dat_phong_khach_hang` FOREIGN KEY (`MaKH`) REFERENCES `khach_hang` (`MaKH`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_dat_phong_phong` FOREIGN KEY (`MaPhong`) REFERENCES `phong` (`MaPhong`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table karaoke.dat_phong: ~3 rows (approximately)
INSERT INTO `dat_phong` (`MaDatPhong`, `MaPhong`, `MaKH`, `NgayDat`, `GioBatDau`, `GioKetThuc`, `TienDatCoc`, `GhiChu`, `TrangThaiDat`) VALUES
	('DP0001', 'P0001', 'KH0002', '2018-03-26', '11:00:00', '13:00:00', 100000, NULL, 'Da dat'),
	('DP0003', 'P0002', 'KH0002', '2025-01-04', '20:30:00', '22:15:00', 100000, NULL, 'Dat dat'),
	('DP0004', 'P0004', 'KH0001', '2018-04-01', '19:30:00', '21:15:00', 200000, NULL, 'Da dat');

-- Dumping structure for table karaoke.dich_vu_di_kem
CREATE TABLE IF NOT EXISTS `dich_vu_di_kem` (
  `MaDV` varchar(10) NOT NULL DEFAULT '',
  `TenDV` varchar(200) NOT NULL DEFAULT '',
  `DonViTinh` varchar(50) NOT NULL,
  `DonGia` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`MaDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table karaoke.dich_vu_di_kem: ~4 rows (approximately)
INSERT INTO `dich_vu_di_kem` (`MaDV`, `TenDV`, `DonViTinh`, `DonGia`) VALUES
	('DV001', 'Beer', 'lon', 10000),
	('DV002', 'Nuoc ngot', 'lon', 8000),
	('DV003', 'Trai cay', 'dia', 35000),
	('DV004', 'Khan uot', 'cai', 2000);

-- Dumping structure for table karaoke.khach_hang
CREATE TABLE IF NOT EXISTS `khach_hang` (
  `MaKH` varchar(10) NOT NULL DEFAULT '',
  `TenKH` varchar(100) NOT NULL DEFAULT '',
  `DiaChi` varchar(200) NOT NULL DEFAULT '',
  `SoDT` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`MaKH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table karaoke.khach_hang: ~6 rows (approximately)
INSERT INTO `khach_hang` (`MaKH`, `TenKH`, `DiaChi`, `SoDT`) VALUES
	('KH0001', 'Nguyen Van A', 'Hoa xuan', '1111111111'),
	('KH0002', 'Nguyen Van B', 'Hoa hai', '1111111112'),
	('KH0003', 'Phan Van A', 'Cam le', '1111111113'),
	('KH0004', 'Phan Van B', 'Hoa xuan', '1111111114'),
	('KH0005', 'Hoang Hoa Tham', 'Hoang Hoa Tham', '1111111115'),
	('KH0006', 'Hoang Van Cuu Luc Bang Nhat Dai Nien Hong Thieu', 'Hoang mai', '1111111116');

-- Dumping structure for table karaoke.phong
CREATE TABLE IF NOT EXISTS `phong` (
  `MaPhong` varchar(10) NOT NULL DEFAULT '',
  `LoaiPhong` varchar(100) NOT NULL DEFAULT '',
  `SoKhachToiDa` int(11) NOT NULL DEFAULT 0,
  `GiaPhong` int(11) NOT NULL DEFAULT 0,
  `MoTa` text DEFAULT NULL,
  PRIMARY KEY (`MaPhong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table karaoke.phong: ~4 rows (approximately)
INSERT INTO `phong` (`MaPhong`, `LoaiPhong`, `SoKhachToiDa`, `GiaPhong`, `MoTa`) VALUES
	('P0001', 'Loai 1', 20, 10000, NULL),
	('P0002', 'Loai 1', 25, 10000, NULL),
	('P0003', 'Loai 2', 15, 10000, NULL),
	('P0004', 'Loai 3', 20, 10000, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
