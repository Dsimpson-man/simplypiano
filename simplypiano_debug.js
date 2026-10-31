/*
 * Simply Piano 调试脚本：只弹通知，不改数据
 * 命中说明脚本确实被 QX/小火箭执行了
 */
var body = $response.body || "";
var url = $request.url || "";

function notify(sub, msg) {
  try { $notify("SP Debug", sub, msg); } catch (e) {}
  try { console.log("[SP] " + sub + " :: " + msg); } catch (e) {}
}

notify("脚本已执行", url.replace(/^https?:\/\//, "").split("?")[0] + "\n" + String(body).substring(0, 180));

$done({ body: body });
