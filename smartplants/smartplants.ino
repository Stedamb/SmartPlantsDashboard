#include <Arduino.h>
#include <Grandeur.h>
#include "WiFi.h"
#include "StartupSequence.h"
#include "Pins.h"

// Constants
#define THRESHOLD 500
#define WARNING 350
#define OK 300
#define MY_DISCONNECTED 50  // Renamed from DISCONNECTED

// WiFi credentials
const char* ssid = "uai fai";
const char* passphrase = "stefanoo";

// Grandeur credentials
const char * apiKey = "grandeurlzyjijbs0w640ik9cog43v6x";
const char * token = "a7d23b141ea93433fe2cbc51d8d702b0bf626e4a07ad1de434f5fa8adf8ae3cf";
const char * deviceId = "devicelzzqxida1h8v0ik9655nc4og";

double analogValue;
int percentageValue;
bool isOn;
bool starting = true;

Grandeur::Project project;

// Timing variables
unsigned long lastSensorReadTime = 0;
unsigned long lastLEDTime = 0;
unsigned long lastPumpTime = 0;
unsigned long startupSequenceTime = 0;
unsigned long lastDataSendTime = 0;

unsigned long interval = 400;  // Interval for the startup sequence
unsigned long dataSendInterval = 5000; // Interval to send data to Grandeur (5 seconds)

// Function to map the sensor value to a percentage
int mapSensorToPercentage(int sensorValue) {
    int newValue = map(sensorValue, 600, 200, 0, 100);
    if (newValue < 0) {
      return 0;
    } else if (newValue > 100) {
      return 100;
    } else {
      return newValue;
    }
}

// Function to get the current timestamp
String getTimestamp() {
    unsigned long epoch = millis() / 1000; // Convert milliseconds to seconds
    return String(epoch);
}

void setup() {
    // Serial Setup
    Serial.begin(9600);

    // Pin Setup
    pinMode(LED, OUTPUT);
    pinMode(SENSOR, INPUT);
    pinMode(PUMP, OUTPUT);

    // Initialize startup sequence
    startUpSequenceSetup();

    // Initialize variables
    analogValue = 0.0;
    isOn = false;

    // Connect to WiFi
    connectToWiFi(ssid, passphrase);

    // Initialize Grandeur project
    project = grandeur.init(apiKey, token);

    // Record the start time
    startupSequenceTime = millis();
}

void loop() {
    unsigned long currentTime = millis();

    // Execute startup sequence
    startUpSequence(startupSequenceTime, starting, currentTime);

    // Read Sensor Value at defined intervals
    if (currentTime - lastSensorReadTime >= 1000) {
        analogValue = analogRead(SENSOR);
        percentageValue = mapSensorToPercentage(analogValue);
        Serial.print("Analog Value: ");
        Serial.print(analogValue);
        Serial.print(" -> Percentage: ");
        Serial.println(percentageValue);
        lastSensorReadTime = currentTime;
    }

    // Control Logic
    if (analogValue > THRESHOLD) {
        digitalWrite(RED, HIGH);
        digitalWrite(YELLOW, LOW);
        digitalWrite(GREEN, LOW);
        if (isOn && currentTime - lastPumpTime >= 5000) {
            digitalWrite(PUMP, HIGH);
            digitalWrite(LED, LOW);
            isOn = false;
            lastPumpTime = currentTime;
        } else if (!isOn && currentTime - lastPumpTime >= 1000) {
            digitalWrite(PUMP, LOW);
            digitalWrite(LED, HIGH);
            Serial.println("PUMP is on");
            isOn = true;
            lastPumpTime = currentTime;
        }
    } else if (analogValue > WARNING && analogValue <= THRESHOLD) {
        digitalWrite(RED, HIGH);
        digitalWrite(YELLOW, HIGH);
        digitalWrite(GREEN, LOW);
    } else {
        digitalWrite(RED, HIGH);
        digitalWrite(YELLOW, HIGH);
        digitalWrite(GREEN, HIGH);
    }

    // Send Sensor Data to Cloud every defined interval
    if (project.isConnected() && currentTime - lastDataSendTime >= dataSendInterval) {
        String timestamp = getTimestamp();
        project.device(deviceId).data().set("sensorValue", analogValue);
        project.device(deviceId).data().set("percentageValue", percentageValue);
        project.device(deviceId).data().set("timestamp", timestamp);
        Serial.println("Data sent to Grandeur");

        lastDataSendTime = currentTime;
    }

    // Run SDK Loop
    if (WiFi.status() == WL_CONNECTED) {
        project.loop();
    }
}

