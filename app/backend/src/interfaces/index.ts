// import { Request } from 'express';

export interface AuthenticationCredentials {
  username: string;
  password: string;
}

export interface CreateUserRequestBody {
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface User {
  id: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface CreateProductRequestBody {
  name: string;
  amount: string; // NUMBER?
}

export interface ProductReturned {
  id: number;
  name: string;
  amount: string;
}

export interface ProductRequestBodyWithOrderId {
  name: string;
  amount: string;
  orderId: number;
}

export interface Product {
  id: number;
  name: string;
  amount: string;
  orderId: number;
}

export interface OrderForRequests {
  id: number;
  userId: number;
}

export interface OrderDTO {
  id: number;
  userId: number;
  productsIds: number[];
}

export interface NewOrderPayload {
  productsIds: number[];
  userId: number;
}

export interface NewOrderRequestBody {
  productsIds: number[];
}

export interface JWTPayload {
  id: number;
  username: string;
}
