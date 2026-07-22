# PLATFORMS.md — 平台集成指南 & 适配模板

> **目的**：记录不同数字阅读平台的集成方式、坑点和模板，方便快速接入
> **版本**：v1.0｜**生成日期**：2026-07-21

---

## 一、当前已支持的平台

| 平台 | 出版社 | URL 模式 | 对接方式 |
|------|--------|----------|---------|
| **云展** (book.yunzhan365.com) | 上海清华新课标 | `bookcase/xxx/index.html` | ✅ iframe 直接嵌入 |
| **芝麻** (mp.zhizhuma.com) | 延边教育出版社 | `book/sample-xxx.htm?code=YYYY` | ✅ 新标签页打开 |

---

## 二、平台适配对照

### 2.1 云展（book.yunzhan365.com）

**特点**：
- 书城页/单本书页均支持 iframe 嵌入
- 没有 iframe 检测或防盗链
- 书城数据通过 `bookConfig.js` 提供
- 封面图通过 `shot.jpg` 提供

**集成方式**：
```
data.js 中 trialType = "iframe"
trialUrl = "https://book.yunzhan365.com/bookcase/xxx/index.html"
单个书 URL = 从 bookConfig.js 中提取的 url 字段
封面 = 从 bookConfig.js 提取 coverimg → shot.jpg
```

**app.js 处理**：`openBook()` → iframe 嵌入（默认行为）

### 2.2 芝麻（mp.zhizhuma.com）

**特点**：
- 书城页 `cookBook-xxx.htm` 可以 iframe 嵌入 ✅
- 单本书阅读页 `book/sample-xxx.htm` **有 iframe 检测** ⚠️
  - 从外部域名 iframe 嵌入时，JS 检测 `window.top !== window` 后显示"访问受限"
- 每本书有唯一 trial code（10~11 位字母数字）
- 封面图通过 `yuntisyscdn.bookln.cn` CDN 提供
- 有访问频率限制：短时间多次点击会触发限流，等待几分钟自动恢复

**集成方式**：
```
data.js 中 trialType = "iframe"
trialUrl = "https://mp.zhizhuma.com/webappv2/electronicBook/cookBook-xxx.htm?code=XXX"
单个书 URL = "https://mp.zhizhuma.com/book/sample-{bookcaseCode}.htm?code={trialCode}&_src=webapp"
封面 = 从 yuntisyscdn CDN 获取
```

**app.js 处理**：
```javascript
function openBook(bookUrl, bookTitle) {
  // book/sample 页面有 iframe 检测 → 必须新标签页
  if (bookUrl.includes('mp.zhizhuma.com/book/sample-')) {
    window.open(bookUrl, '_blank');
  } else {
    window.location.href = `trial.html?url=${encodeURIComponent(bookUrl)}&title=...`;
  }
}
```

---

## 三、数据文件结构说明

### 3.1 data.js（出版社 + 分类 + 书）

```javascript
const publishers = [
  {
    "id": "xxx-edu",                // 唯一 ID（字母+横线）
    "name": "出版社名称",            // 显示名称
    "series": "系列名",             // 系列名称
    "logo": "📘",                   // Emoji Logo
    "description": "描述文字",      // 简介
    "trialType": "iframe",          // 固定为 iframe
    "trialUrl": "https://...",      // 书城入口（主 URL）
    "secondaryTrialUrl": "https://...",  // [可选] 第二个学段入口
    "secondaryTrialLabel": "初中",  // [可选] 第二个学段的标签
    "totalBooks": 187,              // 总书数
    "categories": [
      {
        "stage": "小学",            // 学段
        "subjects": [
          {
            "name": "语文",         // 学科
            "count": 13,           // 本学科总书数
            "versions": [
              {
                "version": "人教版", // 教材版本
                "count": 13,
                "grades": {
                  "一年级": [       // 年级
                    {
                      "term": "上册",           // 学期
                      "title": "语文一年级上册人教版", // 书名
                      "url": "https://...",     // 试阅链接
                      "pages": 32,              // 页数
                      "cover": "https://...",   // 封面图
                      "bLink": "xxx"            // 内部 ID
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
```

### 3.2 学段双入口

当一家出版社有多个学段（如 小学 + 初中），且每个学段有独立的书城 URL：

