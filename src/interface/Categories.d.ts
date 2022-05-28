import { Image } from './Products';
import { Collection, Self } from './Tags';

export interface Category {
  id: 15;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: Image[];
  menu_order: 0;
  count: 4;
  _links: {
    self: Self[];
    collection: Collection[];
    up: Up[];
  };
}

interface Up {
  href: string;
}
