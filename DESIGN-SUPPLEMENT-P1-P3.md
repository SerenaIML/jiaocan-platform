# DESIGN.md 补充文档 — P1-P3 设计令牌

> **基线设计系统**：Notion（温暖极简）+ 紫色品牌（#4a36c9）
> **当前版本**：v5（多出版社网格版 + 侧边栏 + 3D 书卡 + 多品牌色）
> **补充日期**：2026-07-22
> **关联主文档**：DESIGN.md（v1.0 基线）
> **覆盖范围**：P1（侧边栏 / 书卡封面）、P2（动效 / 装饰素材）、P3（多品牌色系统）

---

## P1 — 侧边栏组件（Sidebar Components）

### P1.1 侧边栏布局（Side Panel Layout）

```
┌──────────────────┐
│ 出版社速览 (nav) │  ← 快捷跳转
├──────────────────┤
│ 📢 声明 (warning) │  ← 橙色醒目卡片
├──────────────────┤
│ 书香引言 (quote)  │  ← 衬线引文装饰
├──────────────────┤
│ 使用提示 (tips)   │  ← 圆角数字列表
├──────────────────┤
│ 装饰书堆 (deco)   │  ← 彩色书脊堆叠
└──────────────────┘
```

| 属性 | 桌面端 | 平板端 (≤1100px) | 移动端 (≤640px) |
|------|--------|-------------------|------------------|
| 位置 | 右侧 260px 固定 | 水平滚动行 | 垂直堆叠 |
| 间距 gap | `--space-md` (12px) | 横向滚动 | 垂直堆叠 |
| 隐藏策略 | 始终显示 | 转为横向滚动条 | 转为底部卡片 |

### P1.2 出版社速览导航（Quick Jump Nav）

**容器**（`.side-card`）

```
| Token | 值 |
|-------|-----|
| 背景 | var(--color-surface) |
| 圆角 | var(--radius-lg) (12px) |
| 边框 | 1px solid var(--color-border) |
| 内边距 | var(--space-md) (12px) |
```

**标题**（`.side-title`）

```
| Token | 值 |
|-------|-----|
| 字号 | 12px |
| 字重 | 600 (Semibold) |
| 颜色 | var(--color-text-secondary) |
| 字母间距 | 1px (大写感) |
| 下边距 | var(--space-sm) (8px) |
| 底部边框 | 1px solid var(--color-border-light) |
```

**导航项**（`.side-nav-item`）

```
| Token | 默认 | 悬停 |
|-------|------|------|
| 内边距 | 8px 10px | — |
| 圆角 | var(--radius-sm) (8px) | — |
| 背景 | transparent | var(--color-surface-secondary) |
| 字体大小 | 12px | — |
| 字重 | 500 | — |
| 颜色 | var(--color-text-primary) | — |
| 变换 | none | translateX(2px) |
| 过渡 | background 0.2s, transform 0.2s | — |
```

**品牌色标记条**（`.side-nav-mark`）

```
| Token | 值 |
|-------|-----|
| 宽度 | 4px |
| 高度 | 16px |
| 圆角 | 2px |
| 背景 | var(--brand-color) ← 自动匹配出版社品牌色 |
```

**计数徽章**（`.side-nav-count`）

```
| Token | 值 |
|-------|-----|
| 字号 | 10px |
| 字重 | 600 |
| 颜色 | var(--color-text-tertiary) |
| 背景 | var(--color-surface-secondary) |
| 圆角 | 4px |
| 内边距 | 1px 6px |
```

### P1.3 声明卡片（Disclaimer Card — 橙色醒目风格）

```
| Token | 值 |
|-------|-----|
| 背景 | linear-gradient(135deg, #FFF8E1, #FFFEF5) |
| 边框 | 1px solid #F5C99B |
| 左边框 | 3px solid #D9893A（醒目橙色） |
| 标题颜色 | #B5701A |
| 正文颜色 | var(--color-text-secondary) |
| 正文强调色 | #8B4F12 |
| 正文字号 | 12px |
| 行高 | 1.7 |
```

