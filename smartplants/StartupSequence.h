#ifndef STARTUPSEQUENCE_H
#define STARTUPSEQUENCE_H

#include <Arduino.h>

// Function declarations
void startUpSequence(unsigned long& startupSequenceTime, bool& starting, unsigned long currentTime);
void startUpSequenceSetup();

#endif
