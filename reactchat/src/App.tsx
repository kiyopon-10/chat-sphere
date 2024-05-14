import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom"
import Home from "./pages/Home"
import Server from "./pages/Server";
import Explore from "./pages/Explore"
// import { ThemeProvider } from '@mui/material/styles';
// import {createMuiTheme} from "./theme/theme"

import ToggleColorMode from "./components/ToggleColorMode";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/explore/:categoryName" element={<Explore />} />
    </Route> 
  )
)

const App = () => {
  return (
    // Applying the custom created theme to the entire app
    <ToggleColorMode>
        <RouterProvider router={router} />
    </ToggleColorMode>
  )
} 

export default App
