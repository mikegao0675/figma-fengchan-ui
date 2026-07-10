import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./shell/AppShell";
import DashboardPage from "./pages/DashboardPage";
import PenaltyPage from "./penalty/PenaltyPage";
import LogisticsPage from "./logistics/LogisticsPage";
import ProfitPage from "./profit/ProfitPage";
import DesignSystemPage from "./pages/DesignSystemPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
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
