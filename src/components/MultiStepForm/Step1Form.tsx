import React from "react";
import { Form, Input, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

export interface Step1FormInputs {
  title: string;
  description: string;
  location: string;
  category: "Недвижимость" | "Авто" | "Услуги";
  image?: string;
}

interface Step1FormProps {
  onNext: (data: Step1FormInputs) => void;
  onCancel: () => void;
  initialValues?: Step1FormInputs;
}

const Step1Form: React.FC<Step1FormProps> = ({ onNext, onCancel, initialValues }) => {
  const [form] = Form.useForm<Step1FormInputs>();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const [preview, setPreview] = React.useState<string | null>(initialValues?.image || null);

  // Функция для сжатия изображения через canvas
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height = height * (MAX_WIDTH / width);
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject("Canvas контекст недоступен");
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
          resolve(dataUrl);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Перед загрузкой изображения сжимаем его
  const beforeUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      message.error("Можно загрузить только изображение!");
      return Upload.LIST_IGNORE;
    }
    try {
      const compressedBase64 = await compressImage(file);
      form.setFieldValue("image", compressedBase64);
      setPreview(compressedBase64);
    } catch (error: unknown) {
      console.error(error);
      message.error("Ошибка обработки изображения");
    }
    return false; // предотвратить автоматическую загрузку
  };

  const onFinish = (values: Step1FormInputs) => {
    onNext(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Название" name="title" rules={[{ required: true, message: "Обязательное поле" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Описание" name="description" rules={[{ required: true, message: "Обязательное поле" }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Локация" name="location" rules={[{ required: true, message: "Обязательное поле" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Категория" name="category" rules={[{ required: true, message: "Выберите категорию" }]}>
        <Select placeholder="Выберите категорию">
          <Option value="Недвижимость">Недвижимость</Option>
          <Option value="Авто">Авто</Option>
          <Option value="Услуги">Услуги</Option>
        </Select>
      </Form.Item>

      <Form.Item name="image" style={{ display: "none" }}><Input />
      </Form.Item>
      <Form.Item label="Фото (необязательно)">
        <Upload beforeUpload={beforeUpload} maxCount={1} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
        </Upload>
      </Form.Item>
      {preview && (
        <Form.Item>
          <img src={preview} alt="Превью" style={{ maxWidth: "100%", maxHeight: 200 }} />
        </Form.Item>
      )}
      <Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onCancel}>Отмена</Button>
          <div>
            <Button onClick={() => form.resetFields()} style={{ marginRight: 10 }}>
              Очистить форму
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

export default Step1Form;