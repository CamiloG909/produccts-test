import * as repository from "../repositories/product.repository";

import { validateProduct } from "../validations/product.validation";

import type {
  CreateProductDto,
  UpdateProductDto,
  ProductWithHistory,
} from "../types/product.types";

async function buildProductResponse(id: number): Promise<ProductWithHistory> {
  const product = await repository.findById(id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  const history = await repository.findHistory(id);

  return {
    ...product,
    price: Number(product.price),
    history,
  };
}

export async function getProducts(): Promise<ProductWithHistory[]> {
  const products = await repository.findAll();

  return Promise.all(
    products.map(async (product) => {
      return {
        ...product,
        history: await repository.findHistory(product.id),
      };
    }),
  );
}

export async function createProduct(
  dto: CreateProductDto,
): Promise<ProductWithHistory> {
  validateProduct(dto);

  const product = await repository.create(dto);

  await repository.createHistory(
    product.id,
    "CREATE",
    `Producto ${product.name} creado`,
  );

  return buildProductResponse(product.id);
}

export async function updateProduct(
  id: number,
  dto: UpdateProductDto,
): Promise<ProductWithHistory> {
  validateProduct(dto);

  const product = await repository.update(id, dto);

  await repository.createHistory(
    id,
    "UPDATE",
    `Producto ${product.name} actualizado`,
  );

  return buildProductResponse(id);
}

export async function changeStatus(id: number): Promise<ProductWithHistory> {
  const product = await repository.changeStatus(id);

  await repository.createHistory(
    id,
    "STATUS_CHANGE",
    `Estado cambiado a ${product.status ? "Activo" : "Inactivo"}`,
  );

  return buildProductResponse(id);
}

export async function deleteProduct(id: number): Promise<void> {
  const product = await repository.findById(id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  await repository.remove(id);
}
