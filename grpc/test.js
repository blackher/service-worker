const grpc = require('grpc');
const fs =require('fs');
const path = require('path');
const R = requ
class RpcServer {
  constructor(ip, port) {
    this.ip = ip
    this.port = port
    this.services = {}
    this.functions = {}
  }

  // 自动加载proto并且运行Server
  autoRun(protoDir) {
    fs.readdir(protoDir, (err, files) => {
      if (err) {
        return logger.error(err)
      }
        for (var key in files) {
        const filePart = path.parse(files[key])
        const serviceName = filePart.name
        const packageName = filePart.name
        const extName = filePart.ext
        const filePath = path.join(protoDir, file)

        if (extName === '.js') {
          const functions = require(filePath).default
          this.functions[serviceName] = Object.assign({}, functions)
        } else if (extName === '.proto') {
          this.services[serviceName] =
            grpc.load(filePath)[packageName][serviceName].service
        }
      }

      return this.runServer()
    })
  }

  runServer() {
    const server = new grpc.Server()

    R.forEach((serviceName) => {
      const service = this.services[serviceName]
      server.addProtoService(service, this.functions[serviceName])
    }, R.keys(this.services))

    server.bind(`${this.ip}:${this.port}`,
                grpc.ServerCredentials.createInsecure())
    server.start()
  }
}
const rpcServer = new RpcServer('0.0.0.0', 50051)
rpcServer.autoRun(path.join(__dirname, '/protos/'))
