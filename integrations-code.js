// Vienna Ramen Guide - Enhanced Restaurant System
// Created for RaggaeShark26 - 2025-07-28

// Your GitHub repository URL
const GITHUB_DATA_URL = 'https://raw.githubusercontent.com/RaggaeShark26/vienna-ramen-guide/main/restaurants.json';

// Fallback data (in case GitHub is unavailable)
const fallbackRestaurants = [
    {
        name: "Mochi Ramen Bar",
        tags: ["cozy", "authentic", "traditional"],
        description: "Authentic Japanese ramen in a warm, intimate setting with perfectly crafted broths and fresh noodles.",
        address: "Taborstraße 17, 1020 Wien",
        phone: "+43 1 234 5678",
        priceRange: "€€",
        openingHours: "Mo-Sa 11:30-22:00, So closed",
        website: "https://mochi-ramen.at",
        instagram: "mochi_ramen_vienna"
    },
    {
        name: "Maka Ramen",
        tags: ["modern", "fusion", "creative"],
        description: "Modern ramen shop with innovative fusion flavors and Instagram-worthy presentation.",
        address: "Gentzgasse 73, 1180 Wien",
        phone: "+43 1 987 6543",
        priceRange: "€€",
        openingHours: "Tu-Su 12:00-23:00, Mo closed",
        website: "https://maka-ramen.at",
        instagram: "maka_ramen"
    },
    {
        name: "Ramen Makotoya",
        tags: ["traditional", "authentic", "popular"],
        description: "Traditional ramen experience with rich, flavorful broths and handmade noodles.",
        address: "Windmühlgasse 26, 1060 Wien",
        phone: "+43 1 555 0123",
        priceRange: "€€€",
        openingHours: "Daily 11:30-22:30",
        website: "https://makotoya.at",
        instagram: "makotoya_vienna"
    }
];

// Load restaurants from GitHub or fallback
async function loadRestaurants() {
    try {
        console.log('🍜 Loading restaurants from GitHub...');
        const response = await fetch(GITHUB_DATA_URL);
        
        if (!response.ok) {
            throw new Error('GitHub data not available');
        }
        
        const data = await response.json();
        console.log('✅ Successfully loaded from GitHub!');
        return data.restaurants || data; // Handle both formats
        
    } catch (error) {
        console.log('⚠️ Using fallback data:', error.message);
        return fallbackRestaurants;
    }
}

// Generate restaurant cards
function generateRestaurantCards(restaurants) {
    const container = document.getElementById('restaurant-container');
    if (!container) {
        console.error('❌ Restaurant container not found!');
        return;
    }
    
    container.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <div class="card-content">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                
                <div class="tags">
                    ${restaurant.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                
                <p class="description">${restaurant.description}</p>
                
                <div class="restaurant-details">
                    <div class="detail-item">
                        <span class="icon">📍</span>
                        <a href="https://maps.google.com/maps?q=${encodeURIComponent(restaurant.address)}" target="_blank">
                            ${restaurant.address}
                        </a>
                    </div>
                    
                    <div class="detail-item">
                        <span class="icon">📞</span>
                        <span>${restaurant.phone}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="icon">💰</span>
                        <span>${restaurant.priceRange}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="icon">🕐</span>
                        <span>${restaurant.openingHours}</span>
                    </div>
                    
                    ${restaurant.website ? `
                    <div class="detail-item">
                        <span class="icon">🌐</span>
                        <a href="${restaurant.website}" target="_blank">Website</a>
                    </div>
                    ` : ''}
                    
                    ${restaurant.instagram ? `
                    <div class="detail-item">
                        <span class="icon">📱</span>
                        <a href="https://instagram.com/${restaurant.instagram}" target="_blank" class="instagram-link">
                            @${restaurant.instagram}
                        </a>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    console.log(`✅ Generated ${restaurants.length} restaurant cards!`);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🍜 Vienna Ramen Guide loading...');
    
    // Small delay to ensure other widgets load first
    setTimeout(async () => {
        const restaurants = await loadRestaurants();
        generateRestaurantCards(restaurants);
    }, 500);
});

// Make functions available globally
window.loadRestaurants = loadRestaurants;
window.generateRestaurantCards = generateRestaurantCards;
