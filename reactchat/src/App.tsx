import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom"
import Home from "./pages/Home"

import { ThemeProvider } from '@mui/material/styles';
import {createMuiTheme} from "./theme/theme"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
    </Route> 
  )
)

const App = () => {
  const theme = createMuiTheme()
  return (
    // Applying the custom created theme to the entire app
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
  )
} 

export default App
