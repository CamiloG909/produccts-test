import type { Product, ProductHistory } from "./product";

export interface ProductWithHistory extends Product {
	history: ProductHistory[];
}
