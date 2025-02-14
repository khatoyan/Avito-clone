import React from "react";
import { Card, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { Advert } from "../types/advert";
import placeholder from "../assets/placeholder.png";
import { HomeOutlined, CarOutlined, ToolOutlined } from "@ant-design/icons";

interface AdvertCardProps {
  advert: Advert;
}

const AdvertCard: React.FC<AdvertCardProps> = ({ advert }) => {
  const navigate = useNavigate();
  const imageUrl = advert.image || placeholder;

  const getCategoryIcon = () => {
    switch (advert.type) {
      case "Недвижимость":
        return <HomeOutlined style={{ marginRight: 5 }} />;
      case "Авто":
        return <CarOutlined style={{ marginRight: 5 }} />;
      case "Услуги":
        return <ToolOutlined style={{ marginRight: 5 }} />;
      default:
        return null;
    }
  };

  const handleOpen = () => {
    if (advert.id !== undefined) {
      navigate(`/item/${advert.id}`);
    }
  };

  return (
    <Card style={{ width: "90%", margin: "0", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ width: "150px" }}>
          <Image
            src={imageUrl}
            alt={advert.name}
            preview={false}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: "10px" }}>{advert.name}</h3>
          <p style={{ marginBottom: "5px" }}>Локация: {advert.location}</p>
          <p style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
            {getCategoryIcon()} Категория: {advert.type}
          </p>
          <Button type="primary" onClick={handleOpen}>
            Открыть
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AdvertCard;
