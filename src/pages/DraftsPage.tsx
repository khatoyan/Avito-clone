import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FormData } from "../components/MultiStepForm/MultiStepForm";

const STORAGE_KEY = "advertFormDraft";

const DraftsPage: React.FC = () => {
  const navigate = useNavigate();
  const [draftData, setDraftData] = useState<Partial<FormData> | null>(null);

  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      setDraftData(JSON.parse(savedDraft) as Partial<FormData>);
    }
  }, []);

  const handleEditDraft = () => {
    if (draftData) {
      navigate("/form", { state: { advertDraft: draftData } });
    }
  };

  const handleClearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setDraftData(null);
    message.success("Черновик очищен");
  };

  return (
    <Card
      title="Черновики"
      style={{ maxWidth: 600, margin: "20px auto", padding: "20px", borderRadius: "10px" }}
    >
      {draftData ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <p>
            <strong>Название:</strong> {draftData.title || "-"}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="primary" onClick={handleEditDraft}>
              Восстановить черновик
            </Button>
            <Button danger onClick={handleClearDraft}>
              Очистить черновик
            </Button>
          </div>
        </div>
      ) : (
        <p>Нет сохраненных черновиков.</p>
      )}
    </Card>
  );
};

export default DraftsPage;