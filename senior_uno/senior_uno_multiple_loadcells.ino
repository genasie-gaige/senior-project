#include <HX711_ADC.h>
#include <SoftwareSerial.h>
#include <QTRSensors.h>

SoftwareSerial ArduinoUno(3, 2);
QTRSensors qtr;

const uint8_t SensorCount = 4;
uint16_t sensorValues[SensorCount];

HX711_ADC LoadCell(4, 5);
HX711_ADC LoadCell2(6, 7);

const int calVal_eepromAdress = 0;

unsigned long t = 0;
uint8_t isTrue = 1;
uint8_t isFalse = 0;

void setup()
{
   Serial.begin(115200);
   ArduinoUno.begin(115200);
   Serial.println();
   Serial.println("Starting...");

   qtr.setTypeAnalog();
   qtr.setSensorPins((const uint8_t[]){ A0, A1, A2 }, SensorCount);

   delay(500);
   pinMode(LED_BUILTIN, OUTPUT);
   digitalWrite(LED_BUILTIN, HIGH);

   for(uint16_t i = 0; i < 400; i++)
   {
      qtr.calibrate();
   }
   digitalWrite(LED_BUILTIN, LOW);

   LoadCell.begin();
   LoadCell2.begin();
   float calibrationValue = 696.0;

   // EEPROM.get(calVal_eepromAdress, calibrationValue); // uncomment this if you want to fetch the calibration value from eeprom

   unsigned long stabilizingtime = 2000; // preciscion right after power-up can be improved by adding a few seconds of stabilizing time
   boolean _tare = true; // set this to false if you don't want tare to be performed in the next step
   LoadCell.start(stabilizingtime, _tare);
   LoadCell2.start(stabilizingtime, _tare);
   if(LoadCell.getTareTimeoutFlag() || LoadCell2.getTareTimeoutFlag())
   {
      Serial.println("Timeout, check MCU>HX711 wiring and pin designations");
      while(1)
         ;
   }
   else
   {
      LoadCell.setCalFactor(calibrationValue);
      LoadCell2.setCalFactor(calibrationValue); // set calibration value (float)
      Serial.println("Startup is complete");
   }
}

void loop()
{
   LoadCell.update();
   LoadCell2.update();
   qtr.read(sensorValues);

   if(ArduinoUno.available() > 0)
   {
      while(ArduinoUno.available() > 0)
      {
         ArduinoUno.read();
      }

      float i = LoadCell.getData();
      float j = LoadCell2.getData();
      Serial.print(i);
      Serial.print('\t');
      Serial.print(j);
      Serial.print('\t');
      Serial.print(j + i);
      Serial.println();
      Serial.println();
      ArduinoUno.write(i + j);

      for(uint8_t i = 0; i < SensorCount; i++)
      {
         Serial.println(sensorValues[i]);
         if(sensorValues[i] > 500)
         {
            ArduinoUno.write(isTrue);
         }
         else
         {
            ArduinoUno.write(isFalse);
         }
      }
   }
   delay(500);
}
