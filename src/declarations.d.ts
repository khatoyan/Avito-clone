declare module "*.png" {
    const value: string;
    export default value;
  }

declare module "*.css";

// Добавил для корректной обработки изображений и подключения стилей помимо antd