let products = [
    {
        id: 1,
        name: "Recycled Plastic Garden Planters",
        price: 29.99,
        category: "plastic",
        description: "Beautiful planters made from 100% recycled plastic bottles. Weather-resistant and perfect for both indoor and outdoor use.",
        seller: "GreenThumb Creations",
        image: "images/planter.png"
    },
    {
        id: 2,
        name: "Upcycled Denim Tote Bags",
        price: 24.99,
        category: "fabric",
        description: "Stylish tote bags crafted from repurposed denim jeans. Each bag is unique with original stitching patterns.",
        seller: "Denim Dreams",
        image: "images/Denim-Tote-Bag.png"
    },
    {
        id: 3,
        name: "Recycled Metal Wind Chimes",
        price: 39.99,
        category: "metal",
        description: "Melodious wind chimes made from recycled aluminum cans and steel scraps. Creates beautiful sounds in any breeze.",
        seller: "MetalCraft Studios",
        image: "images/Metal-Wind-Chimes.png"
    },
    {
        id: 4,
        name: "Glass Bottle Vases",
        price: 19.99,
        category: "glass",
        description: "Elegant vases created from repurposed wine and beer bottles. Perfect for home decoration or gifts.",
        seller: "Glass Artisan Co",
        image: "images/Glass-Bottle-Vases.png"
    },
    {
        id: 5,
        name: "Plastic Bottle Bird Feeders",
        price: 15.99,
        category: "plastic",
        description: "Charming bird feeders made from recycled soda bottles. Help local wildlife while reducing waste.",
        seller: "Nature's Friend",
        image: "images/Plastic Bottle-Bird-Feeders.png"
    },
    {
        id: 6,
        name: "Fabric Scrap Quilts",
        price: 89.99,
        category: "fabric",
        description: "Cozy quilts made from fabric scraps and old clothes. Each quilt tells a unique story through its patches.",
        seller: "Quilted Memories",
        image: "images/fabric.png"
    }
];

let currentFilter = 'all';
let currentSearch = '';

document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    animateStats();
});

function setupEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.category;
            renderProducts();
        });
    });

    document.getElementById('searchInput').addEventListener('input', function() {
        currentSearch = this.value.toLowerCase();
        renderProducts();
    });

    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewProduct();
    });
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    let filteredProducts = products;

    if (currentFilter !== 'all') {
        filteredProducts = products.filter(p => p.category === currentFilter);
    }

    if (currentSearch) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(currentSearch) ||
            p.description.toLowerCase().includes(currentSearch) ||
            p.category.toLowerCase().includes(currentSearch)
        );
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-material">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="product-description">${product.description}</div>
                <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;"><h3>No products found</h3><p>Try adjusting your search or filters.</p></div>';
    }
}

function openSellerModal() {
    document.getElementById('sellerModal').style.display = 'flex';
}

function closeSellerModal() {
    document.getElementById('sellerModal').style.display = 'none';
    document.getElementById('productForm').reset();
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductContent').innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${product.image}" alt="${product.name}" style="width:120px; height:120px; object-fit:cover; border-radius:12px; margin-bottom:10px;">
                <div style="font-size: 1.5rem; font-weight: bold; color: #4CAF50;">$${product.price}</div>
                <div style="background: #e8f5e8; color: #2d5a2d; padding: 5px 15px; border-radius: 20px; display: inline-block; margin: 10px 0;">
                    ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
            </div>
            <p style="margin-bottom: 15px;">${product.description}</p>
            <p style="margin-bottom: 20px; color: #666;"><strong>Seller:</strong> ${product.seller}</p>
            <button class="btn btn-primary" style="width: 100%;" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        document.getElementById('productModal').style.display = 'flex';
    }
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

function addNewProduct() {
    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        seller: document.getElementById('sellerName').value,
        image: "images/default.jpg" // Default image, update as needed
    };

    products.unshift(newProduct);
    renderProducts();
    closeSellerModal();
    alert('🎉 Product listed successfully! Your eco-friendly product is now available in the marketplace.');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`🛒 "${product.name}" added to your cart! Thanks for choosing eco-friendly products!`);
}

function animateStats() {
    const stats = [
        { id: 'wasteReduced', target: 2450 },
        { id: 'productsListed', target: 15678 },
        { id: 'happyCustomers', target: 8342 }
    ];

    stats.forEach(stat => {
        let current = 0;
        const increment = stat.target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
            }
            document.getElementById(stat.id).textContent = Math.floor(current).toLocaleString();
        }, 20);
    });
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('seller-modal')) {
        closeSellerModal();
    }
    if (e.target.classList.contains('product-modal')) {
        closeProductModal();
    }
});