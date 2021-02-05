export interface Product {
  id:            string;
  name:          string;
  description:   string;
  channels:      string[];
  active:        boolean;
  taxId:         string;
  hasPicture:    boolean;
  table:         string;
  color:         string;
  businessId:    string;
  supplierId:    null;
  categoryId:    string;
  createdAt:     Date;
  unit:          string;
  allVariants:   AllVariant[];
  draft:         boolean;
  imageLocal:    boolean;
  currentUpdate: boolean;
}

export interface AllVariant {
  id:          string;
  name:        string;
  sku:         string;
  productId:   string;
  unit:        string;
  table:       string;
  channels:    string[];
  productName: null;
}
