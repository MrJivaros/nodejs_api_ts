import express from 'express';
import { createProduct, findAllProducts } from '../controllers/products.controllers';

const router = express.Router();

router.get('/list', findAllProducts);
router.post('/create', createProduct);

export = router;
