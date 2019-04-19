# Dijkstra's algorithm implementation

> GNU license
---
### Description
Solving Shortest Path Problem: [Dijkstra’s Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
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
---
## Whats new in version 1.1.0?
One more implementation for cli-run in hackathon-style
* Run  
>node matrix 1  
* Result  
>[ [ 1, 2 ], [ 1, 3 ], [ 1, 3, 4 ], [ 1, 3, 6, 5 ], [ 1, 3, 6 ] ]  

* Few code, better algorithm, but lack of comments and userfriendly-namespace
```JS
let a=[,[,,7,9,,,14],[,7,,10,15],[,9,10,,11,,2],[,,15,11,,6],[,,,,6,,9],[,14,,2,,9]],
    b=[],v=[],s=[]
b[process.argv.slice(-1)[0]*1||1]=0
do{
 let u=b.map((bb,i)=>s[i]?NaN:bb)
 let n=u.indexOf(Math.min(...u.filter(a=>a>-1)))
 s[n]=1
 b=Array.apply(null,Array(a.length))
        .map((aa,i)=>(
           a[n][i]&&(!(b[i]>-1)||b[n]+a[n][i]<b[i])?
           (v[i]=(v[n]||[n]).concat(i))&&(b[n]+a[n][i]):
           b[i]
        ))
}while(a.length!==s.length)
console.log(v.filter(a=>a))
```