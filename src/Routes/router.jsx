import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
// import Home from '../pages/Home/Home/Home';
import Login from "../Pages/Shared/Login/Login";
import Singup from "../Pages/Shared/Singup/Singup";
import ErrorPage from "../Components/Error/ErrorPage";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Dashbord from "../Layouts/Dashbord";
import AddClass from "../Dashbord/AddClass/AddClass";
import MyClasses from "../Dashbord/MyClasses/MyClasses";
import PrivateRoute from "./PrivateRoute";
import MySelectedClass from "../Dashbord/MySelectedClass/MySelectedClass";
import Payment from "../Dashbord/Payment/Payment";
import EnrolledClass from "../Dashbord/EnrolledClasses/EnrolledClass";
import PaymentHistory from "../Dashbord/PaymentHistory/PaymentHistory";
import ManageUsers from "../Dashbord/ManageUsers/ManageUsers";
import ManageClass from "../Dashbord/ManageClass/ManageClass";
import Community from "../Pages/community/Community";
import PaymentChoose from "../Pages/payments/PaymentChoose";
import SslPay from "../Pages/payments/ssl/SslPay";
import DashbordHome from "../Dashbord/DashbordHome/DashbordHome";
import CouresDetails from "../Pages/couresDetails/CouresDetails";
import CouresContent from "../Dashbord/coures-content/CouresContent";
import LiveChat from "../Dashbord/live-chat/LiveChat";
import Home from "../Pages/Home/Home/Home";
import CouresPlayerLayout from "../Layouts/CouresPlayerLayout";
import AddModule from "../Dashbord/AddCouresModule";
import ClubMembers from "../Dashbord/ViewClubMembers";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/courses/:id',
                element: <CouresDetails />
            },
            {
                path: '/comming-soon',
                element: <Community />
            }
        ]

    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/singup',
        element: <Singup></Singup>
    },
    {
        path: '/dashbord',
        element: <PrivateRoute><Dashbord></Dashbord></PrivateRoute>,
        children: [
            {
                path: '',
                element: <DashbordHome />
            },
            {
                path: 'addnew',
                element: <AddClass></AddClass>
            },
            {
                path:'addnewmodule',
                element: <AddModule />
            },
            {
                path:'club-members',
                element: <PrivateRoute><ClubMembers /></PrivateRoute>
            },
            {
                path: 'myclasses',
                element: <MyClasses></MyClasses>
            },
            {
                path: 'mycart',
                element: <MySelectedClass></MySelectedClass>
            },
            {
                path: 'payment-choose',
                element: <PaymentChoose />
            },
            {
                path: 'ssl-pay',
                element: <SslPay />
            },
            {
                path: 'stripe-pay',
                element: <Payment />
            },
            {
                path: 'enrolled-class',
                element: <EnrolledClass></EnrolledClass>
            },
            {
                path: 'coures-content',
                element: <CouresContent />
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'manage-classes',
                element: <ManageClass></ManageClass>
            },
            {
                path: 'live-chat',
                element: <LiveChat />
            }
        ]
    },
    {
        path: '/coures-content',
        element: <PrivateRoute><CouresPlayerLayout /></PrivateRoute>
    }
])