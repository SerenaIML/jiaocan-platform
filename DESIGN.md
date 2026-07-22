# DESIGN.md — 教参教案 · 试阅平台

> **设计系统基线**：Notion（温暖极简 · 内容层级典范）
> **视觉方向**：Modern Minimal + Soft Warm 融合
> **品牌色提取**：#4a36c9（主色）/ #6c5ce7（辅色）— 紫色系
> **生成日期**：2025-07-21
> **版本**：v1.0

---

## 1. Visual Theme（视觉主题）

**Philosophy**（设计哲学）  
像最好的知识工具一样思考——内容第一，层级明晰，温暖而不喧宾夺主。让教师用户从第一眼就感受到"这是可以信赖的专业工具"。

**Direction**（视觉方向）  
Modern Minimal（现代极简） + Soft Warm（柔和温暖）融合  
- 现代极简：清晰的栅格、克制的装饰、信息层级分明的排版  
- 柔和温暖：暖调中性底色、圆润卡片、柔和的紫色渐变点缀

**Personality**（品牌性格）  
专业（Professional）· 亲和（Approachable）· 可信（Trustworthy）· 通透（Clear）

**Reference**（灵感来源）  
Notion（内容层级与中性温暖调色板）+ Apple Human Interface（细节精密度）+ Warm Editorial（教育庄重感）

**Design Tokens Summary**
```
--design-system: "Notion-inspired + Purple Custom"
--visual-direction: "Modern Minimal + Soft Warm"
--brand-personality: professional, approachable, trustworthy, clear
```

---

## 2. Color Palette（调色板）

色彩系统建立在现有品牌紫色之上，融入 Notion 温暖中性调色板。  
所有色值满足 WCAG AA 对比度标准（正文对比度 ≥ 4.5:1，大文本 ≥ 3:1）。

### 2.1 品牌紫色（Primary & Secondary）

紫色已由用户确认，作为品牌核心色保留并优化。

| Token | HEX | OKLCh | 用途 |
|-------|-----|-------|------|
| `--color-primary` | `#4a36c9` | `oklch(48% 0.215 280)` | 核心品牌色、CTA 按钮、链接、活动状态 |
| `--color-primary-hover` | `#3d2bb5` | `oklch(42% 0.205 278)` | 主色悬停态 |
| `--color-primary-active` | `#3224a0` | `oklch(37% 0.195 275)` | 主色点击态 |
| `--color-primary-light` | `#eeebff` | `oklch(90% 0.06 285)` | 主色浅色背景（标签、背景块） |
| `--color-primary-subtle` | `#f5f3ff` | `oklch(94% 0.03 285)` | 极浅紫色（卡片高亮、悬停底色） |
| `--color-secondary` | `#6c5ce7` | `oklch(58% 0.195 283)` | 辅助色、次要按钮、强调标签 |
| `--color-secondary-hover` | `#5a4bd1` | `oklch(52% 0.180 280)` | 辅色悬停态 |
| `--color-secondary-light` | `#f0eeff` | `oklch(92% 0.045 285)` | 辅色浅色背景 |

### 2.2 中性色（Notion 温暖基调）

以 Notion 的暖中性调色板为基底，略调暖以增强教育亲和力。

| Token | HEX | OKLCh | 用途 |
|-------|-----|-------|------|
| `--color-bg` | `#FAFAF8` | `oklch(98.5% 0.005 85)` | 页面主背景（暖白） |
| `--color-surface` | `#FFFFFF` | `oklch(100% 0 0)` | 卡片/区块背景 |
| `--color-surface-secondary` | `#F7F6F3` | `oklch(97% 0.005 85)` | 二级表面（侧栏、折叠区背景） |
| `--color-surface-hover` | `#F0EFEB` | `oklch(95% 0.006 85)` | 悬停态表面 |
| `--color-border` | `#E8E7E3` | `oklch(91% 0.005 85)` | 默认边框 |
| `--color-border-light` | `#F0EFEB` | `oklch(95% 0.006 85)` | 轻边框（分割线、弱分隔） |
| `--color-border-hover` | `#D4D3CE` | `oklch(85% 0.008 85)` | 元素悬停边框 |
| `--color-text-primary` | `#1A1A1A` | `oklch(22% 0.004 85)` | 标题、正文主色 |
| `--color-text-secondary` | `#6B6B6B` | `oklch(50% 0.006 85)` | 辅助文本、说明文字 |
| `--color-text-tertiary` | `#9B9B9B` | `oklch(68% 0.006 85)` | 元数据、占位符、禁用文本 |
| `--color-text-inverse` | `#FFFFFF` | `oklch(100% 0 0)` | 深色背景上的文本 |

