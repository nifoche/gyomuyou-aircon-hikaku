/**
 * ギャラリー・Lightbox
 * クリックで拡大表示、前後ナビゲーション
 */

class Gallery {
  constructor(container) {
    this.container = container;
    this.items = container.querySelectorAll('.gallery-item');
    this.lightbox = this.createLightbox();
    this.currentIndex = 0;

    if (this.items.length === 0) {
      console.log('Gallery: No items found');
      return;
    }

    this.init();
  }

  createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';

    // Closeボタン
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => this.closeLightbox());
    lightbox.appendChild(closeBtn);

    // Prevボタン
    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.textContent = '‹';
    prevBtn.addEventListener('click', () => this.showPrev());
    lightbox.appendChild(prevBtn);

    // 画像
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.alt = '';
    lightbox.appendChild(img);

    // Nextボタン
    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.textContent = '›';
    nextBtn.addEventListener('click', () => this.showNext());
    lightbox.appendChild(nextBtn);

    // Lightbox背景クリックで閉じる
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        this.closeLightbox();
      }
    });

    document.body.appendChild(lightbox);
    return lightbox;
  }

  init() {
    this.items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.openLightbox(index);
      });
    });

    // キーボード操作
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.showPrev();
      if (e.key === 'ArrowRight') this.showNext();
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    const item = this.items[index];
    const img = item.querySelector('img');

    const lightboxImg = this.lightbox.querySelector('.lightbox-image');
    lightboxImg.src = img.src || img.dataset.src;
    lightboxImg.alt = img.alt;

    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // スクロール防止
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = ''; // スクロール復元
  }

  showPrev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.openLightbox(this.currentIndex);
  }

  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.openLightbox(this.currentIndex);
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('.gallery-grid');
  galleries.forEach((gallery, index) => {
    new Gallery(gallery);
  });
  console.log(`Initialized ${galleries.length} galleries`);
});
