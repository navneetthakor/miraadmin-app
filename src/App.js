import "./App.css";

// ----------------router setup------------
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./scens/RootLayout.js";
import Home from "./scens/Home.js";
import Products from "./scens/Products.js";

// ---------Material ui setup-------------
import { CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import Customers from "./scens/Customers.js";
import Transactions from "./scens/Transactions.js";

// ------------ Main Function -------------
function App() {
  // material ui setup
  const mode = useSelector((state) => state.currMode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // setting-up router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route exact path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route exact path="/Dashboard" element={<Home/>}/>
        <Route exact path="/Products" element={<Products/>}/>
        <Route exact path="/Customers" element={<Customers/>}/>
        <Route exact path="/Transaction" element={<Transactions/>}/>
        <Route path="*" element={<Home/>}/>
      </Route>
    )
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
