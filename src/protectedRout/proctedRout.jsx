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
  const role = useSelector((state) => state.user?.userInfo?.role);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);

      try {
        const response = await getData(`${BaseUrl}${SESSION}${Chick}`, {});
        const userData = response.data;

        dispatch(setUserInfo(userData));
        setAuthorized(true);

      } catch (err) {
        dispatch(clearUserInfo());
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  // تحميل الصفحة
  if (loading) return <APPLoading />;

  // ❌ غير مسموح بالدخول
  if (!allowedRole.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // ✔ مسموح
  return <Outlet />;
}

