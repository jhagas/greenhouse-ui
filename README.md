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
    - [NodeMCU 1.0 (ESP-12E Module) / ESP8266, PlatformIO Setup](#nodemcu-10-esp-12e-module--esp8266-platformio-setup)
    - [Web User Interface and Netlify deploy](#web-user-interface-and-netlify-deploy)
  - [Thank You](#thank-you)

## Final Looks (on project board)

![Final look](./pictures/Final%20Looks.jpeg)

## Hardware Required

- 1, ESP8266 (LoLiN NodeMCU v3)
- Stable Wi-Fi connection (for ESP8266 to send the data)
- 1, USB type-A to microUSB cable data
- 1, DHT22 Sensor, to GPIO 12
- 1, BH1750 (Illuminance/ambient light sensor)

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

For starting, a bit of Arduino (or C++) knowledge is required. Also you need to understand a little bit about deploying (or maybe modifying) react app, for deploying we will be using Netlify. Sufficient understanding of Javascript also required. You may also install git command line tools to clone this repository.


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

### NodeMCU 1.0 (ESP-12E Module) / ESP8266, PlatformIO Setup 

1. Clone this repository and import `IoT-supabase` folder to PlatformIO. Then select NodeMCU 1.0 (ESP-12E Module) board. 
2. Open `./src/main.cpp`
3. Edit the `const String url` and `const String apikey` variables as in your supabase project
4. Put your Wi-Fi SSID in `const char *ssid` variable and your Wi-Fi password in `const char *password`
5. **(OPTIONAL)** you can change time delay between data sending, device refresh rate, or even the type of sensor if you want. Just put the sensor value, name, type, and unit of measurement in the right variable as array of many sensor.

### Web User Interface and Netlify deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jhagas/greenhouse-ui)

Make 2 environment variables as following (fill the value as in supabase section)
| Key | Value |
| --- | --- |
| REACT_APP_SUPABASE_URL | `supabase url` |
| REACT_APP_SUPABASE_ANON_KEY | `anon key` |

Finally, redeploy site in **Deploys** > **Trigger Deploy** > **Deploy Site**. Optionally you can change your url subdomain or you can change the url to your own domain (not from Netlify).

## Thank You

Thanks to Ko Assad for giving me ideas for developing this smart monitoring device for greenhouse. I hope your Nephentes business going well and inspire more people to love this native South East Asia plant. Big thanks to Mas Jhelang for using this project as university project.