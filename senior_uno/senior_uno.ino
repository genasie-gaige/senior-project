#include <HX711_ADC.h>
#if defined(ESP8266) || defined(ESP32) || defined(AVR)
#include <EEPROM.h>
#endif
#include <SoftwareSerial.h>
#include <QTRSensors.h>

SoftwareSerial ArduinoUno(3, 2);
QTRSensors qtr;

const uint8_t SensorCount = 2;
uint16_t sensorValues[SensorCount];

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

   qtr.setTypeAnalog();
   qtr.setSensorPins((const uint8_t[]){ A0, A1 }, SensorCount);

   delay(500);
   pinMode(LED_BUILTIN, OUTPUT);
   digitalWrite(LED_BUILTIN, HIGH);

   for(uint16_t i = 0; i < 400; i++)
   {
      qtr.calibrate();
   }
   digitalWrite(LED_BUILTIN, LOW);

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
   qtr.read(sensorValues);

   if(ArduinoUno.available() > 0)
   {
      ArduinoUno.read();
      float i = LoadCell.getData();
      ArduinoUno.write(i);
      for(uint8_t i = 0; i < SensorCount; i++)
      {
         if(sensorValues[i] > 100)
         {
            ArduinoUno.write('1');
         }
         else
         {
            ArduinoUno.write('0');
         }
      }
   }
}
