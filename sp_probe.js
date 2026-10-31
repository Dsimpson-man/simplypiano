/*
 * Simply Piano 探针：列出所有会员相关字段
 */
var raw = $response.body || "";
var out = [];

function push(s) { out.push(s); }

var obj = null;
try { obj = JSON.parse(raw); } catch (e) { obj = null; }

if (!obj) {
  push("非JSON: " + String(raw).substring(0, 200));
} else {
  push("顶层键: " + Object.keys(obj).join(","));

  var RE = /role|member|subscri|premium|trial|plan|iap|product|entitle|access|tier|expire|renew|start|remain|family|profile|bundle|purchase|restore/i;
  var seen = [];

  function walk(o, path) {
    if (!o || typeof o !== "object") return;
    for (var k in o) {
      var v = o[k];
      var p = path ? path + "." + k : k;
      if (v && typeof v === "object") { walk(v, p); continue; }
      if (RE.test(k)) {
        seen.push(p + "=" + JSON.stringify(v));
      }
    }
  }
  walk(obj, "");

  if (seen.length) push(seen.join("\n"));
  else push("没找到会员相关字段");
}

try { $notify("SP Probe", "共 " + out.join(" | ").length + " 字", out.join("\n")); } catch (e) {}
try { console.log("[SP Probe] " + out.join(" | ")); } catch (e) {}

$done({ body: raw });
