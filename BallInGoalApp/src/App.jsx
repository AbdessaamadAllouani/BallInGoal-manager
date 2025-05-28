import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LivePage from "./pages/livePage/LivePage";
import SignUp from "./pages/signUp/SignUp";
import NewsDetails from "./pages/NewsDetails/NewsDetails";
import AllNews from "./pages/AllNews/AllNews";
import GoogleSuccess from "./components/GoogleSuccess";
import useAuth from "./hook/useUser";
import AdminPage from "./pages/adminPage/AdminPage";
import ClassementEtStatistique from "./pages/classement/ClassementStatistique";
import CreateCompetition from "./pages/competitionPage/CreateCompetition";
import CompetitionsList from "./pages/competitionPage/CompetitionsList";
import TeamStatisticsPage from "./pages/teamStatic/TeamStatisticsPage";
import Loader from "./components/Loader"; // تأكد من وجوده

const PrivateRoute = ({ roleRequired }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/" replace />;
  if (roleRequired && user.role !== roleRequired)
    return <Navigate to="/" replace />;

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/Diffusion" element={<LivePage />} />
        <Route path="/Inscription" element={<SignUp />} />
        <Route path="/news" element={<AllNews />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route
          path="/ClassementStatistique"
          element={<ClassementEtStatistique />}
        />
        <Route
          path="/Statistique-Club/:clubId"
          element={<TeamStatisticsPage />}
        />

        {/* Protected Routes */}
        <Route element={<PrivateRoute roleRequired="admin" />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/Competition" element={<CreateCompetition />} />
          <Route path="/ListCompetition" element={<CompetitionsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
