/********************************
 * Simply Piano - 调试资源（需要本地脚本 sp_debug.js）
 *
 * 前置：把 sp_debug.js 放进 Quantumult X/Scripts 文件夹
 * 用法：QX > 风车 > 重写 > 规则资源 > 引用本文件
 ********************************/

[mitm]
hostname = asla.joytunes.com, alicdn.joytunescn.com

[rewrite_local]
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/ url script-response-body sp_debug.js
