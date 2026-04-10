-- ============================================================
-- LaptopStore — Seed Data
-- ============================================================

-- Admin user: password = Admin@1234 (bcrypt, 10 rounds)
INSERT INTO users (name, email, password, role) VALUES
  ('Super Admin', 'admin@laptopstore.com',
   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Admin@1234
   'admin')
ON CONFLICT (email) DO NOTHING;

-- Products
INSERT INTO products
  (name, brand, model, price, original_price, stock, image_url,
   processor, ram, storage, storage_type, display, gpu, battery, weight, os,
   is_featured, is_active)
VALUES
  ('MacBook Air M3',
   'Apple', 'MacBook Air 15" M3 2024', 1299.00, 1499.00, 25,
   'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
   'Apple M3 (8-core CPU)', 8, 256, 'SSD', '15.3" Liquid Retina',
   'Apple M3 10-core GPU', '52.6Wh, up to 18hrs', 1.51, 'macOS Sonoma',
   TRUE, TRUE),

  ('Dell XPS 15',
   'Dell', 'XPS 15 9530', 1799.00, 1999.00, 18,
   'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600',
   'Intel Core i7-13700H', 16, 512, 'SSD', '15.6" OLED 3.5K Touch',
   'NVIDIA RTX 4060 8GB', '86Wh, up to 13hrs', 1.86, 'Windows 11 Home',
   TRUE, TRUE),

  ('Lenovo ThinkPad X1 Carbon',
   'Lenovo', 'ThinkPad X1 Carbon Gen 12', 1549.00, NULL, 30,
   'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600',
   'Intel Core Ultra 7 155U', 16, 512, 'SSD', '14" IPS 2.8K',
   'Intel Arc Graphics', '57Wh, up to 15hrs', 1.12, 'Windows 11 Pro',
   FALSE, TRUE),

  ('ASUS ROG Zephyrus G14',
   'ASUS', 'ROG Zephyrus G14 GA403', 1449.00, 1599.00, 12,
   'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600',
   'AMD Ryzen 9 8945HS', 16, 1024, 'SSD', '14" QHD+ 165Hz',
   'NVIDIA RTX 4070 8GB', '73Wh, up to 10hrs', 1.49, 'Windows 11 Home',
   TRUE, TRUE),

  ('HP Spectre x360',
   'HP', 'Spectre x360 14-eu0000', 1349.00, 1499.00, 20,
   'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
   'Intel Core Ultra 5 125H', 16, 512, 'SSD', '14" 2.8K OLED Touch',
   'Intel Arc Graphics', '68Wh, up to 17hrs', 1.41, 'Windows 11 Home',
   FALSE, TRUE),

  ('Acer Swift 3',
   'Acer', 'Swift 3 SF314-57', 649.00, 749.00, 40,
   'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600',
   'AMD Ryzen 5 7530U', 8, 512, 'SSD', '14" FHD IPS',
   'AMD Radeon Graphics', '56Wh, up to 12hrs', 1.19, 'Windows 11 Home',
   FALSE, TRUE),

  ('Microsoft Surface Laptop 6',
   'Microsoft', 'Surface Laptop 6 15"', 1699.00, NULL, 15,
   'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=600',
   'Intel Core Ultra 7 165H', 16, 512, 'SSD', '15" PixelSense 2496x1664',
   'Intel Arc Graphics', '54Wh, up to 22hrs', 1.67, 'Windows 11 Home',
   TRUE, TRUE),

  ('LG Gram 17',
   'LG', 'Gram 17 17Z90S', 1199.00, 1349.00, 22,
   'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
   'Intel Core Ultra 7 155H', 16, 512, 'SSD', '17" WQXGA IPS',
   'Intel Arc Graphics', '90Wh, up to 22hrs', 1.35, 'Windows 11 Home',
   FALSE, TRUE),

  ('Razer Blade 16',
   'Razer', 'Blade 16 2024', 2999.00, NULL, 8,
   'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600',
   'Intel Core i9-14900HX', 32, 2048, 'SSD', '16" OLED 4K 240Hz',
   'NVIDIA RTX 4090 16GB', '95.2Wh, up to 10hrs', 2.14, 'Windows 11 Home',
   TRUE, TRUE),

  ('Samsung Galaxy Book4 Pro',
   'Samsung', 'Galaxy Book4 Pro 14"', 1299.00, 1449.00, 17,
   'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600',
   'Intel Core Ultra 7 155H', 16, 512, 'SSD', '14" AMOLED 2.8K',
   'Intel Arc Graphics', '63Wh, up to 25hrs', 1.24, 'Windows 11 Home',
   FALSE, TRUE);
