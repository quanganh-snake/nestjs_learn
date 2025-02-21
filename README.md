# NESTJS - Buổi 13 - Authentication

## Guard => Dùng giống middleware => Nhưng có chức năng xử lý liên quan đến xác thực

## RefreshToken

Công thức tính thời gian hết hạn của Token

1. Lấy thời gian exp của token (mặc định tính bằng s -> từ timestamp)
2. Lấy thời gian hiện tại new Date().getTime() / 1000 -> vì getTime() mặc định lấy ms
3. Lấy thời gian token trừ thời gian hiện tại > 0 vẫn còn hạn

## Blacklist Token

- Khi logout -> nếu mà accesstoken vẫn còn hạn
  -> lưu lại vào Redis kèm giá trị expire còn lại của accessToken
  -> nhớ hash trc khi lưu vì Token dài gây tốn tài nguyên

-> kiểm tra blacklist

## Buổi sau:

- Tìm hiểu: JWT Fingerprint
