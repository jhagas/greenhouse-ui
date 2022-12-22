#include "DHT.h"
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <BH1750.h>
#include "ArduinoJson.h"

#define DHTPIN 12
#define DHTTYPE DHT22

const String url = "https://pmtntcvniacqbzuafytw.supabase.co";
const String apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdG50Y3ZuaWFjcWJ6dWFmeXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEzNTgyOTUsImV4cCI6MTk4NjkzNDI5NX0.HbRBJwbgQgZc1xhnoC8z1nRsF7_8YtX-p2ZChtCVXKM";
const String table = "data";
const int httpsPort = 443;

const char *ssid = "tirta";
const char *password = "tirtawana";

DHT dht(DHTPIN, DHTTYPE);
BH1750 lightMeter;
HTTPClient https;
WiFiClientSecure client;

unsigned long lastTime = 300000;
unsigned long timeDelay = 300000;
const int res = 5000;
bool isSend = true;

const int jumlahSensor = 4;
String name[jumlahSensor] = {"Suhu", "Kelembapan Relatif", "Iluminansi", "pH Tanah"};
String type[jumlahSensor] = {"temperature", "relativeHumidity", "illuminance", "ph"};
String unit[jumlahSensor] = {"°C", "%", "Lux", ""};
float value[jumlahSensor];

int httpCode;

void setup()
{
  client.setInsecure();

  Serial.begin(9600);
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
  value[0] = dht.readTemperature();
  value[1] = dht.readHumidity();
  value[2] = lightMeter.readLightLevel();
  value[3] = 30.5;

  if (lastTime >= timeDelay)
  {
    lastTime = 0;
    String httpReqData = "";
    StaticJsonDocument<1024> doc;
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

      if (httpCode < 0)
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
    int elapsed = res - (t2-t1);
    lastTime += elapsed;
    delay(elapsed);
  }
}