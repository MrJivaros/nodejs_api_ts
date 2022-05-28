import { NextFunction, Request, Response } from 'express';
import { CreateWooProducts, OrderAppCreateProductInput, Product } from '../interface/Products';
import { WooAPI } from '../woocommerce/wooAPI';

export const findAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    data: await WooAPI.findList<Product>('products')
  });
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const body: CreateProductsBody = req.body;
  body.data = body.data.filter((product) => product.location_code == body.location_code);
  const response = await WooAPI.createProducts(body.data);
  console.log('[INFO]: upload products into shop start');
  return res.status(200).json(response);
};

interface CreateProductsBody {
  data: OrderAppCreateProductInput[];
  deballage_name: string;
  deballage_code: string;
  location_code: string;
  location_name: string;
}
