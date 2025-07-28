/**
 * Vienna Ramen Guide - Restaurant Manager
 * Enhanced automation with direct GitHub integration
 * Created for RaggaeShark26 - 2025
 */

class RestaurantManager {
    constructor() {
        this.githubToken = localStorage.getItem('github-token');
        this.restaurants = [];
        this.isLoading = false;
        this.currentEditIndex = -1;
        this.backupData = null;
        
        // GitHub API configuration
        this.github = {
            owner: 'RaggaeShark26',
            repo: 'vienna-ramen-guide',
            file: 'restaurants.json',
            apiBase: 'https://api.github.com'
        };
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.bindEvents();
        this.checkSetup();
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Setup events
        document.getElementById('connect-github').addEventListener('click', () => this.connectGitHub());
        document.getElementById('disconnect-github').addEventListener('click', () => this.disconnectGitHub());
        
        // Main actions
        document.getElementById('refresh-data').addEventListener('click', () => this.loadRestaurants());
        document.getElementById('add-restaurant').addEventListener('click', () => this.showAddModal());
        document.getElementById('backup-data').addEventListener('click', () => this.downloadBackup());
        
        // Modal events
        document.getElementById('close-modal').addEventListener('click', () => this.hideModal());
        document.getElementById('cancel-restaurant').addEventListener('click', () => this.hideModal());
        document.getElementById('save-restaurant').addEventListener('click', () => this.saveRestaurant());
        
        // Delete modal events
        document.getElementById('close-delete-modal').addEventListener('click', () => this.hideDeleteModal());
        document.getElementById('cancel-delete').addEventListener('click', () => this.hideDeleteModal());
        document.getElementById('confirm-delete').addEventListener('click', () => this.deleteRestaurant());
        
        // Alert dismiss events
        document.getElementById('dismiss-error').addEventListener('click', () => this.hideError());
        document.getElementById('dismiss-success').addEventListener('click', () => this.hideSuccess());
        
        // Form validation
        document.getElementById('restaurant-form').addEventListener('input', () => this.validateForm());
        
        // Enter key in token field
        document.getElementById('github-token').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.connectGitHub();
            }
        });
    }

    /**
     * Check if GitHub is already set up
     */
    checkSetup() {
        if (this.githubToken) {
            this.showManagerSection();
            this.loadRestaurants();
        } else {
            this.showSetupSection();
        }
    }

    /**
     * Connect to GitHub with provided token
     */
    async connectGitHub() {
        const tokenInput = document.getElementById('github-token');
        const token = tokenInput.value.trim();
        
        if (!token) {
            this.showError('Please enter your GitHub token');
            return;
        }
        
        if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
            this.showError('Invalid token format. GitHub tokens should start with "ghp_" or "github_pat_"');
            return;
        }
        
        this.showLoading('Connecting to GitHub...');
        
        try {
            // Test the token by trying to read the repository
            const response = await this.makeGitHubRequest(`/repos/${this.github.owner}/${this.github.repo}`, token);
            
            if (response.ok) {
                this.githubToken = token;
                localStorage.setItem('github-token', token);
                this.showSuccess('Successfully connected to GitHub!');
                this.showManagerSection();
                this.loadRestaurants();
            } else {
                throw new Error('Invalid token or insufficient permissions');
            }
        } catch (error) {
            this.showError(`Failed to connect: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Disconnect from GitHub
     */
    disconnectGitHub() {
        this.githubToken = null;
        localStorage.removeItem('github-token');
        this.restaurants = [];
        this.showSetupSection();
        this.showSuccess('Disconnected from GitHub');
    }

    /**
     * Load restaurants from GitHub
     */
    async loadRestaurants() {
        if (!this.githubToken) {
            this.showError('GitHub token not configured');
            return;
        }
        
        this.showLoading('Loading restaurants from GitHub...');
        
        try {
            const response = await this.makeGitHubRequest(
                `/repos/${this.github.owner}/${this.github.repo}/contents/${this.github.file}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const fileData = await response.json();
            const content = JSON.parse(atob(fileData.content));
            
            this.restaurants = content.restaurants || [];
            this.backupData = JSON.stringify(content, null, 2);
            
            this.renderRestaurants();
            this.updateLastSync();
            this.showSuccess(`Loaded ${this.restaurants.length} restaurants successfully!`);
            
        } catch (error) {
            this.showError(`Failed to load restaurants: ${error.message}`);
            console.error('Load error:', error);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Save restaurants to GitHub
     */
    async saveRestaurants(commitMessage = 'Update restaurants via Restaurant Manager') {
        if (!this.githubToken) {
            this.showError('GitHub token not configured');
            return false;
        }
        
        this.showLoading('Saving to GitHub...');
        
        try {
            // First, get the current file to get its SHA
            const currentResponse = await this.makeGitHubRequest(
                `/repos/${this.github.owner}/${this.github.repo}/contents/${this.github.file}`
            );
            
            if (!currentResponse.ok) {
                throw new Error('Failed to get current file data');
            }
            
            const currentFile = await currentResponse.json();
            
            // Prepare the new content
            const newContent = {
                "_comment": "Vienna Ramen Guide - Restaurant Database",
                "_instructions": "To add a restaurant, use the Restaurant Manager or copy the template below and fill in all fields",
                "_template": {
                    "name": "Restaurant Name",
                    "tags": ["tag1", "tag2", "tag3"],
                    "description": "Description here",
                    "address": "Full address, Vienna",
                    "phone": "+43 1 XXX XXXX",
                    "priceRange": "€€",
                    "openingHours": "Hours here",
                    "website": "https://website.com",
                    "instagram": "handle_without_@"
                },
                "restaurants": this.restaurants
            };
            
            // Update the file
            const updateResponse = await this.makeGitHubRequest(
                `/repos/${this.github.owner}/${this.github.repo}/contents/${this.github.file}`,
                this.githubToken,
                'PUT',
                {
                    message: commitMessage,
                    content: this.encodeUTF8ToBase64(JSON.stringify(newContent, null, 2)),
                    sha: currentFile.sha
                }
            );
            
            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(errorData.message || 'Failed to save file');
            }
            
            this.updateLastSync();
            this.showSuccess('Restaurants saved successfully! Your website will update automatically.');
            return true;
            
        } catch (error) {
            this.showError(`Failed to save: ${error.message}`);
            console.error('Save error:', error);
            return false;
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Make a request to GitHub API
     */
    async makeGitHubRequest(endpoint, token = null, method = 'GET', body = null) {
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Vienna-Ramen-Guide-Manager/1.0'
        };
        
        if (token || this.githubToken) {
            headers['Authorization'] = `token ${token || this.githubToken}`;
        }
        
        if (body) {
            headers['Content-Type'] = 'application/json';
        }
        
        const config = {
            method,
            headers
        };
        
        if (body) {
            config.body = JSON.stringify(body);
        }
        
        return fetch(`${this.github.apiBase}${endpoint}`, config);
    }

    /**
     * Render the restaurant list
     */
    renderRestaurants() {
        const container = document.getElementById('restaurant-list');
        const countElement = document.getElementById('restaurant-count');
        
        countElement.textContent = this.restaurants.length;
        
        if (this.restaurants.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-bowl-rice" style="font-size: 3rem; margin-bottom: 20px; color: #ddd;"></i>
                    <h3>No restaurants yet</h3>
                    <p>Click "Add New Restaurant" to get started!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.restaurants.map((restaurant, index) => `
            <div class="restaurant-card">
                <div class="restaurant-header">
                    <div class="restaurant-info">
                        <h4>${this.escapeHtml(restaurant.name)}</h4>
                        <div class="restaurant-tags">
                            ${restaurant.tags.map(tag => `<span class="tag">#${this.escapeHtml(tag)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="restaurant-actions">
                        <button class="btn btn-secondary" onclick="restaurantManager.showEditModal(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger" onclick="restaurantManager.showDeleteModal(${index})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                <div class="restaurant-details">
                    <p>${this.escapeHtml(restaurant.description)}</p>
                    
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${this.escapeHtml(restaurant.address)}</span>
                    </div>
                    
                    ${restaurant.phone ? `
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>${this.escapeHtml(restaurant.phone)}</span>
                    </div>
                    ` : ''}
                    
                    <div class="detail-item">
                        <i class="fas fa-euro-sign"></i>
                        <span>${this.escapeHtml(restaurant.priceRange)}</span>
                    </div>
                    
                    ${restaurant.openingHours ? `
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>${this.escapeHtml(restaurant.openingHours)}</span>
                    </div>
                    ` : ''}
                    
                    ${restaurant.website ? `
                    <div class="detail-item">
                        <i class="fas fa-globe"></i>
                        <a href="${this.escapeHtml(restaurant.website)}" target="_blank">Website</a>
                    </div>
                    ` : ''}
                    
                    ${restaurant.instagram ? `
                    <div class="detail-item">
                        <i class="fab fa-instagram"></i>
                        <a href="https://instagram.com/${this.escapeHtml(restaurant.instagram)}" target="_blank">@${this.escapeHtml(restaurant.instagram)}</a>
                    </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    /**
     * Show add restaurant modal
     */
    showAddModal() {
        this.currentEditIndex = -1;
        document.getElementById('modal-title').textContent = 'Add New Restaurant';
        document.getElementById('restaurant-form').reset();
        this.showModal();
    }

    /**
     * Show edit restaurant modal
     */
    showEditModal(index) {
        this.currentEditIndex = index;
        const restaurant = this.restaurants[index];
        
        document.getElementById('modal-title').textContent = 'Edit Restaurant';
        
        // Fill form with current data
        document.getElementById('name').value = restaurant.name;
        document.getElementById('tags').value = restaurant.tags.join(', ');
        document.getElementById('description').value = restaurant.description;
        document.getElementById('address').value = restaurant.address;
        document.getElementById('phone').value = restaurant.phone || '';
        document.getElementById('priceRange').value = restaurant.priceRange;
        document.getElementById('openingHours').value = restaurant.openingHours || '';
        document.getElementById('website').value = restaurant.website || '';
        document.getElementById('instagram').value = restaurant.instagram || '';
        
        this.showModal();
    }

    /**
     * Save restaurant (add or edit)
     */
    async saveRestaurant() {
        if (!this.validateForm()) {
            return;
        }
        
        const formData = new FormData(document.getElementById('restaurant-form'));
        const restaurant = {
            name: formData.get('name').trim(),
            tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
            description: formData.get('description').trim(),
            address: formData.get('address').trim(),
            phone: formData.get('phone').trim(),
            priceRange: formData.get('priceRange'),
            openingHours: formData.get('openingHours').trim(),
            website: formData.get('website').trim(),
            instagram: formData.get('instagram').trim()
        };
        
        // Clean up empty fields
        if (!restaurant.phone) delete restaurant.phone;
        if (!restaurant.openingHours) delete restaurant.openingHours;
        if (!restaurant.website) delete restaurant.website;
        if (!restaurant.instagram) delete restaurant.instagram;
        
        if (this.currentEditIndex === -1) {
            // Adding new restaurant
            this.restaurants.push(restaurant);
        } else {
            // Editing existing restaurant
            this.restaurants[this.currentEditIndex] = restaurant;
        }
        
        const action = this.currentEditIndex === -1 ? 'Add' : 'Edit';
        const commitMessage = `${action} restaurant: ${restaurant.name}`;
        
        const success = await this.saveRestaurants(commitMessage);
        
        if (success) {
            this.hideModal();
            this.renderRestaurants();
        }
    }

    /**
     * Show delete confirmation modal
     */
    showDeleteModal(index) {
        this.currentEditIndex = index;
        const restaurant = this.restaurants[index];
        document.getElementById('delete-restaurant-name').textContent = restaurant.name;
        document.getElementById('delete-modal').classList.remove('hidden');
    }

    /**
     * Delete restaurant
     */
    async deleteRestaurant() {
        if (this.currentEditIndex === -1) return;
        
        const restaurant = this.restaurants[this.currentEditIndex];
        this.restaurants.splice(this.currentEditIndex, 1);
        
        const commitMessage = `Delete restaurant: ${restaurant.name}`;
        const success = await this.saveRestaurants(commitMessage);
        
        if (success) {
            this.hideDeleteModal();
            this.renderRestaurants();
        } else {
            // Restore the restaurant if save failed
            this.restaurants.splice(this.currentEditIndex, 0, restaurant);
        }
    }

    /**
     * Validate the restaurant form
     */
    validateForm() {
        const requiredFields = ['name', 'description', 'address', 'priceRange'];
        let isValid = true;
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const value = field.value.trim();
            
            if (!value) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        // Validate URL if provided
        const websiteField = document.getElementById('website');
        const website = websiteField.value.trim();
        if (website) {
            try {
                new URL(website);
                websiteField.style.borderColor = '#ddd';
            } catch {
                websiteField.style.borderColor = '#e74c3c';
                isValid = false;
            }
        }
        
        return isValid;
    }

    /**
     * Download backup of current data
     */
    downloadBackup() {
        const data = {
            timestamp: new Date().toISOString(),
            restaurants: this.restaurants
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vienna-ramen-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccess('Backup downloaded successfully!');
    }

    /**
     * UI Helper Methods
     */
    showSetupSection() {
        document.getElementById('setup-section').classList.remove('hidden');
        document.getElementById('manager-section').classList.add('hidden');
    }

    showManagerSection() {
        document.getElementById('setup-section').classList.add('hidden');
        document.getElementById('manager-section').classList.remove('hidden');
    }

    showModal() {
        document.getElementById('restaurant-modal').classList.remove('hidden');
        document.getElementById('name').focus();
    }

    hideModal() {
        document.getElementById('restaurant-modal').classList.add('hidden');
        this.currentEditIndex = -1;
    }

    showDeleteModal() {
        // Already handled in showDeleteModal(index)
    }

    hideDeleteModal() {
        document.getElementById('delete-modal').classList.add('hidden');
        this.currentEditIndex = -1;
    }

    showLoading(message) {
        this.isLoading = true;
        const loading = document.getElementById('loading');
        loading.querySelector('i').nextSibling.textContent = ` ${message}`;
        loading.classList.remove('hidden');
    }

    hideLoading() {
        this.isLoading = false;
        document.getElementById('loading').classList.add('hidden');
    }

    showError(message) {
        document.getElementById('error-text').textContent = message;
        document.getElementById('error-message').classList.remove('hidden');
        setTimeout(() => this.hideError(), 5000);
    }

    hideError() {
        document.getElementById('error-message').classList.add('hidden');
    }

    showSuccess(message) {
        document.getElementById('success-text').textContent = message;
        document.getElementById('success-message').classList.remove('hidden');
        setTimeout(() => this.hideSuccess(), 3000);
    }

    hideSuccess() {
        document.getElementById('success-message').classList.add('hidden');
    }

    updateLastSync() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('last-sync').textContent = `Last sync: ${timeString}`;
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * UTF-8 safe base64 encoding
     * Handles Unicode characters that btoa() cannot encode
     */
    encodeUTF8ToBase64(str) {
        // Convert string to UTF-8 bytes, then to base64
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
        }));
    }
}

// Initialize the Restaurant Manager when DOM is loaded
let restaurantManager;

document.addEventListener('DOMContentLoaded', () => {
    restaurantManager = new RestaurantManager();
});