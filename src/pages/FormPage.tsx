import React from "react";
import MultiStepForm from "../components/MultiStepForm/MultiStepForm";
import { Card } from "antd";

const FormPage: React.FC = () => {
  return (
    <Card title="Размещение объявления" style={{ maxWidth: 600, margin: "20px auto" }}>
      <MultiStepForm />
    </Card>
  );
};

export default FormPage;
