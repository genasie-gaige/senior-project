#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>

WiFiServer server(80);
SoftwareSerial NodeMCU(D2, D3);

void setup()
{
   Serial.begin(115200);
   NodeMCU.begin(115200);
   pinMode(D2, INPUT);
   pinMode(D3, OUTPUT);

   Serial.println();
   WiFiManager wifiManager;
   Serial.println("Conecting.....");
   wifiManager.autoConnect("Smart Shelf", "password");
   Serial.println("connected");
   server.begin();
}
void loop()
{
   WiFiClient client = server.available();
   if(client)
   {
      while(client.connected())
      {
         while(NodeMCU.available() > 0)
         {
            float val = NodeMCU.read();
            Serial.println(val);
            client.println(val);
         }
         delay(10);
      }
      client.stop();
      Serial.println("Client disconnected");
   }
}
