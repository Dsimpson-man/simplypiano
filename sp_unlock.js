/*
 * Simply Piano Premium Unlock
 * 按真实响应结构改写 accountInfo.membershipInfo 与 profilesList
 */
var raw = $response.body || "";
var obj;
try { obj = JSON.parse(raw); } catch (e) { $done({ body: raw }); }

var IAP = "com.joytunes.asla.oneyearpremiummembership_trial_180_mpma_fp_5profiles_bundle";
var changed = [];

function set(o, k, v, prefix) {
  if (!o || typeof o !== "object") return;
  if (JSON.stringify(o[k]) !== JSON.stringify(v)) {
    o[k] = v;
    changed.push(prefix + k);
  }
}

if (obj && obj.accountInfo) {
  var m = obj.accountInfo.membershipInfo;
  if (m) {
    set(m, "membershipType", "JOYTUNESBUNDLE", "membershipInfo.");
    set(m, "membershipTier", "premium_home", "membershipInfo.");
    set(m, "membershipDescription", "高级会员", "membershipInfo.");
    set(m, "profilesAccess", "FAMILY", "membershipInfo.");
    set(m, "planDuration", "oneyear", "membershipInfo.");
    set(m, "daysRemaining", 366, "membershipInfo.");
    set(m, "autoRenewable", 1, "membershipInfo.");
    set(m, "isAutoRenew", 1, "membershipInfo.");
    set(m, "isTrialPeriod", 0, "membershipInfo.");
    set(m, "dateStarted", "2023-10-14", "membershipInfo.");
    set(m, "currentIapID", IAP, "membershipInfo.");
  }
}

if (obj && obj.profilesList && obj.profilesList.length) {
  for (var i = 0; i < obj.profilesList.length; i++) {
    var p = obj.profilesList[i];
    if (p.privileges && p.privileges.HomeConnection) {
      set(p.privileges.HomeConnection, "homeMembershipTier", "premium_home", "profilesList." + i + ".HomeConnection.");
    }
    set(p, "isPremium", true, "profilesList." + i + ".");
  }
}

try { $notify("SP Unlock", "已改 " + changed.length + " 处", changed.slice(0, 12).join("\n")); } catch (e) {}
try { console.log("[SP Unlock] " + changed.join(", ")); } catch (e) {}

$done({ body: JSON.stringify(obj) });
