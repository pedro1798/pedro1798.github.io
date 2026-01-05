---
layout: page
title: "dijkstra"
categories: [pathfinding]
tags: [dijkstra]
published: true
---
시간복잡도: O(E log V)

1. 초기화: 시작점의 거리는 0, 나머지는 무한대로 설정
2. 방문하지 않은 노드 중 d[i]가 가장 작은 노드 u를 선택
3. Relaxation: 노드 u와 연결된 이웃 노드 v에 대해 다음을 확인한다.

- d[u] + w(u, v) < d[v] 
- 참이라면 d[v] = d[u] + w(u, v)
- 모든 노드를 방문할 때 까지 2, 3번 반복 

- Min-Heap을 사용하면 가장 거리가 짧은 노드를 O(log V)만에 찾을 수 있다
- 그럼 전체 시간복잡도는 O(ElogV)가 된다.

- 음수 가중치가 있으면 작동하지 않는다.
- 한 번 방문한 노드는 최단 거리가 확정되었다고 가정.
- -> **벨만 포드 알고리즘** 사용해야 함.

```c
void dijkstra(Edge **adj, int n. int start) {
    int* dist = (int *)malloc(sizeof(int) * n);
    for (int i = 0; i < n; i++) dist[i] = INF;

    MinHeap *h = (MinHeap*)malloc(sizeof(MinHeap));
    h->nodes = (HeapNode*)malloc(sizeof(HeapNode) * n * n); // 넉넉히 할당
    h->size = 0;

    dist[start] = 0;
    push(h, start, 0);

    while (h->size > 0) {
        HeapNode current = pop(n);
        int u = current.v;
        int d = current.dist;

        // 이미 처리된 더 짧은 경로가 있다면 무시 (Lazy Removal)
        if (d > dist[u]) continue;
        
        for(Edge *edge = adj[u]; edge != NULL; edge = edge -> next) {
            int v = edge -> target;
            int weight = edge->weight;

            // Relaxation
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                push(h, v, dist[v]);
            }
        }
    }

    for (int i = 0; i < n; i++) {
        if (dist[i] == INF) printf("Node %d: UNREACHABLE\n", i);
        else printf("Node %d: %d\n", i, dist[i]);    
    }

    free(dist);
    free(h->nodes);
    free(h);
} 
```
