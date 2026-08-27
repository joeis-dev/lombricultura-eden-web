-- Seed data for Lombricultura Eden
-- Run this after init.sql has been applied

-- Create a default seller user
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'admin@lombriculturaeden.com',
    '$2a$10$placeholder_hash_for_admin_user',
    'Admin',
    'Lombricultura Eden',
    'ADMIN',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- Product 1: Lombriz Roja Californiana (por cantidad)
-- ============================================================
INSERT INTO products (id, seller_id, title, description, price, stock, category, image_urls, is_active, is_on_sale, discount_percent, created_at, updated_at)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Lombriz Roja Californiana',
    'Lombriz roja californiana (Eisenia fetida) de alta calidad. Ideal para compostaje, vermicultura y reproducción. Se entrega en condiciones óptimas de humedad y temperatura.',
    80.00,
    5000,
    'Lombrices',
    ARRAY['/lombriz.jpg'],
    true,
    false,
    NULL,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Variantes: Por cantidad (pieza)
INSERT INTO product_variants (product_id, label, price, stock, is_active, sort_order, created_at, updated_at) VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '50 lombrices',      80.00,   200, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '100 lombrices',    150.00,   200, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '200 lombrices',    280.00,   200, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '300 lombrices',    380.00,   150, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '400 lombrices',    470.00,   150, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '500 lombrices',    560.00,   100, true, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '600 lombrices',    650.00,   100, true, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '800 lombrices',    800.00,    80, true, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', '1,000 lombrices',  970.00,    50, true, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================================
-- Product 2: Lombriz Roja Californiana - Biomasa (por kilogramo)
-- ============================================================
INSERT INTO products (id, seller_id, title, description, price, stock, category, image_urls, is_active, is_on_sale, discount_percent, created_at, updated_at)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Lombriz Roja Californiana - Biomasa',
    'Lombriz roja californiana vendida por kilogramo de biomasa. Ideal para establecer granjas a gran escala o para compostaje industrial.',
    1500.00,
    500,
    'Lombrices',
    ARRAY['/lombriz.jpg'],
    true,
    false,
    NULL,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Variantes: Por kilogramo (biomasa)
INSERT INTO product_variants (product_id, label, price, stock, is_active, sort_order, created_at, updated_at) VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', '1 kg', 1500.00, 200, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', '2 kg', 2700.00, 100, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', '3 kg', 3600.00,  50, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================================
-- Product 3: Humus de Lombriz Líquido
-- ============================================================
INSERT INTO products (id, seller_id, title, description, price, stock, category, image_urls, is_active, is_on_sale, discount_percent, created_at, updated_at)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Humus de Lombriz Líquido',
    'Humus de lombriz líquido 100% natural, rico en nutrientes, microorganismos benéficos y ácidos húmicos. Ideal para riego por goteo, aspersión o pulverización foliar. Fortalece las plantas y mejora la estructura del suelo.',
    130.00,
    20,
    'Humus Líquido',
    ARRAY['/humus-liquido.jpg'],
    true,
    false,
    NULL,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Variantes: Por volumen (solo queda presentación de 20 L, con 20 unidades)
INSERT INTO product_variants (product_id, label, price, stock, is_active, sort_order, created_at, updated_at) VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', '1 L',    130.00,   0, false, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', '3.7 L',  360.00,   0, false, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', '5 L',    440.00,   0, false, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', '10 L',   700.00,   0, false, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', '20 L',  1200.00,  20, true,  5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================================
-- Product 4: Humus de Lombriz Sólido
-- ============================================================
INSERT INTO products (id, seller_id, title, description, price, stock, category, image_urls, is_active, is_on_sale, discount_percent, created_at, updated_at)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Humus de Lombriz Sólido',
    'Humus de lombriz sólido (castaña de lombriz) 100% natural. Excelente como sustrato, enmienda orgánica o componente de mezclas para semilleros. Rico en materia orgánica, nitrógeno, fósforo y potasio.',
    65.00,
    0,
    'Humus Sólido',
    ARRAY['/humus-solido.jpg'],
    true,
    false,
    NULL,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Variantes: Por peso (fuera de stock)
INSERT INTO product_variants (product_id, label, price, stock, is_active, sort_order, created_at, updated_at) VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', '1 kg',   65.00, 0, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', '2 kg',  100.00, 0, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', '3 kg',  130.00, 0, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', '5 kg',  200.00, 0, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', '10 kg', 320.00, 0, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', '20 kg', 500.00, 0, true, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
