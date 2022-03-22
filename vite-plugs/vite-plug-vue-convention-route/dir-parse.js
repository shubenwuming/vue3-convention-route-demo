const fs = require('fs');

function parsePagesDirectory() {
  const files = fs
    .readdirSync('./src/pages')
    .map((f) => ({ name: f.split('.')[0], importPath: `/src/pages/${f}` }))

  const imports = files.map((f) => `import ${f.name} from '${f.importPath}'`)

  const routes = files.map(
    (f) => `{
        name: '${f.name}',
        path: '/${f.name}',
        component: ${f.name},
      }
      `,
  )

  return { imports, routes }
}

module.exports = parsePagesDirectory