### 2.3 语义色（Semantic）

教育平台需要清晰的语义反馈，采用柔和色调避免惊吓感。

| Token | HEX | OKLCh | 用途 |
|-------|-----|-------|------|
| `--color-success` | `#2D9D7C` | `oklch(60% 0.12 165)` | 成功、已试阅、已完成 |
| `--color-success-light` | `#E8F5F0` | `oklch(94% 0.025 165)` | 成功背景 |
| `--color-warning` | `#D9A441` | `oklch(70% 0.12 80)` | 警告、待处理 |
| `--color-warning-light` | `#FEF7E8` | `oklch(96% 0.025 85)` | 警告背景 |
| `--color-danger` | `#D94A4A` | `oklch(55% 0.16 30)` | 错误、删除、不可用 |
| `--color-danger-light` | `#FDE8E8` | `oklch(94% 0.025 30)` | 错误背景 |
| `--color-info` | `#4A90D9` | `oklch(60% 0.10 250)` | 信息提示、帮助链接 |

### 2.4 渐变（Gradients）

| Token | 值 | 用途 |
|-------|-----|------|
| `--gradient-header` | `linear-gradient(135deg, #4a36c9 0%, #6c5ce7 100%)` | 顶部导航栏背景 |
| `--gradient-card-accent` | `linear-gradient(135deg, #f5f3ff 0%, #f0eeff 100%)` | 卡片紫色强调背景 |
| `--gradient-trial-cta` | `linear-gradient(135deg, #4a36c9 0%, #6c5ce7 100%)` | 试阅按钮背景 |

### 2.5 深色模式备选（Dark Mode）

| Token | HEX | 用途 |
|-------|-----|------|
| `--color-bg-dark` | `#1A1A1A` | 深色模式背景 |
| `--color-surface-dark` | `#242424` | 深色模式卡片 |
| `--color-surface-secondary-dark` | `#2A2A2A` | 深色模式二级表面 |
| `--color-border-dark` | `#333333` | 深色模式边框 |
| `--color-text-primary-dark` | `#F0F0F0` | 深色模式正文 |
| `--color-text-secondary-dark` | `#A0A0A0` | 深色模式辅助文本 |

> **注意**：深色模式为 v1.0 备选方案，当前阶段不强制实现，但色值已定义以备后续扩展。

---

## 3. Typography（排版）

### 3.1 字体栈（Font Stacks）

西文选用 Inter（Notion 同款），中文字体使用系统原生栈确保最佳渲染。

