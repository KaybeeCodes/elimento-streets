// Franchise data
const franchises = [
    {
        id: 1,
        name: "McDonald's",
        image: "https://images.unsplash.com/photo-1619881590738-a111d176d906?auto=format&fit=crop&q=80&w=800",
        rating: 4.5,
        cuisine: "Fast Food",
        slots: 3,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M12 18h.01"/></svg>`,
        price: 5000,
        location: "Floor 1, Unit A101"
    },
    {
        id: 2,
        name: "Domino's",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=800",
        rating: 4.3,
        cuisine: "Pizza",
        slots: 2,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 14 2.5 2.5"/><path d="m14 8-2.5 2.5"/><path d="m10.5 8.5 3 3"/></svg>`,
        price: 6000,
        location: "Floor 1, Unit A102"
    },
    {
        id: 3,
        name: "Starbucks",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
        rating: 4.7,
        cuisine: "Coffee & Beverages",
        slots: 5,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`,
        price: 4000,
        location: "Floor 2, B201"
    }
];

// DOM Elements
const franchiseGrid = document.getElementById('franchiseGrid');
const searchInput = document.getElementById('searchInput');
const bookingModal = document.getElementById('bookingModal');
const modalLocation = document.getElementById('modalLocation');
const modalPrice = document.getElementById('modalPrice');

// Render franchise cards
function renderFranchises(franchisesToRender) {
    franchiseGrid.innerHTML = franchisesToRender.map(franchise => `
        <div class="franchise-card">
            <img src="${franchise.image}" alt="${franchise.name}" class="franchise-image">
            <div class="franchise-content">
                <div class="franchise-header">
                    <div class="franchise-title">
                        ${franchise.icon}
                        <span>${franchise.name}</span>
                    </div>
                    <div class="franchise-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span>${franchise.rating}</span>
                    </div>
                </div>
                <p class="franchise-details">${franchise.cuisine}</p>
                <div class="franchise-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>${franchise.location}</span>
                </div>
                <div class="franchise-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    <span>$${franchise.price}/month</span>
                </div>
                <div class="franchise-footer">
                    <span>${franchise.slots} slots available</span>
                    <button class="btn-primary" onclick="openModal(${franchise.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        Book Space
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredFranchises = franchises.filter(franchise => 
        franchise.name.toLowerCase().includes(searchTerm) ||
        franchise.cuisine.toLowerCase().includes(searchTerm)
    );
    renderFranchises(filteredFranchises);
});

// Modal functionality
function openModal(franchiseId) {
    const franchise = franchises.find(f => f.id === franchiseId);
    if (franchise) {
        modalLocation.textContent = franchise.location;
        modalPrice.textContent = `$${franchise.price}`;
        bookingModal.classList.add('active');
    }
}

function closeModal() {
    bookingModal.classList.remove('active');
}

function confirmBooking() {
    const startDate = document.getElementById('startDate').value;
    const duration = document.getElementById('duration').value;
    
    if (!startDate || !duration) {
        alert('Please fill in all fields');
        return;
    }
    
    alert('Booking confirmed! We will contact you shortly.');
    closeModal();
}

// Close modal when clicking outside
bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeModal();
    }
});

// Initial render
renderFranchises(franchises);
