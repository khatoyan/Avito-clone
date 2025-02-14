import React from "react";
import { Pagination } from "antd";

interface PaginationProps {
  currentPage: number;
  total: number;
  onChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ currentPage, total, onChange }) => {
  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={5}
      onChange={onChange}
      style={{ textAlign: "center", marginTop: "20px" }}
    />
  );
};

export default CustomPagination;
