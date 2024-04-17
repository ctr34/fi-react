import React, { lazy } from "react";
import Home from "../views/Home"
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
        element:<Navigate to="/swiperImages"/>
    },
    {
        path:"/",
        element:<Home/>,
        children:[
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
    //Another router approach
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