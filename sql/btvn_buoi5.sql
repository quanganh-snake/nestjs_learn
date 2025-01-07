USE karaoke;
-- Bài tập về nhà buổi 5

-- 5. Hiển thị TenKH của tất cả các khách hàng có trong hệ thống, TenKH nào trùng nhau thì chỉ hiển thị một lần
SELECT DISTINCT TenKH FROM khach_hang;

-- 6. Hiển thị MaDV, TenDV, DonViTinh, DonGia của những dịch vụ đi kèm có DonViTinh là “lon” và có DonGia lớn hơn 10,000 VNĐ 
-- hoặc những dịch vụ đi kèm có DonViTinh là “Cai” và có DonGia nhỏ hơn 5,000 VNĐ
SELECT MaDV, TenDV, DonViTinh, DonGia
FROM dich_vu_di_kem
WHERE (DonViTinh = 'lon' AND DonGia > 10000) OR (DonViTinh = 'Cai' AND DonGia < 5000);

-- 7. Hiển thị MaDatPhong, MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, MaKH, TenKH, SoDT, NgayDat, GioBatDau, 
-- GioKetThuc, MaDichVu, SoLuong, DonGia của những đơn đặt phòng có năm đặt phòng là “2016”, “2017” 

SELECT *
FROM dat_phong
INNER JOIN phong
ON phong.MaPhong = dat_phong.MaPhong
INNER JOIN khach_hang
ON khach_hang.MaKH = dat_phong.MaKH
INNER JOIN chi_tiet_su_dung_dv
ON chi_tiet_su_dung_dv.MaDatPhong = dat_phong.MaDatPhong
WHERE YEAR(dat_phong.NgayDat) IN (2016, 2017) AND phong.GiaPhong > 50000;

-- 8. Hiển thị MaDatPhong, MaPhong, LoaiPhong, GiaPhong, TenKH, NgayDat, TongTienHat, TongTienSuDungDichVu, TongTienThanhToan 
-- tương ứng với từng mã đặt phòng có trong bảng DAT_PHONG. Những đơn đặt phòng nào không sử dụng dịch vụ đi kèm 
-- thì cũng liệt kê thông tin của đơn đặt phòng đó ra
SELECT 
	dat_phong.MaDatPhong,
	dat_phong.MaPhong,
	dat_phong.NgayDat, 
	phong.LoaiPhong,
	phong.GiaPhong, 
	khach_hang.TenKH,
	COALESCE(SUM(phong.GiaPhong * (COALESCE(EXTRACT(HOUR FROM (dat_phong.GioKetThuc - dat_phong.GioBatDau)), 0)))) AS TongTienHat,
	COALESCE(SUM(dich_vu_di_kem.DonGia * chi_tiet_su_dung_dv.SoLuong), 0) AS TongTienSuDungDichVu, 
	(
		COALESCE(EXTRACT(HOUR FROM (dat_phong.GioKetThuc - dat_phong.GioBatDau)), 0) * phong.GiaPhong + 
		COALESCE(SUM(dich_vu_di_kem.DonGia * chi_tiet_su_dung_dv.SoLuong), 0)
	) AS TongTienThanhToan 
FROM dat_phong
	INNER JOIN phong ON phong.MaPhong = dat_phong.MaPhong
	INNER JOIN khach_hang ON khach_hang.MaKH = dat_phong.MaKH
	LEFT JOIN chi_tiet_su_dung_dv ON dat_phong.MaDatPhong = chi_tiet_su_dung_dv.MaDatPhong
	LEFT JOIN dich_vu_di_kem ON chi_tiet_su_dung_dv.MaDV = dich_vu_di_kem.MaDV;

-- 9. Hiển thị MaKH, TenKH, DiaChi, SoDT của những khách hàng đã từng đặt phòng karaoke có địa chỉ ở “Hoa xuan”
SELECT MaKH, TenKH, DiaChi, SoDT
FROM khach_hang
WHERE DiaChi = 'Hoa xuan';

-- 10. Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat của những phòng được khách hàng đặt 
-- có số lần đặt lớn hơn 2 lần và trạng thái đặt là “Da dat”
SELECT
	phong.MaPhong,
	phong.LoaiPhong,
	phong.SoKhachToiDa,
	phong.GiaPhong,
	COUNT(dat_phong.MaPhong) AS SoLanDat
FROM phong
JOIN dat_phong ON phong.MaPhong = dat_phong.MaPhong
WHERE dat_phong.TrangThaiDat = 'Dat'
GROUP BY
  phong.MaPhong,
  phong.LoaiPhong,
  phong.SoKhachToiDa,
  phong.GiaPhong
HAVING
	COUNT(dat_phong.MaPhong > 2);