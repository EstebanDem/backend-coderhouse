import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as productController from '../controllers/product.controller.js'

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

router.post('/', auth, productController.create);

router.put('/:id', auth, productController.update);

router.delete('/:id', auth, productController.remove);

export default router;
