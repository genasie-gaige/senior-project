#include <HX711_ADC.h>
#if defined(ESP8266) || defined(ESP32) || defined(AVR)
#include <EEPROM.h>
#endif
#include <SoftwareSerial.h>

SoftwareSerial ArduinoUno(3, 2);

// pins:
const int HX711_dout = 4; // mcu > HX711 dout pin
const int HX711_sck = 5; // mcu > HX711 sck pin

// HX711 constructor:
HX711_ADC LoadCell(HX711_dout, HX711_sck);

const int calVal_eepromAdress = 0;
unsigned long t = 0;

void setup()
{
   Serial.begin(115200);
   ArduinoUno.begin(115200);
   Serial.println();
   Serial.println("Starting...");

   LoadCell.begin();
   float calibrationValue;
   calibrationValue = 696.0;
#if defined(ESP8266) || defined(ESP32)
   EEPROM.begin(512); // uncomment this if you use ESP8266/ESP32 and want to fetch the calibration value from eeprom
#endif
   EEPROM.get(calVal_eepromAdress, calibrationValue); // uncomment this if you want to fetch the calibration value from eeprom

   unsigned long stabilizingtime = 2000; // preciscion right after power-up can be improved by adding a few seconds of stabilizing time
   boolean _tare = true; // set this to false if you don't want tare to be performed in the next step
   LoadCell.start(stabilizingtime, _tare);
   if(LoadCell.getTareTimeoutFlag())
   {
      Serial.println("Timeout, check MCU>HX711 wiring and pin designations");
      while(1)
         ;
   }
   else
   {
      LoadCell.setCalFactor(calibrationValue); // set calibration value (float)
      Serial.println("Startup is complete");
   }
}

void loop()
{
   LoadCell.update();

   if(ArduinoUno.available() > 0)
   {
      while(ArduinoUno.available() > 0)
      {
         ArduinoUno.read();
      }
      float i = LoadCell.getData();
      Serial.print("Load_cell output val: ");
      Serial.println(i);
      ArduinoUno.write(i);
   }
}
