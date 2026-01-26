---
layout: default
title: struct의 패딩
date: 2026-1-9
---
# struct의 크기와 패딩 

## padding
```c
typedef struct {
    char a; // 1 byte
    int b; // 4 byte
    short c; // 2 byte
} MyStruct;

int main() {
    printf("%zu\n", sizeof(MyStruct)); // 12 출력
}
```

위 선언된 MyStruct 구조체의 필드 크기의 합은 7byte이지만, sizeof(MyStruct)를 해 보면 12byte가 나온다.
cpu가 연산하기 쉽게, 컴파일러가 CPU의 데이터 접근 효율을 높이기 위해 word 단위에 맞춰 멤버 변수 사이에 빈 공간(더미 바이트)을 자동으로 삽입하기 때문이다. (32bit 컴퓨터는 1word=4byte, 64비트 컴퓨터는 1word=8byte).

만약 데이터가 메모리 경계에 걸쳐서 저장되어 있다면, CPU는 데이터를 읽기 위해 메모리에 두 번 접근해야 하고 이를 합치는 추가 연산이 필요하다.

이를 방지하기 위해 컴파일러는 각 자료형을 해당 자료형의 크기 배수에 맞춰 정렬(Alignment)하는데, 이때 남는 공간을 패딩으로 채운다.

위의 예시에선:
```c
char a; // 1byte
padding 3byte
int b; // 4byte
short c; // 2byte
padding 2byte 
```

와 같이 패딩이 5byte 생성된다. 

크기가 큰 멤버 변수를 우선해서 선언하면 패딩을 최소화할 수 있다.
```c
typedef struct {
    int b; // 4byte
    short c; // 2byte
    char a; // 1byte
} MyStruct;

int main() {
    printf("%zu\n", sizeof(MyStruct)); // 8 출력
}
```
이 예시에선: 
```c
int b; // 4byte
short c; // 2byte
char a; // 1byte
padding 1byte
```

이처럼 패딩이 채워져 sizeof(MyStruct)는 8을 출력한다.

## 컴파일러 지시어

네트워크 통신이나 파일 입출력 시, 패딩 없이 데이터를 정확히 맞추고 싶을 때는 컴파일러 지시어를 사용할 수 있다.
```c
#pragma pack(push, 1) // 1바이트 단위로 정렬 (패딩 제거)
struct PackedStruct {
    char a;
    int b;
    short c;
};
#pragma pack(pop)
```

이 경우 sizeof(MyStruct)는 정확히 7byte가 나오지만, cpu 접근 속도가 약간 느려질 수 있다.
