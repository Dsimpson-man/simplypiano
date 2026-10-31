/********************************
 * Simply Piano Premium Unlock
 *
 * 引用地址（Quantumult X 规则资源）：
 * https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/SimplyPiano.js
 ********************************/

[mitm]
hostname = asla.joytunes.com, alicdn.joytunescn.com

[rewrite_local]
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/accountAuthenticate url script-response-body https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/sp_unlock_v2.js
