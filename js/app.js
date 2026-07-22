// Open publisher trial page
function openPublisher(pubId) {
  window.location.href = 'trial.html?id=' + encodeURIComponent(pubId);
}

// Helper: open a specific book
function openBook(bookUrl, bookTitle) {
  if (!bookUrl) {
    showNotification('该书暂无试阅链接');
    return;
  }
  // 芝麻平台的 book/sample 页面有 iframe 检测（会显示"访问受限"），必须新窗口打开
  if (bookUrl.includes('mp.zhizhuma.com/book/sample-')) {
    window.open(bookUrl, '_blank');
  } else {
    window.location.href = `trial.html?url=${encodeURIComponent(bookUrl)}&title=${encodeURIComponent(bookTitle)}`;
  }
}

// Subject icons for visual enrichment
const subjectIcons = {
  '语文': '📖', '数学': '📐', '英语': '🌍', '道德与法治': '⚖️',
  '历史': '📜', '地理': '🌏', '生物': '🧬', '化学': '🧪',
  '物理': '⚡', '科学': '🔬', '思想政治': '🏛️', '音乐': '🎵',
  '美术': '🎨', '体育': '🏃', '信息技术': '💻', '通用技术': '🔧'
};

// Count totals for hero stats
function computeStats(publishers) {
  let totalBooks = 0;
  const allStages = new Set();
  const allSubjects = new Set();
  const allVersions = new Set();

  publishers.forEach(pub => {
    totalBooks += pub.totalBooks || 0;
    pub.categories.forEach(cat => {
      allStages.add(cat.stage);
      cat.subjects.forEach(subj => {
        allSubjects.add(subj.name);
        subj.versions.forEach(ver => {
          allVersions.add(ver.version);
        });
      });
    });
  });

  return {
    books: totalBooks,
    stages: allStages.size,
    subjects: allSubjects.size,
    versions: allVersions.size
  };
}

// Animate stat numbers
function animateStats(stats) {
  const statCards = document.querySelectorAll('.stat-card');
  if (!statCards.length) return;

  const values = [stats.books, stats.subjects, stats.stages, stats.versions];
  const labels = ['教参资源', '覆盖学科', '学段覆盖', '教材版本'];

  statCards.forEach((card, i) => {
    const numEl = card.querySelector('.stat-number');
    const labelEl = card.querySelector('.stat-label');
    if (labelEl) labelEl.textContent = labels[i];

    // Animated counting
    if (numEl) {
      const target = values[i];
      const suffix = i === 0 ? '' : i === 2 ? '' : '+';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 30));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        numEl.textContent = current + suffix;
      }, 30);
    }
  });
}

// Brand class mapping per publisher
const brandMap = {
  'qhxk-edu': 'brand-purple',
  'ybjy-edu': 'brand-amber',
  'sxzj-cl': 'brand-blue'
};

// Get first N covers from a publisher for the preview wall
function getCoverThumbnails(pub, max = 8) {
  const covers = [];
  for (const cat of pub.categories) {
    for (const subj of cat.subjects) {
      for (const ver of subj.versions) {
        for (const grade of Object.values(ver.grades)) {
          for (const book of grade) {
            if (book.cover && covers.length < max) {
              covers.push(book.cover);
            }
            if (covers.length >= max) break;
          }
          if (covers.length >= max) break;
        }
        if (covers.length >= max) break;
      }
      if (covers.length >= max) break;
    }
    if (covers.length >= max) break;
  }
  return covers;
}

