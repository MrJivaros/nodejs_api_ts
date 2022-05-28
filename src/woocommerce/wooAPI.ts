import { wooClient } from '../config/wooCommerce.config';
import logger from '../config/logging';
import { Attributes } from '../interface/Attributes';
import { CreateWooProducts, OrderAppCreateProductInput } from '../interface/Products';
import { Tag } from '../interface/Tags';
import { Category } from '../interface/Categories';
import axios from 'axios';
import { PICTURE_API_URL } from '../config/pictureApi.config';
import { Picture } from '../interface/Pictures';

type RequestParams = 'tags' | 'products' | 'categories';

export class WooAPI {
  static async findList<T>(endPoint: RequestParams): Promise<T[]> {
    const perPage = await this.findWooTotalPages(endPoint);
    const promise = [];
    if (perPage) {
      for (let i = 0; i < perPage; i++) {
        promise.push(this.findElement<T>(i, endPoint));
      }
    }
    const response = await Promise.all(promise);
    const LIST = [];
    for (const item of response) {
      if (item) {
        for (const element of item) {
          LIST.push(element);
        }
      }
    }
    return LIST;
  }

  static async findWooTotalPages(endPoint: RequestParams): Promise<number | null> {
    try {
      const response = await wooClient.get(endPoint, {
        params: {
          per_page: 100,
          page: 1
        }
      });

      return response?.headers['x-wp-totalpages'];
    } catch (error) {
      return null;
    }
  }

  static async findElement<T>(page: number, endPoint: RequestParams): Promise<T[] | undefined> {
    try {
      const response = await wooClient.get(endPoint, {
        params: {
          per_page: 100,
          page
        }
      });

      return response?.data;
    } catch (error) {
      logger.error(`FIND ${endPoint}`, '', error);
    }
  }

  static async findAllAttribute(): Promise<Attributes[]> {
    try {
      const response = await wooClient.get('products/attributes');
      return response.data;
    } catch (error) {
      logger.error(`FIND ALL ATTRIBUTES`, '', error);
      throw new Error(`can't find attributes`);
    }
  }

  static async createProducts(products: OrderAppCreateProductInput[]) {
    try {
      const categories = await this.findList<Category>('categories');
      console.log(`[ALL CATEGORIES]`, categories);
      const promises = [];
      for (const product of products) {
        promises.push(this.createOneProduct(product, categories));
      }

      const response = await Promise.allSettled(promises);
      console.log('create all products end', response);
      return {
        status: true,
        data: response
      };
    } catch (error) {
      console.log('error product creation', error);
      return {
        status: 'error',
        data: null
      };
    }
  }

  static async createOneProduct(product: OrderAppCreateProductInput, categories: Category[]) {
    const createProductData = {} as CreateWooProducts;
    let images: { src: string }[] = [];
    try {
      console.log(`FIND IMAGES CATALOGUE`, product.catalog_name);
      console.log(`FIND IMAGES URL`, `${PICTURE_API_URL}${product.catalog_name}`);
      const response = (await axios.get(`${PICTURE_API_URL}${product.catalog_name}`)).data as Picture[];
      console.log(`FIND IMAGES RESPONSE`, response);
      images = response.map((image) => {
        return {
          src: image.image
        };
      });
    } catch (error) {
      console.log('[FIND IMAGE URL ERROR] => ', error);
    }

    if (images.length > 0) {
      createProductData.images = images;
      createProductData.name = product.name;
      createProductData.description = product.description;
      createProductData.short_description = product.short_description;
      createProductData.regular_price = product.regular_price.toString();
      createProductData.type = 'variable';

      createProductData.attributes = [
        {
          name: 'Size',
          visible: true,
          position: 0,
          variation: true,
          options: product.sizes
        },
        {
          name: 'Color',
          visible: true,
          position: 0,
          variation: true,
          options: product.colors
        }
      ];
      createProductData.default_attributes = [
        {
          name: 'Color',
          option: product.colors[0]
        },
        {
          name: 'Size',
          option: product.sizes[0]
        }
      ];
      const createProducteCategories: { id: number }[] = [];
      const productsCategories = product.categories.split(',');
      for (const category of productsCategories) {
        const response = await this.findcategoriesID(categories, category, product.catalog_name);
        if (response) {
          createProducteCategories.push({
            id: response
          });
        }
      }
      createProductData.categories = categories;
      let createdProduct;
      console.log('create products data send', createProductData);
      try {
        createdProduct = (await wooClient.post('produits', createProductData)).data;
        return {
          status: true,
          data: createdProduct
        };
      } catch (error) {
        console.log('[An Error] create product ');
      }
      console.log(`create products ${product.name}-${product.catalog_name}`, createdProduct);
      return {
        status: false,
        data: undefined
      };
    } else {
      console.log('Image notFound', images);
      return {
        status: false,
        data: undefined
      };
    }
  }

  static async findcategoriesID(allCategories: Category[], categoriesNames: string, catalog_name: string) {
    for (const category of allCategories) {
      if (category.name.trim().toLowerCase() == categoriesNames.trim().toLowerCase()) {
        return category.id;
      }
    }
    const PICTURES: Picture[] = await axios.get(`${PICTURE_API_URL}${catalog_name}`);
    if (PICTURES.length > 0) {
      const url = PICTURES[0].image;
      const response = await this.createCategory(categoriesNames, url);
      if (response.status) {
        return response.data;
      }
    }
  }

  static async createCategory(name: string, imageUrl: string) {
    const data = {
      name,
      image: {
        src: imageUrl
      }
    };
    try {
      const category = (await wooClient.post('produits/categories', data)).data;
      return {
        status: true,
        data: category.id as number
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        data: undefined
      };
    }
  }

  static async createAttributes(name: string) {
    try {
      const response = (
        await wooClient.post('produits/attributs', {
          name
        })
      ).data;
      return {
        status: true,
        data: response.id as number
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        data: undefined
      };
    }
  }
}
