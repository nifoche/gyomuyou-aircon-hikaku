/**
 * ギャラリー画像を動的にロード
 * companies.jsonから画像を読み込んで表示
 */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('gallery-grid');

  if (!galleryGrid) {
    console.log('Gallery grid not found');
    return;
  }

  fetch('data/companies.json')
    .then(res => res.json())
    .then(data => {
      if (!data.companies || data.companies.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'データがありません';
        message.style.cssText = 'text-align: center; grid-column: 1 / -1; color: #666;';
        galleryGrid.appendChild(message);
        return;
      }

      let imageCount = 0;

      data.companies.forEach(company => {
        if (!company.images || !company.images.gallery) return;

        company.images.gallery.forEach(image => {
          const item = document.createElement('div');
          item.className = 'gallery-item';

          const img = document.createElement('img');
          img.src = image.path;
          img.alt = image.alt;
          img.loading = 'lazy';

          const caption = document.createElement('div');
          caption.className = 'gallery-caption';
          caption.textContent = image.caption;

          item.appendChild(img);
          item.appendChild(caption);
          galleryGrid.appendChild(item);

          imageCount++;
        });
      });

      console.log('Gallery loaded:', imageCount, 'images');

      if (imageCount === 0) {
        const message = document.createElement('p');
        message.textContent = '画像がありません';
        message.style.cssText = 'text-align: center; grid-column: 1 / -1; color: #666;';
        galleryGrid.appendChild(message);
      }
    })
    .catch(error => {
      console.error('Failed to load gallery:', error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = '読み込みエラーが発生しました';
      errorMessage.style.cssText = 'text-align: center; grid-column: 1 / -1; color: #f44;';
      galleryGrid.appendChild(errorMessage);
    });
});
