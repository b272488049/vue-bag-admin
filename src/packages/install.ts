import type {App} from 'vue';
import router from '@/packages/router'
import setupInit from '@/packages/base/index'
import mitt from "mitt";

/**
 * router: {views:[菜单],external:[菜单路由]}
 *
 * store:{module:{store对象},namespace:’命名空间，默认web‘}
 */
interface $pluginType {
    router?: {
        views: Array<any>, // 菜单
        external?: any, // 外接路由文件所在路径
    },
    store?: {
        module: object,
        namespace?: string
    },
    prjlist?: {
        list: Array<any>
    },
    config?: object
}

const install = async (app: App, $plugin?: any) => {
    app.config.globalProperties.$plugin = $plugin;
    app.provide("AppGlobal", {version: '0.0.1'}); // 具体请看官网 [https://v3.cn.vuejs.org/api/application-api.html#provide]
    app.provide("$mitt", mitt());
    setupInit(app)
    router.isReady().then(() => {
        app.mount('#app')
    })
    window.__app__ = app;
}


export default install;
export {
    $pluginType
}
