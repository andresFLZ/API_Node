import { Router } from "express";
import { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } from "../controllers/indexCategoria.controller.js";

const categoriasRouter = Router();

categoriasRouter.get("/categorias", getCategorias);
categoriasRouter.get("/categorias/:id", getCategoriaById);
categoriasRouter.post("/categorias", createCategoria);
categoriasRouter.put("/categorias/:id", updateCategoria);
categoriasRouter.delete("/categorias/:id", deleteCategoria);

export default categoriasRouter;