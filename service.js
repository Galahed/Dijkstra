module.exports=(req,res)=>{
console.log(req,res,process.argv)

  //Граф задан как набор дуг,связный,двунаправленный
  //Graph formed as set of edges, it is connected and undirected
  const graph_routes=[
   {nodes:[1,2],weight:7},
   {nodes:[1,3],weight:9},
   {nodes:[1,6],weight:14},
   {nodes:[2,3],weight:10},
   {nodes:[2,4],weight:15},
   {nodes:[3,6],weight:2},
   {nodes:[3,4],weight:11},
   {nodes:[4,5],weight:6},
   {nodes:[5,6],weight:9}
  ]

  //Переведем в формат вершина -> веса дуг до соседей
  //Translate it in set of relationships vertex->weight of edge to neighbor 
  const graph=new Set()
  graph_routes.forEach(route=>{
    const n=route.nodes
    const a=n[0] //начало и конец
    const b=n[1] //start and finish
    graph[a]=graph[a]||[] //инициализация вершин
    graph[b]=graph[b]||[] //vertex initializing
    graph[a][b]=graph[b][a]=route.weight //граф двунаправленный,неориентированный
                                         //graph duplex,undirected
  })

  //традиционный алгоритм с небольшим дополнением в виде сохранения путей
  //traditional algorithm with some additional case collect of paths to each vertex
  const start=req.query.start*1
  const graph_cost=[],paths=[],seen=[]
  graph_cost[start]=0
  do{
    const unvisited=graph_cost.map((cost,index)=>seen[index]?Number.MAX_SAFE_INTEGER:cost)
    const min=Math.min(...unvisited.filter(a=>a!==undefined))        //расчет следующей непосещенной вершины (минимальная стоимость пути от старта)
    const node=min?unvisited.indexOf(min):start                      //calc next unvisited vertex with minimal cost from start

    seen[node]=1
    graph[node].forEach((weight,neighbor)=>{                             //для всех вершин связной с этой ...
     if(weight){                                                         //for all nodes linked to it ...
       const candidate=graph_cost[node]+weight
       if(graph_cost[neighbor]===undefined||graph_cost[neighbor]>candidate){
         graph_cost[neighbor]=candidate                                  //простановка веса и формирование лучшего пути для ответа
         paths[neighbor]=(paths[node]||[start]).slice().concat(neighbor) //set cost of route and forming best path for the answer
       }
     }
    })

  }while(graph_cost.filter(a=>a).length>seen.filter(a=>a).length)  //условие выхода - сравнение увиденных и посещенных вершин
                                                                   //exit condition is equal quantity seen and visited vertex 
  res.json({paths})
  return {paths}
}