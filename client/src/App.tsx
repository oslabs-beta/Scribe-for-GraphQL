import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages';
import Test from './pages/Test';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';

import './styles/index.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/test' element={<Test />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
