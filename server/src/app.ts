import express from "express";
import cors from "cors";

import productsRouter from "./routes/products.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/products", productsRouter);

export default app;
