# Simply Piano Premium Unlock

解锁 Simply Piano 高级会员（一年期 / 家庭版）的 Quantumult X 重写规则。

> 只在 **Quantumult X** 上验证过。小火箭没有测试，不保证可用。

---

## 文件说明

| 文件 | 作用 |
|---|---|
| `SimplyPiano.js` | **重写资源**，在 QX 里引用这个 |
| `sp_unlock_v2.js` | 脚本本体，由上面的资源文件引用，不需要手动处理 |

---

## 使用方法

1. QX → 右下角 **风车** → **重写** → **规则资源** → 右上角 `+`
2. 粘贴下面的地址并保存：

   ```
   https://raw.githubusercontent.com/Dsimpson-man/simplypiano/main/SimplyPiano.js
   ```

   如果 raw 打不开，换备用地址：

   ```
   https://cdn.jsdelivr.net/gh/Dsimpson-man/simplypiano@main/SimplyPiano.js
   ```

3. 打开这条资源的开关

---

## 必须打开的开关（漏一个就完全无效）

1. **QX 首页 → 重写** 开关
2. **QX 首页 → MitM** 开关
3. **QX → 风车 → 设置 → MitM → 证书**：生成 → 安装描述文件
4. **iOS 设置 → 通用 → 关于本机 → 证书信任设置** → 打开 Quantumult X 的根证书

> 第 4 步和第 3 步是两件事。只装了描述文件但没在「证书信任设置」里打开，
> 等于没装，所有 HTTPS 改写都会静默失效。

5. 打开 Simply Piano，**用邮箱登录**（不要用「通过 Apple 登录」，见下方说明）

---

## 重要注意事项

### 1. Apple 账号登录会失败

使用「通过 Apple 登录」时会出现「服务器错误 / 连接错误」。
这是 Sign in with Apple 的认证链路被拦截导致的，**与本项目无关**。

👉 请使用**邮箱 + 密码**登录。

### 2. 必须重新登录

Simply Piano 会缓存账号信息，`accountAuthenticate` 只在登录时调用。
改完配置后必须**退出登录 → 重新登录**，否则看到的还是旧状态。

### 3. 脚本地址建议用 raw

QX 下载远程脚本失败时**不会报错**，只是静默不执行，
表现为「配置导入成功、看着正常、但完全没效果」。

如果怀疑脚本没加载，可以把资源里的脚本地址换成备用 CDN：

| 地址 | 说明 |
|---|---|
| `raw.githubusercontent.com` | 时通时不通，不稳定 |
| `cdn.jsdelivr.net` | 国内一般可用 |
| `gcore.jsdelivr.net` | jsDelivr 备用节点 |
| `fastly.jsdelivr.net` | jsDelivr 备用节点 |

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

搭建过程中遇到的问题，按出现顺序：

1. **`[Rewrite]` 不是有效段落**
   网上的配置常写成 Surge 风格：

   ```
   [Rewrite]
   ^https?://... url script-response-body https://...
   ```

   Quantumult X 不认这个。正确写法是 `[rewrite_local]`，
   且脚本用 `url script-response-body <脚本地址>`。

2. **正则里的点没有转义**
   `joytunes.com` 会误匹配 `joytunesXcom`，应写成 `joytunes\.com`。

3. **MitM / 重写开关没开**
   这是最隐蔽的问题。开关关着时，规则一条都不会执行，
   但界面上不会有任何提示，看起来「配置完全正常」。

4. **证书只装了没信任**
   iOS 里装描述文件和「证书信任设置」是两步，只做第一步不生效。

5. **QX 下载远程脚本失败不报错**
   表现为配置正常但无效果。改用 jsDelivr 或本地脚本解决。

6. **用 JSON 解析再重新序列化有风险**
   改变字段顺序、数字类型可能让 App 校验失败。
   本项目已验证当前写法可用，但如果你要自己改，优先考虑字符串替换。

7. **Apple 登录被拦截**
   改用邮箱登录即可。

8. **改完必须重新登录**
   App 缓存账号信息，不重新登录看不到效果。

---

## 免责声明

仅供学习交流使用，请于下载后 24 小时内删除。请支持正版。
