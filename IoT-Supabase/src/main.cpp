#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include "ArduinoJson.h"

// library sensor
#include "DHT.h"
#include <Wire.h>
#include <BH1750.h>

// 'supabase url' dan 'anon key' yang didapat dari laman supabase
const String url = "supabase_url";
const String apikey = "supabase_anon_key";

const String table = "data";
const int httpsPort = 443;

// masukkan nama wifi dan password yang ingin disambungkan
const char *ssid = "wifi_ssid";
const char *password = "wifi_password";

// Memulai library untuk sensor
#define DHTPIN 12
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);
BH1750 lightMeter;

HTTPClient https;
WiFiClientSecure client;

unsigned long timeDelay = 300000; // berapa milidetik jeda tiap pengiriman data (5 menit)
unsigned long lastTime = timeDelay;
const int res = 5000; // refresh rate perangkat (5 detik)
bool isSend = true;

// tambahkan/kurangi sensor sesuai kebutuhan anda
const int jumlahSensor = 4;
// nama sensor untuk ditampilkan pada web, isi pada array harus sesuai jumlah sensor
String name[jumlahSensor] = {"Suhu", "Kelembapan Relatif", "Iluminansi", "pH Tanah"};
// tipe sensor untuk ikon web, isi pada array harus sesuai jumlah sensor
String type[jumlahSensor] = {"temperature", "relativeHumidity", "illuminance", "ph"};
// satuan data sensor untuk tampilan web, isi pada array harus sesuai jumlah sensor
String unit[jumlahSensor] = {"°C", "%", "Lux", ""};
// nilai data sensor
float value[jumlahSensor];

int httpCode;

void setup()
{
  client.setInsecure();
  Serial.begin(9600);

  // memulai library untuk sensor
  dht.begin();
  Wire.begin();
  lightMeter.begin();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
}

void loop()
{
  unsigned long t1 = millis();

  if (lastTime >= timeDelay)
  {
    // masukkan nilai sensor, jumlah masukan harus sesuai jumlah sensor (dalam contoh ini 4)
    value[0] = dht.readTemperature();
    value[1] = dht.readHumidity();
    value[2] = lightMeter.readLightLevel();
    value[3] = (-0.0693 * analogRead(A0)) + 7.3855; // Calibration formula from ADC to pH

    if (isnan(value[0]) || isnan(value[1]) || value[1] == 1 || value[0] == -50)
    {
      Serial.println(F("Failed to read from DHT sensor!"));
      isSend = false;
      return;
    }

    lastTime = 0;
    String httpReqData = "";
    StaticJsonDocument<1024> doc;
    doc["refresh"] = timeDelay;
    JsonArray data = doc.createNestedArray("data");

    for (int i = 0; i < jumlahSensor; i++)
    {
      JsonObject sensor = data.createNestedObject();
      sensor["name"] = name[i];
      sensor["type"] = type[i];
      sensor["unit"] = unit[i];
      sensor["value"] = value[i];
    }

    serializeJson(doc, httpReqData);

    if (https.begin(client, url + "/rest/v1/" + table))
    {
      https.addHeader("apikey", apikey);
      https.addHeader("Content-Type", "application/json");
      https.addHeader("Prefer", "return=representation");
      httpCode = https.POST(httpReqData);
      String payload = https.getString();
      Serial.println(payload);

      if ((payload.length() == 0))
        isSend = false;
      else
        isSend = true;

      if (httpCode == 201 || httpCode == -11)
      {
        Serial.println("Success!!");
      }
      else
      {
        Serial.printf("[HTTPS] POST failed, error: %s\n", https.errorToString(httpCode).c_str());
        isSend = false;
      }

      https.end();
    }
    else
    {
      Serial.printf("[HTTPS] Unable to connect\n");
      isSend = false;
    }
  }

  unsigned long t2 = millis();

  if (!isSend)
    lastTime = timeDelay;
  else
  {
    int elapsed = res - (t2 - t1);
    lastTime += res;
    if (elapsed < 0)
      return;
    delay(elapsed);
  }
}