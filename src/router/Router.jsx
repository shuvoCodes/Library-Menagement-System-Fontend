import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../page/Login";
import Registration from "../page/Registration";
import Home from "../page/Home";
import BrowserBooks from "../page/BrowserBooks";
import ViewDetails from "../page/ViewDetails";
import Reservation from "../page/Reservation";
import PrivateRoute from "../context/PrivateRoute";
import Profile from "../page/Profile";
import ChangePassword from "../page/ChangePassword";
import AdminLayout from "../layout/AdminLayout";
import ManageBooks from "../page/Admin/ManageBooks";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/registration',
                element: <Registration />,
            },
            {
                path: '/books',
                element: <BrowserBooks />,
            },
            {
                path: '/book/:id',
                element: <ViewDetails />,
            },
            {
                path: '/reserve/my',
                element: <PrivateRoute><Reservation /></PrivateRoute>,
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
            {
                path: '/changepassword',
                element: <PrivateRoute><ChangePassword /></PrivateRoute>,
            }

        ]

    }, {
        path: '/admin/managebooks',
        element:<AdminLayout/>,
        children: [
            {
                path:'/admin/managebooks',
                element: <ManageBooks/>
            }
         ]
    }
]);
