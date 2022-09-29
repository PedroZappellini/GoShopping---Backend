import { PrismaClient } from "@prisma/client";
import express, { request, response } from "express";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/products/:collection", async (request, response) => {
  const params = request.params.collection;

  const products = await prisma.products.findMany({
    select: {
      name: true,
      id: true,
      collection: true,
      collectionId: true,
    },
    where: {
      collection: params,
    },
  });

  return response.json(products);
});

app.get("/list", async (request, response) => {
  const list = await prisma.userLists.findMany({
    select: {
      id: true,
      name: true,
      collection: true,
      collectionId: true,
      color: true,
      count: true,
    },
  });

  return response.json(list);
});

app.post("/list/:id", async (request, response) => {
  const body = request.body;
  const collectionId = request.params.id;

  const list = await prisma.userLists.create({
    data: {
      collectionId: collectionId,
      name: body.name,
      collection: body.collection,
      color: body.color,
    },
  });

  return response.status(201).json(list);
});

app.get("/list/products/:id", async (request, response) => {
  const id = request.params.id;

  const productsList = await prisma.userProductsPerList.findMany({
    select: {
      name: true,
      collection: true,
      collectionId: true,
      id: true,
    },
    where: {
      collectionId: id,
    },
  });

  return response.status(201).json(productsList);
});

app.post("/list/products/:id", async (request, response) => {
  const body = request.body;
  const productId = request.params.id;

  const products = await prisma.userProductsPerList.create({
    data: {
      collectionId: productId,
      name: body.name,
      collection: body.collection,
    },
  });

  return response.status(201).json(products);
});

app.get("/collections", async (request, response) => {
  const collections = await prisma.typeListProducts.findMany({
    select: {
      id: true,
      collection: true,
    },
  });

  return response.json(collections);
});

app.delete("/delete/:id", async (request, response) => {
  const id = request.params.id;

  const list = await prisma.userLists.delete({
    where: {
      id: id,
    },
  });
  return response.status(200).json(list);
});

app.listen(3333, () => {
  console.log("Server started on port 3333!");
});