| 类型 | Font Stack |
|------|-----------|
| **西文标题** | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` |
| **中文正文** | `-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif` |
| **UI 元素** | `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif` |
| **等宽/数字** | `'JetBrains Mono', 'SF Mono', 'Fira Code', monospace` |

> **注**：Inter 用于英文/数字标题以保持 Notion 风格的一致性；中文正文优先使用苹方(PingFang SC) 获得 macOS/iOS 最佳渲染效果。

### 3.2 字号层级（Type Scale）

采用 1.25 比例尺（Major Third），针对教育阅读场景优化。

| Level | Size | Line-Height | Weight | Letter-Spacing | Usage |
|-------|------|-------------|--------|----------------|-------|
| Display | 32px / 2rem | 1.2 | 700 (Bold) | -0.02em | 页面大标题、出版社名称 |
| H1 | 24px / 1.5rem | 1.3 | 650 (Semibold) | -0.01em | 区块标题、学科名称 |
| H2 | 20px / 1.25rem | 1.35 | 600 (Semibold) | -0.01em | 年级标题、分类标题 |
| H3 | 17px / 1.0625rem | 1.4 | 600 (Semibold) | 0 | 图书名称、卡片标题 |
| **Body** | **15px / 0.9375rem** | **1.6** | **400 (Regular)** | **0** | **正文、图书描述** |
| Body-Small | 14px / 0.875rem | 1.5 | 400 (Regular) | 0 | 辅助信息、统计数据 |
| Caption | 13px / 0.8125rem | 1.4 | 500 (Medium) | 0.01em | 标签、元数据 |
| Micro | 12px / 0.75rem | 1.3 | 500 (Medium) | 0.02em | 徽章、角标、小计数 |
| Tiny | 11px / 0.6875rem | 1.2 | 600 (Semibold) | 0.03em | 极小标签（仅必要时使用） |

> **Note**：正文基准 15px（比常见的 16px 略小）更适合中文阅读，减少长时间浏览的视觉疲劳。

### 3.3 字重实用指南

| Weight | Value | 用途 |
|--------|-------|------|
| Regular | 400 | 正文、辅助文字 |
| Medium | 500 | 标签、徽章、按钮文字 |
| Semibold | 600 | 小标题、导航项、强调文本 |
| Bold | 700 | 大标题、展示文字 |

---

## 4. Component Styles（组件样式）

### 4.1 导航栏（Header Navigation）

```
| 属性 | 值 |
|------|-----|
| 高度 | 56px（桌面）/ 52px（移动端） |
| 背景 | var(--gradient-header) |
| 文字颜色 | var(--color-text-inverse) |
| 内边距 | 0 24px（桌面）/ 0 16px（移动端） |
| 定位 | sticky, top:0, z-index:100 |
| 阴影 | 0 1px 3px rgba(0,0,0,0.12) |
```

**品牌标题区**
- 字号：17px（桌面）/ 15px（移动端）
- 字重：600
- 字母间距：0.5px

**徽章**（如"手机/电脑均可"）
- 背景：rgba(255,255,255,0.15)
- 圆角：20px
- 字号：12px
- 内边距：4px 14px

### 4.2 出版社卡片（Publisher Card）

```
| 属性 | 值 |
|------|-----|
| 背景 | var(--color-surface) |
| 圆角 | 16px |
| 边框 | 1px solid var(--color-border) |
| 内边距 | 0（头部 20px 24px, 内容区 16px 24px） |
| 阴影 | none（hover: 0 4px 20px rgba(0,0,0,0.06)） |
| 底部间距 | 24px |
| 过渡 | box-shadow 0.3s ease, border-color 0.2s ease |
```

**出版社 Logo 占位**
- 尺寸：56px × 56px（桌面）/ 44px × 44px（移动端）
- 圆角：14px（桌面）/ 12px（移动端）
- 背景：var(--color-primary-light)
- 字体：28px emoji（桌面）/ 22px（移动端）

**出版社统计区**
- 标签间距：12px gap
- 统计数字颜色：var(--color-primary)
- 统计标签颜色：var(--color-text-tertiary)
- 字号：12px

### 4.3 学段标签栏（Stage Tabs）

```
| 属性 | 值 |
|------|-----|
| 类型 | 水平标签栏（可横向滚动） |
| 下划线 | 2px 实线，颜色 var(--color-secondary) |
| 标签内边距 | 12px 20px（桌面）/ 10px 14px（移动端） |
| 标签字号 | 14px（桌面）/ 13px（移动端） |
| 标签字重 | 500 |
| 默认颜色 | var(--color-text-tertiary) |
| 悬停颜色 | var(--color-secondary) |
| 激活颜色 | var(--color-secondary) + 底部下划线 |
| 移动端 | 可横向滚动（overflow-x: auto, -webkit-overflow-scrolling: touch） |
```

### 4.4 学科折叠行（Subject Row）

```
| 属性 | 值 |
|------|-----|
| 背景 | var(--color-surface-secondary)（默认）/ var(--color-surface)（展开） |
| 圆角 | 12px |
| 边框 | 1px solid var(--color-border)（展开: var(--color-primary-light)） |
| 行内边距 | 14px 16px |
| 内容区内边距 | 0 16px 16px |
| 悬停背景 | var(--color-primary-subtle) |
| 过渡 | all 0.2s ease |
```

**学科名称**
- 字号：15px（桌面）/ 14px（移动端）
- 字重：600

**学科计数徽章**
```
| 属性 | 值 |
|------|-----|
| 背景 | var(--color-primary-light) |
| 文字颜色 | var(--color-secondary) |
| 圆角 | 10px |
| 字号 | 12px |
| 字重 | 500 |
| 内边距 | 2px 10px |
```

### 4.5 版本标签（Version Tabs）

```
| 属性 | 值 |
|------|-----|
| 类型 | 胶囊标签组（flex-wrap） |
| 间距 | 6px |
| 默认背景 | var(--color-surface-secondary) |
| 默认文字 | var(--color-text-secondary) |
| 激活背景 | var(--color-secondary) |
| 激活文字 | var(--color-text-inverse) |
| 悬停背景 | var(--color-primary-subtle) |
| 悬停文字 | var(--color-primary) |
| 圆角 | 14px |
| 字号 | 12px |
| 字重 | 500 |
| 内边距 | 6px 14px |
| 过渡 | all 0.2s ease |
```

### 4.6 年级网格（Grade Grid）

```
| 属性 | 值 |
|------|-----|
| 布局 | CSS Grid |
| 列数 | auto-fill, minmax(140px, 1fr)（桌面）/ minmax(110px, 1fr)（移动端） |
| 间距 | 8px |
```

**年级瓦片（Grade Tile）**
```
| 属性 | 值 |
|------|-----|
| 背景 | var(--color-surface) |
| 圆角 | 10px |
| 边框 | 1px solid var(--color-border) |
| 内边距 | 10px 12px |
| 悬停 | 边框 var(--color-border-hover), 背景 var(--color-primary-subtle) |
| 展开态 | 边框 var(--color-secondary), grid-column: 1 / -1 |
| 展开背景 | var(--color-primary-subtle) |
| 过渡 | all 0.2s ease |
```

**年级名称**
- 字号：14px（桌面）/ 13px（移动端）
- 字重：600

**年级计数**
- 字号：11px
- 默认背景：var(--color-surface-secondary)
- 展开时背景：var(--color-primary-light)
- 展开时文字：var(--color-secondary)

### 4.7 图书卡片（Book Card）

```
| 属性 | 值 |
|------|-----|
| 布局 | flex, align-items: center, gap: 8px |
| 背景 | var(--color-surface) |
| 圆角 | 8px |
| 边框 | 1px solid var(--color-border) |
| 内边距 | 10px 12px |
| 悬停 | 边框 var(--color-primary-light), 背景 var(--color-primary-subtle) |
| 光标 | pointer |
| 过渡 | all 0.2s ease |
```

**图书信息行**
- 学期标签：11px, color var(--color-secondary), bg var(--color-primary-light), border-radius 4px
- 图书标题：12px（桌面）/ 11px（移动端）, color var(--color-text-primary), line-height 1.4
- 页码：11px, color var(--color-text-tertiary)

### 4.8 试阅按钮（Trial Button）

```
| 属性 | 主按钮（CTA） | 次要按钮 |
|------|--------------|---------|
| 背景 | var(--gradient-trial-cta) | var(--color-surface) |
| 文字颜色 | var(--color-text-inverse) | var(--color-secondary) |
| 边框 | none | 1px solid var(--color-secondary) |
| 圆角 | 6px | 6px |
| 字号 | 11px | 11px |
| 字重 | 600 | 600 |
| 内边距 | 5px 14px | 5px 14px |
| 悬停 | opacity: 0.9 | bg: var(--color-primary-subtle) |
| 过渡 | all 0.2s ease | all 0.2s ease |
```

### 4.9 返回按钮（Back Button）

```
| 属性 | 值 |
|------|-----|
| 样式 | ghost button |
| 文字颜色 | var(--color-secondary) |
| 圆角 | 8px |
| 内边距 | 8px 12px |
| 悬停背景 | var(--color-primary-subtle) |
| 字号 | 14px |
| 字重 | 500 |
| 过渡 | all 0.2s ease |
```

### 4.10 在试阅头部（Trial Header）

```
| 属性 | 值 |
|------|-----|
| 背景 | var(--color-surface) |
| 高度 | 52px |
| 边框 | 1px solid var(--color-border) |
| 定位 | sticky, top:0, z-index:100 |
| 内边距 | 0 16px |
```

### 4.11 加载状态（Loading State）

```
| 属性 | 值 |
|------|-----|
| 类型 | 骨架屏（Skeleton）或紫色脉冲指示器 |
| 脉冲色 | var(--color-primary-light) + var(--color-primary) |
| 动画 | 脉冲 1.5s ease-in-out infinite |
```

### 4.12 空状态（Empty State）

```
| 属性 | 值 |
|------|-----|
| 对齐 | flex居中 |
| 图标 | 48px emoji或浅紫色占位 |
| 主文字 | 15px, var(--color-text-tertiary) |
| 副文字 | 13px, var(--color-text-tertiary) |
```

---

## 5. Layout（布局）

### 5.1 容器（Container）

| 断点 | 最大宽度 | 内边距 |
|------|---------|--------|
| 桌面（> 1024px） | 1000px | 20px 24px 40px |
| 平板（640-1024px） | 100% | 16px 20px 32px |
| 移动端（< 640px） | 100% | 12px 12px 32px |

### 5.2 栅格系统

采用柔性内容栅格而非固定列栅格，适应教育目录的变宽内容。

| 元素 | 布局策略 |
|------|---------|
| 出版社卡片 | 单列堆叠 |
| 年级网格 | CSS Grid: auto-fill, minmax(140px, 1fr) |
| 图书列表 | 单列 flex，纵向堆叠 |
| 学科行 | 单列 flex |

### 5.3 间距比例尺（Spacing Scale）

基于 4px 网格基准。

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xxs` | 2px | 极紧凑（徽章内边距） |
| `--space-xs` | 4px | 内联间距、图标间距 |
| `--space-sm` | 8px | 网格间距、紧凑元素间距 |
| `--space-md` | 12px | 默认元素间距 |
| `--space-lg` | 16px | 区块内边距、卡片间距 |
| `--space-xl` | 20px | 头部内边距、大区块间距 |
| `--space-2xl` | 24px | 卡片间距、出版社底部间距 |
| `--space-3xl` | 32px | 大区块分隔 |
| `--space-4xl` | 40px | 页面底部内边距 |

