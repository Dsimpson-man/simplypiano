/********************************
 * Simply Piano Premium Unlock
 *
 * 使用方法：
 * QX > 右下角风车 > 重写 > 规则资源 > 引用本文件地址
 *
 * 引用地址：
 * https://cdn.jsdelivr.net/gh/Dsimpson-man/simplypiano@main/SimplyPiano.js
 *
 * 说明：使用 QX 原生 response-body 改写，不依赖任何外部脚本
 ********************************/

[mitm]
hostname = asla.joytunes.com, alicdn.joytunescn.com

[rewrite_local]
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "error":"无法恢复购买信息" response-body "error":null
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "membershipType":"FREE" response-body "membershipType":"JOYTUNESBUNDLE"
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "membershipTier":"free_home" response-body "membershipTier":"premium_home"
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "membershipDescription":"未订阅" response-body "membershipDescription":"高级会员"
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "homeMembershipTier":"free_home" response-body "homeMembershipTier":"premium_home"
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "profilesAccess":null response-body "profilesAccess":"FAMILY"
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "planDuration":"unknown" response-body "planDuration":"oneyear"
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "daysRemaining":null response-body "daysRemaining":366
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "autoRenewable":0 response-body "autoRenewable":1
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "dateStarted":null response-body "dateStarted":"2023-10-14"
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "currentIapID":null response-body "currentIapID":"com.joytunes.asla.oneyearpremiummembership_trial_180_mpma_fp_5profiles_bundle"
^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/(accountAuthenticate|loginToAccountOfRestoredPurchase) url response-body "openProductIDs":\[\] response-body "openProductIDs":["com.joytunes.asla.oneyearpremiummembership_trial_180_mpma_fp_5profiles_bundle"]
