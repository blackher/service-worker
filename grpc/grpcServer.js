const grpc = require('grpc');
const config =require('./config/protosConfig');
const fs =require('fs');
const path = require('path');


class Grpc{

  constructor(){
    this.ip = config.ip;
    this.port = config.port;
    this.services = {};// 加载所有的server
    this.fucntion = {};// 加载所有的方法

  }
  loadProtoFiles(file){
    let that = this;
    fs.readdir(file,function(err,files){
      if(err){
        // 读取错误
        console.log(err);

      }

      //console.log(typeof(files));
      for (var key in files) {
        if (files.hasOwnProperty(key)) {
            //console.log(files[file]);
            //处理每个proto文件加入grpc中

            const filePath = path.parse(files[key]);// 处理文件
            const serviceName = filePath.name;// 获取文件名称
            const packageName = filePath.name;//获取文件package名称
            const filePaths = path.join(file, files[key]);// 获取文件绝对路径
            console.log(filePaths);
            if(filePath.ext === '.proto'){//获取文件扩展
              //配置文件
              that.services[serviceName] = grpc.load(filePaths)[packageName][serviceName].service;//加入服务
              //that.functions[serviceName]= Object.assign({},)
              //that.functions[]

            }
        }
      }
    })

  }

}
let a =new Grpc();
a.loadProtoFiles(__dirname+'/protos');
