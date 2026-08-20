import type { Product } from '@app-types/index';

const now = new Date().toISOString();

export const products: Product[] = [
  {
    id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    sellerId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Lombriz Roja Californiana',
    description:
      'Lombriz roja californiana (Eisenia fetida) de alta calidad. Ideal para compostaje, vermicultura y reproducción. Se entrega en condiciones óptimas de humedad y temperatura.',
    price: 80.0,
    stock: 5000,
    category: 'Lombrices',
    imageUrls: ['/lombriz.jpg'],
    isActive: true,
    isFeatured: true,
    variants: [
      { id: 'v1-01', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '50 lombrices', price: 80, stock: 200, isActive: true, sortOrder: 1, createdAt: now, updatedAt: now },
      { id: 'v1-02', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '100 lombrices', price: 150, stock: 200, isActive: true, sortOrder: 2, createdAt: now, updatedAt: now },
      { id: 'v1-03', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '200 lombrices', price: 280, stock: 200, isActive: true, sortOrder: 3, createdAt: now, updatedAt: now },
      { id: 'v1-04', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '300 lombrices', price: 380, stock: 150, isActive: true, sortOrder: 4, createdAt: now, updatedAt: now },
      { id: 'v1-05', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '400 lombrices', price: 470, stock: 150, isActive: true, sortOrder: 5, createdAt: now, updatedAt: now },
      { id: 'v1-06', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '500 lombrices', price: 560, stock: 100, isActive: true, sortOrder: 6, createdAt: now, updatedAt: now },
      { id: 'v1-07', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '600 lombrices', price: 650, stock: 100, isActive: true, sortOrder: 7, createdAt: now, updatedAt: now },
      { id: 'v1-08', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '800 lombrices', price: 800, stock: 80, isActive: true, sortOrder: 8, createdAt: now, updatedAt: now },
      { id: 'v1-09', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', label: '1,000 lombrices', price: 970, stock: 50, isActive: true, sortOrder: 9, createdAt: now, updatedAt: now },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    sellerId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Lombriz Roja Californiana - Biomasa',
    description:
      'Lombriz roja californiana vendida por kilogramo de biomasa. Ideal para establecer granjas a gran escala o para compostaje industrial.',
    price: 1500.0,
    stock: 500,
    category: 'Lombrices',
    imageUrls: ['/lombriz.jpg'],
    isActive: true,
    isFeatured: false,
    variants: [
      { id: 'v2-01', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', label: '1 kg', price: 1500, stock: 200, isActive: true, sortOrder: 1, createdAt: now, updatedAt: now },
      { id: 'v2-02', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', label: '2 kg', price: 2700, stock: 100, isActive: true, sortOrder: 2, createdAt: now, updatedAt: now },
      { id: 'v2-03', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', label: '3 kg', price: 3600, stock: 50, isActive: true, sortOrder: 3, createdAt: now, updatedAt: now },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
    sellerId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Humus de Lombriz Líquido',
    description:
      'Humus de lombriz líquido 100% natural, rico en nutrientes, microorganismos benéficos y ácidos húmicos. Ideal para riego por goteo, aspersión o pulverización foliar. Fortalece las plantas y mejora la estructura del suelo.',
    price: 130.0,
    stock: 1000,
    category: 'Humus Líquido',
    imageUrls: ['/humus-liquido.jpg'],
    isActive: true,
    isFeatured: true,
    variants: [
      { id: 'v3-01', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', label: '1 L', price: 130, stock: 500, isActive: true, sortOrder: 1, createdAt: now, updatedAt: now },
      { id: 'v3-02', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', label: '3.7 L', price: 360, stock: 200, isActive: true, sortOrder: 2, createdAt: now, updatedAt: now },
      { id: 'v3-03', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', label: '5 L', price: 440, stock: 150, isActive: true, sortOrder: 3, createdAt: now, updatedAt: now },
      { id: 'v3-04', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', label: '10 L', price: 700, stock: 100, isActive: true, sortOrder: 4, createdAt: now, updatedAt: now },
      { id: 'v3-05', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', label: '20 L', price: 1200, stock: 50, isActive: true, sortOrder: 5, createdAt: now, updatedAt: now },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
    sellerId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    title: 'Humus de Lombriz Sólido',
    description:
      'Humus de lombriz sólido (castaña de lombriz) 100% natural. Excelente como sustrato, enmienda orgánica o componente de mezclas para semilleros. Rico en materia orgánica, nitrógeno, fósforo y potasio.',
    price: 65.0,
    stock: 2000,
    category: 'Humus Sólido',
    imageUrls: ['/humus-solido.jpg'],
    isActive: true,
    isFeatured: true,
    variants: [
      { id: 'v4-01', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', label: '1 kg', price: 65, stock: 500, isActive: true, sortOrder: 1, createdAt: now, updatedAt: now },
      { id: 'v4-02', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', label: '2 kg', price: 100, stock: 400, isActive: true, sortOrder: 2, createdAt: now, updatedAt: now },
      { id: 'v4-03', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', label: '3 kg', price: 130, stock: 300, isActive: true, sortOrder: 3, createdAt: now, updatedAt: now },
      { id: 'v4-04', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', label: '5 kg', price: 200, stock: 200, isActive: true, sortOrder: 4, createdAt: now, updatedAt: now },
      { id: 'v4-05', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', label: '10 kg', price: 320, stock: 100, isActive: true, sortOrder: 5, createdAt: now, updatedAt: now },
      { id: 'v4-06', productId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', label: '20 kg', price: 500, stock: 50, isActive: true, sortOrder: 6, createdAt: now, updatedAt: now },
    ],
    createdAt: now,
    updatedAt: now,
  },
];

export const categories = [
  'Todas',
  'Lombrices',
  'Humus Líquido',
  'Humus Sólido',
];

export function getMinPrice(product: Product): number {
  if (!product.variants || product.variants.length === 0) return product.price;
  return Math.min(...product.variants.filter((v) => v.isActive).map((v) => v.price));
}

export function getMaxPrice(product: Product): number {
  if (!product.variants || product.variants.length === 0) return product.price;
  return Math.max(...product.variants.filter((v) => v.isActive).map((v) => v.price));
}

export function getTotalStock(product: Product): number {
  if (!product.variants || product.variants.length === 0) return product.stock;
  return product.variants.filter((v) => v.isActive).reduce((sum, v) => sum + v.stock, 0);
}
