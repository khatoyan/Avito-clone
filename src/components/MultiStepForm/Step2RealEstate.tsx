import React from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

export interface Step2RealEstateInputs {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface Step2RealEstateProps {
  onNext: (data: Step2RealEstateInputs) => void;
  onBack: () => void;
  onCancel: () => void;
}

const Step2RealEstate: React.FC<Step2RealEstateProps> = ({ onNext, onBack, onCancel }) => {
  const [form] = Form.useForm<Step2RealEstateInputs>();

  const onFinish = (values: Step2RealEstateInputs) => {
    onNext(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Тип недвижимости"
        name="propertyType"
        rules={[{ required: true, message: "Обязательное поле" }]}
      >
        <Select placeholder="Выберите тип">
          <Option value="квартира">Квартира</Option>
          <Option value="дом">Дом</Option>
          <Option value="коттедж">Коттедж</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Площадь (кв. м)"
        name="area"
        rules={[{ required: true, message: "Введите площадь" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Количество комнат"
        name="rooms"
        rules={[{ required: true, message: "Введите количество комнат" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Цена"
        name="price"
        rules={[{ required: true, message: "Введите цену" }]}
      >
        <Input type="number" />
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

export default Step2RealEstate;