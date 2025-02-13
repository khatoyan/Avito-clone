import React, { useState, useEffect } from "react";
import { Card, message, Spin, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Step1Form, { Step1FormInputs } from "./Step1Form";
import Step2RealEstate, { Step2RealEstateInputs } from "./Step2RealEstate";
import Step2Auto, { Step2AutoInputs } from "./Step2Auto";
import Step2Services, { Step2ServicesInputs } from "./Step2Services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem } from "../../api/advertService";
import { Advert, RealEstateItem, AutoItem, ServiceItem } from "../../types/advert";
import placeholderImage from "../../assets/placeholder.png";

export interface FormData {
  title: string;
  description: string;
  location: string;
  category: "Недвижимость" | "Авто" | "Услуги";
  image?: string;
  // Недвижимость
  propertyType?: string;
  area?: number;
  rooms?: number;
  price?: number;
  // Авто
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  // Услуги
  serviceType?: string;
  experience?: number;
  cost?: number;
  workSchedule?: string;
}

const STORAGE_KEY = "advertFormDraft";

const validateFormData = (data: Partial<FormData>): FormData | null => {
  if (!data.title || !data.description || !data.location || !data.category) {
    message.error("Пожалуйста, заполните все обязательные поля (название, описание, локация, категория)");
    return null;
  }
  switch (data.category) {
    case "Недвижимость":
      if (!data.propertyType || data.area == null || data.rooms == null || data.price == null) {
        message.error("Заполните все обязательные поля для недвижимости");
        return null;
      }
      break;
    case "Авто":
      if (!data.brand || !data.model || data.year == null || data.mileage == null) {
        message.error("Заполните все обязательные поля для авто");
        return null;
      }
      break;
    case "Услуги":
      if (!data.serviceType || data.experience == null || data.cost == null) {
        message.error("Заполните все обязательные поля для услуг");
        return null;
      }
      break;
    default:
      message.error("Неверная категория");
      return null;
  }
  return data as FormData;
};

interface LocationState {
  advert?: Advert;
  advertDraft?: Partial<FormData>;
}

const MultiStepForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const queryClient = useQueryClient();

  // Определяем начальные значения. Если редактирование (state.advert) – преобразуем данные
  const getInitialData = (): Partial<FormData> => {
    if (state.advert) {
      const advert = state.advert;
      if (advert.type === "Недвижимость") {
        return {
          title: advert.name,
          description: advert.description,
          location: advert.location,
          category: "Недвижимость",
          image: advert.image,
          propertyType: (advert as RealEstateItem).propertyType,
          area: (advert as RealEstateItem).area,
          rooms: (advert as RealEstateItem).rooms,
          price: (advert as RealEstateItem).price,
        };
      } else if (advert.type === "Авто") {
        return {
          title: advert.name,
          description: advert.description,
          location: advert.location,
          category: "Авто",
          image: advert.image,
          brand: (advert as AutoItem).brand,
          model: (advert as AutoItem).model,
          year: (advert as AutoItem).year,
          mileage: (advert as AutoItem).mileage,
        };
      } else if (advert.type === "Услуги") {
        return {
          title: advert.name,
          description: advert.description,
          location:advert.location,
          category: "Услуги",
          image: advert.image,
          serviceType: (advert as ServiceItem).serviceType,
          experience: (advert as ServiceItem).experience,
          cost: (advert as ServiceItem).cost,
          workSchedule: (advert as ServiceItem).workSchedule,
        };
      }
    } else if (state?.advertDraft) {
      return state.advertDraft;
    } else {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  };

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<FormData>>(getInitialData());

  // Если редактируется, можно удалить черновик сразу
  useEffect(() => {
    if (state?.advert) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Если редактирование: используем updateItem, иначе createItem
  const mutation = useMutation<Advert, Error, Advert>({
    mutationFn: (advert: Advert) => {
      return state?.advert && (state.advert.id !== undefined)
        ? updateItem(state.advert.id, advert)
        : createItem(advert);
    },
    onSuccess: () => {
      message.success("Объявление успешно сохранено!");
      localStorage.removeItem(STORAGE_KEY);
      queryClient.invalidateQueries({ queryKey: ["adverts"] });
      navigate("/list");
    },
    onError: (error) => {
      console.error("Ошибка при отправке объявления:", error);
      message.error(error.message || "Ошибка при сохранении объявления");
    },
  });

  const handleCancel = () => {
    navigate("/list");
  };

  const handleNextStep1 = (data: Step1FormInputs) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(1);
  };

  const handleNextRealEstate = (data: Step2RealEstateInputs) => {
    setFormData((prev) => ({ ...prev, ...data }));
    handleSubmit();
  };

  const handleNextAuto = (data: Step2AutoInputs) => {
    setFormData((prev) => ({ ...prev, ...data }));
    handleSubmit();
  };

  const handleNextServices = (data: Step2ServicesInputs) => {
    setFormData((prev) => ({ ...prev, ...data }));
    handleSubmit();
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    const validatedData = validateFormData(formData);
    if (!validatedData) return;
    if (!validatedData.image || typeof validatedData.image !== "string" || !validatedData.image.startsWith("data:")) {
      validatedData.image = placeholderImage;
    }
    let advert: Advert;
    try {
      switch (validatedData.category) {
        case "Недвижимость":
          advert = {
            name: validatedData.title,
            description: validatedData.description,
            location: validatedData.location,
            type: "Недвижимость",
            propertyType: validatedData.propertyType!,
            area: Number(validatedData.area),
            rooms: Number(validatedData.rooms),
            price: Number(validatedData.price),
            image: validatedData.image,
          } as RealEstateItem;
          break;
        case "Авто":
          advert = {
            name: validatedData.title,
            description: validatedData.description,
            location: validatedData.location,
            type: "Авто",
            brand: validatedData.brand!,
            model: validatedData.model!,
            year: Number(validatedData.year),
            mileage: Number(validatedData.mileage),
            image: validatedData.image,
          } as AutoItem;
          break;
        case "Услуги":
          advert = {
            name: validatedData.title,
            description: validatedData.description,
            location: validatedData.location,
            type: "Услуги",
            serviceType: validatedData.serviceType!,
            experience: Number(validatedData.experience),
            cost: Number(validatedData.cost),
            workSchedule: validatedData.workSchedule,
            image: validatedData.image,
          } as ServiceItem;
          break;
        default:
          throw new Error("Неверная категория");
      }
      mutation.mutate(advert);
    } catch (error: unknown) {
      console.error("Ошибка при подготовке данных:", error);
      message.error("Ошибка при подготовке данных");
    }
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <Step1Form
          initialValues={formData as Step1FormInputs}
          onNext={handleNextStep1}
          onCancel={handleCancel}
        />
      );
    } else if (currentStep === 1) {
      if (formData.category === "Недвижимость") {
        return (
          <Step2RealEstate
            onNext={handleNextRealEstate}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      } else if (formData.category === "Авто") {
        return (
          <Step2Auto
            onNext={handleNextAuto}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      } else if (formData.category === "Услуги") {
        return (
          <Step2Services
            onNext={handleNextServices}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      }
    }
    return null;
  };

  return (
    <Card title={state?.advert ? "Редактирование объявления" : "Объявление"} extra={<Button type="text" onClick={handleCancel}>×</Button>}>
      {mutation.status === "pending" ? <Spin /> : renderStep()}
    </Card>
  );
};

export default MultiStepForm;