```javascript
{
  "trialUrl": "https://...小学书城...",
  "secondaryTrialUrl": "https://...初中书城...",
  "secondaryTrialLabel": "初中",
  "categories": [
    { "stage": "小学", ... },
    { "stage": "初中", ... }
  ]
}
```

`trial.html` 会自动检测 `secondaryTrialUrl`，显示学段切换标签。

---

## 四、添加新出版社的步骤模板

### 4.1 前置确认

- [ ] 出版社提供了几个试阅链接（书城 URL / 单本书 URL）
- [ ] 平台类型（云展 / 芝麻 / 其他）
- [ ] 是否有封面图可以提取
- [ ] 单本书是否有独立固定链接

### 4.2 数据准备

1. **获取书城数据**（来自浏览器控制台/CDN/调试）
2. **解析出每本书的信息**：书名、URL、页码、封面
3. **分类整理**：学段 → 学科 → 版本 → 年级 → 上下册
4. **生成 data.js 块**，追加到 `publishers` 数组

### 4.3 代码改动清单

| 文件 | 改动 |
|------|------|
| `js/data.js` | 追加出版社数据块 |
| `js/app.js` | 仅在平台有 iframe 检测时才动（加 `openBook` 判断） |
| `trial.html` | 仅在需要双入口时才动（已有自动检测） |
| `css/style.css` | 通常不需要改 |

### 4.4 数据模板

```javascript
// === 新出版社模板 ===
{
  "id": "xxx-edu",
  "name": "出版社名称",
  "series": "系列名",
  "logo": "📕",
  "description": "系列说明",
  "trialType": "iframe",
  "trialUrl": "https://书城入口URL",
  // 如果有第二个学段：
  "secondaryTrialUrl": "https://第二个学段URL",
  "secondaryTrialLabel": "初中",
  "totalBooks": 0,
  "categories": [
    {
      "stage": "小学",
      "subjects": [
        {
          "name": "数学",
          "count": 0,
          "versions": [
            {
              "version": "人教版",
              "count": 0,
              "grades": {
                "一年级": [
                  {
                    "term": "上册",
                    "title": "数学一年级上册人教版",
                    "url": "https://试阅链接",
                    "pages": 32,
                    "cover": "https://封面图URL",
                    "bLink": "bookId_xxx"
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 五、常见坑点（坑！」

### 5.1 iframe 检测
- **芝麻** 的 `book/sample-*` 页面有 iframe 检测 → 必须新窗口打开
- **云展** 无检测 → 可直接 iframe 嵌入

### 5.2 CRLF 换行
- Windows 环境下 `data.js` 使用 `\r\n` 换行
- 脚本处理时若只匹配 `\n` 会漏，导致加逗号失败 → JS 解析报错
- 修复方法：字节级正则 `rb'\r?\n'` 同时匹配两种换行

### 5.3 页面加载状态
- 如果 publisher 卡出不来 / 数字显示 `—`
- 检查 console → 常见原因是 `data.js` 有 JS 语法错误
- 用 `node --check` 验证语法

### 5.4 封面图格式
- 芝麻平台封面用 `yuntisyscdn.bookln.cn` CDN
- URL 带参数如 `?_width=...&x-oss-process=...`
- 这些参数可能影响正则匹配，推荐直接用完整 URL

### 5.5 访问频次限制
- 芝麻平台短时间多次请求会触发限流（"访问受限，请稍后再试"）
- 一般等待 3-5 分钟自动恢复
- 批量抓取时建议加间隔

### 5.6 学段代码（芝麻）
- 芝麻的书城 code 是 10 位字母数字混合
- 每个学段（小学/初中）有独立的书城 code
- 每个学科也有独立的 subject code
- 这些 code 需要从书城页点击学科后从 URL 提取

---

## 六、附录：文件清单

```
jiaocan-platform/
├── index.html          # 首页
├── trial.html          # 试阅页（iframe / 双入口支持）
├── css/
│   └── style.css       # 样式（设计系统色值 + 组件样式）
├── js/
│   ├── data.js         # 出版社 + 书目数据
│   └── app.js          # 渲染逻辑 + 交互处理
└── DESIGN.md           # 设计系统文档
└── PLATFORMS.md        # ← 本文档（平台集成指南）
```
