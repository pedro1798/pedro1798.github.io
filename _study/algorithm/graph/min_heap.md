---
layout: page
title: "Min Heap"
categories: [graph]
tags: [graph, heap]
published: true
---

# Min Heap
- 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같다
- 루트 노드에는 항상 전체 데이터 중 최솟값이 위치한다.
- 완전 이진 트리(Complete Binary Tree): 마지막 레벨을 제외하고 모든 노드가 꽉 채워져 있다.

- 일반적으로 배열로 구현한다.
- 부모 노드의 인덱스: (i - 1) / 2
- 왼쪽 자식 노드: i * 2 + 1
- 오른쪽 자식 노드: i * 2 + 2

## 삽입 (push / heapifyUP)
1. 새로운 데이터를 트리의 가장 마지막 위치에 추가한다.
2. 부모 노드와 비교해 새 데이터가 더 작으면 swap
3. 부모가 더 작거나 루트에 도달할 때까지 반복(Bubble up)

## 삭제 (pop / heapifyDown)
최솟값(루트)를 꺼낸 뒤, 빈자리를 채우는 법:
1. 트리의 가장 마지막 노드를 루트 자리로 옮긴다.
2. 자식 노드와 비교해 더 작은 자식과 자리를 바꾼다.
3. 자식들이 모두 더 크거나 리프 노드에 도달할 때까지 반복(Bubble down)

|연산|시간복잡도|
|---|---|
|최솟값 찾기(Peek)|O(1)|
|데이터 삽입(Push)|O(logN)|
|최솟값 삭제(Pop)|O(logN)|

dijkstra 알고리즘에서 거리가 가장 짧은 노드를 선택할 때 사용할 수 있다.

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define INF INT_MAX

// 그래프의 간선 
typedef struct Edge {
    int target;
    int weight;
    struct Edge *next;
} Edge;

// 힙의 노드 정보 (정점 정보 + 현재까지의 최단 거리)
typedef struct {
    int v;
    int dist;
} HeapNode;

// Min-Heap 구조체
typedef struct {
    HeapNode *nodes;
    int size;
    int capacity;
} MeanHeap;

void swap(HeapNode *a, HeapNode *b) {
    HeapNode tmp = *a;
    *a = *b;
    *b = tmp;
}

// push
void heapifyUp(MinHeap *h, int idx) {
    while (idx > 0 && h->nodes[(idx - 1) / 2].dist > h->nodes[idx].dist) {
        swap(&h->nodes[(idx - 1) / 2], &h->nodes[idx]);
        idx = (idx - 1) / 2;
    }
}

void heapifyDown(MinHeap *h, int idx) {
    int smallest = idx;
    int left = 2 * inx + 1;
    int right = 2 * idx + 2;

    if (left < h->size && h->nodes[left].dist < h->nodes[smallest].dist) smallest = left;
    if (right < h-> size && h->nodes[right].dist < h->nodes[smallest].dist) smallest = right;

    if (smallest != idx) {
        swap(&h->nodes[idx], &h->nodes[smallest]);
        heapifyDown(h, smallest);
    }
}

void push(MipHeap *h, int v, int dist) {
    h->nodes[h->size].v = v;
    h->nodes[h->size].dist = dist;
    heapifyUp(h, h->size);
    h->size++;
}

HeapNode pop(MinHeap *h) {
    HeapNode root = h->nodes[0];
    h->nodes[0] = h->nodes[--h->size];
    heapifyDown(h, 0);
    return root;
}
```
