#include <SoftwareSerial.h>
SoftwareSerial ArduinoUno(3,2);

void setup(){
  
  Serial.begin(9600);
  ArduinoUno.begin(4800);

}

void loop(){
  ArduinoUno.print('1');
  ArduinoUno.println('\n');
}
