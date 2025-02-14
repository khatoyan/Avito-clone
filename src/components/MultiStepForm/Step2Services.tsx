import React from "react";
import { Form, Select, Button, Input, InputNumber } from "antd";

const { Option } = Select;

export interface Step2ServicesInputs {
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export interface Step2ServicesProps {
  onNext: (data: Step2ServicesInputs) => void;
  onBack: () => void;
  onCancel: () => void;
}

const Step2Services: React.FC<Step2ServicesProps> = ({ onNext, onBack, onCancel }) => {
  const [form] = Form.useForm<Step2ServicesInputs>();

  const onFinish = (values: Step2ServicesInputs) => {
    onNext(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Тип услуги"
        name="serviceType"
        rules={[{ required: true, message: "Обязательное поле" }]}
      >
        <Select placeholder="Выберите тип">
          <Option value="ремонт">Ремонт</Option>
          <Option value="уборка">Уборка</Option>
          <Option value="доставка">Доставка</Option>
          <Option value="другое">Другое</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Опыт работы (лет)"
        name="experience"
        rules={[
          { required: true, message: "Введите опыт работы" },
          { type: "number", min: 0, message: "Опыт работы не может быть отрицательным" },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Стоимость"
        name="cost"
        rules={[
          { required: true, message: "Введите стоимость" },
          { type: "number", min: 1, message: "Стоимость должна быть положительным числом" },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="График работы (опционально)" name="workSchedule">
        <Input />
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

export default Step2Services;