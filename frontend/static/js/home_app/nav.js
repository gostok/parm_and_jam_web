
document.addEventListener('DOMContentLoaded', () => {
    const shopBtn = document.querySelector('button[aria-controls="SubMenu-2"]');
    const aboutBtn = document.querySelector('button[aria-controls="SubMenu-3"]');

    const toggleMenu = (button) => {
    const submenuId = button.getAttribute('aria-controls');
    const submenu = document.getElementById(submenuId);
    if (submenu) {
      // Переключение видимости
        if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        } else {
        submenu.style.display = 'block';
        }
    }
    };

    shopBtn.addEventListener('click', () => toggleMenu(shopBtn));
    aboutBtn.addEventListener('click', () => toggleMenu(aboutBtn));
});


