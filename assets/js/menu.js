/**
 * Shared Hamburger Menu Toggle Functionality
 * Standards: 
 * - Button ID: menuToggle
 * - Menu ID: mobileMenu
 * - Toggles 'hidden' class on mobileMenu
 */
(function () {
    function initMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileUserToggle = document.getElementById('mobileUserToggle');
        const mobileAuthDropdown = document.getElementById('mobileAuthDropdown');

        const submenuToggle = document.getElementById('submenuToggle');
        const mobileSubmenu = document.getElementById('mobileSubmenu');
        const submenuArrow = document.getElementById('submenuArrow');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
                // Close user dropdown if menu is opened
                if (mobileAuthDropdown) mobileAuthDropdown.classList.add('hidden');
            });
        }

        if (mobileUserToggle && mobileAuthDropdown) {
            mobileUserToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                mobileAuthDropdown.classList.toggle('hidden');
                // Close mobile menu if user dropdown is opened
                if (mobileMenu) mobileMenu.classList.add('hidden');
            });
        }

        if (submenuToggle && mobileSubmenu) {
            submenuToggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                mobileSubmenu.classList.toggle('hidden');
                if (submenuArrow) {
                    submenuArrow.classList.toggle('rotate-180');
                }
            });
        }

        // Close when clicking outside
        document.addEventListener('click', function (e) {
            if (mobileMenu && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
            if (mobileAuthDropdown && !mobileAuthDropdown.contains(e.target) && !mobileUserToggle.contains(e.target)) {
                mobileAuthDropdown.classList.add('hidden');
            }
        });

        // --- Active Link Highlight Logic ---
        function highlightActiveLink() {
            const currentPath = window.location.pathname;
            const fileName = currentPath.split('/').pop() || 'index.html';
            const targetPath = (fileName === '' || fileName === 'Magazine-Webapp-main') ? 'index.html' : fileName;

            // Desktop Nav
            const desktopNav = document.querySelector('nav.hidden.lg\\:flex');
            if (desktopNav) {
                const links = desktopNav.querySelectorAll('a');
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                        const linkFile = href.split('/').pop();
                        if (linkFile === targetPath) {
                            link.classList.add('nav-active');
                        } else {
                            link.classList.remove('nav-active');
                        }
                    }
                });

                // Handle Categories Dropdown Active State
                const categoriesDropdown = desktopNav.querySelector('.group');
                if (categoriesDropdown && targetPath.includes('category')) {
                    const categoriesSpan = categoriesDropdown.querySelector('span');
                    if (categoriesSpan) categoriesSpan.classList.add('nav-active');
                }
            }

            // Mobile Nav
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                        const linkFile = href.split('/').pop();
                        if (linkFile === targetPath) {
                            link.classList.add('active-mobile-link');
                        } else {
                            link.classList.remove('active-mobile-link');
                        }
                    }
                });
            }
        }

        // --- Inject Active Indicator Styles ---
        function injectStyles() {
            if (document.getElementById('nav-active-styles')) return;

            const style = document.createElement('style');
            style.id = 'nav-active-styles';
            style.textContent = `
                nav.hidden.lg\\:flex a, 
                nav.hidden.lg\\:flex .group span {
                    position: relative;
                    display: inline-block;
                }
                nav.hidden.lg\\:flex a::after,
                nav.hidden.lg\\:flex .group span::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #000;
                    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                nav.hidden.lg\\:flex a.nav-active::after,
                nav.hidden.lg\\:flex .group span.nav-active::after {
                    width: 100%;
                }
                nav.hidden.lg\\:flex a:hover::after,
                nav.hidden.lg\\:flex .group span:hover::after {
                    width: 100%;
                    opacity: 0.3;
                }
                nav.hidden.lg\\:flex a.nav-active:hover::after,
                nav.hidden.lg\\:flex .group span.nav-active:hover::after {
                    opacity: 1;
                }
                /* Mobile Active Styles */
                .active-mobile-link {
                    color: #000 !important;
                    font-weight: 900 !important;
                    border-left: 3px solid #000 !important;
                    padding-left: 12px !important;
                    transition: all 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }

        injectStyles();
        highlightActiveLink();
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
})();

