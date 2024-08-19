#include "StartupSequence.h"
#include "Pins.h"


void startUpSequenceSetup() {
    pinMode(RED, OUTPUT);
    pinMode(YELLOW, OUTPUT);
    pinMode(GREEN, OUTPUT);
}

void startUpSequence(unsigned long& startupSequenceTime, bool& starting, unsigned long currentTime) {
    unsigned long interval = 400;  // Interval for the startup sequence

    if (starting) {
        if (currentTime - startupSequenceTime < 7 * interval) {
            if (currentTime - startupSequenceTime < interval) {
                digitalWrite(RED, HIGH);
            } else if (currentTime - startupSequenceTime < 2 * interval) {
                digitalWrite(YELLOW, HIGH);
            } else if (currentTime - startupSequenceTime < 3 * interval) {
                digitalWrite(GREEN, HIGH);
            } else if (currentTime - startupSequenceTime < 4 * interval) {
                digitalWrite(GREEN, LOW);
            } else if (currentTime - startupSequenceTime < 5 * interval) {
                digitalWrite(YELLOW, LOW);
            } else if (currentTime - startupSequenceTime < 6 * interval) {
                digitalWrite(RED, LOW);
            } else if (currentTime - startupSequenceTime < 7 * interval) {
                digitalWrite(RED, HIGH);
                digitalWrite(YELLOW, HIGH);
                digitalWrite(GREEN, HIGH);
            }
        } else {
            digitalWrite(RED, LOW);
            digitalWrite(YELLOW, LOW);
            digitalWrite(GREEN, LOW);
            starting = false;
        }
    }
}
