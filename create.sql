CREATE    TABLE products (
          id BIGSERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          price NUMERIC(12, 2) NOT NULL CHECK (price > 0),
          stock INTEGER NOT NULL CHECK (stock >= 0),
          status BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
CREATE    TABLE product_history (
          id BIGSERIAL PRIMARY KEY,
          product_id BIGINT NOT NULL,
          action VARCHAR(20) NOT NULL,
          description TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_product_history_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
          CONSTRAINT check_history_action CHECK (action IN ('CREATE', 'UPDATE', 'STATUS_CHANGE'))
          );