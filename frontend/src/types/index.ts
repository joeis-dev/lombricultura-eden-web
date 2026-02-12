export interface User {
  id: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  imageUrls: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId?: string;
  guestEmail?: string;
  guestPhone?: string;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: Address;
  billingAddress?: Address;
  notes?: string;
  items: OrderItem[];
  payment?: Payment;
  shipment?: Shipment;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  productSnapshot: Record<string, any>;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  stripePaymentId?: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  paymentMethod?: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Shipment {
  id: string;
  orderId: string;
  trackingNumber?: string;
  carrier?: string;
  status: ShipmentStatus;
  estimatedDelivery?: string;
  actualDelivery?: string;
  shippingCost?: number;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type ShipmentStatus =
  | 'PENDING'
  | 'LABEL_CREATED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'FAILED';

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  additionalInfo?: string;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  orderId?: string;
  rating: number;
  comment?: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterRequest {
  email?: string;
  phone?: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ThemeConfig {
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  logo: string;
  favicon: string;
  fonts: {
    heading: string;
    body: string;
  };
  features: {
    guestCheckout: boolean;
    userReviews: boolean;
    sellerPanel: boolean;
    whatsappNotifications: boolean;
    emailNotifications: boolean;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
  errors?: Record<string, string>;
}
