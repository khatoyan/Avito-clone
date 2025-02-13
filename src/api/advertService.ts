import axiosInstance from './axiosInstance';
import { Advert } from '../types/advert';

// Создание объявления (POST /items)
export const createItem = async (data: Advert): Promise<Advert> => {
  const response = await axiosInstance.post<Advert>('/items', data);
  return response.data;
};

// Получение всех объявлений (GET /items)
export const getItems = async (): Promise<Advert[]> => {
  const response = await axiosInstance.get<Advert[]>('/items');
  return response.data;
};

// Получение объявления по ID (GET /items/:id)
export const getItemById = async (id: number): Promise<Advert> => {
  const response = await axiosInstance.get<Advert>(`/items/${id}`);
  return response.data;
};

// Обновление объявления по ID (PUT /items/:id)
export const updateItem = async (id: number, data: Partial<Advert>): Promise<Advert> => {
  const response = await axiosInstance.put<Advert>(`/items/${id}`, data);
  return response.data;
};

// Удаление объявления по ID (DELETE /items/:id)
export const deleteItem = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/items/${id}`);
};