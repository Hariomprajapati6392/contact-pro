import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router"
import "./App.css"

import Login from './components/login/Login.jsx'
import './components/login/Login.css';
import Registation from './components/Registation/Registation.jsx'
import './components/Registation/Registation.css';
import "./components/AdminPanel/Header.css"
import Dashboard from './components/dashboard/Dashboard.jsx'
import "./components/dashboard/Dashboard.css"
import AddContact from './components/contactForm/AddContact/AddContact.jsx';
import './components/contactForm/ContactForm.css'
import UpdateContact from './components/contactForm/updateContact/updateContact.jsx';

const routers = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/registation",
        element: <Registation />
    },
    {
        path: "/dashboard",
        element: <Dashboard />

    }, {
        path: '/addcontact',
        element: <AddContact />
    },
    {
        path: "/updatecontact",
        element: <UpdateContact />
    }
])


const App = () => {

    return (<>

        <RouterProvider router={routers}>

        </RouterProvider>
    </>
    )
}

export default App
