import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

export const wooClient = new WooCommerceRestApi({
  url: 'https://nigeria.mariadollfashion.com',
  consumerKey: 'ck_59e652d192285afab27e125c1b4190d8ffe46a60',
  consumerSecret: 'cs_42f0e3c319888cd0400889354b04d1e998376863',
  version: 'wc/v3'
  // timeout: 60000
});
