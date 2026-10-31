/********************************
 * Simply Piano - 调试资源（本地脚本版）
 * 需先把 sp_debug.js 放进 Quantumult X/Scripts
 ********************************/

[mitm]
hostname = asla.joytunes.com, alicdn.joytunescn.com

[rewrite_local]
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/accountAuthenticate url script-response-body sp_debug.js
