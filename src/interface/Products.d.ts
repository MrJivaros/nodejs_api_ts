export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: null | string;
  date_on_sale_from_gmt: null | string;
  date_on_sale_to: null | string;
  date_on_sale_to_gmt: null | string;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: null | string;
  stock_status: string;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: any[];
  cross_sell_ids: any[];
  parent_id: number;
  purchase_note: string;
  categories: Category[];
  tags: [];
  images: Image[];
  attributes: Attribute[];
  default_attributes: any[];
  variations: any[];
  grouped_products: any[];
  menu_order: number;
  meta_data: any[];
  _links: {
    self: [
      {
        href: string;
      }
    ];
    collection: [
      {
        href: string;
      }
    ];
  };
}

export interface Image {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Attribute {
  name: 'Size' | 'Color';
  position: number;
  visible: boolean;
  variation: boolean;
  options: Options;
}

export type Options = string[];

export interface CreateWooProducts {
  name: string;
  type: 'variable' | 'simple';
  regular_price: string;
  description: string;
  short_description: string;
  categories: {
    id: number;
  }[];
  images: {
    src: string;
  }[];
  attributes?: Attribute[];
  default_attributes?: { name: 'Size' | 'Color'; option: string }[];
}

export interface OrderAppCreateProductInput {
  image_path: string;
  catalog_name: string;
  colors: string[];
  sizes: string[];
  specs: string[];
  name: string;
  description: string;
  short_description: string;
  regular_price: number;
  sale_price: number;
  categories: string;
  featured: string;
  tags: string[];
  status_kbn: string;
  shop_code: string;
  location_code: string;
}
