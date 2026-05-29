-- Sample seed data for testing
-- Note: You'll need to create actual auth users in Supabase and get their IDs

-- Insert sample project
INSERT INTO projects (user_id, title, description, is_public)
VALUES (
  (SELECT id FROM users LIMIT 1),
  'E-Commerce Platform Sitemap',
  'Visual sitemap for a modern e-commerce platform',
  TRUE
) RETURNING id AS project_id;

-- Insert sample nodes (will be populated after project creation)
-- This is a template; adjust with actual UUIDs after project creation

-- Home Page
INSERT INTO sitemap_nodes (project_id, title, url_slug, description, status, color, icon)
SELECT id, 'Home', '/', 'Landing page and entry point', 'completed', '#EE661D', 'home'
FROM projects WHERE title = 'E-Commerce Platform Sitemap'
RETURNING id AS home_id;

-- Products Section
INSERT INTO sitemap_nodes (project_id, title, url_slug, description, status, color, icon)
SELECT id, 'Products', '/products', 'Products listing and browsing', 'completed', '#EE661D', 'package'
FROM projects WHERE title = 'E-Commerce Platform Sitemap'
RETURNING id AS products_id;

-- Cart Section
INSERT INTO sitemap_nodes (project_id, title, url_slug, description, status, color, icon)
SELECT id, 'Shopping Cart', '/cart', 'Shopping cart management', 'draft', '#EE661D', 'shopping-cart'
FROM projects WHERE title = 'E-Commerce Platform Sitemap'
RETURNING id AS cart_id;

-- Checkout Section
INSERT INTO sitemap_nodes (project_id, title, url_slug, description, status, color, icon)
SELECT id, 'Checkout', '/checkout', 'Order payment and confirmation', 'draft', '#EE661D', 'credit-card'
FROM projects WHERE title = 'E-Commerce Platform Sitemap'
RETURNING id AS checkout_id;

-- Account Section
INSERT INTO sitemap_nodes (project_id, title, url_slug, description, status, color, icon)
SELECT id, 'Account', '/account', 'User account and orders', 'ready', '#EE661D', 'user'
FROM projects WHERE title = 'E-Commerce Platform Sitemap'
RETURNING id AS account_id;
