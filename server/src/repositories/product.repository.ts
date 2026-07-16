import { pool } from "../config/database";
import {
  CreateProductDto,
  Product,
  ProductHistory,
  UpdateProductDto,
} from "../types/product.types";

export async function findAll(): Promise<Product[]> {
  const result = await pool.query<Product>(
    `
		SELECT *
		FROM products
		ORDER BY id DESC
		`,
  );

  return result.rows;
}

export async function findById(id: number): Promise<Product | null> {
  const result = await pool.query<Product>(
    `
		SELECT *
		FROM products
		WHERE id = $1
		`,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function findHistory(id: number): Promise<ProductHistory[]> {
  const result = await pool.query<ProductHistory>(
    `
		SELECT *
		FROM product_history
		WHERE product_id = $1
		ORDER BY created_at DESC
		`,
    [id],
  );

  return result.rows;
}

export async function create(dto: CreateProductDto): Promise<Product> {
  const result = await pool.query<Product>(
    `
		INSERT INTO products
		(
			name,
			description,
			price,
			stock
		)
		VALUES
		($1,$2,$3,$4)
		RETURNING *
		`,
    [dto.name, dto.description, dto.price, dto.stock],
  );

  return result.rows[0];
}

export async function update(
  id: number,
  dto: UpdateProductDto,
): Promise<Product> {
  const result = await pool.query<Product>(
    `
		UPDATE products
		SET
			name=$1,
			description=$2,
			price=$3,
			stock=$4,
			updated_at=CURRENT_TIMESTAMP
		WHERE id=$5
		RETURNING *
		`,
    [dto.name, dto.description, dto.price, dto.stock, id],
  );

  return result.rows[0];
}

export async function changeStatus(id: number): Promise<Product> {
  const result = await pool.query<Product>(
    `
		UPDATE products
		SET
			status = NOT status,
			updated_at=CURRENT_TIMESTAMP
		WHERE id=$1
		RETURNING *
		`,
    [id],
  );

  return result.rows[0];
}

export async function remove(id: number): Promise<void> {
  await pool.query(
    `
		DELETE FROM products
		WHERE id=$1
		`,
    [id],
  );
}

export async function createHistory(
  productId: number,
  action: ProductHistory["action"],
  description: string,
): Promise<void> {
  await pool.query(
    `
		INSERT INTO product_history
		(
			product_id,
			action,
			description
		)
		VALUES ($1, $2, $3)
		`,
    [productId, action, description],
  );
}
