import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { BaseUrl, Chick, SESSION } from "../Back_end/Api";
import { getData } from "../Back_end/ApiServecies";
import { CircularProgress } from "@mui/material";
import { clearUserInfo, setUserInfo } from "../slices/userInfo";
import APPLoading from "../loader/AppLoading";


const cookies = new Cookies();

export default function ProtectedRoute({ allowedRole }) {
    const roles = useSelector((state) => state.user?.userInfo?.role);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  
useEffect(() => {
  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await getData(`${BaseUrl}${SESSION}${Chick}`,{})

        const userData = response.data;

      dispatch(setUserInfo(userData)); // 🟢 تخزين بيانات السيرفر
      setAuthorized(true);

    } catch (err) {
      console.log(err);
      dispatch(clearUserInfo()); // 🛑 حذف المستخدم
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  checkSession();
}, [dispatch]);



  if (loading) return <APPLoading />;
if (allowedRole && allowedRole !== roles) {
  return <Navigate to="/login" replace />;
}
  if (allowedRole && ![].concat(allowedRole).some((r) => roles.includes(r))) {
    // return <FORBIDDIN />;
  }
  return <Outlet />;
}
