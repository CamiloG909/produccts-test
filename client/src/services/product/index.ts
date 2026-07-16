import apiProductService from "./product.service";
import mockProductService from "./product-mock.service";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

const productService = useMock ? mockProductService : apiProductService;

export default productService;
