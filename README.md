# vuescrollnext
 一个支持 vue3 的scrollbar

## 1.安装 
```

npm install vuescrollnext --save
```
## 2.使用
```  html
 <el-table
                        v-scrollbar="{
                            container: '.logBody>.el-table__body-wrapper',
                            'ps-y-reach-end': testEvent,
                             psScrollX: testEvent,
                        }"
                        ref="logTableREF"
                        :data="tableData"
                        :stripe="false"
                        class="logBody"
                        :border="false"
                        tooltip-effect="light"
                        style="width: 100%"
                        height="450px"
                        @selection-change="handleSelectionChange"
                    > </el-table>
```

``` javascript  
// setup 
const testEvent = ()=>{}
return {
testEvent
}
```
不需要参数的情况,走默认配置
或者
``` html
<div v-scrollbar></div>
```
又或者
``` html
<div v-scrollbar=".logBody>.el-table__body-wrapper"></div>
```
## 3. css 样式文件根据自己情况 从node_module 拷贝出来修改覆盖 或者使用他原来默认的

