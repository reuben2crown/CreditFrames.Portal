import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import LandingPage from "./pages/LandingPage";
import FinhackPage from "./pages/FinhackPage";
import ProductsPage from "./pages/ProductsPage";
import CompanyPage from "./pages/CompanyPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import PasswordRecovery from "./pages/PasswordRecovery";
import PasswordReset from "./pages/PasswordReset";
import SearchPage from "./pages/SearchPage";
import LoanRequestPage from "./pages/LoanRequestPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact={true} path={routes.LandingPage} element={<LandingPage />} />
        <Route exact={true} path={routes.FinhackPage} element={<FinhackPage />} />
        <Route exact={true} path={routes.CompanyPage} element={<CompanyPage />} />
        <Route exact={true} path={routes.ProductsPage} element={<ProductsPage />} />
        <Route exact={true} path={routes.ContactPage} element={<ContactPage />} />
        <Route exact={true} path={routes.LoginPage} element={<LoginPage />} />
        <Route exact={true} path={routes.PasswordRecovery} element={<PasswordRecovery />} />
        <Route exact={true} path={routes.PasswordReset} element={<PasswordReset />} />
        <Route exact={true} path={routes.SearchPage} element={<SearchPage />} />
        <Route exact={true} path={routes.LoanRequestPage} element={<LoanRequestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
