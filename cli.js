//use service
const service=require('./service')

//call it
service({query:{start:process.argv.slice(-1)[0]*1||1}},{json:console.log})