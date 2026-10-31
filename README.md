# Simply Piano Premium Unlock

解锁 Simply Piano 高级会员的代理脚本，支持 **Shadowrocket / Quantumult X**。

## 支持域名

- `asla.joytunes.com`
- `alicdn.joytunescn.com`

拦截接口：

- `/server/asla/accounts/accountAuthenticate`
- `/server/asla/accounts/loginToAccountOfRestoredPurchase`

## 使用方法

### Shadowrocket

导入模块地址：

```
https://cdn.jsdelivr.net/gh/Dsimpson-man/simplypiano@main/simplypiano_shadowrocket.conf
```

### Quantumult X

导入配置地址：

```
https://cdn.jsdelivr.net/gh/Dsimpson-man/simplypiano@main/simplypiano_quantumultx.conf
```

## 必要设置

1. 开启 **重写 / Rewrite** 开关
2. 开启 **HTTPS 解密 / MITM** 开关
3. 安装证书，并在 iOS「设置 → 通用 → 关于本机 → 证书信任设置」中信任
4. **退出 Simply Piano 账号后重新登录**（App 会缓存账号信息，不重新登录看不到效果）

## 说明

- 脚本使用 jsDelivr CDN（`cdn.jsdelivr.net`），国内可直接访问；`raw.githubusercontent.com` 在国内常被墙，不建议使用。
- 备用 CDN：`gcore.jsdelivr.net`、`fastly.jsdelivr.net`、`testingcf.jsdelivr.net`
