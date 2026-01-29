/**
 * Before/After スライダー
 * マウスドラッグ・タッチスワイプで画像比較
 */

class BeforeAfterSlider {
  constructor(container) {
    this.container = container;
    this.wrapper = container.querySelector('.before-after-wrapper');
    this.afterImage = container.querySelector('.before-after-after');
    this.handle = container.querySelector('.before-after-handle');

    if (!this.wrapper || !this.afterImage || !this.handle) {
      console.error('Before/After slider: Required elements not found');
      return;
    }

    this.init();
  }

  init() {
    let isDragging = false;

    const updateSlider = (x) => {
      const rect = this.wrapper.getBoundingClientRect();
      let position = (x - rect.left) / rect.width;
      position = Math.max(0, Math.min(1, position));

      const percentage = position * 100;
      this.afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      this.handle.style.left = `${percentage}%`;
    };

    // マウスイベント
    this.handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    // タッチイベント
    this.handle.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    });

    // クリックで位置移動
    this.wrapper.addEventListener('click', (e) => {
      updateSlider(e.clientX);
    });
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.before-after-container');
  containers.forEach(container => new BeforeAfterSlider(container));
  console.log(`Initialized ${containers.length} Before/After sliders`);
});
