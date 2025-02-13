// src/components/SearchBar.tsx
import React from "react";
import { Input } from "antd";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Поиск объявлений..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ marginBottom: "20px", width: "100%" }}
    />
  );
};

export default SearchBar;
