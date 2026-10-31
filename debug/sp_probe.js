/*
 * Simply Piano 探针：只弹通知，不改数据
 */
var raw = $response.body || "";
var out = [];
var obj = null;
try { obj = JSON.parse(raw); } catch (e) { obj = null; }

if (!obj) {
  out.push("非JSON: " + String(raw).substring(0, 120));
} else {
  out.push("顶层键: " + Object.keys(obj).join(","));
  var RE = /role|member|subscri|premium|trial|plan|iap|product|entitle|access|tier|expire|renew|remain|home|bundle/i;
  var seen = [];
  (function walk(o, path) {
    if (!o || typeof o !== "object") return;
    for (var k in o) {
      var v = o[k], p = path ? path + "." + k : k;
      if (v && typeof v === "object") { walk(v, p); continue; }
      if (RE.test(k)) seen.push(p + "=" + JSON.stringify(v));
    }
  })(obj, "");
  if (seen.length) out.push(seen.join("\n"));
}

try { $notify("SP Probe", "拦截成功", out.join("\n")); } catch (e) {}
try { console.log("[SP Probe] " + out.join(" | ")); } catch (e) {}
$done({ body: raw });
