module.exports=(req,res)=>{
  //Граф задан как набор дуг,связный,двунаправленный
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
/*
  const rec=(path,weight=0)=>{
    const node=path[path.length-1]
    const duplex=(a,b)=>{
      return graph_routes.filter(route=>route.nodes[a]===node&&path.indexOf(node)==-1).map(route=>rec(path.concat(route.nodes[b],route.weight)))
    }
    return []duplex(0,1)
    duplex(1,0)
  }
  rec([req.query.start*1])

  repeat{
   let changes=1
  }until{!changes}
*/
/*
  const max=graph_routes.reduce((max,route)=>Math.max(...route.nodes.concat(max||0)))
  const path=[req.query.start*1]
  const result=[]
  let weight=0
  while(path.length<max){
    const duplex=(a,b)=>{
      c=graph_routes.filter(route=>(route.nodes[a]===path.slice(-1)[0]&&!path.includes(route.nodes[b])))
      console.log({c})
      c.forEach(route=>{
       result[route.nodes[b]]={node:route.nodes[b],weight:weight+route.weight,path:path.push(route.nodes[b])}
      })
      console.log({result})
    }
    duplex(0,1)&&duplex(1,0)
    const t=result.filter((r,i)=>(r&&!path.includes(r.node)))
    console.log({t})
    console.log({result})
    const next=result.filter((r,i)=>(r&&!path.includes(r.node))).sort((a,b)=>(a.weight<b.weight?-1:a.weight>b.weight?1:0))[0]
    console.log({next})
    path.push(next.node)
    weight=next.weight
    console.log(path)
  }
*/
/*
  const result=rec(req.query.start*1,graph_routes,[],[])
  const rec=(node,routes,result,result_paths)=>{
    const duplex=(a,b)=>{
      return routes.filter(route=>route.nodes[a]===node)
                   .forEach(route=>{
                      result_paths[]
                      result[b]=result[node]+route.weight
                   })
    }
    routes.
  }
*/
/*
  let node=req.query.start*1
  const costs=[]
  const paths=[]
  const visited=[]
  for(i=0;i<graph_routes.length;i++){
    graph_routes.filter->costs
    costs ! paths min

    const duplex=(a,b)=>{
      graph_routes
      .filter(route=>(route.nodes[a]===node&&!paths[node].includes(route.nodes[b])))
      .forEach(route=>{
       if(!costs[route.nodes[b]]){costs[route.nodes[b]]=Number.MAX_SAFE_INTEGER}
       const dif=costs[route.nodes[b]]-(costs[node]+route.weight)
       if(dif>0){
         costs[route.nodes[b]]-=dif
         paths[node].push(route.nodes[b])
       }
      })
    }
    duplex(0,1)
    duplex(1,0)
    _.differenceWith(costs,visited,_.isEqual)

    graph_routes.filter(route=>)
    const duplex=(a,b)=>{
      return routes.filter(route=>route.nodes[a]===node)
                   .forEach(route=>{
                      result_paths[]
                      result[b]=result[node]+route.weight
                   })
    }

  }


  return res.json(result)
*/

  //Переведем в формат вершина -> веса дуг до соседей
  const graph=new Set()
  graph_routes.forEach(route=>{
    const n=route.nodes
    const a=n[0] //начало и конец
    const b=n[1]
    graph[a]=graph[a]||[] //инициализация вершин
    graph[b]=graph[b]||[]
    graph[a][b]=graph[b][a]=route.weight //граф двунаправленный
  })


  //более традиционный алгоритм с небольшим дополнением в виде сохранения путей
  const start=req.query.start*1
  const graph_cost=[],paths=[],seen=[]
  graph_cost[start]=0
  do{
    const unseen=graph_cost.map((cost,index)=>seen[index]?Number.MAX_SAFE_INTEGER:cost)
    const min=Math.min(...unseen.filter(a=>a!==undefined))
    const node=min?unseen.indexOf(min):start

    seen[node]=1
    graph[node].forEach((weight,neighbor)=>{
     if(weight){
       const candidate=graph_cost[node]+weight
       if(graph_cost[neighbor]===undefined||graph_cost[neighbor]>candidate){
         graph_cost[neighbor]=candidate
         paths[neighbor]=(paths[node]||[start]).slice().concat(neighbor)
       }
     }
    })
  }while(graph_cost.filter(a=>a).length>seen.filter(a=>a).length)

  res.json({paths})
}