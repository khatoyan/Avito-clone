import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById, deleteItem } from "../api/advertService";
import { Advert, RealEstateItem, AutoItem, ServiceItem } from "../types/advert";
import { Card, Button, Spin, message, Image, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import placeholder from "../assets/placeholder.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchAdvert = async (advertId: number) => {
    try {
      setLoading(true);
      const data = await getItemById(advertId);
      setAdvert(data);
    } catch (error) {
      console.error(error);
      message.error("Ошибка при загрузке объявления");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const advertId = parseInt(id, 10);
      fetchAdvert(advertId);
    }
  }, [id]);

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deleteItem,
    onSuccess: () => {
      message.success("Объявление удалено");
      queryClient.invalidateQueries({ queryKey: ["adverts"] });
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      message.error("Ошибка при удалении объявления");
    },
  });

  const handleEdit = () => {
    if (advert) {
      navigate("/form", { state: { advert } });
    }
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Вы уверены, что хотите удалить это объявление?",
      icon: <ExclamationCircleOutlined />,
      okText: "Да",
      okType: "danger",
      cancelText: "Отмена",
      onOk() {
        if (advert && advert.id !== undefined) {
          deleteMutation.mutate(advert.id);
        }
      },
    });
  };

  if (loading || !advert) {
    return <Spin />;
  }

  const renderAdvertDetails = () => {
    switch (advert.type) {
      case "Недвижимость": {
        const realEstate = advert as RealEstateItem;
        return (
          <>
            <p>
              <strong>Тип недвижимости:</strong> {realEstate.propertyType}
            </p>
            <p>
              <strong>Площадь:</strong> {realEstate.area} кв. м
            </p>
            <p>
              <strong>Количество комнат:</strong> {realEstate.rooms}
            </p>
            <p>
              <strong>Цена:</strong> {realEstate.price}
            </p>
          </>
        );
      }
      case "Авто": {
        const auto = advert as AutoItem;
        return (
          <>
            <p>
              <strong>Марка:</strong> {auto.brand}
            </p>
            <p>
              <strong>Модель:</strong> {auto.model}
            </p>
            <p>
              <strong>Год выпуска:</strong> {auto.year}
            </p>
            <p>
              <strong>Пробег:</strong> {auto.mileage}
            </p>
          </>
        );
      }
      case "Услуги": {
        const service = advert as ServiceItem;
        return (
          <>
            <p>
              <strong>Тип услуги:</strong> {service.serviceType}
            </p>
            <p>
              <strong>Опыт работы:</strong> {service.experience} лет
            </p>
            <p>
              <strong>Стоимость:</strong> {service.cost}
            </p>
            {service.workSchedule && (
              <p>
                <strong>График работы:</strong> {service.workSchedule}
              </p>
            )}</>
          );
        }
        default:
          return null;
      }
    };
  
    const imageUrl = advert.image || placeholder;
  
    return (
      <Card
        title={advert.name}
        cover={
          <Image
            alt={advert.name}
            src={imageUrl}
            preview={false}
            style={{ width: "100%", height: 300, objectFit: "contain" }}
          />
        }
        style={{ maxWidth: 600, margin: "20px auto" }}
      >
        <p>
          <strong>Описание:</strong> {advert.description}
        </p>
        <p>
          <strong>Локация:</strong> {advert.location}
        </p>
        <p>
          <strong>Категория:</strong> {advert.type}
        </p>
        {renderAdvertDetails()}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button type="primary" onClick={handleEdit}>
            Редактировать
          </Button>
          <Button danger onClick={showDeleteConfirm}>
            Удалить
          </Button>
        </div>
      </Card>
    );
  };
  
  export default ItemPage;