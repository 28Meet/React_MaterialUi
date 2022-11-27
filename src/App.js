import './App.css';
import { useState } from "react";
import UserDetails from './Component/UserDetails/UserDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ToggleSwitch from './Component/ToggleSwitch/ToggleSwitch';


function App() {
  const [theme, setTheme] = useState('light');

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const changeTheme = () => {
    (theme == 'light') ? setTheme('dark') : setTheme('light');
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ToggleSwitch toggleTheme={changeTheme} />
        <div className="App">
          <UserDetails />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
