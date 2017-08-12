# vue-music

> kkc-music

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


```
build目录是对webpack的一些配置文件 定义的一些方法

src目录是开发代码目录

base目录是基础组件库的存放地址

components是业务组件库的存放地址

router 是路由定义文件

common目录下存放的是一些公用的css 字体图标 图片 还有封装好的js方法

利用axios进行后端服务代理 请求到qq音乐的数据

获取数据 一般在生命周期钩子函数created里面 实例已经创建完成之后被调用

操作dom 在生命周期函数mounted里面 因为这个函数执行的时候dom已经加载完毕了

用<keep-alive>把路由组件包裹  可以把组件中的dom保存在内存中 这样就不会跳转到别的路由再回来的时候dom重新加载了 也不会再重新请求了

destroyed 生命周期钩子函数 这个钩子的作用是 当组件里面有计时器这种资源的时候 在组件销毁的时候 可以在这个钩子里面去销毁计时器这种资源

recommend --推荐组件
m-header  --头部组件
rank      --排行组件
search    --搜索组件
tab       --导航组件
singer    --歌手组件