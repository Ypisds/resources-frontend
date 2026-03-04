import { createBrowserRouter } from "react-router-dom";
import { Login } from "./component/Login/Login";
import { Register } from "./component/Register/Register";
import { ProtectedRoute } from "./component/ProtectedRoute/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { Resources } from "./component/Resources/Resources";
import { SearchResources } from "./component/SearchResources/SearchResources";

const router = createBrowserRouter(
    [   
        {
            element: <LoginPage />,
            children: [
                {
            path: '/login',
            element: <Login />
                },
                {
            path: '/register',
            element: <Register />
                },
            ] 
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    element: <MainPage />,
                    children: [
                        {
                            path: '/',
                            element: <Resources />
                        },
                        { 
                            path: 'busca', 
                            element: <SearchResources /> 
                        }
                    ]
                }
            ]
        }
    ],

)

export default router