### P1.4 书香引言卡片（Quote Card — 暖金衬线风格）

```
| Token | 值 |
|-------|-----|
| 背景 | linear-gradient(135deg, #FAEEDA, #FEF7E8) |
| 边框颜色 | #FAC775 |
| 引号标记 | 36px, font-serif, color rgba(186,117,23,0.4) |
| 引文字体 | var(--font-serif) — Noto Serif SC / STSong |
| 引文字号 | 13px |
| 引文颜色 | #633806 |
| 引文行高 | 1.6 |
| 引文样式 | italic |
| 引文左侧留白 | 24px（引号占位） |
```

**书本装饰角**（`.side-quote::after`）

```
| Token | 值 |
|-------|-----|
| 内容 | 📖 (emoji) |
| 位置 | bottom: -6px; right: -4px |
| 字号 | 28px |
| 透明度 | 0.08 |
| 旋转 | -10deg |
| 指针事件 | none |
```

### P1.5 使用提示卡片（Tips Card）

```
| Token | 值 |
|-------|-----|
| 列表项间距 | 10px |
| 字体大小 | 11px |
| 颜色 | var(--color-text-secondary) |
| 行高 | 1.5 |
```

**圆形数字标记**（`.tips-num`）

```
| Token | 值 |
|-------|-----|
| 尺寸 | 18px × 18px（圆形） |
| 背景 | var(--color-primary-light) |
| 文字颜色 | var(--color-primary) |
| 字号 | 10px |
| 字重 | 600 |
| flex-shrink | 0 |
```

### P1.6 装饰书堆（Decorative Book Stack）

```
| Token | 值 |
|-------|-----|
| 容器高度 | 100px |
| 容器背景 | linear-gradient(180deg, #f7f6f3, #f1efe8) |
| 对齐 | flex-end 底部对齐 + center 居中 |
| 书本间距 gap | 3px |
```

**装饰书本**（`.deco-book`）— 彩色书脊模拟

| 书本 | 高度 | 渐变 | 色系 |
|------|------|------|------|
| deco-book-1 | 60px | `#CECBF6 → #AFA9EC` | 薰衣草紫 |
| deco-book-2 | 72px | `#F5C4B3 → #F0997B` | 珊瑚粉 |
| deco-book-3 | 50px | `#FAC775 → #EF9F27` | 琥珀金 |
| deco-book-4 | 68px | `#9FE1CB → #5DCAA5` | 薄荷绿 |
| deco-book-5 | 56px | `#B5D4F4 → #85B7EB` | 天蓝 |

**书本通用样式**：
- 宽度：14px
- 圆角：2px 2px 0 0（顶部圆角）
- 阴影：0 -2px 4px rgba(0,0,0,0.08)
- 装饰线（`::before`）：顶部 4px 处 1px 白色半透明线

---

## P1 — 书卡封面（Book Card Cover）

### P1.7 3D 封面包裹器（Cover Wrap — 立体书模拟）

**结构**：封面图 / 色块占位 → 书脊折痕线 → 学期标签 → 右侧/底部阴影

```
┌───────────────────┐
│  ┌─────────────┐  │
│  │  封面内容     │  │
│  │  (封面图 或   │  │
│  │  色块占位)    │  │
│  │              │  │  ← 书脊折痕线 (左侧6px)
│  │         [上册]│  │  ← 学期标签 (左上)
│  └─────────────┘  │
│  ░░░░░░░░░░░░░░░  │  ← 底部渐变暗角
└───────────────────┘
```

**容器**（`.book-cover-wrap`）

```
| Token | 值 |
|-------|-----|
| 宽高比 | 3 : 4 (aspect-ratio) |
| 溢出 | hidden |
| 布局 | flex, align-items: flex-end, justify-content: flex-start |
| 背景 | #f0f0f0 (fallback) |
```

**书页厚度模拟**（`::before`）— 右侧书脊 + 底部厚度

