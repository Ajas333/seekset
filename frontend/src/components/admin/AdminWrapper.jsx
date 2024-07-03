import React,{useEffect} from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminHome from '../../pages/Admin/AdminHome'
import AdminLogin from '../../pages/Admin/AdminLogin'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { set_Authentication } from '../../Redux/Authentication/authenticationSlice'
import isAuthAdmin from '../../utils/isAuthAdmin';
import AdminHeader from './AdminHeader';
import CandidateList from '../../pages/Admin/CandidateList';
import EmployerList from '../../pages/Admin/EmployerList';
import Reports from '../../pages/Admin/Reports';
import Cdetails from '../../pages/Admin/Cdetails';
import Edetails from '../../pages/Admin/Edetails';

function AdminWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector((state) => state.authentication_user);

  const token = localStorage.getItem("access");

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );

      // if (isAuthenticated.isAuthenticated) {
      //   const res = await axios.get(baseURL + "/api/accounts/user/details/", {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   console.log('the user response is', res);

      //   dispatch(
      //     set_user_basic_details({
      //       name: res.data.first_name,
      //       profile_pic: res.data.profile_pic,
      //     })
      //   );
      // }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
  }, []);
  return (
    <div>
      <AdminHeader/>
        <Routes>
          <Route path='/' element={<AdminLogin/>}></Route>
          <Route path='home/' element={<AdminHome/>} ></Route>
          <Route path='clist/' element={<CandidateList/>} ></Route>
          <Route path='elist/' element={<EmployerList/>} ></Route>
          <Route path='report/' element={<Reports/>} ></Route>
          <Route path='cdetails/:id' element={<Cdetails/>} ></Route>
          <Route path='edetails/:id' element={<Edetails/>} ></Route>
        </Routes>
    </div>
  )
}
export default AdminWrapper
