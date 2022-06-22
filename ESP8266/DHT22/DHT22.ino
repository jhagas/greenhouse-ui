#include "DHT.h"
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

ESP8266WiFiMulti WiFiMulti;

const char fingerprint[] PROGMEM = "supabasefingerprint";
const String apikey = "yoursupabaseapikey";
const int indicator = 14;

#define DHTPIN 12 // Digital pin connected to the DHT sensor (GPIO pins)
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup()
{
  Serial.begin(9600);

  dht.begin();
  pinMode(indicator, OUTPUT);
  pinMode(2, OUTPUT);

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("ssid", "pass");
}

unsigned long lastTime = 298000;
unsigned long timeDelay = 298000; // update every 5 min
bool isSend = true;

void loop()
{
  while (WiFiMulti.run() != WL_CONNECTED)
  {
    wifiConnecting();
  }
  
  std::unique_ptr<BearSSL::WiFiClientSecure> client(new BearSSL::WiFiClientSecure);
  client->setFingerprint(fingerprint);
  HTTPClient https;

  
  float h = dht.readHumidity();
  float t = dht.readTemperature(); // celcius

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t))
  {
    dhtError();
    return;
  }
  
  if (!isSend) {
    postError();
    lastTime = 298000;
  }
  else {
    lastTime += 5000;
    delay(5000);
  }
  
  if (lastTime >= timeDelay)
  {
    lastTime = 0;

    String httpReqData = "{\"temp\":" + String(t, 3) + ",\"humid\":" + String(h, 3) + ",\"lux\":\"0\"}";

    if (https.begin(*client, "https://yourproject.supabase.co/rest/v1/yourtable"))
    {
      Serial.print("[HTTPS] beginning POST request...\n");

      // start connection and send HTTP header
      https.addHeader("apikey", apikey);
      https.addHeader("Content-Type", "application/json");
      https.addHeader("Prefer", "return=representation");
      int httpCode = https.POST(httpReqData);
      String payload = https.getString();

      if ((payload.length() == 0))
      {
        isSend = false;
      }
      else
      {
        postSuccess();
        isSend = true;
      }

      // httpCode will be negative on error
      if (httpCode > 0)
      {
        Serial.printf("[HTTPS] POST success with response code: %d\n", httpCode);
        Serial.println(payload);
        Serial.println();
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
  Serial.println("Masuk");
}

void postSuccess()
{
  digitalWrite(2, LOW);
  delay(500);
  digitalWrite(2, HIGH);
  delay(500);
}

void postError()
{
  digitalWrite(indicator, HIGH);
  delay(300);
  digitalWrite(indicator, LOW);
  delay(200);
  digitalWrite(indicator, HIGH);
  delay(300);
  digitalWrite(indicator, LOW);
  delay(200);
  digitalWrite(indicator, HIGH);
  delay(1000);
  digitalWrite(indicator, LOW);
  delay(1000);
}

void dhtError()
{
  digitalWrite(indicator, HIGH);
  delay(1000);
  digitalWrite(indicator, LOW);
  delay(1000);
}

void wifiConnecting()
{
  digitalWrite(indicator, HIGH);
  delay(300);
  digitalWrite(indicator, LOW);
  delay(200);
  digitalWrite(indicator, HIGH);
  delay(300);
  digitalWrite(indicator, LOW);
  delay(200);
  digitalWrite(indicator, HIGH);
  delay(300);
  digitalWrite(indicator, LOW);
  delay(800);
}