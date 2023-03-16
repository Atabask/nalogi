import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Registration } from '@components/Registration/Registration';
import { Login } from '@components/Login/login';
import { Navigation } from '@components/Navigation/navigation';
import { Page404 } from './pages/404page';
import { DataHousingAndCommunalServices } from './pages/DataHousingAndCommunalServices';
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/History';
import { User } from './pages/Profile';
import { Calculate } from './pages/CalculatePage';


function App() {

  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='*' element={<Page404 />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/history' element={<HistoryPage />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/data' element={<DataHousingAndCommunalServices />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/user' element={<User />}/>
        <Route path='/calculate' element={<Calculate />}/>
      </Routes>
    </div>
  );
}

export default App;
