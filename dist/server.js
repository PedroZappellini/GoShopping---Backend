"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.get("/products", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const productName = request.body;
    const products = yield prisma.products.findMany({
        select: {
            name: true,
            id: true,
            collection: true,
            collectionId: true,
        },
        where: {
            collection: request.body,
        },
    });
    return response.json(products);
}));
app.get("/list", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield prisma.userLists.findMany({
        select: {
            id: true,
            name: true,
            collection: true,
            collectionId: true,
            count: true,
        },
    });
    return response.json(list);
}));
app.post("/list/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    const params = request.params.id;
    const list = yield prisma.userLists.create({
        data: {
            collectionId: params,
            name: body.name,
            collection: body.collection,
        },
    });
    return response.status(201).json(list);
}));
app.get("/collections", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield prisma.typeListProducts.findMany({
        select: {
            id: true,
            collection: true,
        },
    });
    return response.json(collections);
}));
app.listen(3333, () => {
    console.log("Server started on port 3333!");
});
//# sourceMappingURL=server.js.map