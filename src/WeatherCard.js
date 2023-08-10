// Import Materails UI Componants
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import CloudTwoToneIcon from "@mui/icons-material/CloudTwoTone";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
//Others
import axios from "axios";
import { useState, useEffect } from "react";


let cancelAxios = null;
export default function WeatherCard({t, dateAndTime, city}) {

  const [data, setData] = useState({
    temp: null,
    tempMin: null,
    tempMax: null,
    name: "",
    date: "",
    description: "",
    icon: null,
  });
  useEffect(() => {
    
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},EG&appid=30be3e73179f813ee8ce684fd281d58d`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then((response) => {
        
        let responseTemp = Math.round(response.data.main.temp - 272.15);
        let responseTempMin = Math.round(response.data.main.temp_min - 272.15);
        let responseTempMax = Math.round(response.data.main.temp_max - 272.15);
        let responseDescription = response.data.weather[0].description;
        let responseIcon = response.data.weather[0].icon;
        let responseName = response.data.name;

        setData({
          temp: responseTemp,
          tempMin: responseTempMin,
          tempMax: responseTempMax,
          description: responseDescription,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
          name: responseName
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      cancelAxios();
    };
  }, [city]);

  return (
    <Card
      sx={{
        minWidth: 275,
        bgcolor: "primary.main",
        padding: "10px",
        boxShadow: "0px 11px 1px rgba( 0, 0, 0, 0.05)",
        borderRadius: "15px",
      }}
    >
      <Stack direction="row" alignItems="end" gap={2} sx={{ mx: 3 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "500" }}
          color="primary.text"
        >
          {t(data.name)}
        </Typography>
        <Typography variant="h6" color="primary.text" >
          {dateAndTime}
        </Typography>
      </Stack>
      <Typography
        sx={{
          height: "2px",
          backgroundColor: "#fff",
          width: "100%",
          mt: 2,
          mb: 1,
        }}
      ></Typography>

      <Stack direction="row" gap={2} alignItems="center">
        <Stack sx={{ mx: 3 }}>
          <Stack direction="row" alignItems="center">
            <Stack direction='row'>
            <Typography
              variant="p"
              sx={{ fontWeight: "200", fontSize: "100px" }}
              color="primary.text"
            >
              {data.temp}
            </Typography>
            <CircleOutlinedIcon sx={{color:"primary.text", mt: 4, mx: 1, fontSize: '16px'}}/>
            </Stack>

            <img src={data.icon} alt="img" />
          </Stack>
          <Typography
            variant="p"
            sx={{ fontWeight: "400", fontSize: "22px", mb: 2 }}
            color="primary.text"
          >
            {t(data.description)}
          </Typography>
          <Stack
            sx={{ fontSize: "18px", mb: 2, fontWeight: "200" }}
            direction="row"
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "17px" }}
              color="primary.text"
            >
              {t('max')}: {data.tempMin}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "17px", mx: 2 }}
              color="primary.text"
            >
              |
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "17px" }}
              color="primary.text"
            >
              {t('min')}: {data.tempMax}
            </Typography>
          </Stack>
        </Stack>

        <CloudTwoToneIcon
          sx={{ color: "primary.text", fontSize: "200px", flex: 1 }}
        ></CloudTwoToneIcon>
      </Stack>
    </Card>
  );
}
