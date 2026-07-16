import { Router } from "express";
import {
  changeStatus,
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.patch("/:id/status", changeStatus);

router.delete("/:id", deleteProduct);

export default router;
