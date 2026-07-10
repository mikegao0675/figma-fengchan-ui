import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./shell/AppShell";
import DashboardPage from "./pages/DashboardPage";
import PenaltyPage from "./penalty/PenaltyPage";
import LogisticsPage from "./logistics/LogisticsPage";
import ProfitPage from "./profit/ProfitPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import CatalogPage from "./catalog/CatalogPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Customer-facing catalog — standalone, no admin shell */}
        <Route path="catalog" element={<CatalogPage />} />

        {/* Internal admin shell */}
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="penalty" element={<PenaltyPage />} />
          <Route path="logistics" element={<LogisticsPage />} />
          <Route path="profit" element={<ProfitPage />} />
          <Route path="design" element={<DesignSystemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
