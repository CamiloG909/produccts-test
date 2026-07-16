import type {
  CreateProductDto,
  UpdateProductDto,
} from "../types/product.types";

export function validateProduct(dto: CreateProductDto | UpdateProductDto) {
  if (!dto.name) {
    throw new Error("El nombre es obligatorio");
  }

  if (dto.name.length > 100) {
    throw new Error("El nombre no puede superar 100 caracteres");
  }

  if (dto.price <= 0) {
    throw new Error("El precio debe ser mayor a 0");
  }

  if (dto.stock < 0) {
    throw new Error("El stock debe ser mayor o igual a 0");
  }
}
