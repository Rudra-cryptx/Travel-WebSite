// Mock Data (Initial State)
const initialPackages = [
    {
        id: 'pkg-1',
        title: 'Classic Dubai | City Safari',
        destination: 'Dubai',
        duration: '6 Days & 5 Nights',
        price: 45000,
        originalPrice: 60000,
        rating: 4.8,
        reviews: 1420,
        image: 'IMAGES/dubai_1.png'
    },
    {
        id: 'pkg-2',
        title: 'Vietnam Couple EXCLUSIVE',
        destination: 'Vietnam',
        duration: '7 Days & 6 Nights',
        price: 15999,
        originalPrice: 25999,
        rating: 4.8,
        reviews: 543,
        image: 'IMAGES/vietnam_1.png'
    },
    {
        id: 'pkg-3',
        title: 'Best of Italy | Rome & Florence',
        destination: 'Europe',
        duration: '8 Days & 7 Nights',
        price: 74500,
        originalPrice: 90000,
        rating: 4.8,
        reviews: 890,
        image: 'IMAGES/europe_2.png'
    },
    {
        id: 'pkg-4',
        title: 'Golden Route Japan',
        destination: 'Japan',
        duration: '10 Days & 9 Nights',
        price: 185000,
        originalPrice: 220000,
        rating: 4.9,
        reviews: 2200,
        image: 'IMAGES/japan_1.png'
    }
];

// App State
let packages = [];
let editingId = null;

// DOM Elements
const packagesTableBody = document.getElementById('packagesTableBody');
const totalPackagesCount = document.getElementById('totalPackagesCount');
const searchInput = document.getElementById('searchInput');

// Modal Elements - Package Modal
const packageModal = document.getElementById('packageModal');
const packageForm = document.getElementById('packageForm');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const addPackageBtn = document.getElementById('addPackageBtn');

// Modal Elements - Delete Modal
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
let deletingId = null;

// Initialize Admin Panel
function init() {
    // Load from LocalStorage or use initial
    const stored = localStorage.getItem('mahakal_packages');
    if (stored) {
        packages = JSON.parse(stored);
    } else {
        packages = [...initialPackages];
        savePackages();
    }
    
    renderTable();
    setupEventListeners();
}

function savePackages() {
    localStorage.setItem('mahakal_packages', JSON.stringify(packages));
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN').format(price);
}

// Render Data Table
function renderTable(filterText = '') {
    packagesTableBody.innerHTML = '';
    
    let filteredPackages = packages;
    if (filterText) {
        const lowerFilter = filterText.toLowerCase();
        filteredPackages = packages.filter(p => 
            p.title.toLowerCase().includes(lowerFilter) || 
            p.destination.toLowerCase().includes(lowerFilter)
        );
    }

    totalPackagesCount.innerText = packages.length;

    if (filteredPackages.length === 0) {
        packagesTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-light);">No packages found.</td></tr>`;
        return;
    }

    filteredPackages.forEach(pkg => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="pkg-img-cell">
                    <img src="${pkg.image}" alt="${pkg.destination}" class="pkg-thumb" onerror="this.src='https://via.placeholder.com/60x45?text=Img'">
                    <div>
                        <div class="pkg-title">${pkg.title}</div>
                        <div class="pkg-dest">${pkg.destination}</div>
                    </div>
                </div>
            </td>
            <td>${pkg.duration}</td>
            <td><strong>₹${formatPrice(pkg.price)}</strong></td>
            <td>
                <span class="rating-badge">
                    <ion-icon name="star"></ion-icon> ${pkg.rating}
                </span>
                <span style="font-size: 12px; color: var(--text-light); margin-left: 5px;">(${pkg.reviews})</span>
            </td>
            <td>
                <button class="btn-icon btn-edit" onclick="openEditModal('${pkg.id}')" title="Edit">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
                <button class="btn-icon btn-delete" onclick="openDeleteModal('${pkg.id}')" title="Delete">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>
        `;
        packagesTableBody.appendChild(tr);
    });
}

// Event Listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        renderTable(e.target.value);
    });

    // Modals interactions
    addPackageBtn.addEventListener('click', () => {
        editingId = null;
        packageForm.reset();
        modalTitle.innerText = "Add New Package";
        openModal(packageModal);
    });

    closeModalBtn.addEventListener('click', () => closeModal(packageModal));
    cancelModalBtn.addEventListener('click', () => closeModal(packageModal));
    
    cancelDeleteBtn.addEventListener('click', () => closeModal(deleteModal));

    // Form Submit
    packageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        savePackage();
    });

    // Handle Confirm Delete
    confirmDeleteBtn.addEventListener('click', () => {
        if (deletingId) {
            packages = packages.filter(p => p.id !== deletingId);
            savePackages();
            renderTable(searchInput.value);
            closeModal(deleteModal);
        }
    });

    // Close Modals on overlay click
    window.addEventListener('click', (e) => {
        if (e.target === packageModal) closeModal(packageModal);
        if (e.target === deleteModal) closeModal(deleteModal);
    });
}

// Modal Utility Functions
function openModal(modal) {
    modal.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
}

// Global functions for inline onclick handlers
window.openEditModal = function(id) {
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;

    editingId = id;
    modalTitle.innerText = "Edit Package";
    
    document.getElementById('packageTitle').value = pkg.title;
    document.getElementById('packageDestination').value = pkg.destination;
    document.getElementById('packageDuration').value = pkg.duration;
    document.getElementById('packagePrice').value = pkg.price;
    document.getElementById('packageOriginalPrice').value = pkg.originalPrice;
    document.getElementById('packageRating').value = pkg.rating;
    document.getElementById('packageReviews').value = pkg.reviews;
    document.getElementById('packageImage').value = pkg.image;

    openModal(packageModal);
};

window.openDeleteModal = function(id) {
    deletingId = id;
    openModal(deleteModal);
};

function savePackage() {
    const newPackage = {
        title: document.getElementById('packageTitle').value,
        destination: document.getElementById('packageDestination').value,
        duration: document.getElementById('packageDuration').value,
        price: Number(document.getElementById('packagePrice').value),
        originalPrice: Number(document.getElementById('packageOriginalPrice').value),
        rating: Number(document.getElementById('packageRating').value),
        reviews: Number(document.getElementById('packageReviews').value),
        image: document.getElementById('packageImage').value
    };

    if (editingId) {
        // Update existing
        newPackage.id = editingId;
        const index = packages.findIndex(p => p.id === editingId);
        if (index !== -1) {
            packages[index] = newPackage;
        }
    } else {
        // Add new
        newPackage.id = 'pkg-' + Date.now();
        packages.unshift(newPackage);
    }

    savePackages();
    renderTable(searchInput.value);
    closeModal(packageModal);
}

// Start
init();
