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
#define DHTPIN 12
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
  value[3] = (-0.0693 * analogRead(A0)) + 7.3855; // Calibration formula from ADC to pH
  // -------------------------------

  String httpReqData = makeJSON(value);
  int code = db.insert(table, httpReqData, false);
  Serial.println(code);
}

void setup()
{
  Serial.begin(9600);

  // memulai library untuk sensor
  dht.begin();
  Wire.begin();
  lightMeter.begin();
  db.begin(url, apikey);

  // Koneksi ke Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  timer.setInterval(timeDelay, dataSend);
}

void loop()
{
  timer.run(); // tick the timer
}