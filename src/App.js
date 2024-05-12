import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Favorites from './pages/favorites/favorites';
import Details from './pages/details/details';
import Navbar from './components/navbar/navbar';
import DetailItem from './components/detail-item/detail-item';

function App() {
  return (
    <div className='base-container'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        {/* 쿼리 파라미터 /: (동적으로 URL을 설정하는 페이지) */}
        <Route path='/detail/:id' element={<Details />}></Route>
      </Routes>

      

    </div>
  );
}

export default App;
