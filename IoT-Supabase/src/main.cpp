#include <ESP8266WiFi.h>
#include "ArduinoJson.h"
#include <ESP32_Supabase.h>
#include <SimpleTimer.h>

// library sensor
#include "DHT.h"
#include <Wire.h>
#include <BH1750.h>

// konstanta yang terpisah file
#include "const.h"

// Memulai library untuk sensor
#define soil A0
#define rly D7
#define DHTPIN D5
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);
BH1750 lightMeter;

// library untuk client supabase
Supabase db;
SimpleTimer timer;

void dataSend()
{
  // masukkan nilai sensor, jumlah masukan harus sesuai jumlah sensor (dalam contoh ini 4)
  value[0] = dht.readTemperature();
  value[1] = dht.readHumidity();
  value[2] = lightMeter.readLightLevel();
  value[3] = (((map(analogRead(soil), 650, 1024, 0, 100)) - 100) * -1);
  
  //  -------------------------------
  Serial.println(value[0]);
  Serial.println(value[1]);
  Serial.println(value[2]);
  Serial.println(value[3]);

  String httpReqData = makeJSON(value);
  int code = db.insert(table, httpReqData, false);
  Serial.println(code);
}

// function that automatically turn the pump on/off
void pump()
{
  float soilM = (((map(analogRead(soil), 650, 1024, 0, 100)) - 100) * -1);
  //float soilM = 40;
  if (soilM < 40)
  {
    value[4]=1 ;
    digitalWrite(rly, !value[4]);
  }
  else if (soilM > 70)
  {
    value[4]=0 ;
    digitalWrite(rly, !value[4]);
  } 
}

void setup()
{
  Serial.begin(9600);
  db.begin(url, apikey);

  // memulai library untuk sensor
  dht.begin();
  Wire.begin();
  lightMeter.begin();

  // Koneksi ke Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  pinMode(rly, OUTPUT);
  timer.setInterval(timeDelay, pump);
  timer.setInterval(timeDelay, dataSend);
  digitalWrite(rly, HIGH);
}

void loop()
{
  timer.run(); // tick the timer
}
