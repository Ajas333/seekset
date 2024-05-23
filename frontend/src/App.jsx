import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import EmployerWrapper from './components/employer/EmployerWrapper'
import CandidateWrapper from './components/candidate/CandidateWrapper'
import AdminWrapper from './components/admin/AdminWrapper'
import LandingPage from './pages/LandingPage'
import useStore from './Redux/useStore'
import { Provider } from 'react-redux'
import ResetPassword from './pages/Common/ResetPassword'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={useStore}>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>

          <Route path='employer/*' element={<EmployerWrapper/>}></Route>
          <Route path='/reset_password/:id' element={<ResetPassword/>} ></Route>
          <Route path='candidate/*' element={<CandidateWrapper/>}></Route>

          <Route path='admin/*' element={<AdminWrapper/>}></Route>
        </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App
