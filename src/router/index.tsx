import React, { lazy } from "react";
import Home from "../views/Home"
// import About from "../view/About"
const Page1 = lazy(() => import("../views/Page1"))
const Page2 = lazy(() => import("../views/Page2"))
const SwiperImages = lazy(() => import("../views/SwiperImages"))
const Products = lazy(() => import("../views/Products"))
import {Navigate} from "react-router-dom"

const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>loading...</div>}>
        {comp}
    </React.Suspense>
)

const router = [
    {
        path:"/",
        element:<Navigate to="/page1"/>
    },
    {
        path:"/",
        element:<Home/>,
        children:[
            {
                path:"/page1",
                element: withLoadingComponent(<Page1/>)
            },
            {
                path:"/page2",
                element: withLoadingComponent(<Page2/>)
            },
            {
                path:"/swiperImages",
                element: withLoadingComponent(<SwiperImages/>)
            },
            {
                path:"/products",
                element: withLoadingComponent(<Products/>)
            }
        ]
    }
    // {
    //     path:"/home",
    //     element:<Home/>
    // },
    // {
    //     path:"/about",
    //     element: withLoadingComponent(<About/>)
    // },
    // {
    //     path:"/user",
    //     element: withLoadingComponent(<User/>)
    // }
]

export default router;