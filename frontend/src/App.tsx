import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClaimDetailPage from "./pages/claim-detail-page";
import ClaimsPage from "./pages/claims-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClaimsPage />} />
        <Route path="/claims/:id" element={<ClaimDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
