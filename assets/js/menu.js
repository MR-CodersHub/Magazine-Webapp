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

        const desktopUserDropdownBtn = document.querySelector('.nav-user-dropdown');
        const desktopAuthDropdown = document.getElementById('auth-dropdown');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
                // Close user dropdowns if menu is opened
                if (mobileAuthDropdown) mobileAuthDropdown.classList.add('hidden');
                if (desktopAuthDropdown) {
                    desktopAuthDropdown.classList.add('invisible', 'opacity-0', 'translate-y-2');
                    desktopAuthDropdown.classList.remove('visible', 'opacity-100', 'translate-y-0');
                }
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

        if (desktopUserDropdownBtn && desktopAuthDropdown) {
            desktopUserDropdownBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const isHidden = desktopAuthDropdown.classList.contains('invisible');
                if (isHidden) {
                    desktopAuthDropdown.classList.remove('invisible', 'opacity-0', 'translate-y-2');
                    desktopAuthDropdown.classList.add('visible', 'opacity-100', 'translate-y-0');
                } else {
                    desktopAuthDropdown.classList.add('invisible', 'opacity-0', 'translate-y-2');
                    desktopAuthDropdown.classList.remove('visible', 'opacity-100', 'translate-y-0');
                }
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
            if (desktopAuthDropdown && !desktopAuthDropdown.contains(e.target) && !desktopUserDropdownBtn.contains(e.target)) {
                desktopAuthDropdown.classList.add('invisible', 'opacity-0', 'translate-y-2');
                desktopAuthDropdown.classList.remove('visible', 'opacity-100', 'translate-y-0');
            }
        });

        // Close dropdowns after clicking a link inside
        const allDropdownLinks = document.querySelectorAll('#auth-dropdown a, #mobileAuthDropdown a');
        allDropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileAuthDropdown) mobileAuthDropdown.classList.add('hidden');
                if (desktopAuthDropdown) {
                    desktopAuthDropdown.classList.add('invisible', 'opacity-0', 'translate-y-2');
                    desktopAuthDropdown.classList.remove('visible', 'opacity-100', 'translate-y-0');
                }
            });
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

        // --- User Account Dropdown Fixes ---
        function initAuthDropdown() {
            const authDropdown = document.getElementById('auth-dropdown');
            const mobileAuthDropdown = document.getElementById('mobileAuthDropdown');

            const dropdownOrder = [
                { href: 'login.html', label: 'Login/Signup' },
                { href: 'admin-dashboard.html', label: 'Admin Dashboard' },
                { href: 'user-dashboard.html', label: 'User Dashboard' },
            ];

            if (authDropdown) {
                authDropdown.innerHTML = `
                  <div class="flex flex-col space-y-4">
                    ${dropdownOrder.map((item, index) => `
                      <a href="./${item.href}" class="text-[11px] font-black uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors block w-full text-left">
                        ${item.label}
                      </a>
                      ${index < dropdownOrder.length - 1 ? '<div class="h-px w-full bg-gray-100"></div>' : ''}
                    `).join('')}
                  </div>
                `;
                // Set appropriate width for a vertical dropdown
                authDropdown.style.minWidth = '200px';
                authDropdown.style.width = 'auto';
                authDropdown.style.maxWidth = 'none';
                authDropdown.style.whiteSpace = 'nowrap';
            }

            if (mobileAuthDropdown) {
                mobileAuthDropdown.innerHTML = `
                  <div class="flex flex-col space-y-6">
                    ${dropdownOrder.map((item, index) => `
                      <a href="./${item.href}" class="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors block w-full text-left">
                        ${item.label}
                      </a>
                      ${index < dropdownOrder.length - 1 ? '<div class="h-px w-full bg-gray-100"></div>' : ''}
                    `).join('')}
                  </div>
                `;
                mobileAuthDropdown.style.minWidth = '';
                mobileAuthDropdown.style.width = '';
                mobileAuthDropdown.style.maxWidth = '';
                mobileAuthDropdown.style.whiteSpace = '';
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
                
                /* Fix Mobile Account Dropdown clipping on small screens (360px) */
                @media (max-width: 480px) {
                    #mobileAuthDropdown {
                        position: fixed !important;
                        top: 5rem !important;
                        right: 1rem !important;
                        left: 1rem !important;
                        width: auto !important;
                        min-width: unset !important;
                        max-width: unset !important;
                        margin: 0 !important;
                        z-index: 1001 !important;
                        transform: none !important;
                        padding: 1.5rem !important;
                        background: white !important;
                        border: 1px solid #f3f4f6 !important;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
                    }
                    #mobileAuthDropdown .flex-col {
                        gap: 1.25rem !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                    #mobileAuthDropdown .flex-col > * {
                        margin: 0 !important;
                    }
                }

                /* Fix Tablet Account Dropdown clipping for 768px screens */
                @media (min-width: 481px) and (max-width: 1023px) {
                    #mobileAuthDropdown {
                        right: 0 !important;
                        left: auto !important;
                        width: 280px !important;
                        max-width: calc(100vw - 2rem) !important;
                        z-index: 1001 !important;
                        padding: 1.5rem !important;
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
                    }
                    #mobileAuthDropdown .flex-col {
                        gap: 1.25rem !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        injectStyles();
        highlightActiveLink();
        initAuthDropdown();
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
})();