```
box-shadow:
  inset -4px 0 0 0 rgba(0,0,0,0.07),     /* 右侧书脊阴影 */
  inset 4px 0 0 0 rgba(255,255,255,0.06),  /* 左侧高光 */
  3px 3px 6px rgba(0,0,0,0.08);            /* 底部投影 */
```

**底部暗角**（`::after`）— 模拟书页旧化

```
background:
  linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 8%),    /* 左侧书脊暗角 */
  linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.15) 100%); /* 底部渐暗 */
```

**书脊折痕线**（`.book-spine-line`）

```
| Token | 值 |
|-------|-----|
| 位置 | left: 6px; top: 0 |
| 宽度 | 1px |
| 高度 | 100% |
| 背景 | linear-gradient(180deg, transparent 5%, rgba(255,255,255,0.12) 20%, rgba(0,0,0,0.04) 80%, transparent 95%) |
| z-index | 2 |
| pointer-events | none |
```

**学期标签**（`.book-cover-tag`）— 左上角浮标

```
| Token | 值 |
|-------|-----|
| 位置 | top: 8px; left: 0 |
| z-index | 3 |
| 字号 | 10px |
| 字重 | 700 (Bold) |
| 颜色 | rgba(255,255,255,0.95) |
| 背景 | linear-gradient(90deg, rgba(74,54,201,0.85), rgba(108,92,231,0.75)) |
| 圆角 | 0 4px 4px 0 |
| 内边距 | 3px 10px |
| 阴影 | 0 1px 4px rgba(0,0,0,0.15) |
```

### P1.8 封面色板系统（Cover Color Palette）

8 套循环色系，用于封面图加载失败的暖色调占位：

```css
--cover-palette-1:  { bg: #EEEDFE, accent: #CECBF6, text: #3C3489 }  /* 薰衣草紫 */
--cover-palette-2:  { bg: #FBEAF0, accent: #F4C0D1, text: #993556 }  /* 玫瑰粉 */
--cover-palette-3:  { bg: #FAEEDA, accent: #FAC775, text: #854F0B }  /* 暖金色 */
--cover-palette-4:  { bg: #E1F5EE, accent: #9FE1CB, text: #0F6E56 }  /* 薄荷绿 */
--cover-palette-5:  { bg: #E6F1FB, accent: #B5D4F4, text: #185FA5 }  /* 天蓝 */
--cover-palette-6:  { bg: #FAECE7, accent: #F5C4B3, text: #993C1D }  /* 陶土橙 */
--cover-palette-7:  { bg: #F3EEFE, accent: #D5CBF6, text: #534AB7 }  /* 紫罗兰 */
--cover-palette-8:  { bg: #EAF3DE, accent: #C0DD97, text: #3B6D11 }  /* 草绿 */
```

**分配算法**：基于书名 hash `Math.abs(hash) % 8` 保证同一本书始终映射到同一色系。

**占位封面装饰线**：
```
position: absolute
  第1行: top: 18px, left: 10px, right: 10px, height: 2px, bg: rgba(255,255,255,0.2)
  第2行: top: 24px, left: 10px, width: 40%, height: 2px, bg: rgba(255,255,255,0.15)
  底部分隔: bottom: 32px, left: 10px, right: 10px, height: 1px, bg: rgba(255,255,255,0.1)
```

### P1.9 书卡悬停态（3D 透视效果）

```css
/* 悬停时整卡变形 */
.book-card:hover {
  transform: perspective(600px) rotateY(-3deg) translateY(-4px) translateZ(4px);
  border-color: var(--color-primary-light);
  box-shadow: 0 8px 24px rgba(74,54,201,0.10);
}

/* 封面图放大 */
.book-card:hover .book-cover-img {
  transform: scale(1.06);
}

/* 底部阴影增强 */
.book-card:hover .book-cover-wrap::before {
  box-shadow:
    inset -4px 0 0 0 rgba(0,0,0,0.07),
    inset 4px 0 0 0 rgba(255,255,255,0.06),
    5px 5px 12px rgba(0,0,0,0.12);
}
```

