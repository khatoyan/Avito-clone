import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import FormPage from "../pages/FormPage";
import ListPage from "../pages/ListPage";
import ItemPage from "../pages/ItemPage";
import DraftsPage from "../pages/DraftsPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/form" element={<FormPage />} />
          <Route path="/" element={<ListPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/drafts" element={<DraftsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;