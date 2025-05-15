export interface TeaItem {
  id: string;
  name: string;
  description: string;
  category: string;
  prices: {
    [key: string]: number;
  };
  image: string;
  isPopular: boolean;
  flavors?: string[];
  averageRating?: number;
  totalReviews?: number;
}

export interface CartItem {
  id: string;
  cartItemId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: string;
  userId: string;
  teaId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    email: string;
  };
}

export interface DeliveryInfo {
  address: string;
  city: string;
  zipCode: string;
  deliveryTime: string;
  specialInstructions?: string;
}