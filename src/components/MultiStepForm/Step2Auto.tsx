import React from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

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
        <Select placeholder="Выберите марку">
          <Option value="Toyota">Toyota</Option>
          <Option value="BMW">BMW</Option>
          <Option value="Mercedes">Mercedes</Option>
        </Select>
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
        rules={[{ required: true, message: "Введите год выпуска" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Пробег (км)"
        name="mileage"
        rules={[{ required: true, message: "Введите число" }]}
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

export default Step2Auto;
