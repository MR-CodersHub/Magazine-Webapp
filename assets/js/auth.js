
import { mockApi } from './mock-api.js';

document.addEventListener('DOMContentLoaded', () => {
    // We need to wait for auth state
    mockApi.onAuthStateChanged(async (user) => {
        const dropdownContainer = document.querySelector('#auth-dropdown .py-2');
        if (!dropdownContainer) return;

        if (user) {
            // User is logged in
            // Clear existing links
            dropdownContainer.innerHTML = '';

            // Determine dashboard link based on role
            let dashboardUrl = 'user_dashboard.html'; // Default

            try {
                const userData = await mockApi.getUserProfile(user.uid);
                if (userData && userData.role === 'admin') {
                    dashboardUrl = 'admin_dashboard.html';
                }
            } catch (e) {
                console.error("Error fetching user role", e);
            }

            // Create Dashboard Link
            const dashboardLink = document.createElement('a');
            dashboardLink.href = dashboardUrl;
            dashboardLink.className = 'block px-6 py-3 text-sm hover:bg-gray-50 hover:text-indigo-600 transition-colors border-b border-gray-50';
            dashboardLink.textContent = 'Dashboard';

            // Create Logout Link
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.className = 'block px-6 py-3 text-sm hover:bg-gray-50 hover:text-indigo-600 transition-colors';
            logoutLink.textContent = 'Log Out';
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                mockApi.logout().then(() => {
                    window.location.reload();
                });
            });

            // Append new links
            dropdownContainer.appendChild(dashboardLink);
            dropdownContainer.appendChild(logoutLink);

        } else {
            // User is NOT logged in. Ensure default links are there.
            dropdownContainer.innerHTML = `
                <a href="./login.html" class="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-indigo-600 transition-colors border-b border-gray-50">Log In</a>
                <a href="./signup.html" class="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-indigo-600 transition-colors">Sign Up</a>
            `;
        }
    });
});

