import fs from 'fs'
import glob from 'glob'
const CSSs = glob.sync('./dist/assets/css/**.css')
CSSs.forEach(path => {
  console.log(path)
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err
    const result = data.replace(/url\(\"\.\/img/g, 'url("../images').replace(/url\(\.\/assets\/images/g, 'url(../images')
    fs.writeFile(path, result, 'utf8', err => {
      if (err) throw err
      console.log('css 路徑修改完成！')
    })
  })
})

// const HTMLs = glob.sync('./dist/**/**.html')
// HTMLs.forEach(path => {
//   fs.readFile(path, 'utf8', (err, data) => {
//     if (err) throw err
//     const result = data
//       .replace(/src\=\".\/assets\/js\//g, 'src="https://cdn.carnationsp.com/assets/js/')
//       .replace(/href\=\".\/assets\/js\//g, 'href="https://cdn.carnationsp.com/assets/js/')
//     fs.writeFile(path, result, 'utf8', err => {
//       if (err) throw err
//       console.log('js src 路徑修改完成！')
//     })
//   })
// })