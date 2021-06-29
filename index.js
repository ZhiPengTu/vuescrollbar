
import PerfectScrollbar from 'perfect-scrollbar';
// import '../assets/css/scroll.css'


/**
 * 
 * @param str aBot => a-bot
 * @returns 
 */
const toCamelCaseStyle = (str) => {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};
/**
 * 
 * @param str x-yaa-zxx =>xYaaZxx
 * @returns 
 */
export const toCamelCaseSheet = (str) => {
    return str.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase());
};



/**
 * @interface container  容器id 可以是 '.logBody>.el-table__body-wrapper'
 * @interface  suppressScrollX  默认false ,是否禁用X轴滚动条
 * @interface  suppressScrollY  默认false ,是否禁用Y轴滚动条
 * @interface  timeout  cure dom async render 修复dom异步呈现 (自定义配置项)
 * @interface  scrollXMarginOffset  在不启用X轴滚动条的情况下，内容宽度可以超过容器宽度的像素数。允许一些“摆动空间”或“偏移中断”，这样X轴滚动条就不会因为几个像素而启用
 * @interface  scrollYMarginOffset   在不启用Y轴滚动条的情况下，内容宽度可以超过容器宽度的像素数。允许一些“摆动空间”或“偏移中断”，这样X轴滚动条就不会因为几个像素而启用
 * @interface handlers 默认  ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'], 用于滚动元素的处理程序列表
 * @interface wheelSpeed 默认1 应用于鼠标滚轮事件的滚动速度
 * @interface wheelPropagation 默认false  如果此选项为true，则当滚动到达边的末尾时，鼠标滚轮事件将传播到父元素
 * @interface swipeEasing  默认false  如果此选项为真，则轻扫滚动
 * @interface minScrollbarLength  默认 null  当设置为整数值时，滚动条的拇指部分不会缩小到该像素数以下
 * @interface maxScrollbarLength  默认 null  当设置为整数值时，滚动条的拇指部分不会扩展到该像素数
 * @interface scrollingThreshold 默认 1000  这将ps-scrolling-x和ps-scrolling-y类的阈值设置为保持不变。在默认的CSS中，无论悬停状态如何，它们都会显示滚动条。单位是毫秒
 * @interface useBothWheelAxes default false 
 * 
 */

// interface scrollBarOptions {
//     container?: string
//     suppressScrollX?: boolean
//     suppressScrollY?: boolean
//     scrollXMarginOffset?: number
//     scrollYMarginOffset?: number
//     handlers?: string[]
//     timeout?: number
//     wheelSpeed?: number,
//     wheelPropagation?: boolean
//     swipeEasing?: boolean
//     minScrollbarLength?: number
//     maxScrollbarLength?: number
//     scrollingThreshold?: number
//     useBothWheelAxes?: boolean
//     testEvent?: Function
// }
/**
 * 参数可以写成 驼峰格式 当前已经做好了 兼容
 * @param el  
 * @event ps-scroll-y
 * This event fires when the y-axis is scrolled in either direction.
 * @event ps-scroll-x
 * This event fires when the x-axis is scrolled in either direction.
 * @event ps-scroll-up
 * This event fires when scrolling upwards.
 * @event ps-scroll-down
 * This event fires when scrolling downwards.
 * @event ps-scroll-left
 * This event fires when scrolling to the left.
 * @event ps-scroll-right
 * This event fires when scrolling to the right.
 * @event ps-y-reach-start
 * This event fires when scrolling reaches the start of the y-axis.
 * @event ps-y-reach-end
 * This event fires when scrolling reaches the end of the y-axis (useful for infinite scroll).
 * @event ps-x-reach-start
 * This event fires when scrolling reaches the start of the x-axis.
 * @event ps-x-reach-end
 * This event fires when scrolling reaches the end of the x-axis.
 * You can also watch the reach state via the reach property.
 * 更多详情 [https://github.com/mdbootstrap/perfect-scrollbar]
 */


/**
 * @param el 容器
 * @param options 配置项 
 */
const el_scrollBar = (el, options) => {
    if (el._ps_ instanceof PerfectScrollbar) {
        el._ps_.update();
    } else {
        const ps = new PerfectScrollbar(el, options || {});
        for (let handler in options) {
            if (typeof options[handler] === 'function') {
                el.addEventListener(toCamelCaseStyle(handler), options[handler])
            }
        }
        el._ps_ = ps
    }
};
// 自定义指令
const Direcive = {
    mounted: function (el, binding) {
        if (typeof binding.value == "object") {
            let dom
            setTimeout(() => {
                dom = el.querySelector(binding.value.container) || el;
                if (!dom) {
                    return console.warn(`未找到可供绑定的dom${binding.value}`);
                }
                const rules = ["fixed", "absolute", "relative"];
                if (!rules.includes(window.getComputedStyle(dom, null).position)) {
                    console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
                }
                el_scrollBar(dom, binding.value);
            }, binding.value.timeout || 0)
        } else {
            let dom
            dom = el.querySelector(binding.value) || el;
            el_scrollBar(dom);
        }
    },
    beforeMount: function (el, binding) { },
    updated: function (el, binding, vnode) {
        if (!el) {
            return console.warn(`未找到可供绑定的dom,${binding.value}`);
        }
        if (typeof binding.value == "object") {
            el = el.querySelector(binding.value.container) || el;
            el_scrollBar(el, binding.value);
        } else {
            el = el.querySelector(binding.value) || el;
            el_scrollBar(el)
        }
    }
}

// 名称自己定义
export default {
    install(app) {
        app.directive('scrollbar', Direcive)
    }
}
