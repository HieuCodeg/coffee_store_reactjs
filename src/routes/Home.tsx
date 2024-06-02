import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/loginService";

function Home() {
  const userInfor = getUserInfo();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfor) {
      navigate("/cashier");
    } else {
      navigate("/login");
    }
  }, [navigate, userInfor]);

  return null;
}

export default Home;
