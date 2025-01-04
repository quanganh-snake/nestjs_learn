USE dbdiagram;

-- SELECT users.*, phones.phone FROM users
-- RIGHT JOIN phones
-- ON users.id = phones.user_id

-- SELECT posts.* FROM posts
-- INNER JOIN phones
-- ON posts.user_id = phones.user_id
-- WHERE phones.phone = '0123456786'

-- SELECT posts.*
-- FROM posts
-- WHERE EXISTS (
--     SELECT 1
--     FROM phones
--     WHERE phones.user_id = posts.user_id
--     AND phones.phone = '0123456786'
-- );

-- Cách 1
-- SELECT users.*
-- -- , uc.*, c.* 
-- FROM users
-- INNER JOIN users_courses AS uc ON users.id = uc.user_id
-- INNER JOIN courses AS c ON c.id = uc.course_id
-- WHERE c.updated_at = (
--     SELECT MAX(c2.updated_at)
--     FROM courses AS c2
--     INNER JOIN users_courses AS uc2 ON c2.id = uc2.course_id
--     WHERE uc2.user_id = users.id
-- )
-- ORDER BY c.updated_at DESC;
-- LIMIT 1

-- Bài toán: Hiển thị danh sách users và số lượng bài viết từng users
-- (Nếu users không có posts sẽ hiển thị 0)
-- Gợi ý: Dùng COUNT kết hợp LEFT JOIN kết hợp với GROUP BY
-- SELECT 
-- users.*, COUNT(posts.user_id) AS post_count
-- FROM users
-- LEFT JOIN posts
-- ON posts.user_id = users.id
-- GROUP BY users.id

SELECT 
    users.name, 
    (SELECT COUNT(*) FROM posts WHERE posts.user_id = users.id) AS post_count
FROM 
    users;