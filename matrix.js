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
