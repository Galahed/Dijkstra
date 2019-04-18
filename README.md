# Dijkstra's algorithm implementation

> GNU license
---
### Description
Solving Shortest Path Problem: Dijkstra’s Algorithm  
![Graph](https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif)

---
## Installation
```
npm i
```
---
## Run
1) Pure express server:  
npm run start_express  
http://127.0.0.1/api/dijkstra/calc?start=1  
  
2) Pure moleculer broker:  
npm run start_broker  
http://127.0.0.1:3000/dijkstra/calc?start=1  
  
3) Express + moleculer broker:  
npm run start_express_broker  
http://127.0.0.1:8000/api/dijkstra/calc?start=1  
  
4) Command-line interface:  
npm run start_cli -- 1  
---
## Result
```
{"paths":[null,null,[1,2],[1,3],[1,3,4],[1,3,6,5],[1,3,6]]}
```
---
## Author
* Dmitriy Klimov
---
## Best regards!