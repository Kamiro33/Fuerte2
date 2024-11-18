import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './components/Authentication/Login';
import Register from './components/AuthenticationRegister';
import Dashboard from './Pages/Dashboard';
import ManageExercises from './components/ManageExercises';
import PlanWorkout from './components/Workouts/PlanWorkout';
import UserProgress from './Pages/UserProgress';
import PrivateRoute from './components/PrivateRoute';
import ProgressChart from './components/Progress/ProgressChart';
import ProgressStats from './components/Progress/ProgressStats';
import CoachDashboard from './components/Coach/CoachDashboard';
import TrainingPlans from './Pages/TrainingPlans';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Rutas públicas */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* Ruta protegida por PrivateRoute */}
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/CoachDashboard"
          element={
            <PrivateRoute requiredRole="ROLE_COACH">
              <CoachDashboard />
            </PrivateRoute>
          }
        />

        {/* Rutas adicionales */}
        <Route
          path="/ManageExercises"
          element={
            <PrivateRoute>
              <ManageExercises />
            </PrivateRoute>
          }
        />
        <Route
          path="/PlanWorkout"
          element={
            <PrivateRoute>
              <PlanWorkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/Progress"
          element={
            <PrivateRoute>
              <UserProgress />
            </PrivateRoute>
          }
        />
        <Route
          path="/ProgressChart"
          element={
            <PrivateRoute>
              <ProgressChart />
            </PrivateRoute>
          }
        />
        <Route
          path="/ProgressStats"
          element={
            <PrivateRoute>
              <ProgressStats />
            </PrivateRoute>
          }
        />

        {/* Ruta de TrainingPlans */}
        <Route
          path="/TrainingPlans"
          element={
            <PrivateRoute>
              <TrainingPlans />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;