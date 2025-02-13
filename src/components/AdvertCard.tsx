import React from "react";
import { Card, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { Advert } from "../types/advert";
import placeholder from "../assets/placeholder.png";

interface AdvertCardProps {
  advert: Advert;
}

const AdvertCard: React.FC<AdvertCardProps> = ({ advert }) => {
  const navigate = useNavigate();
  const imageUrl = advert.image || placeholder;

  const handleOpen = () => {
    if (advert.id !== undefined) {
      navigate(`/item/${advert.id}`);
    }
  };

  return (
    <Card style={{ margin: "15px 0", padding: "15px", borderRadius: "10px" }}>
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
          <p style={{ marginBottom: "10px" }}>Категория: {advert.type}</p>
          <Button type="primary" onClick={handleOpen}>
            Открыть
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AdvertCard;