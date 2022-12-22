# Greenhouse Monitoring System with ESP8266, Supabase, React

Here is step-by-step tutorial (Link to another online article) to setup your own web-based greenhouse monitoring system. Web user interface is made with React (bootstrapped with [Create React App](./REACT.md)), [TailwindCSS](https://tailwindcss.com/docs/guides/create-react-app) and [DaisyUI](https://daisyui.com/docs/install/). You can follow those link to learn more, but as always the included project is more than enough to get you start monitoring your greenhouse.


## Table of Contents
- [Greenhouse Monitoring System with ESP8266, Supabase, React](#greenhouse-monitoring-system-with-esp8266-supabase-react)
  - [Table of Contents](#table-of-contents)
  - [Final Looks (on project board)](#final-looks-on-project-board)
  - [Hardware Required](#hardware-required)
  - [JSON Structure in Database](#json-structure-in-database)
  - [How to Start (Quick Start Guide)](#how-to-start-quick-start-guide)
    - [Supabase Preparation](#supabase-preparation)
    - [Arduino IDE](#arduino-ide)
    - [Web User Interface and Netlify deploy](#web-user-interface-and-netlify-deploy)
  - [Thank You](#thank-you)

## Final Looks (on project board)

![Final look](./pictures/Final%20Looks.jpeg)

## Hardware Required

- 1, 10 kilo ohm resistor as pullup resistor
- 1, 1 kilo ohm resistor
- 1, ESP8266 (LoLiN NodeMCU v3)
- Stable Wi-Fi connection (for ESP8266 to send the data)
- 1, Red LED
- 1, USB type-A to microUSB cable data
- 1, DHT22 Sensor (if you using the module, not a standalone device, you don't need 10k resistor)
- 1, BH1750 (Illuminance/ambient light sensor)
- 1, Phone Charger

## JSON Structure in Database

```json
[
  {"name" : "Suhu",
   "type" : "temperature",
   "unit" : "°C",
   "value" : 30},

  {"name" : "Kelembapan Relatif",
   "type": "relativeHumidity",
   "unit" : "%",
   "value" : 30},

  {"name" : "Iluminansi",
   "type": "illuminance",
   "unit" : "Lux",
   "value" : 30},

  {"name" : "pH Tanah",
   "type": "ph",
   "unit" : "",
   "value" : 30}
]
```

`name` key can be any string, and will be displayed in Web UI. Currently supported sensor type (will determine the icon in Web UI) are : 

- `""` (empty the string if you sensor type not currently supported)
- `"temperature"` for temperature sensor
- `"relativeHumidity"` for relative humidity sensor
- `"illuminance"` for illuminance (ambient light) sensor
- `"ph"` for any sensor that measure pH

## How to Start (Quick Start Guide)

For starting, a bit of Arduino (or C++) knowledge is required. Also you need to understand a little bit about deploying (or maybe modifying) react app, for deploying we will be using Netlify. Sufficient understanding of Javascript also required.


### Supabase Preparation

Make new project and then make new table with the following SQL Code

```sql
create table data (
  time timestamp with time zone default timezone('utc'::text, now()) not null,
  data jsonb
);

alter publication supabase_realtime add table data;
```

Then write down your `supabase url` and `anon key`

### Arduino IDE

TODO

### Web User Interface and Netlify deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jhagas/greenhouse-ui)

Make 2 environment variables as following (fill the value as in supabase section)
| Key | Value |
| --- | --- |
| REACT_APP_SUPABASE_URL | `supabase url` |
| REACT_APP_SUPABASE_ANON_KEY | `anon key` |

Finally, redeploy site in **Deploys** > **Trigger Deploy** > **Deploy Site**. Optionally you can change your url subdomain or you can change the url to your own domain (not from Netlify).

## Thank You

Thanks to Ko Assad for giving me ideas for developing this smart monitoring device for greenhouse. I hope your Nephentes business going well and inpsire more people to love this native South East Asia plant.

Thanks to Farid and Wildan for helping me operate callibration environment and organize the all the data we got. Thanks to Ibu Melania to held Akuisisi Data Digital MBKM Course, and Mas Gusti for staying at Laboratorium Elektronika Fisika ITS to accompany the data collection process.