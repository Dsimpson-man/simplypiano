/********************************
 * Simply Piano - 字段探针（只弹通知，不改数据）
 ********************************/

[mitm]
hostname = asla.joytunes.com, alicdn.joytunescn.com

[rewrite_local]
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/accountAuthenticate url script-response-body https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/sp_probe.js
