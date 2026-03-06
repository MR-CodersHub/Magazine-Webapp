
import { mockApi } from './mock-api.js';

document.addEventListener('DOMContentLoaded', () => {
    // We need to wait for auth state
    const updateAuthUI = () => {
        const dropdownContainer = document.querySelector('#auth-dropdown .py-2');
        if (!dropdownContainer) return;

        const session = JSON.parse(localStorage.getItem('chronicle_session'));

        if (session) {
            // User is logged in
            dropdownContainer.innerHTML = '';

            // Determine dashboard link based on role
            let dashboardUrl = session.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';

            // Create Dashboard Link
            const dashboardLink = document.createElement('a');
            dashboardLink.href = dashboardUrl;
            dashboardLink.className = 'block px-6 py-3 text-sm hover:bg-gray-50 hover:text-slate-600 transition-colors border-b border-gray-50';
            dashboardLink.textContent = 'Dashboard';

            // Create Logout Link
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.className = 'block px-6 py-3 text-sm hover:bg-gray-50 hover:text-slate-600 transition-colors';
            logoutLink.textContent = 'Log Out';
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('chronicle_session');
                window.location.href = 'login.html';
            });

            // Append new links
            dropdownContainer.appendChild(dashboardLink);
            dropdownContainer.appendChild(logoutLink);

        } else {
            // User is NOT logged in. Ensure default links are there.
            dropdownContainer.innerHTML = `
                <a href="./login.html" class="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-slate-600 transition-colors border-b border-gray-50">Log In</a>
                <a href="./signup.html" class="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-slate-600 transition-colors">Sign Up</a>
            `;
        }
    };

    updateAuthUI();

    // Listen for storage changes in other tabs
    window.addEventListener('storage', (event) => {
        if (event.key === 'chronicle_session') {
            updateAuthUI();
        }
    });
});


