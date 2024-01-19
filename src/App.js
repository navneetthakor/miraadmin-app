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
