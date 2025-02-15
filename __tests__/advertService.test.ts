import { createItem } from '../src/api/advertService';
import { Advert } from '../src/types/advert';

jest.mock('../src/api/axiosInstance', () => {
  return {
    __esModule: true,
    default: {
      post: jest.fn(),
    },
  };
});

import axiosInstance from '../src/api/axiosInstance';

describe('advertService', () => {
  test('createItem отправляет правильные данные и возвращает созданное объявление', async () => {
    const newAdvert: Advert = {
      name: 'Test Advert',
      description: 'Test Description',
      location: 'Test Location',
      type: 'Авто',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      mileage: 5000,
    };

    const responseData = { ...newAdvert, id: 1 };
    (axiosInstance.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const result = await createItem(newAdvert);
    expect(axiosInstance.post).toHaveBeenCalledWith('/items', newAdvert);
    expect(result).toEqual(responseData);
  });
});
