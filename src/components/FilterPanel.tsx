import React from "react";
import { Select, InputNumber } from "antd";

const { Option } = Select;

interface FilterPanelProps {
  category: string;
  onCategoryChange: (category: string) => void;
  filters: Record<string, number>;
  onFiltersChange: (key: string, value: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  category,
  onCategoryChange,
  filters,
  onFiltersChange,
}) => {
  const handleChange = (key: string, value: number | null) => {
    onFiltersChange(key, value ?? 0); // Преобразуем null в 0
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <Select
        placeholder="Категория"
        value={category || undefined}
        onChange={onCategoryChange}
        style={{ width: 150 }}
      >
        <Option value="">Все</Option>
        <Option value="Недвижимость">Недвижимость</Option>
        <Option value="Авто">Авто</Option>
        <Option value="Услуги">Услуги</Option>
      </Select>

      {category === "Недвижимость" && (
        <>
          <InputNumber
            placeholder="Мин. площадь"
            value={filters.minArea}
            onChange={(value) => handleChange("minArea", value)}
          />
          <InputNumber
            placeholder="Макс. цена"
            value={filters.maxPrice}
            onChange={(value) => handleChange("maxPrice", value)}
          /></>
        )}
  
        {category === "Авто" && (
          <>
            <InputNumber
              placeholder="Мин. год"
              value={filters.minYear}
              onChange={(value) => handleChange("minYear", value)}
            />
            <InputNumber
              placeholder="Макс. пробег"
              value={filters.maxMileage}
              onChange={(value) => handleChange("maxMileage", value)}
            />
          </>
        )}
  
        {category === "Услуги" && (
          <>
            <InputNumber
              placeholder="Мин. опыт (лет)"
              value={filters.minExperience}
              onChange={(value) => handleChange("minExperience", value)}
            />
          </>
        )}
      </div>
    );
  };
  
  export default FilterPanel;