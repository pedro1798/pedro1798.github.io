---
layout: default
title: union, enum, struct 사용 예시 코드 
date: 2026-1-7
---
# union, enum, struct 사용 예시 코드 

```c
#include <stdio.h>

typedef enum {INT, FLOAT, CHAR} Type;

typedef union {
    int i; // 예) 사람 수, 카운터 등 
    float f; // 예) 온도, 습도, 입력 등 
    char c; // 예) 장치 상태 ('Y', 'N', 'O', 'F') 등
} Value;

typedef struct {
    Type type;
    Value val;
} Sensor;

void printSensor(Sensor s) {
    switch(s.type) {
    case INT: printf("INT: %d\n", s.val.i ); break;
    case FLOAT: printf("FLOAT: %.2f\n", s.val.f); break;
    case CHAR: printf("CHAR: %c\n", s.val.c); break;
    }
}

int main() {
    Sensor s1 = {INT, .val.i = 100};
    Sensor s2 = {FLOAT, .val.f = 36.5f};
    Sensor s3 = {CHAR, .val.c = 'N'};

    printSensor(s1);
    printSensor(s2);
    printSensor(s3);

    return 0;
}

```
