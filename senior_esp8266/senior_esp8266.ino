#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>

const char *ssid = "TamGenDanny";
const char *password = "TamGenDanny811";
WiFiServer server(80);
SoftwareSerial NodeMCU(D2,D3);

void setup() {
 Serial.begin(115200);
 NodeMCU.begin(4800);
 pinMode(D2,INPUT);
 pinMode(D3,OUTPUT);
 
 Serial.println();
 Serial.print("Configuring access point...");
 delay(1000);
 WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED) {
   delay(500);
   Serial.print(".");
 }
 Serial.println("");
 Serial.println("WiFi connected");
 Serial.println("IP address: ");
 Serial.println(WiFi.localIP());
 server.begin();
 
}
void loop() {
 WiFiClient client = server.available();
 if(client) {
  while(client.connected()) {
    while(client.available() > 0 || NodeMCU.available() > 0) {
      if(client.available() > 0){
        char c = client.read();
        Serial.write(c);
      } else {
        char val = NodeMCU.read();
        if(NodeMCU.read() == '\n'){
          Serial.println(val);
          delay(1000);
          client.write(val);
        }
      }
    }
    delay(10);
  }
  client.stop();
  Serial.println("Client disconnected");
 }
} 
