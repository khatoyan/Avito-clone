export type AdvertType = "Недвижимость" | "Авто" | "Услуги";

// Общие поля объявления
export interface BaseAdvert {
  id?: number; // опционально при создании, сервер генерирует id
  name: string;
  description: string;
  location: string;
  type: AdvertType;
  image?: string;
}

// Объявление для недвижимости
export interface RealEstateItem extends BaseAdvert {
  type: "Недвижимость";
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

// Объявление для авто
export interface AutoItem extends BaseAdvert {
  type: "Авто";
  brand: string;
  model: string;
  year: number;
  mileage: number;
}

// Объявление для услуг
export interface ServiceItem extends BaseAdvert {
  type: "Услуги";
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

// Объединяющий тип объявления
export type Advert = RealEstateItem | AutoItem | ServiceItem;