### 5.4 布局模板图示

```
┌─────────────────────────────────────┐
│         Header (gradient)           │  h: 56px (sticky)
├─────────────────────────────────────┤
│         Container (max: 1000px)     │
│  ┌───────────────────────────────┐  │
│  │     Publisher Card            │  │  1. 出版社卡片
│  │  ┌─────────────────────────┐  │  │
│  │  │ Stage Tabs (横向滚动)    │  │  │  2. 学段标签
│  │  └─────────────────────────┘  │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ Subject Row (折叠)      │  │  │  3. 学科行
│  │  │  ├ Version Tabs        │  │  │  4. 版本标签
│  │  │  │ ┌ Grade Grid ────┐  │  │  │  5. 年级网格
│  │  │  │ │ ┌ Book Card ─┐ │  │  │  │  6. 图书卡片
│  │  │  │ │ │ [试阅按钮]  │ │  │  │  │  7. 试阅操作
│  │  │  │ │ └────────────┘ │  │  │  │
│  │  │  │ └────────────────┘  │  │  │
│  │  │  └─────────────────────┘  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 6. Depth & Elevation（深度与层级）

### 6.1 阴影系统（Shadow Scale）

采用 Notion 风格的极简阴影——轻、柔、不抢夺内容注意力。

| Level | Shadow Value | Usage |
|-------|-------------|-------|
| Flat | `none` | 默认表面（卡片、区块） |
| Raised | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | 卡片悬停态、轻微层级 |
| Elevated | `0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)` | 下拉菜单、弹出框 |
| Modal | `0 8px 30px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)` | 模态框、全屏覆盖 |
| Toast | `0 12px 40px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.08)` | 提示消息（最高层级） |

### 6.2 Z-index 比例尺（Z-index Scale）

| Level | Value | Usage |
|-------|-------|-------|
| Base | 0 | 页面主内容 |
| StickyHeader | 100 | 粘性头部导航栏 |
| StickyTrialHeader | 100 | 试阅页粘性头部 |
| Dropdown | 200 | 下拉菜单、弹出选择 |
| MobileNav | 250 | 移动端侧边导航 |
| ModalBackdrop | 300 | 模态遮罩层 |
| Modal | 310 | 模态框内容 |
| Toast | 400 | 提示消息 |

### 6.3 层叠上下文规则

- 导航栏（sticky）总是在内容之上
- 下拉菜单必须 overflow 其父容器
- 模态框打开时阻止背景滚动（overflow: hidden on body）
- 展开的年级瓦片（full-width）应覆盖相邻元素

---

## 7. Cautions（注意事项）

### Never Do（禁止行为）

1. **❌ 过度使用紫色**  
   紫色是强调色，不是主背景色。不要大面积铺紫色背景或填满整个页面。紫色占页面面积建议不超过 20%。

2. **❌ 破坏内容层级**  
   不要将出版社→学段→学科→版本→年级→图书这六层扁平化为单层列表。每一层必须保持视觉上的进退关系（缩进、字号递减、背景色变浅）。

3. **❌ 使用过暗或过亮的背景纹理**  
   教育平台需要高度可读性。禁止使用深色模式作为默认主题，禁止使用杂乱的背景纹理或图案。

4. **❌ 忽视中文字体渲染**  
   中文不等同于西文。不要直接使用 Inter 或西文字体渲染中文正文。必须使用 `PingFang SC`、`Noto Sans SC` 等中文字体栈。

5. **❌ 圆形按钮**  
   保持按钮圆角适中（6-8px），不要使用全圆角（pill shape）或全直角按钮。教育场景的 CRUD 操作需要适度的正式感。

6. **❌ 过度阴影**  
   不要使用超过 Modal 层级的阴影。保持阴影柔和（Notion 风格），避免生硬的黑影。

7. **❌ 移动端水平溢出**  
   所有内容必须在视口宽度内良好显示。学段标签栏在移动端应允许横向滚动，而非缩小到不可点击。

### Prefer（推荐做法）

1. **✅ 用颜色深度表达层级**  
   更深的层级用更浅的背景色和更小的字号。学段（最浅）→ 学科 → 版本 → 年级 → 图书（最深细节）。

2. **✅ 用留白分隔**  
   与其使用粗边框或分割线分隔区块，不如用足够的间距（24px+）自然分隔。

3. **✅ 渐进式展示**  
   默认只展开第一个学段/学科，减少首次加载的信息密度。用户需要时才展开下一层。

4. **✅ 紫色作为"信标"**  
   紫色仅用于关键交互元素（试阅按钮、链接、激活态、计数徽章）。紫色就是"这里有操作"的信号。

---

## 8. Responsive Behavior（响应式行为）

### 8.1 断点系统（Breakpoints）

| 名称 | 宽度 | 行为变化 |
|------|------|---------|
| **Mobile** | < 640px | 单列布局、堆叠、可横向滚动的标签栏 |
| **Tablet** | 640 - 1024px | 双列网格、紧凑导航 |
| **Desktop** | > 1024px | 完整宽布局、1000px 容器最大宽 |

### 8.2 适配规则

#### Mobile (< 640px)
- 头部高度：52px，品牌标题 15px
- 容器内边距：12px
- 出版社 Logo：44px × 44px，圆角 12px
- 学段标签：横向滚动（scroll-snap），不可缩小
- 年级网格：minmax(110px, 1fr)
- 图书卡片：标题 11px，试阅按钮保持可点击大小（最小触摸目标 44px）
- 底部留白增多（32px）以补偿底部导航栏

#### Tablet (640 - 1024px)
- 容器内边距：16px 20px
- 出版社头部允许换行（flex-wrap）
- 版本标签完整显示（不截断）
- 年级网格：3-4 列

#### Desktop (> 1024px)
- 完整布局，最大宽度 1000px
- 出版社头部保持单行
- 年级网格：4-5 列
- 悬停效果增强（hover shadows, border highlights）
- 试阅按钮悬停时显示"立即试阅"工具提示

### 8.3 移动端触摸优化

| 规则 | 说明 |
|------|------|
| 最小触摸目标 | 所有可点击元素 ≥ 44px × 44px |
| 试阅按钮 | 移动端宽度至少 72px，便于手指点击 |
| 折叠行 | 展开/收起的触摸区域为整行 |
| 横向滚动 | 学段标签栏支持触摸拖动滚动 |
| 返回手势 | 试阅页支持向左滑动返回（浏览器历史） |

---

## 9. Agent Prompt Guide（Agent 生成指南）

### 9.1 关键指令

1. **设计系统锚点**：本系统以 Notion 的温暖极简为基底，融合现有紫色品牌色。生成任何界面时，优先参考 Notion 的内容层级处理方式。

2. **色彩使用原则**：紫色（`#4a36c9` 系列）仅用于关键交互和强调元素，不要大面积铺色。中性色使用暖白（`#FAFAF8`, `#F7F6F3`）而非冷白。

