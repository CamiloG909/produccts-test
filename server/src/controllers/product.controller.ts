import type { Request, Response } from "express";

import * as service from "../services/product.service";

import type {
  CreateProductDto,
  UpdateProductDto,
} from "../types/product.types";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await service.getProducts();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo productos",
    });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const dto: CreateProductDto = req.body;

    const product = await service.createProduct(dto);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error creando producto",
    });
  }
}

export async function updateProduct(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const dto: UpdateProductDto = req.body;

    const product = await service.updateProduct(Number(req.params.id), dto);

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error actualizando producto",
    });
  }
}

export async function changeStatus(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const product = await service.changeStatus(Number(req.params.id));

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error cambiando estado del producto",
    });
  }
}

export async function deleteProduct(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    await service.deleteProduct(Number(req.params.id));

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : "Error eliminando producto",
    });
  }
}
