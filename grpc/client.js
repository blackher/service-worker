var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

function main() {
  var client = new hello_proto.Greeter('localhost:50051',grpc.credentials.createInsecure());//绑定服务
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  client.QueryData({id: 11}, function(err, response) {
    console.log('Greeting:', response);
  });
}

main();