### P1.10 书卡信息标签系统

| 标签类型 | 背景 | 文字颜色 | 用途 |
|---------|------|---------|------|
| `.info-grade` | var(--brand-color-light) | var(--brand-color) | 年级标签 |
| `.info-term` | #FEF7E8 | #BA7517 | 学期标签（上册/下册） |
| `.info-version` | #F0EFEB | #6B6B6B | 版本标签 |

```
| Token | 值 |
|-------|-----|
| 字号 | 9px |
| 圆角 | 3px |
| 内边距 | 1px 5px |
| 字重 | 500 |
| letter-spacing | 0.2px |
| white-space | nowrap |
```

---

## P2 — 动效系统（Animation System）

### P2.1 统计数字动画（Stat Count Animation）

```
| Token | 值 |
|-------|-----|
| 触发 | DOMContentLoaded + 400ms 延迟 |
| 步进计算 | step = max(1, Math.floor(target / 30)) |
| 间隔 | 30ms |
| 缓动 | 线性步进（自然计数感） |
| 后缀 | 书数: 无后缀 / 学科: "+" / 学段: 无 / 版本: "+" |
```

**CSS 入场动画**：

```css
@keyframes statFadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to   { opacity: 1; transform: translateY(0); }
}

.stat-card {
  animation: statFadeIn 0.6s ease both;
}
.stat-card:nth-child(2) { animation-delay: 0.1s; }
.stat-card:nth-child(3) { animation-delay: 0.2s; }
.stat-card:nth-child(4) { animation-delay: 0.3s; }
```

### P2.2 学段切换动效（Stage Tab Transition）

**当前实现**：CSS 类切换（`display: none/block`）+ 无交互动效（P2 待增强）

**推荐增强设计令牌**：

```css
/* P2 建议 — 淡入 + 上移 */
.stage-content {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.stage-content.active {
  opacity: 1;
  transform: translateY(0);
}
.stage-content:not(.active) {
  opacity: 0;
  transform: translateY(8px);
  display: none; /* 需要 display + opacity 协调处理 */
}
```

### P2.3 搜索结果逐张淡入（Search Results Stagger）

**推荐增强设计令牌**：

```css
@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.book-card-flat {
  animation: cardFadeIn 0.35s ease both;
}

/* JavaScript 动态设置 stagger delay */
/* .book-card-flat:nth-child(1) { animation-delay: 0ms; }  */
/* .book-card-flat:nth-child(2) { animation-delay: 30ms; } */
/* .book-card-flat:nth-child(3) { animation-delay: 60ms; } */
/* 每张递增 30ms */
```

### P2.4 出版社卡片悬停（Publisher Card Hover）

```css
.publisher-card {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);  /* ease-out */
}

.publisher-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
  border-color: var(--brand-color-light);
}
```

### P2.5 封面缩略图悬停（Cover Thumb Hover）

```css
.publisher-cover-thumb {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  filter: saturate(0.9);
}

.publisher-cover-thumb:hover {
  transform: translateY(-5px) scale(1.06);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  z-index: 3;
  filter: saturate(1);
}
```

### P2.6 加载状态（Loading State — 紫色脉冲点）

```css
.loading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary-light);
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-dot:nth-child(2) { animation-delay: 0.2s; }
.loading-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; background: var(--color-primary-light); }
  40%           { transform: scale(1);   opacity: 1;   background: var(--color-primary); }
}
```

### P2.7 页面入场动效（骨架屏 — P2 待增强）

**当前**：紫色脉冲加载指示器（3 个圆点脉冲）
**P2 推荐**：匹配实际卡片尺寸的骨架屏区块

```
┌──────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░  │  ← 56px header skeleton
│ ┌─────────────────┐     │
│ │ 32px title ░░░░ │     │  ← Hero title skeleton
│ │ ░░░░░░           │     │
│ └─────────────────┘     │
│ ┌────┐ ┌────┐ ┌───┐   │
│ │░░░░│ │░░░░│ │░░░│   │  ← Stat card skeletons
│ └────┘ └────┘ └───┘   │
└──────────────────────────┘
```

