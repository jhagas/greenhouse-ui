# Greenhouse Monitoring System with ESP8266, Supabase, React (Web UI)

Here is step-by-step tutorial (Link to another online article) to setup your own web-based greenhouse monitoring system. Web user interface is made with React (bootstrapped with [Create React App](./REACT.md)), [TailwindCSS](https://tailwindcss.com/docs/guides/create-react-app) and [DaisyUI](https://daisyui.com/docs/install/). You can follow those link to learn more, but as always the included project is more than enough to get you start monitoring your greenhouse.


## Table of Contents
- [Greenhouse Monitoring System with ESP8266, Supabase, React (Web UI)](#greenhouse-monitoring-system-with-esp8266-supabase-react-web-ui)
  - [Table of Contents](#table-of-contents)
  - [Final Looks (on project board)](#final-looks-on-project-board)
  - [Hardware Required](#hardware-required)
  - [Supabase Preparation](#supabase-preparation)
  - [Arduino IDE](#arduino-ide)
  - [Web User Interface and Netlify deploy](#web-user-interface-and-netlify-deploy)
  - [Laporan Resmi Akuisisi Data Digital (Written in Indonesian)](#laporan-resmi-akuisisi-data-digital-written-in-indonesian)
  - [Thank You](#thank-you)

## Final Looks (on project board)

![Final look](./pictures/Final%20Looks.jpeg)

## Hardware Required

- 1, 10 kilo ohm resistor as pullup resistor
- 1, 1 kilo ohm resistor
- 1, ESP8266 (LoLiN NodeMCU v3)
- Stable Wi-Fi connection (for ESP8266 to send the data)
- Red LED
- USB type-A to microUSB cable data
- DHT22 Sensor (if you using the module, not a standalone device, you don't 10k resistor)
- BH1750 (Illuminance sensor)
- Phone Charger
- Laptop or Desktop with internet connection

## Supabase Preparation

TODO

## Arduino IDE

TODO

## Web User Interface and Netlify deploy

TODO

## Laporan Resmi Akuisisi Data Digital (Written in Indonesian)

- [Laporan Resmi Kalibrasi DHT22 (suhu)](./LAPORAN%20RESMI/DHT22%20Suhu.pdf)
- [Laporan Resmi Kalibrasi DHT22 (kelembapan)](./LAPORAN%20RESMI/DHT22%20Kelembapan.pdf)
- [Laporan Resmi Kalibrasi BH1750 (iluminans)](./LAPORAN%20RESMI/BH1750%20Iluminans.pdf)

## Thank You

Thanks to Ko Assad for giving me ideas for developing this smart monitoring device for greenhouse. I hope your Nephentes business going well and inpsire more people to love this native South East Asia plant.

Thanks to Farid and Wildan for helping me operate callibration environment and organize the all the data we got. Thanks to Ibu Melania to held Akuisisi Data Digital MBKM Course, and Mas Gusti for staying at Laboratorium Elektronika Fisika ITS to accompany the data collection process.