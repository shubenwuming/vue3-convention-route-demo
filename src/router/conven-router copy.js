// 约定式路由

import _ from "lodash";
const layoutRoutes = import.meta.globEager("../layouts/*.vue");
console.log('layoutRoutes: ', layoutRoutes);
const viewRoutes = import.meta.globEager("../views/**/*.vue");
console.log('viewRoutes: ', viewRoutes);

const getViewRoutes = (filename, component) => {
  const name = filename.match(/\.\.\/views\/(?<name>.+?)(index)?\.vue/i)?.groups
    ?.name;

  return {
    path: "/" + name,
    name: name,
    component: component.default,
    children: [],
  };
};

const getLayoutRoutes = (filename, component) => {
  const name = filename.match(/\.\.\/layouts\/(?<name>.+?)\.vue/i)?.groups
    ?.name;

  return {
    path: "/" + name,
    name: name,
    component: component.default,
    children: [],
  };
};
const getChildRoutes = (layoutRoute) => {
  const routes = [];
  _.toPairs(viewRoutes).map(([filename, module]) => {
    if (filename.includes(layoutRoute.name)) {
      routes.push(getViewRoutes(filename, module));
    }
  });
  return routes;
};
const getRoutes = () => {
  const routes = _.toPairs(layoutRoutes).map(([file, module]) => {
    const layoutRoute = getLayoutRoutes(file, module);
    layoutRoute.children = getChildRoutes(layoutRoute);
    return layoutRoute;
  });
  console.log(routes);
  return routes;
};

export default getRoutes();