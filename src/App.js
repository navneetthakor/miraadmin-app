import './App.css';

// router setup
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"; 
import RootLayout from "./scens/RootLayout.js";
import Home from "./scens/Home.js";

function App() {

  // setting-up router 
  const router = createBrowserRouter(createRoutesFromElements(
    <Route exact path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
    </Route>
  ))
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
