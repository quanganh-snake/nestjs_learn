# NESTJS - Buổi 15 - Email

1. Thư viện: **NestJS Mailer**

2. Tác dụng

- Thông báo: Đăng ký tài khoản, đặt hàng, quên mật khẩu, xác thực, ...

- Marketing: Khuyến mãi, ...

- Autoresponder: gửi lập lịch

==> Việc gửi email hoạt động nhờ Server Mail (Khác với Server Web)

Client A ---SMTP--> ServerMail A (Server Gửi) ---Giao thức SMTP --> ServerMail B (Server Nhận) ---thông qua giao thức POP3/IMAP--> Client B

SMTP = Simple Mail Transfer Protocol = giao thức truyền tải thư tín đơn giản

=> Nodemailer => Thư viện hỗ trợ sẵn SMTP để có thể liên kết đến các Server khác

- Một số Mail Server bên thứ 3 có hỗ trợ SMTP

  - Trả phí: Mailgun, Amazon ses

  - Free: Gmail SMTP

\*\* Ví dụ Các Email Template Builder:

1. https://stripo.email/
   ...

   <!-- Cách lấy STMP -->

   Thông tin cần lấy bao gồm:
   MAIL_HOST=smtp.gmail.com (nếu dùng của Google thì Mail host là: smtp.gmail.com)
   MAIL_PORT=465 (Google 2 port: 465 || 587)
   MAIL_USERNAME: tbquanganh@gmail.com (Mặc định là email của Google)
   MAIL_PASSWORD: ... (password của Gmail mật khẩu ứng dụng -> trong phần cài đặt -> bảo mật -> trên tài khoản Google. Hoặc URL: https://myaccount.google.com/apppasswords)
   MAIL_SECURE=true/false --> true = SLL, false=CLS
