#include "FS.h"
#include <ESP8266WiFi.h>;
#include <PubSubClient.h>;
#include <NTPClient.h>;
#include <WiFiUdp.h>;
#include <SoftwareSerial.h>
#include <WiFiManager.h>

SoftwareSerial NodeMCU(D2, D3);

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

const char *AWS_endpoint = "a23udt1w5v4r7e-ats.iot.us-west-2.amazonaws.com"; // MQTT broker ip

void callback(char *topic, byte *payload, unsigned int length)
{
   Serial.print("Message arrived [");
   Serial.print(topic);
   Serial.print("] ");
   for(int i = 0; i < length; i++)
   {
      Serial.print((char)payload[i]);
   }
   Serial.println();
}
WiFiClientSecure espClient;
PubSubClient client(AWS_endpoint, 8883, callback, espClient); // set MQTT port number to 8883 as per //standard
#define BUFFER_LEN 256
long lastMsg = 0;
char msg[BUFFER_LEN];
int value = 0;
byte mac[6];
char mac_Id[18];
bool isFound = false;
uint8_t counter = 0;
uint8_t medFound = 0;

void setup_wifi()
{
   delay(10);
   // We start by connecting to a WiFi network
   espClient.setBufferSizes(512, 512);

   Serial.println();
   WiFiManager wifiManager;
   Serial.println("Conecting.....");
   wifiManager.autoConnect("Smart Shelf", "password");
   Serial.println("connected");

   timeClient.begin();
   while(!timeClient.update())
   {
      timeClient.forceUpdate();
   }

   espClient.setX509Time(timeClient.getEpochTime());
}

void reconnect()
{
   // Loop until we're reconnected
   while(!client.connected())
   {
      Serial.print("Attempting MQTT connection...");
      // Attempt to connect
      if(client.connect("ESPthing"))
      {
         Serial.println("connected");
         client.subscribe("inTopic");
      }
      else
      {
         Serial.print("failed, rc=");
         Serial.print(client.state());
         Serial.println(" try again in 5 seconds");

         char buf[256];
         espClient.getLastSSLError(buf, 256);
         Serial.print("WiFiClientSecure SSL error: ");
         Serial.println(buf);

         // Wait 5 seconds before retrying
         delay(5000);
      }
   }
}

void setup()
{
   Serial.begin(115200);
   NodeMCU.begin(115200);
   pinMode(D2, INPUT);
   pinMode(D3, OUTPUT);

   Serial.setDebugOutput(true);
   // initialize digital pin LED_BUILTIN as an output.
   pinMode(LED_BUILTIN, OUTPUT);
   setup_wifi();
   delay(1000);
   if(!SPIFFS.begin())
   {
      Serial.println("Failed to mount file system");
      return;
   }

   Serial.print("Heap: ");
   Serial.println(ESP.getFreeHeap());

   // Load certificate file
   File cert = SPIFFS.open("/cert.der", "r"); // replace cert.crt eith your uploaded file name
   if(!cert)
   {
      Serial.println("Failed to open cert file");
   }
   else
      Serial.println("Success to open cert file");

   delay(1000);

   if(espClient.loadCertificate(cert))
      Serial.println("cert loaded");
   else
      Serial.println("cert not loaded");

   // Load private key file
   File private_key = SPIFFS.open("/private.der", "r"); // replace private eith your uploaded file name
   if(!private_key)
   {
      Serial.println("Failed to open private cert file");
   }
   else
      Serial.println("Success to open private cert file");

   delay(1000);

   if(espClient.loadPrivateKey(private_key))
      Serial.println("private key loaded");
   else
      Serial.println("private key not loaded");

   // Load CA file
   File ca = SPIFFS.open("/ca.der", "r"); // replace ca eith your uploaded file name
   if(!ca)
   {
      Serial.println("Failed to open ca ");
   }
   else
      Serial.println("Success to open ca");

   delay(1000);

   if(espClient.loadCACert(ca))
      Serial.println("ca loaded");
   else
      Serial.println("ca failed");

   Serial.print("Heap: ");
   Serial.println(ESP.getFreeHeap());

   WiFi.macAddress(mac);
   snprintf(mac_Id, sizeof(mac_Id), "%02x:%02x:%02x:%02x:%02x:%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
   Serial.print(mac_Id);
}

void loop()
{
   if(!client.connected())
   {
      reconnect();
   }
   client.loop();
   long now = millis();
   if(now - lastMsg > 1000)
   {
      lastMsg = now;
      String macIdStr = mac_Id;
      NodeMCU.print('READY');
      delay(100);
      if(NodeMCU.available() > 0)
      {
         uint8_t val = NodeMCU.read(); // changed from uint8_t

         // bool isFound = false;
         // int counter = 0;
         while(NodeMCU.available() > 0)
         {
            ++counter;
            uint8_t isPlaced = NodeMCU.read();
            Serial.print(isPlaced);
            Serial.print('\t');
            if(isFound == false && isPlaced == 1)
            {
               isFound = true;
               medFound = counter;
            }

            Serial.print(medFound);
            Serial.print('\t');
         }

         String randomString = String(random(0xffff), HEX);
         snprintf(msg, BUFFER_LEN, "{\"mac_Id\" : \"%s\", \"weight\" : %d, \"medicine\" : \"%d\"}", macIdStr.c_str(), val, medFound);
         Serial.print("Publish message: ");
         Serial.println(msg);
         // client.publish("outTopic", msg);
         isFound = false;
         counter = 0;
         medFound = 0;
      }
   }
   digitalWrite(LED_BUILTIN, HIGH); // turn the LED on (HIGH is the voltage level)
   delay(100); // wait for a second
   digitalWrite(LED_BUILTIN, LOW); // turn the LED off by making the voltage LOW
   delay(100); // wait for a second
}
