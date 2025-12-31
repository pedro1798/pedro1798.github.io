---
layout: post
title: Quick Sort 
date: 2026-1-1
---
- unstable sort

|경우|시간복잡도|
|---|---|
|최선|O(nlogn)|
|평균|O(nlogn)|
|최악|O(n^2)|

- partition 비용: O(n)
- 깊이: O(logn) 

```c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Lomuto 분할법(pivot 위치 결정)
int partition(int arr[], int low, int high) {
    int pivot = arr[high];   // 우선 마지막 원소를 pivot으로 선택
    int i = low - 1;         // 작은 원소들의 마지막 인덱스

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }

    swap(&arr[i + 1], &arr[high]);
    return i + 1;            // 피벗의 최종 위치
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);   // 왼쪽 부분 배열
        quickSort(arr, pi + 1, high);  // 오른쪽 부분 배열
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    quickSort(arr, 0, n - 1);

    printArray(arr, n);
    return 0;
}

```