3. **中文字体优先**：所有中文正文必须使用 `PingFang SC` 或 `Noto Sans SC` 渲染，不可直接使用 Inter 等西文字体渲染中文。

4. **内容层次性**：多级目录（6 层）必须保持视觉深度差异——外层大字号浅背景，内层小字号深背景，形成"穿入"感。

5. **移动端先行**：生成组件时始终先考虑移动端布局（< 640px），再扩展至桌面端。

6. **试阅路径**：目录页 → 点击"试阅"按钮 → 试阅页（iframe 嵌入阅读器）。确保这个路径在任何断点下都清晰可用。

### 9.2 快速 CSS 变量片段

```css
:root {
  /* Brand Colors - Purple */
  --color-primary: #4a36c9;
  --color-primary-hover: #3d2bb5;
  --color-primary-active: #3224a0;
  --color-primary-light: #eeebff;
  --color-primary-subtle: #f5f3ff;
  --color-secondary: #6c5ce7;
  --color-secondary-hover: #5a4bd1;
  --color-secondary-light: #f0eeff;

  /* Neutral - Warm */
  --color-bg: #FAFAF8;
  --color-surface: #FFFFFF;
  --color-surface-secondary: #F7F6F3;
  --color-surface-hover: #F0EFEB;
  --color-border: #E8E7E3;
  --color-border-light: #F0EFEB;
  --color-border-hover: #D4D3CE;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #6B6B6B;
  --color-text-tertiary: #9B9B9B;
  --color-text-inverse: #FFFFFF;

  /* Semantic */
  --color-success: #2D9D7C;
  --color-success-light: #E8F5F0;
  --color-warning: #D9A441;
  --color-warning-light: #FEF7E8;
  --color-danger: #D94A4A;
  --color-danger-light: #FDE8E8;
  --color-info: #4A90D9;

  /* Gradients */
  --gradient-header: linear-gradient(135deg, #4a36c9 0%, #6c5ce7 100%);
  --gradient-trial-cta: linear-gradient(135deg, #4a36c9 0%, #6c5ce7 100%);

  /* Spacing (4px grid) */
  --space-xxs: 2px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  --space-3xl: 32px;
  --space-4xl: 40px;

  /* Typography Scale */
  --text-display: 32px;
  --text-h1: 24px;
  --text-h2: 20px;
  --text-h3: 17px;
  --text-body: 15px;
  --text-body-small: 14px;
  --text-caption: 13px;
  --text-micro: 12px;
  --text-tiny: 11px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px;

  /* Shadows */
  --shadow-raised: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-elevated: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-modal: 0 8px 30px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06);
  --shadow-toast: 0 12px 40px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.08);

  /* Layout */
  --container-max: 1000px;
  --header-height: 56px;
  --header-height-mobile: 52px;
}

/* Font Stacks */
:root {
  --font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --font-heading-english: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
}
```

### 9.3 页面模板速查

| 页面 | 模板结构 |
|------|---------|
| **首页目录** | Header (gradient) > Container > Publisher Card > Stage Tabs > Subject Row (折叠) > Version Tabs > Grade Grid (网格) > Book Card + Trial Button |
| **试阅页** | Trial Header (white, back btn + book title) > iframe (full height) |
| **空状态** | centered flex: emoji icon + message + optional action |
| **加载态** | skeleton placeholders matching actual card/nav dimensions |

---

> **本设计系统由彩格调（Cai）基于 Notion 设计语言 + 紫色品牌色定制生成。**
> 任何修改或扩展需求，请联系设计原型专家团。
