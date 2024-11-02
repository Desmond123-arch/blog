import React from "react";
import PathConstants from "./pathConstants";

const Home = React.lazy(() => import("../pages/Home"));
const Create = React.lazy(() => import("../pages/CreateBlog"));
const Blog = React.lazy(() => import("../pages/Blog"));
const Update = React.lazy(() => import("../pages/Update"));

const mainRoutes = [
    {
        path: PathConstants.HOME,
        element: <Home />
    },
    {
        path: PathConstants.CREATE,
        element: <Create />
    },
    {
        path: PathConstants.BLOG,
        element: <Blog />
    },
    {
        path: PathConstants.UPDATE,
        element: <Update/>
    }
]

export { mainRoutes };