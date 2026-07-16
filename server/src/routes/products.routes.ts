import { Router } from "express";

const router = Router();

router.get("/", async (_, res) => {
  res.json([
    {
      id: 1,
      name: "Producto prueba",
    },
  ]);
});

export default router;
