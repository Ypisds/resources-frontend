import { createBrowserRouter } from "react-router-dom";
import { Login } from "./component/Login/Login";
import { Register } from "./component/Register/Register";

const router = createBrowserRouter(
    [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        }
    ]
)

export default router