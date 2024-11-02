import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./components/Layout/MainLayout"
import { mainRoutes } from "./routes"

function App() {

  const router = createBrowserRouter([
    {
      element:<MainLayout/>,
      children: mainRoutes
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
