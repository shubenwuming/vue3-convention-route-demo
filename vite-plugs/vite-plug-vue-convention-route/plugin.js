const parsePagesDirectory = require('./dir-parse');

module.exports = function (options = {dirs: 'src/pages',}) {
  const { imports, routes } = parsePagesDirectory()

  const moduleContent = `
    ${imports.join('\n')}
    export const routes = [${routes.join(', \n')}]
  `

  

  return {
    name: 'convention-route',  // 将会在 warning 和 error 中显示
    apply: 'serve', // 该插件是在开发(serve) 或者  构建(build)中使用，默认是开发和构建中都会调用,
    enforce: 'pre',
    configureServer() {

    }
    
  }
}