---

## P2 — 装饰素材设计令牌（Decorative Assets）

### P2.8 纸纹底图（Paper Texture Background）

当前使用纯 CSS 实现（无需外部图片资源）：

```css
body {
  background-image:
    /* 极淡横纹 — 仿纸张纹理 */
    repeating-linear-gradient(
      0deg, transparent, transparent 6px,
      rgba(139,129,120,0.015) 6px, rgba(139,129,120,0.015) 7px
    ),
    /* 左上紫色光晕 */
    radial-gradient(circle at 15% 25%, rgba(74,54,201,0.025) 0%, transparent 25%),
    /* 右下暗金光晕 */
    radial-gradient(circle at 85% 75%, rgba(184,134,11,0.02) 0%, transparent 25%);
}
```

| 图层 | 位置 | 透明度 | 效果 |
|------|------|--------|------|
| 横纹纹理 | 全屏 | 1.5% 棕灰 | 极淡纸纤维感 |
| 紫色光晕 | 左上 15% 25% | 2.5% | 品牌色氛围 |
| 暗金光晕 | 右下 85% 75% | 2% | 书香暖意 |

### P2.9 Hero 背景 — 书架装饰（Unsplash）

```css
.hero::before {
  background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1800&q=85&auto=format&fit=crop');
  background-size: cover;
  background-position: center 40%;
  opacity: 0.35;
}
```

| 图层 | 透明度 | 目的 |
|------|--------|------|
| 背景图 | 35% | 木质书架装饰 |
| 渐变叠加层 | 30%→55% | 从上到下加深保文字可读性 |
| 径向渐变 | 透明→40% | 中心区域聚焦 |

**P2 优化方向**：将 Unsplash 书架图替换为 SVG 线描插画（透明度 6-10%）

### P2.10 学科图标集（Subject Icons）

16 个学科学段表情符号图标（当前使用 emoji，P2 推荐替换为 SVG）：

| 学科 | Emoji | 学科 | Emoji |
|------|-------|------|-------|
| 语文 | 📖 | 数学 | 📐 |
| 英语 | 🌍 | 道德与法治 | ⚖️ |
| 历史 | 📜 | 地理 | 🌏 |
| 生物 | 🧬 | 化学 | 🧪 |
| 物理 | ⚡ | 科学 | 🔬 |
| 思想政治 | 🏛️ | 音乐 | 🎵 |
| 美术 | 🎨 | 体育 | 🏃 |
| 信息技术 | 💻 | 通用技术 | 🔧 |

**图标容器样式**：
```
| Token | 值 |
|-------|-----|
| 尺寸 | 26px × 26px |
| 圆角 | var(--radius-sm) (8px) |
| 背景 | var(--color-surface) |
| 边框 | 1px solid var(--color-border-light) |
| 字号 | 18px |
| 透明度 | 0.75 |
| 悬停变换 | scale(1.1) + 透明度 1 |
```

---

## P3 — 多品牌色系统（Multi-Brand Color System）

### P3.1 三品牌色令牌（Brand Color Variants）

每位出版社通过 CSS 类注入自定义品牌色，组件通过 `var(--brand-color)` 自动适配。

#### 品牌紫 — 上海清华新课标（`.brand-purple`）

| Token | HEX | OKLCh | 用途 |
|-------|-----|-------|------|
| `--brand-color` | `#4a36c9` | `oklch(48% 0.215 280)` | 主色、色条、链接、计数 |
| `--brand-color-light` | `#eeebff` | `oklch(90% 0.06 285)` | 浅色背景、徽章 |
| `--brand-color-subtle` | `#f5f3ff` | `oklch(94% 0.03 285)` | 极浅底色 |
| `--brand-gradient` | `linear-gradient(135deg, #4a36c9, #6c5ce7)` | — | 按钮、封面标签 |

#### 品牌琥珀金 — 延边教育出版社（`.brand-amber`）

