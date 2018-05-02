// demo
var PROTO_PATH = __dirname + '/protos/helloworld.proto';
//使用protos buffer 数据格式

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;//对应加载hellworld 数据格式

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {

  callback(null, {message: 'Hello ' + call.request.name});//回调函数
  console.log(call.request);
}

//query SendData

function queryData(call,callback){
  callback(null,checkData(call));
}
//处理返回的数据
function checkData(call){
  let sendData;//定义返回的数据结构 这个地方可以从数据库中查询数据  现在简单拼装一下
  sendData = {
    id:2,
    name:'qweqwe'
  }
  return sendData;

}


/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {
    sayHello: sayHello,
    queryData: queryData
  });//Greeter.service 对应的res req
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());//绑定接口
  server.start();//启动
}

main();
