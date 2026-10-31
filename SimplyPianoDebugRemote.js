/********************************
 * Simply Piano - 调试资源（远程脚本版）
 * 只匹配 accountAuthenticate，只弹通知，不改数据
 *
 * 用法：QX > 风车 > 重写 > 规则资源 > 引用本文件
 * 先关闭 SimplyPiano.js，只开本文件
 ********************************/

[mitm]
hostname = asla.joytunes.com, alicdn.joytunescn.com

[rewrite_local]
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/accountAuthenticate url script-response-body https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/sp_debug.js
