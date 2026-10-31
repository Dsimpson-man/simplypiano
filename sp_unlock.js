/*
 * Simply Piano Premium Unlock
 * 目标接口：/server/asla/accounts/accountAuthenticate
 * 作用：把响应里的会员字段改写为一年期高级会员（家庭版）
 */
var raw = $response.body || "";
var obj;
try { obj = JSON.parse(raw); } catch (e) { $done({ body: raw }); }

var IAP = "com.joytunes.asla.oneyearpremiummembership_trial_180_mpma_fp_5profiles_bundle";

function set(o, k, v) {
  if (!o || typeof o !== "object") return;
  o[k] = v;
}

if (obj && obj.accountInfo) {
  var m = obj.accountInfo.membershipInfo;
  if (m) {
    set(m, "membershipType", "JOYTUNESBUNDLE");
    set(m, "membershipTier", "premium_home");
    set(m, "membershipDescription", "高级会员");
    set(m, "profilesAccess", "FAMILY");
    set(m, "planDuration", "oneyear");
    set(m, "daysRemaining", 366);
    set(m, "autoRenewable", 1);
    set(m, "isAutoRenew", 1);
    set(m, "isTrialPeriod", 0);
    set(m, "dateStarted", "2023-10-14");
    set(m, "currentIapID", IAP);
  }
}

if (obj && obj.profilesList && obj.profilesList.length) {
  for (var i = 0; i < obj.profilesList.length; i++) {
    var p = obj.profilesList[i];
    if (p.privileges && p.privileges.HomeConnection) {
      set(p.privileges.HomeConnection, "homeMembershipTier", "premium_home");
    }
    set(p, "isPremium", true);
  }
}

$done({ body: JSON.stringify(obj) });