| Token | HEX | OKLCh | 用途 |
|-------|-----|-------|------|
| `--brand-color` | `#BA7517` | `oklch(55% 0.12 68)` | 主色、色条、链接、计数 |
| `--brand-color-light` | `#FAEEDA` | `oklch(96% 0.04 80)` | 浅色背景、徽章 |
| `--brand-color-subtle` | `#FEF7E8` | `oklch(97.5% 0.025 85)` | 极浅底色 |
| `--brand-gradient` | `linear-gradient(135deg, #BA7517, #D9A441)` | — | 按钮、封面标签 |

#### 品牌蓝 — 陕西中教创联（`.brand-blue`）

| Token | HEX | OKLCh | 用途 |
|-------|-----|-------|------|
| `--brand-color` | `#185FA5` | `oklch(48% 0.14 255)` | 主色、色条、链接、计数 |
| `--brand-color-light` | `#E6F1FB` | `oklch(94% 0.035 250)` | 浅色背景、徽章 |
| `--brand-color-subtle` | `#F2F7FD` | `oklch(97% 0.015 250)` | 极浅底色 |
| `--brand-gradient` | `linear-gradient(135deg, #185FA5, #378ADD)` | — | 按钮、封面标签 |

### P3.2 品牌色应用映射表

| 组件元素 | CSS 引用方式 | 品牌紫 | 品牌琥珀金 | 品牌蓝 |
|---------|-------------|--------|-----------|--------|
| 顶部色条 (10px) | `var(--brand-gradient)` | 紫渐变 | 琥珀渐变 | 蓝渐变 |
| 按钮背景 | `var(--brand-gradient)` | 紫渐变 | 琥珀渐变 | 蓝渐变 |
| 计数徽章文字 | `var(--brand-color)` | #4a36c9 | #BA7517 | #185FA5 |
| 浅色背景 | `var(--brand-color-light)` | #eeebff | #FAEEDA | #E6F1FB |
| 极浅悬停 | `var(--brand-color-subtle)` | #f5f3ff | #FEF7E8 | #F2F7FD |
| 装饰辉光（右上角） | `radial-gradient(circle, var(--brand-color))` 4% | 紫辉 | 金辉 | 蓝辉 |
| 封面标签 | `var(--brand-gradient)` | 紫渐变 | 琥珀渐变 | 蓝渐变 |
| 侧边栏标记条 | `var(--brand-color)` | #4a36c9 | #BA7517 | #185FA5 |
| 卡片悬停边框 | `var(--brand-color-light)` | #eeebff | #FAEEDA | #E6F1FB |

### P3.3 装饰辉光（Brand Decorative Glow）

位于每张出版社卡片右上角：

```css
.publisher-card::after {
  content: '';
  position: absolute;
  top: 10px; right: 0;
  width: 120px; height: 80px;
  opacity: 0.04;
  background: radial-gradient(circle at 100% 0%, var(--brand-color) 0%, transparent 70%);
  pointer-events: none;
}
```

### P3.4 出版社卡片品牌色组件模板

```
┌─────────────────────────────────────┐
│ ████████████████████████████████████ │  ← 10px 品牌渐变顶部色条
│ ░░░ 极细 0.5px 分隔线 ░░░░░░░░░░░  │
│                                      │
│ [📘]  出版社名称                     │  ← 品牌色光晕（右上角）
│       系列名                         │
│       描述文字                       │
│       📚 187本  🏫 3个学段          │  ← 计数用品牌色
│                                      │
│ [封面] [封面] [封面] [封面] ... +N   │  ← 封面缩略图墙
│                                      │
│ ┌──  📖 进入书城试阅  ──┐           │  ← 全宽品牌渐变按钮
│ └───────────────────────┘           │
│                                      │
│ [小学] [初中] [高中]                 │  ← 学段标签
│   ┌ 学科 ──────────────────┐        │
│   │ 📖 语文          24 本 ▾│        │  ← 品牌色计数
│   │ ┌─ 人教版 ───────────┐ │        │
│   │ │ [封面] [封面] [封面]│ │        │
│   │ └────────────────────┘ │        │
│   └────────────────────────┘        │
└─────────────────────────────────────┘
```

