/*
 * Simply Piano 调试脚本（QX 本地脚本版）
 * 放到：我的 iPhone / iCloud Drive -> Quantumult X -> Scripts
 * 引用：url script-response-body sp_debug.js
 */
var body = $response.body || "";
var url = $request.url || "";
var msg = url.replace(/^https?:\/\//, "").split("?")[0] + "\n----\n" + String(body).substring(0, 300);

function out(sub, m) {
  try { $notify("SP Debug", sub, m); } catch (e) {}
  try { console.log("[SP] " + sub + " :: " + m); } catch (e) {}
}

out("脚本已执行", msg);
$done({ body: body });
