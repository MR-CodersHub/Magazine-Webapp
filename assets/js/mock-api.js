/**
 * Mock Backend API to replace Firebase and Supabase.
 * Uses localStorage to persist data.
 */

const USERS_KEY = 'chronicle_users';
const CURRENT_USER_KEY = 'chronicle_currentUser';
const MESSAGES_KEY = 'chronicle_messages';

// Initialize with default data if empty
// Initialize with default data and enforce admin credentials
function initData() {
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch (e) {
        users = [];
    }

    const adminUser = {
        uid: 'admin-123',
        email: 'admin@gmail.com',
        password: 'admin123',
        full_name: 'System Admin',
        role: 'admin',
        created_at: new Date().toISOString()
    };

    // Find if admin exists by UID or Email
    const existingAdminIndex = users.findIndex(u => u.uid === 'admin-123' || u.email === 'admin@gmail.com');

    if (existingAdminIndex !== -1) {
        // Update existing admin credentials
        users[existingAdminIndex] = { ...users[existingAdminIndex], ...adminUser };
    } else {
        // Create new admin
        users.push(adminUser);
    }

    // Add demo user if no users existed previously (fresh start simulation)
    if (users.length === 1 && users[0].uid === 'admin-123') {
        const demoUser = {
            uid: 'user-123',
            email: 'user@chronicle.com',
            password: 'password123',
            full_name: 'Demo User',
            role: 'user',
            created_at: new Date().toISOString()
        };
        users.push(demoUser);
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    if (!localStorage.getItem(MESSAGES_KEY)) {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify([
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                subject: 'Editorial Pitch',
                message: 'I have a great story idea about the future of AI in design.',
                created_at: new Date().toISOString()
            }
        ]));
    }
}

initData();

export const mockApi = {
    // Auth Methods
    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    localStorage.setItem(CURRENT_USER_KEY, user.uid);
                    resolve({ user: { uid: user.uid, email: user.email } });
                } else {
                    reject({ code: 'auth/invalid-credential', message: 'Invalid email or password.' });
                }
            }, 800); // Simulate network delay
        });
    },

    async signup(email, password, fullName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                if (users.find(u => u.email === email)) {
                    reject({ code: 'auth/email-already-in-use', message: 'Email already exists.' });
                    return;
                }

                const newUser = {
                    uid: 'user-' + Date.now(),
                    email,
                    password,
                    full_name: fullName,
                    role: 'user',
                    created_at: new Date().toISOString()
                };

                users.push(newUser);
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
                // Do not auto-login on signup to force login flow, or we can auto-login:
                // localStorage.setItem(CURRENT_USER_KEY, newUser.uid);

                resolve({ user: { uid: newUser.uid, email: newUser.email } });
            }, 1000);
        });
    },

    async logout() {
        return new Promise((resolve) => {
            localStorage.removeItem(CURRENT_USER_KEY);
            resolve();
        });
    },

    onAuthStateChanged(callback) {
        // Immediate check
        const check = () => {
            const uid = localStorage.getItem(CURRENT_USER_KEY);
            if (uid) {
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                const user = users.find(u => u.uid === uid);
                if (user) {
                    callback({ uid: user.uid, email: user.email });
                } else {
                    callback(null);
                }
            } else {
                callback(null);
            }
        };
        check();
        // Since we can't easily listen to localStorage changes across the same page without a poll or event, 
        // we'll rely on page reloads or standard flow. 
        // A simple polling could be added if needed for multi-tab support, but usually not needed for this simple case.
    },

    // User Data Methods
    async getUserProfile(uid) {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.uid === uid);
        return user || null;
    },

    async getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    },

    // Message/Data Methods
    async sendMessage(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
                const newMessage = {
                    id: Date.now(),
                    ...data,
                    created_at: new Date().toISOString()
                };
                messages.push(newMessage);
                localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
                resolve(newMessage);
            }, 600);
        });
    },

    async getMessages() {
        return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
    }
};

