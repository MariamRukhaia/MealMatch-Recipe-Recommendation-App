import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage';
import RegisterPage from './pages/RegisterPage';
// import HomePage from './pages/HomePage'
import CuisineSelectionPage from "./pages/CuisineSelectionPage";
import IngredientsSelectionPage from "./pages/IngredientsSelectionPage";
// import RecipesPage from "./pages/RecipesPage";
import ProfilePage from './pages/ProfilePage'
import DiscoverPage from './pages/DiscoverPage'
import FavoritesPage from './pages/FavoritesPage'
import MissingIngredientsPage from "./pages/MissingIngredientsPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        {/* <Route path="home" element={<HomePage />} /> */}
        <Route path="/cuisine" element={<CuisineSelectionPage />} />
        <Route path="/ingredients" element={<IngredientsSelectionPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="discover" element={<DiscoverPage />}/>
        <Route path="favorites" element={<FavoritesPage />}/>
        <Route path="/missing-ingredients" element={<MissingIngredientsPage />} />
        <Route path="/order-summary" element={<OrderSummaryPage />} />
        <Route path="/confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </div>
  );
}

export default App;
