/**
 * 業務用エアコン修理比較サイト - メインJavaScript
 *
 * 機能：
 * - 地域フィルター機能
 * - 比較表のインタラクティブ機能
 */

document.addEventListener('DOMContentLoaded', function() {
  initFilterButtons();
  initSmoothScroll();
  initComparisonTable();
});

/**
 * 地域フィルター機能の初期化
 */
function initFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-button');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // アクティブクラスの切り替え
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // フィルター適用
      applyFilter(filter);
    });
  });
}

/**
 * フィルター適用処理
 * @param {string} filter - フィルター種別（all, kanto, tokai, kansai, nationwide）
 */
function applyFilter(filter) {
  const table = document.getElementById('comparisonTable');
  if (!table) return;

  const cells = table.querySelectorAll('td[data-region]');

  cells.forEach(cell => {
    const row = cell.closest('tr');
    const regions = cell.getAttribute('data-region');

    if (filter === 'all') {
      // 全て表示
      cell.style.display = '';
      if (row) row.style.display = '';
    } else {
      // 地域で絞り込み
      const regionArray = regions.split(' ');
      if (regionArray.includes(filter)) {
        cell.style.display = '';
        if (row) row.style.display = '';
      } else {
        cell.style.display = 'none';
        // 行の全てのセルが非表示の場合は行も非表示
        if (row) {
          const rowCells = row.querySelectorAll('td[data-region]');
          const allHidden = Array.from(rowCells).every(c => c.style.display === 'none');
          if (allHidden) {
            row.style.display = 'none';
          } else {
            row.style.display = '';
          }
        }
      }
    }
  });

  // モバイル表示の場合のカード形式調整
  adjustMobileCards(filter);
}

/**
 * モバイルカードの表示調整
 * @param {string} filter - フィルター種別
 */
function adjustMobileCards(filter) {
  if (window.innerWidth <= 767) {
    const cards = document.querySelectorAll('.company-card');

    cards.forEach(card => {
      const companyName = card.querySelector('h3')?.textContent;
      let shouldShow = false;

      // 各企業の対応地域を判定
      if (filter === 'all') {
        shouldShow = true;
      } else if (companyName?.includes('元気でんき')) {
        if (['kanto', 'tokai', 'kansai'].includes(filter)) {
          shouldShow = true;
        }
      } else if (companyName?.includes('業務用エアコンPRO修理') ||
                 companyName?.includes('エアコン総本店') ||
                 companyName?.includes('空調修理110番')) {
        if (filter === 'nationwide') {
          shouldShow = true;
        }
      } else if (companyName?.includes('ロックフィールド')) {
        if (filter === 'kanto') {
          shouldShow = true;
        }
      } else if (companyName?.includes('富士設備')) {
        if (['kanto', 'kansai'].includes(filter)) {
          shouldShow = true;
        }
      }

      card.style.display = shouldShow ? '' : 'none';
    });
  }
}

/**
 * スムーススクロールの初期化
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 比較表のインタラクティブ機能
 */
function initComparisonTable() {
  // セルのホバー効果
  const table = document.getElementById('comparisonTable');
  if (!table) return;

  const cells = table.querySelectorAll('td, th');

  cells.forEach(cell => {
    cell.addEventListener('mouseenter', function() {
      // 同じ行をハイライト
      const row = this.closest('tr');
      if (row) {
        row.style.backgroundColor = 'rgba(235, 102, 1, 0.1)';
      }
    });

    cell.addEventListener('mouseleave', function() {
      const row = this.closest('tr');
      if (row) {
        row.style.backgroundColor = '';
      }
    });
  });

  // 企業名列クリックで詳細ページへ
  const companyHeaders = table.querySelectorAll('th');
  companyHeaders.forEach((header, index) => {
    if (index === 0) return; // 最初の「項目」列はスキップ

    header.addEventListener('click', function() {
      const companyName = this.textContent.trim();
      let detailPage = '';

      if (companyName.includes('元気でんき')) {
        window.open('https://aircon-gekiyasuou.jp/', '_blank');
        return;
      } else if (companyName.includes('業務用エアコン')) {
        detailPage = 'pages/aircon-pro-repair.html';
      } else if (companyName.includes('ロックフィールド')) {
        detailPage = 'pages/rockfield.html';
      } else if (companyName.includes('エアコン総本店')) {
        detailPage = 'pages/aircon-honten.html';
      } else if (companyName.includes('空調修理110番')) {
        detailPage = 'pages/shuri110.html';
      } else if (companyName.includes('富士設備')) {
        detailPage = 'pages/fuji-setubi.html';
      }

      if (detailPage) {
        window.location.href = detailPage;
      }
    });

    header.style.cursor = 'pointer';
  });
}

/**
 * ウィンドウリサイズ時の処理
 */
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // 現在のアクティブなフィルターを再適用
    const activeButton = document.querySelector('.filter-button.active');
    if (activeButton) {
      const filter = activeButton.getAttribute('data-filter');
      applyFilter(filter);
    }
  }, 250);
});

/**
 * ページ読み込み完了時のアニメーション
 */
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  setTimeout(function() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

/**
 * FAQのアコーディオン機能（details/summary要素）
 */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('toggle', function() {
    if (this.open) {
      // 他のFAQを閉じる
      faqItems.forEach(otherItem => {
        if (otherItem !== this && otherItem.open) {
          otherItem.open = false;
        }
      });
    }
  });
});

/**
 * スクロール時のヘッダー固定効果
 */
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
  } else if (currentScroll > lastScroll) {
    // 下にスクロール
    header.style.transform = 'translateY(-100%)';
  } else {
    // 上にスクロール
    header.style.transform = 'translateY(0)';
    header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
  }

  lastScroll = currentScroll;
});

// ヘッダーにtransitionを追加
if (header) {
  header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
}
