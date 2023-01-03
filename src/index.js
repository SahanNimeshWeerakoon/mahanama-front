import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import AddEditVehicle from './features/vehicle/AddEditVehicle';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/addVehicle' element={ <AddEditVehicle /> } />
            <Route path='/editVehicle/:id' element={ <AddEditVehicle /> } />
            <Route path='/login' element={ <Login /> } />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
