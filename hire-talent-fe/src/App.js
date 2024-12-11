import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import LoginPage from './features/Login/login';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './features/Home/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>

    </Provider>
  );
}

export default App;
