CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL
);

INSERT INTO products (name, price) VALUES
('Product 1', 10.99),
('Product 2', 20.99),
('Product 3', 30.99);