// Render all publishers — 网格 + 品牌色 + 封面墙
function renderPublishers() {
  const container = document.getElementById('publisherContainer');
  if (!container) return;

  const stats = computeStats(publishers);
  animateStats(stats);

  if (publishers.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="icon">📚</div><p>暂无比添加的教参资源</p></div>`;
    return;
  }

  let html = '<div class="publisher-grid">';
  publishers.forEach(pub => {
    const brandClass = brandMap[pub.id] || 'brand-purple';
    const covers = getCoverThumbnails(pub);
    const moreCount = pub.totalBooks - covers.length;

    // Cover thumbnails HTML
    const coversHtml = covers.length
      ? covers.map(c => `<img class="publisher-cover-thumb" src="${escapeAttr(c)}" alt="" loading="lazy" onerror="this.style.display='none'">`).join('') +
        (moreCount > 0 ? `<span class="publisher-cover-more">+${moreCount}</span>` : '')
      : '<span class="publisher-cover-more" style="width:auto;padding:0 12px">暂无封面</span>';

    html += `
      <div class="publisher-card ${brandClass}" id="pub-${pub.id}" data-id="${pub.id}">
        <div class="publisher-header">
          <div class="publisher-header-top">
            <div class="publisher-logo">${pub.logo}</div>
            <div class="publisher-meta">
              <div class="publisher-name">${pub.name}</div>
              <div class="publisher-series">${pub.series}</div>
              <div class="publisher-desc">${pub.description}</div>
              <div class="publisher-stats">
                <span class="stat">📚 <strong>${pub.totalBooks}</strong> 本</span>
                <span class="stat">🏫 <strong>${pub.categories.length}</strong> 个学段</span>
              </div>
            </div>
          </div>
        </div>
        <div class="publisher-covers">${coversHtml}</div>
        <button class="enter-trial-btn" data-pub-id="${escapeAttr(pub.id)}">📖 进入书城试阅</button>
        <div class="category-section">
          ${renderStages(pub)}
        </div>
      </div>
    `;
  });
  html += '</div>';

  container.innerHTML = html;

  // Render sidebar navigation
  renderSidebar();

  // "进入书城试阅" 按钮
  document.querySelectorAll('.enter-trial-btn[data-pub-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPublisher(btn.dataset.pubId);
    });
  });

  // Stage tab switching
  document.querySelectorAll('.stage-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const stageName = tab.dataset.stage;
      tab.closest('.stage-tabs').querySelectorAll('.stage-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const card = tab.closest('.publisher-card');
      card.querySelectorAll('.stage-content').forEach(s => s.classList.remove('active'));
      card.querySelector(`.stage-content[data-stage="${stageName}"]`).classList.add('active');
    });
  });

}

// Render sidebar publisher quick-jump
function renderSidebar() {
  const nav = document.getElementById('sideNav');
  if (!nav) return;
  const brandOrder = ['brand-purple', 'brand-amber', 'brand-blue', 'brand-green', 'brand-red', 'brand-teal', 'brand-rose'];
  let html = '';
  publishers.forEach((pub, i) => {
    const brand = brandMap[pub.id] || brandOrder[i % brandOrder.length];
    const shortName = pub.name.replace(/有限公司|教育图书|文化发展/g, '').trim();
    html += `
      <a href="#pub-${pub.id}" class="side-nav-item ${brand}">
        <span class="side-nav-mark"></span>
        <span class="side-nav-text">${escapeHtml(shortName)}</span>
        <span class="side-nav-count">${pub.totalBooks}</span>
      </a>
    `;
  });
  nav.innerHTML = html;
}

// Render stage tabs + content
function renderStages(pub) {
  let tabsHtml = '<div class="stage-tabs">';
  let contentsHtml = '';

  pub.categories.forEach((stage, idx) => {
    const isActive = idx === 0 ? 'active' : '';
    tabsHtml += `<div class="stage-tab ${isActive}" data-pub="${pub.id}" data-stage="${stage.stage}">${stage.stage}</div>`;

    contentsHtml += `
      <div class="stage-content ${isActive}" data-stage="${stage.stage}">
        ${renderSubjects(pub.id, stage)}
      </div>
    `;
  });
  tabsHtml += '</div>';

  return tabsHtml + contentsHtml;
}

// Render subjects grid for a stage — 可折叠学科行
function renderSubjects(pubId, stage) {
  let html = '<div class="subject-list">';
  stage.subjects.forEach((subj, idx) => {
    const icon = subjectIcons[subj.name] || '📚';
    const isFirst = !idx ? '' : '';

    html += `
      <div class="subject-row open" data-pub="${pubId}" data-stage="${stage.stage}" data-subj="${subj.name}">
        <div class="subject-row-head">
          <span class="subject-name"><span class="subject-icon">${icon}</span>${subj.name}</span>
          <span class="subject-count">${subj.count} 本</span>
          <span class="expand-icon">▾</span>
        </div>
        <div class="subject-row-body" style="display: block;">
          ${renderVersions(pubId, stage.stage, subj)}
        </div>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

// Render versions — 直接展示所有书（带封面）
function renderVersions(pubId, stageName, subj) {
  // 收集所有书（含版本+年级标签）
  const allBooks = [];
  subj.versions.forEach(v => {
    Object.entries(v.grades).forEach(([grade, books]) => {
      books.forEach(b => allBooks.push({ ...b, version: v.version, grade: grade }));
    });
  });
  if (allBooks.length === 0) return '<div class="no-books">该学科暂无数据</div>';

  // 单版本：不显示版本分隔，直接平铺
  if (subj.versions.length === 1) {
    return `<div class="book-grid book-grid-flat">${allBooks.map(b => renderBookCardFlat(b)).join('')}</div>`;
  }

  // 多版本：按版本分组显示
  let html = '';
  subj.versions.forEach(v => {
    const versionBooks = allBooks.filter(b => b.version === v.version);
    html += `
      <div class="version-group">
        <div class="version-group-label">
          <span class="version-group-icon">📘</span>
          ${escapeHtml(v.version)}
          <span class="version-group-count">${versionBooks.length} 本</span>
        </div>
        <div class="book-grid book-grid-flat">${versionBooks.map(b => renderBookCardFlat(b)).join('')}</div>
      </div>
    `;
  });
  return html;
}

// Cover color palette — 模拟图书封面的颜色方案
const coverPalette = [
  { bg: '#EEEDFE', accent: '#CECBF6', text: '#3C3489' },
  { bg: '#FBEAF0', accent: '#F4C0D1', text: '#993556' },
  { bg: '#FAEEDA', accent: '#FAC775', text: '#854F0B' },
  { bg: '#E1F5EE', accent: '#9FE1CB', text: '#0F6E56' },
  { bg: '#E6F1FB', accent: '#B5D4F4', text: '#185FA5' },
  { bg: '#FAECE7', accent: '#F5C4B3', text: '#993C1D' },
  { bg: '#F3EEFE', accent: '#D5CBF6', text: '#534AB7' },
  { bg: '#EAF3DE', accent: '#C0DD97', text: '#3B6D11' },
];

// Get consistent cover color for a book title
function getCoverColor(title) {
  let hash = 0;
  for (let i = 0; i < (title || '').length; i++) {
    hash = ((hash << 5) - hash) + title.charCodeAt(i);
    hash = hash & hash;
  }
  return coverPalette[Math.abs(hash) % coverPalette.length];
}

// Render flat book card — 扁平化展示卡片（含版本/年级/学期标签）
function renderBookCardFlat(book) {
  const safeTitle = escapeHtml(book.title || '');
  const shortTitle = safeTitle.replace(/^\d{4}年[春秋]+版\s*/, '');
  const term = book.term || '';
  const grade = book.grade || '';
  const version = book.version || '';
  const color = getCoverColor(safeTitle);

  // Real cover image if available, otherwise colored placeholder
  const coverHtml = book.cover
    ? `<img class="book-cover-img" src="${escapeAttr(book.cover)}" alt="" loading="lazy" onerror="this.parentElement.classList.add('no-img');this.remove()">`
    : '';

  // Decorative cover for placeholder
  const placeholderHtml = `
    <div class="book-cover-fill" style="background:linear-gradient(145deg, ${color.bg} 0%, ${color.accent} 100%);">
      <div style="position:absolute;top:18px;left:10px;right:10px;height:2px;border-radius:1px;background:rgba(255,255,255,0.2);"></div>
      <div style="position:absolute;top:24px;left:10px;width:40%;height:2px;border-radius:1px;background:rgba(255,255,255,0.15);"></div>
      <div style="position:absolute;bottom:32px;left:10px;right:10px;height:1px;border-radius:1px;background:rgba(255,255,255,0.1);"></div>
    </div>
  `;

  // Build info tags (small badges below title)
  let infoTags = '<div class="book-card-info">';
  if (grade) infoTags += `<span class="info-tag info-grade">${escapeHtml(grade)}</span>`;
  if (term) infoTags += `<span class="info-tag info-term">${escapeHtml(term)}</span>`;
  if (version) infoTags += `<span class="info-tag info-version">${escapeHtml(version)}</span>`;
  infoTags += '</div>';

  return `
    <div class="book-card book-card-flat" data-url="${escapeAttr(book.url || '')}" data-title="${safeTitle}">
      <div class="book-cover-wrap">
        ${coverHtml}
        ${book.cover ? '' : placeholderHtml}
        ${term ? `<span class="book-cover-tag">${escapeHtml(term)}</span>` : ''}
      </div>
      <div class="book-card-body">
        <div class="book-card-title">${shortTitle}</div>
        ${infoTags}
        <div class="book-card-footer">
          <span class="book-card-pages">${book.pages || '?'}页</span>
          <button class="book-card-btn" data-url="${escapeAttr(book.url || '')}" data-title="${safeTitle}">试阅</button>
        </div>
      </div>
    </div>
  `;
}

// Render individual book — grid card with cover
function renderBookCard() {
  // Alias for backward compatibility — use renderBookCardFlat directly
  return renderBookCardFlat({ ...arguments.length > 0 ? arguments[0] : {} });
}

// Simple HTML escaping (for text content)
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Attribute escaping (for data-url, data-title etc.)
function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Notification
function showNotification(msg) {
  let el = document.getElementById('notification');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notification';
    el.textContent = msg;
    document.body.appendChild(el);
  } else {
    el.textContent = msg;
  }

  // Reset and animate
  el.style.opacity = '0';
  el.style.transform = 'translateX(-50%) translateY(20px)';

  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });

  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3000);
}

