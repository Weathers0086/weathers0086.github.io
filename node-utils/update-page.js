/**
 * 统一格式化文件
 * */
const fs = require('fs')
const whiteListDir = [
  'app-mp',
  'app-zntk',
  'vcard-applet',
  'app-cytp',
  'app-hygl',
  'app-jztk',
  'app-jztkjr',
  'app-jzzs',
  'app-khgl',
  'app-zqht'
]
const whiteListDirSrc = [
  'vcard-applet'
]
const baseSrc = '/applet/app-mp' // 基准文件
const writeSrc = '/applet/' // 写入文件

// 下载
function download(writeUrl) {
  fs.readFile(baseSrc + writeUrl, function(err, data) {
    if (err) {
      console.log('err', err)
    } else {
      console.log('download-success!')
      const dirArr = fs.readdirSync(writeSrc)
      for (let i = 0; i < dirArr.length; i++) {
        if (whiteListDirSrc.indexOf(dirArr[i]) > -1) {
          write(data.toString(), writeSrc + dirArr[i] + '/src' + writeUrl)
        } else if (whiteListDir.indexOf(dirArr[i]) > -1) {
          write(data.toString(), writeSrc + dirArr[i] + writeUrl)
        }
      }
    }
  })
}

// 写入
let count = 0
function write(body, writeUrl) {
  fs.writeFile(writeUrl, body, function(err) {
    if (err) {
      console.log('err', err)
    } else {
      count++
      console.log('write-success!', count, writeUrl)
    }
  })
}

download('/store/modules/app.js')
download('/common/util/request.js')
download('/common/util/website.js')
download('/common/util/storage.js')
download('/constant.js')
