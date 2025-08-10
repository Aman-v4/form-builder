import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateForm from '../pages/CreateForm';
import PreviewForm from '../pages/PreviewForm';
import MyForms from '../pages/MyForms';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<CreateForm />} />
        <Route path="/preview/:formId" element={<PreviewForm />} />
        <Route path="/myforms" element={<MyForms />} />
        <Route path="*" element={<Navigate to="/myforms" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
