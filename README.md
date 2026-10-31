# Simply Piano Premium Unlock

解锁 Simply Piano 高级会员（一年期 / 家庭版）的代理重写规则。

支持 **Quantumult X** 和 **Shadowrocket**。所有文件统一托管在本仓库。

---

## 文件说明

| 文件 | 作用 |
|---|---|
| `SimplyPiano.js` | **Quantumult X 重写资源**，在 QX 里引用这个 |
| `SimplyPiano_shadowrocket.conf` | **Shadowrocket 模块**，在小火箭里引用这个 |
| `sp_unlock_v2.js` | 脚本本体，由上面两个文件引用，不需要手动处理 |

所有地址统一使用 GitHub 原始地址（`raw.githubusercontent.com`）。

---

## Quantumult X

1. QX → 右下角 **风车** → **重写** → **规则资源** → 右上角 `+`
2. 粘贴：

   ```
   https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/SimplyPiano.js
   ```

3. 打开这条资源的开关

## Shadowrocket

1. 小火箭 → **配置** → 右上角 `+` → **从 URL 添加**
2. 粘贴：

   ```
   https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/SimplyPiano_shadowrocket.conf
   ```

3. 打开该模块的开关

> 如果小火箭里从 URL 添加超时，见下方「小火箭下载超时」一节。

---

## 必须打开的开关（漏一个就完全无效）

1. **重写 / Rewrite** 开关
2. **MitM / HTTPS 解密** 开关
3. 生成并安装证书
4. **iOS 设置 → 通用 → 关于本机 → 证书信任设置** → 打开对应 App 的根证书

> 第 3 步和第 4 步是两件事。只装了描述文件但没在「证书信任设置」里打开，
> 等于没装，所有 HTTPS 改写都会静默失效。

5. 打开 Simply Piano，**用邮箱登录**（不要用「通过 Apple 登录」）

---

## 重要注意事项

### 1. Apple 账号登录会失败

使用「通过 Apple 登录」时会出现「服务器错误 / 连接错误」。
这是 Sign in with Apple 的认证链路被拦截导致的，**与本项目无关**。

👉 请使用**邮箱 + 密码**登录。

### 2. 必须重新登录

Simply Piano 会缓存账号信息，`accountAuthenticate` 只在登录时调用。
改完配置后必须**退出登录 → 重新登录**，否则看到的还是旧状态。

### 3. 脚本更新后要清缓存

客户端会缓存下载过的脚本，文件名不变就不会重新下载。
如果改了脚本但没生效，或旧版本还在弹窗：

- 删掉资源/模块，重新添加一次
- 或给脚本换个文件名（如 `sp_unlock_v2.js` → `sp_unlock_v3.js`）并同步修改引用

### 4. 小火箭下载超时

小火箭「从 URL 添加」配置时，这个请求**可能不走代理隧道**，
所以 `raw.githubusercontent.com` 会直接超时（QX 的脚本下载走代理，一般没问题）。

绕过方法：

**方式 A：用 Safari 打开**

```
https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/SimplyPiano_shadowrocket.conf
```

Safari 会弹出「在 Shadowrocket 中打开」，点一下即可导入。

**方式 B：手动新建**

复制下面的内容，在小火箭里新建模块后粘贴：

```
#!name=Simply Piano Premium
#!desc=Simply Piano 高级会员解锁（Shadowrocket）

[Script]
http-response ^https?://(asla\.joytunes\.com|alicdn\.joytunescn\.com)/server/asla/accounts/accountAuthenticate script-path=https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/sp_unlock_v2.js, requires-body=1, timeout=60

[MITM]
hostname = asla.joytunes.com, alicdn.joytunescn.com
```

---

## 实现原理

拦截接口：

```
https://asla.joytunes.com/server/asla/accounts/accountAuthenticate
https://alicdn.joytunescn.com/server/asla/accounts/accountAuthenticate
```

原始响应结构（免费账号）：

```json
{
  "error": null,
  "accountInfo": {
    "accountID": "...",
    "role": "Pending",
    "membershipInfo": {
      "membershipType": "FREE",
      "membershipTier": "free_home",
      "membershipDescription": "未订阅",
      "profilesAccess": null,
      "planDuration": "unknown",
      "daysRemaining": null,
      "autoRenewable": 0,
      "isAutoRenew": null,
      "isTrialPeriod": 0,
      "dateStarted": null,
      "currentIapID": null
    }
  },
  "profilesList": [
    {
      "isPremium": true,
      "privileges": {
        "HomeConnection": { "homeMembershipTier": "free_home" }
      }
    }
  ]
}
```

脚本把 `accountInfo.membershipInfo` 和 `profilesList[].privileges.HomeConnection`
里的会员字段改写为高级会员：

| 字段 | 原值 | 改为 |
|---|---|---|
| `membershipType` | `FREE` | `JOYTUNESBUNDLE` |
| `membershipTier` | `free_home` | `premium_home` |
| `membershipDescription` | `未订阅` | `高级会员` |
| `profilesAccess` | `null` | `FAMILY` |
| `planDuration` | `unknown` | `oneyear` |
| `daysRemaining` | `null` | `366` |
| `autoRenewable` | `0` | `1` |
| `isAutoRenew` | `null` | `1` |
| `isTrialPeriod` | `0` | `0` |
| `dateStarted` | `null` | `2023-10-14` |
| `currentIapID` | `null` | 一年期套餐 ID |
| `homeMembershipTier` | `free_home` | `premium_home` |
| `isPremium` | — | `true` |

---

## 踩坑记录

1. **`[Rewrite]` 不是有效段落**
   网上的配置常写成 Surge 风格 `[Rewrite]` + `url script-response-body`，
   Quantumult X 不认。QX 要用 `[rewrite_local]`，小火箭要用 `[Script]`。

2. **正则里的点没有转义**
   `joytunes.com` 会误匹配 `joytunesXcom`，应写成 `joytunes\.com`。

3. **MitM / 重写开关没开**
   最隐蔽的问题。开关关着时规则一条都不执行，界面上没有任何提示。

4. **证书只装了没信任**
   iOS 里装描述文件和「证书信任设置」是两步，只做第一步不生效。

5. **下载远程脚本失败不报错**
   表现为配置正常但无效果。客户端会静默跳过。

6. **用 JSON 解析再重新序列化有风险**
   改变字段顺序、数字类型可能让 App 校验失败。

7. **Apple 登录被拦截**
   改用邮箱登录即可。

8. **改完必须重新登录**
   App 缓存账号信息，不重新登录看不到效果。

9. **URL 正则不要写太宽**
   早期版本用 `/server/asla/accounts/` 前缀，把退出登录等接口也拦了，
   导致 App 报连接错误。现在只精确匹配 `accountAuthenticate`。

---

## 免责声明

仅供学习交流使用，请于下载后 24 小时内删除。请支持正版。