// Event delegation
document.addEventListener('click', (e) => {
  // Subject row expand
  const subjectHead = e.target.closest('.subject-row-head');
  if (subjectHead) {
    const row = subjectHead.parentElement;
    const body = row.querySelector('.subject-row-body');
    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    row.classList.toggle('open', !isOpen);
    return;
  }

  // Grade tile expand
  const gradeHead = e.target.closest('.grade-tile-head');
  if (gradeHead) {
    const tile = gradeHead.parentElement;
    const body = tile.querySelector('.grade-tile-body');
    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    tile.classList.toggle('open', !isOpen);
    return;
  }

  // Version tab switch
  const versionTab = e.target.closest('.version-tab');
  if (versionTab) {
    const version = versionTab.dataset.version;
    const subjectRow = versionTab.closest('.subject-row-body');
    subjectRow.querySelectorAll('.version-tab').forEach(t => t.classList.remove('active'));
    versionTab.classList.add('active');
    subjectRow.querySelectorAll('.version-content').forEach(c => {
      c.classList.toggle('active', c.dataset.version === version);
    });
    return;
  }

  // Trial button (new style)
  const bookCardBtn = e.target.closest('.book-card-btn');
  if (bookCardBtn) {
    e.stopPropagation();
    const url = bookCardBtn.dataset.url;
    const title = bookCardBtn.dataset.title;
    if (url) {
      openBook(url, title);
    } else {
      showNotification('该书暂无试阅链接');
    }
    return;
  }

  // Trial button (old style, for compatibility)
  const trialBtn = e.target.closest('.trial-btn');
  if (trialBtn) {
    e.stopPropagation();
    const url = trialBtn.dataset.url;
    const title = trialBtn.dataset.title;
    if (url) {
      openBook(url, title);
    } else {
      showNotification('该书暂无试阅链接');
    }
    return;
  }

  // Book card click (entire card opens book)
  const bookCard = e.target.closest('.book-card');
  if (bookCard && !e.target.closest('.book-card-btn')) {
    const url = bookCard.dataset.url;
    const title = bookCard.dataset.title;
    if (url) openBook(url, title);
    return;
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Show loading state
  const container = document.getElementById('publisherContainer');
  if (container) {
    container.innerHTML = `
      <div class="loading-pulse">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    `;
  }

  // Small delay to show loading animation, then render
  setTimeout(() => {
    renderPublishers();
  }, 400);
});
