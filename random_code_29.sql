-- Random code generator using SQL
-- This demonstrates generating random codes in SQL

-- Create a function to generate random codes (PostgreSQL example)
CREATE OR REPLACE FUNCTION generate_random_code(length INTEGER DEFAULT 10)
RETURNS TEXT AS $$
DECLARE
    characters TEXT := '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    code TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..length LOOP
        code := code || substr(characters, floor(random() * length(characters) + 1)::INTEGER, 1);
    END LOOP;
    RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Generate 5 random codes
SELECT 
    'Code #' || row_number() OVER () || ': ' || generate_random_code(12) AS random_code
FROM generate_series(1, 5);

-- Display timestamp
SELECT 'Generated at: ' || to_char(now(), 'YYYY-MM-DD HH24:MI:SS') AS timestamp;

