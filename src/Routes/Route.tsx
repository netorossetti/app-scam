import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ContractScam } from '../pages/ContractScam';
import LandingPage from '../pages/LandingPage';

export function AppRoutes(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contractscam" element={<ContractScam />} />
      </Routes>
    </Router>
  );
}