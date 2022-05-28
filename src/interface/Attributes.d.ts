import { Collection, Self } from './Tags';

export interface Attributes {
  id: number;
  name: string;
  slug: string;
  type: string;
  order_by: string;
  has_archives: boolean;
  _links: {
    self: Self[];
    collection: Collection[];
  };
}
