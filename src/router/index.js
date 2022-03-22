//  路由入口文件
import {createRouter, createWebHashHistory} from 'vue-router'

// 配置式
import configRouter from './config-router';
// 约定式
import convenRouter from './conven-router';


const router = createRouter(
  {
    history: createWebHashHistory(),
    routes: [...convenRouter, ...configRouter]
  }
)

export default router;
