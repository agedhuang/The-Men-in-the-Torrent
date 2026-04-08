// After DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#fav-content');
  
  // 从 LocalStorage 读取收藏数据
  const favorites = JSON.parse(localStorage.getItem('my_favorites')) || [];

  if (favorites.length === 0) {
    container.innerHTML = '<p>You haven\'t added any favorites yet.</p>';
    return;
  }

  // 渲染图片
  const htmlArray = favorites.map(item => {
    return `<div class="image-wrapper">
              <img src="${item.src}" alt="">
            </div>`;
  });

  container.innerHTML = htmlArray.join('');
});