### P3.5 品牌色系统扩展指南

新增第 4 家出版社时，只需定义新品牌类：

```css
.brand-{name} {
  --brand-color: #HEX;
  --brand-color-light: #HEX;
  --brand-color-subtle: #HEX;
  --brand-gradient: linear-gradient(135deg, #HEX, #HEX);
}
```

**选色原则**：
- `--brand-color`：饱和度 50-70%，明度 45-55%（确保白色文字可读）
- `--brand-color-light`：明度 90-95%
- `--brand-color-subtle`：明度 95-97%
- `--brand-gradient`：同色系浅 10-15% 作为终点
- 避免与已有三品牌色过于接近（色相相差 ≥ 30 度）

---

## 响应式补充（Sidebar-Specific）

### ≤1100px：侧边栏转为水平滚动

```css
.main-inner {
  grid-template-columns: 1fr;  /* 取消侧栏列 */
}
.side-panel {
  flex-direction: row;
  overflow-x: auto;
  padding-bottom: 4px;
}
.side-card {
  min-width: 200px;
  flex-shrink: 0;
}
```

### ≤640px：侧边栏垂直堆叠

```css
.side-panel {
  flex-direction: column;
}
.side-card {
  min-width: 0;
}
```

---

## CSS 变量快速片段（补充部分）

```css
/* ===== P1: Sidebar ===== */
/* 已在主文档中定义，无新增变量 */

/* ===== P1: Book Card Cover ===== */
/* 3D 阴影使用内联 box-shadow，无额外变量 */

/* ===== P2: Animation ===== */
/* 标准 CSS @keyframes，无 CSS 变量 */

/* ===== P3: Brand Colors ===== */
/* 通过 CSS 类注入，见下方 */

.brand-purple {
  --brand-color: #4a36c9;
  --brand-color-light: #eeebff;
  --brand-color-subtle: #f5f3ff;
  --brand-gradient: linear-gradient(135deg, #4a36c9 0%, #6c5ce7 100%);
}

.brand-amber {
  --brand-color: #BA7517;
  --brand-color-light: #FAEEDA;
  --brand-color-subtle: #FEF7E8;
  --brand-gradient: linear-gradient(135deg, #BA7517 0%, #D9A441 100%);
}

.brand-blue {
  --brand-color: #185FA5;
  --brand-color-light: #E6F1FB;
  --brand-color-subtle: #F2F7FD;
  --brand-gradient: linear-gradient(135deg, #185FA5 0%, #378ADD 100%);
}
```

---

## Design Token 影响域对照

| 优先级 | 模块 | 主文档 (DESIGN.md) | 补充文档 (本文) | 状态 |
|--------|------|-------------------|----------------|------|
| P0 | Hero 首屏 | ❌ 无 | ❌ 建议直接更新主文档 | 代码已实现 |
| P0 | 出版社卡片 | ✅ §4.2 | — | 代码已实现 |
| P0 | 学科列表 | ✅ §4.3-4.4 | — | 代码已实现 |
| **P1** | **侧边栏** | ❌ 缺 | ✅ §P1.1-P1.6 | ✅ 已补充 |
| **P1** | **书卡封面 (3D)** | ❌ 缺 | ✅ §P1.7-P1.10 | ✅ 已补充 |
| **P2** | **动效系统** | ❌ 缺 | ✅ §P2.1-P2.7 | ✅ 已补充 |
| **P2** | **装饰素材** | ❌ 缺 | ✅ §P2.8-P2.10 | ✅ 已补充 |
| **P3** | **多品牌色系统** | ❌ 缺 | ✅ §P3.1-P3.5 | ✅ 已补充 |

> **本补充文档由彩格调（Cai）基于 v5 实现代码反向提取生成。**
> 建议在下次迭代时将补充内容合并入主 DESIGN.md，实现设计系统的单一数据源。
