export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  _links: {
    self: Self[];
    collection: Collection[];
  };
}

export interface Self {
  href: string;
}
export interface Collection {
  href: string;
}
