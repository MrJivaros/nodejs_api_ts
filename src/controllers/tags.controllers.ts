import { NextFunction, Request, Response } from 'express';
import { Product } from '../interface/Products';
import { Tag } from '../interface/Tags';
import { WooAPI } from '../woocommerce/wooAPI';

export const findAllTags = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    data: await WooAPI.findList<Tag>('products')
  });
};
