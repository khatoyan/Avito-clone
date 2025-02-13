import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../api/advertService";
import { Advert, RealEstateItem, AutoItem, ServiceItem } from "../types/advert";
import AdvertCard from "../components/AdvertCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import CustomPagination from "../components/Pagination";
import { Button, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

const ListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;
  const navigate = useNavigate();

  // Используем React Query для загрузки данных
  const { data: adverts = [], isLoading, error } = useQuery<Advert[]>({
    queryKey: ['adverts'],
    queryFn: getItems,
  });

  if (error) {
    message.error("Ошибка при загрузке объявлений");
  }

  // Фильтрация и поиск. Здесь используем useMemo для пересчёта при изменении зависимостей.
  const filteredAdverts = useMemo(() => {
    let filtered = [...adverts];

    // Поиск по названию
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтрация по выбранной категории
    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.type.toLowerCase() === selectedCategory.toLowerCase()
      );

      // Дополнительные фильтры для каждой категории
      if (selectedCategory === "Недвижимость") {
        if (filters.minArea !== undefined) {
          filtered = filtered.filter(
            (item) => (item as RealEstateItem).area >= filters.minArea
          );
        }
        if (filters.maxPrice !== undefined) {
          filtered = filtered.filter(
            (item) => (item as RealEstateItem).price <= filters.maxPrice
          );
        }
      }
      if (selectedCategory === "Авто") {
        if (filters.minYear !== undefined) {
          filtered = filtered.filter(
            (item) => (item as AutoItem).year >= filters.minYear
          );
        }
        if (filters.maxMileage !== undefined) {
          filtered = filtered.filter(
            (item) => (item as AutoItem).mileage <= filters.maxMileage
          );
        }
      }
      if (selectedCategory === "Услуги") {
        if (filters.minExperience !== undefined) {
          filtered = filtered.filter(
            (item) => (item as ServiceItem).experience >= filters.minExperience
          );
        }
      }
    }

    return filtered;
  }, [adverts, searchQuery, selectedCategory, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFiltersChange = (key: string, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAdverts = filteredAdverts.slice(startIndex, startIndex + pageSize);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Список объявлений</h1>
      <Button
        type="primary"
        onClick={() => navigate("/form")}
        style={{ marginBottom: "20px" }}
      >
        Разместить объявление
      </Button>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <FilterPanel
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {paginatedAdverts.map((advert) => (
              <AdvertCard key={advert.id} advert={advert} />
            ))}
          </div>
          <CustomPagination
            currentPage={currentPage}
            total={filteredAdverts.length}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ListPage;
