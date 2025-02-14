import React, { useState } from "react";
import { Form, Input, InputNumber, Button, AutoComplete } from "antd";
import { carBrands } from "../..//carBrands";

export interface Step2AutoInputs {
  brand: string;
  model: string;
  year: number;
  mileage: number;
}

export interface Step2AutoProps {
  onNext: (data: Step2AutoInputs) => void;
  onBack: () => void;
  onCancel: () => void;
}

const Step2Auto: React.FC<Step2AutoProps> = ({ onNext, onBack, onCancel }) => {
  const [form] = Form.useForm<Step2AutoInputs>();
  const [options, setOptions] = useState(carBrands.map(brand => ({ value: brand })));
  const currentYear = new Date().getFullYear();

  const handleSearch = (searchText: string) => {
    const filtered = carBrands.filter(
      brand => brand.toLowerCase().includes(searchText.toLowerCase())
    );
    setOptions(filtered.map(brand => ({ value: brand })));
  };

  const onFinish = (values: Step2AutoInputs) => {
    onNext(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Марка"
        name="brand"
        rules={[{ required: true, message: "Обязательное поле" }]}
      >
        <AutoComplete
          options={options}
          onSearch={handleSearch}
          placeholder="Начните вводить марку"
        />
      </Form.Item>

      <Form.Item
        label="Модель"
        name="model"
        rules={[{ required: true, message: "Введите модель" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Год выпуска"
        name="year"
        rules={[
          { required: true, message: "Введите год выпуска" },
          {
            type: "number",
            min: 1900,
            max: currentYear,
            message: `Год выпуска должен быть между 1900 и ${currentYear}`,
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Пробег (км)"
        name="mileage"
        rules={[
          { required: true, message: "Введите пробег" },
          { type: "number", min: 0, message: "Пробег не может быть отрицательным" },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onBack}>Назад</Button>
          <div>
            <Button onClick={onCancel} style={{ marginRight: 10 }}>
              Отмена
            </Button>
            <Button type="primary" htmlType="submit">
              Далее
            </Button>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Step2Auto;