import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClaimDetailPage from "./pages/claim-detail-page";
import ClaimsPage from "./pages/claims-page";
import NotFoundPage from "./pages/not-found-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClaimsPage />} />
        <Route path="/claims/:id" element={<ClaimDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
