// 约定式路由
/**
 * 普通： test.vue => /test
 * 动态路由形式：[id].vue =>  /:id
 * 嵌套路由形式：$test.vue文件 +  test文件夹，该文件和文件夹在同一层级目录中
 */

function generateRouteConfig() {
  // 扫描pages目录,读取该目录下以 .vue 结尾的文件(包含嵌套)
  const modules = import.meta.globEager('/src/pages/**/*.vue')

  // 路径处理
  let config = pathHandler(modules)

  // 确保children在parent后
  config.sort()

  // 处理嵌套路由
  childrenHandler(config)

  return config
}

function pathHandler(modules) {
  const pathConfig = []
  Object.keys(modules).forEach(path => {
    const handlePath = path
      // 去除src/pages
      .replace('/src/pages/', '')
      // 去除.vue后缀
      .replace(/.vue$/, '')
      // 动态路由
      .replace(/\[([\w-]+)]/, ':$1')

    // console.log('handlePath: ', handlePath);

    if (handlePath.includes('$')) {
      pathConfig.push({
        name: handlePath.replace(/[$:]/, '').replace('/', '-'),
        path: '/' + handlePath.replace(/index$/, '').replace('$', ''),
        component: modules[path].default,
        children: [],
      })
    } else {
      pathConfig.push({
        name: handlePath.replace(/[$:]/, '').replace('/', '-'),
        path: '/' + handlePath.replace(/index$/, ''),
        component: modules[path].default,
      })
    }
  })
  return pathConfig
}

function childrenHandler(config) {
  for (let i = 0; i < config.length; i++) {
    if (!'children' in config[i]) continue

    for (let j = i + 1; j < config.length; j++) {
      if (config[j].path.startsWith(config[i].path)) {
        config[i].children.push(config.splice(j, 1)[0])
        j--
      }
    }
  }
}

export default generateRouteConfig()
