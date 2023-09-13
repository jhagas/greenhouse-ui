#include <Arduino.h>

// 'supabase url' dan 'anon key' yang didapat dari laman supabase
const String url = "your_supabase_url";
const String apikey = "your_supabase_API_key";
const String table = "data";

// masukkan nama wifi dan password yang ingin disambungkan
const char *ssid = "your_ssid";
const char *password = "your_ssid_password";

unsigned long timeDelay = 300000; // berapa milidetik jeda tiap pengiriman data (5 menit)
bool isSend = true;

// tambahkan/kurangi sensor sesuai kebutuhan anda
const int jumlahSensor = 5;
// nama sensor untuk ditampilkan pada web, isi pada array harus sesuai jumlah sensor
String name[jumlahSensor] = {"Suhu", "Kelembapan Udara", "Iluminansi", "Kelembaban Tanah", "Pompa"};
// tipe sensor untuk ikon web, isi pada array harus sesuai jumlah sensor
String type[jumlahSensor] = {"temperature", "relativeHumidity", "illuminance", "soilMoisture" "On/Off"};
// satuan data sensor untuk tampilan web, isi pada array harus sesuai jumlah sensor
String unit[jumlahSensor] = {"Â°C", "%", "Lux", "%", ""};
// nilai data sensor
float value[jumlahSensor];

String makeJSON(float value[])
{
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
        if (i==4){
            if (value[i]==0){
                sensor["value"] = "Mati";
            }
            else {
                sensor["value"] = "Nyala";
            }
        } 
        else {
            sensor["value"] = value[i];
        }
    }
    serializeJson(doc, httpReqData);
    
    return httpReqData;
}
