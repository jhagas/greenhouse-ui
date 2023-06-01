#include <Arduino.h>

// 'supabase url' dan 'anon key' yang didapat dari laman supabase
const String url = "supabase_url";
const String apikey = "supabase_anon_key";
const String table = "data";

// masukkan nama wifi dan password yang ingin disambungkan
const char *ssid = "wifi_ssid";
const char *password = "wifi_password";

unsigned long timeDelay = 300000; // berapa milidetik jeda tiap pengiriman data (5 menit)
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

// variabel untuk respon POST request HTTP
int httpCode;