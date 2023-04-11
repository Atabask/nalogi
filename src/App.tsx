import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Registration } from '@components/Registration/Registration';
import { Login } from '@app/src/components/LoginComp/Login';
import { Navigation } from '@app/src/components/Navigation/Navigation';
import { 
  Page404, 
  DataHousingAndCommunalServices,
  HomePage,
  HistoryPage,
  User,
  Calculate
} from '@pages/index';



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
