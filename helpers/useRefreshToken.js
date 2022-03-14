import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/reducers/authSlice";
export function useRefreshToken() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/auth/refresh`, {
          withCredentials: true,
        });
        dispatch(
          setAuth({
            auth: data.auth,
            user: data.user,
          })
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return { loading };
}
