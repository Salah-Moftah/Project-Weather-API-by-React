// Import Materails UI Componants
import { Container, Stack, ThemeProvider, createTheme } from "@mui/material";
import WeatherCard from "./WeatherCard";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Others
import "./App.css";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import "moment/min/locales";
moment.locale("en");

// Create Theme FontFamily
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
  palette: {
    primary: {
      main: blue[800],
      light: blue["A400"],
      text: "#fff",
    },
    error: {
      main: '#fff'
    }
  },
});

function App() {
  const { t, i18n } = useTranslation();
  const [change, setChange] = useState("en");
  const [dateAndTime, setdateAndTime] = useState("");
  
  const [city, setCity] = useState('Cairo');
  
  const handleChange = (event) => {
    setCity(event.target.value);
    
  };

  useEffect(() => {
    i18n.changeLanguage('en');
    setdateAndTime(moment().format("MMM Do YY"));
  }, [i18n]);

  function Languagechange() {
    if (change === "en") {
      setChange("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setChange("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setdateAndTime(moment().format("MMM Do YY"));
  }
  const [cityName] = useState([
    {
      id: uuidv4(),
      name: 'Cairo',
      value: 'Cairo',
    },
    {
      id: uuidv4(),
      name: 'Giza',
      value: 'Giza',
    },
    {
      id: uuidv4(),
      name: 'Alexandria',
      value: 'Alexandria',
    },
    {
      id: uuidv4(),
      name: 'Suez',
      value: 'Suez',
    },
    {
      id: uuidv4(),
      name: 'Aswan',
      value: 'Aswan',
    },
    {
      id: uuidv4(),
      name: 'Ismailia',
      value: 'Ismailia',
    },
    {
      id: uuidv4(),
      name: 'Luxor',
      value: 'Luxor',
    },
    {
      id: uuidv4(),
      name: 'Hurghada',
      value: 'Hurghada',
    },
    {
      id: uuidv4(),
      name: 'Port Said',
      value: 'Port Said',
    },
    {
      id: uuidv4(),
      name: 'Mansoura',
      value: 'Mansoura',
    },
    {
      id: uuidv4(),
      name: 'Marsa Matruh',
      value: 'Marsa Matruh',
    },
  ])
  
  const cityList = cityName.map((c) => {
    return (
      <MenuItem key={c.id} sx={{fontSize: '20px'}} value={c.value}>{t(c.name)}</MenuItem>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack
        justifyContent="center"
        sx={{ bgcolor: "primary.light", height: "100vh", direction: change === 'en' ? "ltr" : 'rtl' }}
      >
        <Container maxWidth="sm">
          {/* selector */}
        <Box sx={{ minWidth: 120, mb: 4 }} >
      <FormControl error fullWidth >
        <InputLabel sx={{fontSize: '20px'}} id="demo-simple-select-label">{t('City')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label={t('City')}
          onChange={handleChange}
          sx={{color: "primary.text", fontSize: '20px'}}
        >
          {/* City Names */}
          {cityList}

        </Select>
      </FormControl>
    </Box>
          <WeatherCard t={t} dateAndTime={dateAndTime} city={city} />
          <Stack alignItems="end">
            <Button
              onClick={Languagechange}
              sx={{ color: "primary.text", fontSize: "18px", mt: 2 }}
              variant="text"
            >
              {change === "ar" ? "English" : "عربي"}
            </Button>
          </Stack>
        </Container>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
