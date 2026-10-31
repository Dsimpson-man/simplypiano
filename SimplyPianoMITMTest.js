/********************************
 * Simply Piano - MITM 连通性测试
 *
 * 用法：QX > 风车 > 重写 > 规则资源 > 引用本文件
 * 引用后打开 Simply Piano 退出登录并重新登录：
 *   登录失败 / 提示网络错误  => MITM 正常，问题在改写内容
 *   登录依然正常            => MITM 没生效，跟脚本无关
 *
 * 测试完请关闭本资源
 ********************************/

[mitm]
hostname = asla.joytunes.com, alicdn.joytunescn.com

[rewrite_local]
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/ url reject
