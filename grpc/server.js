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
  console.log(call);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});//Greeter.service 对应的res req
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());//绑定接口
  server.start();//启动
}

main();
