import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from 'sweetalert2';

const url = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['token']);
    const [username, setUsername] = useState("");

    console.log(url, "prod url")
    console.log(cookies.token, "cookie token global");

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                console.log("No token found!");
                return navigate("/login");
            }
            try {
                const { data } = await axios.post(
                    `${url}/`,
                    {},
                    { withCredentials: true }
                );
                console.log("data", data);
                const { status, user } = data;
                if (status) {
                    setUsername(user);
                } else {
                    console.log("User not verified");
                    removeCookie("token");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error verifying user", error);
                navigate("/login");
            }
        };
        verifyCookie();
    }, [cookies.token, navigate, removeCookie]);

    const handleLogout = () => {
        removeCookie("token");
        navigate("/signup");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h2 className="display-3">
                    Welcome <span className="">{username ? username : "Guest"}</span>
                </h2>
                <p className="mb-4 lead fs-3">This task is about resetting your password, so please continue</p>
                <a className="btn btn-primary m-2 ps-3 pe-3" href="/request-password-reset">Reset Password</a>
                <button onClick={handleLogout} className="btn btn-secondary m-2 ps-3 pe-3">Logout</button>
            </div>
        </div>
    );
};

export default Home;
