const CATALOG_STORAGE_KEY = 'uniaoProductCatalogV1';
const ADMIN_PASSCODE_KEY = 'uniaoAdminPasscodeV1';
const ADMIN_SESSION_KEY = 'uniaoAdminSessionV1';
const DEFAULT_PASSCODE = 'UniaoAdmin@2026';

const CATEGORY_LABELS = {
    sisal: 'Sisal Fiber',
    coffee: 'Coffee & Tea',
    grains: 'Grains',
    fruits: 'Fruits',
    nuts: 'Nuts',
    spices: 'Spices & Herbs',
    vegetables: 'Vegetables',
    oils: 'Essential Oils',
    other: 'Other Products'
};

let catalog = [];

document.addEventListener('DOMContentLoaded', async () => {
    bindAuth();
    bindDashboardEvents();

    if (sessionStorage.getItem(ADMIN_SESSION_KEY) === '1') {
        unlockDashboard();
    }

    await ensureCatalogSeeded();
    renderCatalog();
    resetForm();
});

function bindAuth() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('adminPasscode').value;
        const saved = localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_PASSCODE;

        if (input === saved) {
            sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
            unlockDashboard();
            notify('Dashboard unlocked.', 'success');
            loginForm.reset();
        } else {
            notify('Invalid passcode.', 'error');
        }
    });
}

function unlockDashboard() {
    document.getElementById('authOverlay').classList.add('hidden-admin');
    document.getElementById('adminApp').classList.remove('hidden-admin');
}

function bindDashboardEvents() {
    document.getElementById('refreshListBtn').addEventListener('click', () => {
        loadCatalog();
        renderCatalog();
        notify('List refreshed.', 'success');
    });

    document.getElementById('newProductBtn').addEventListener('click', () => {
        resetForm();
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        location.reload();
    });

    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct();
    });

    document.getElementById('deleteProductBtn').addEventListener('click', () => {
        const id = document.getElementById('productId').value;
        if (!id) {
            notify('Select a product first.', 'error');
            return;
        }

        catalog = catalog.filter(item => item.id !== id);
        persistCatalog();
        renderCatalog();
        resetForm();
        notify('Product deleted.', 'success');
    });

    document.getElementById('resetFormBtn').addEventListener('click', () => {
        resetForm();
    });

    document.getElementById('productImage').addEventListener('input', updatePreview);

    document.getElementById('passcodeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const current = document.getElementById('currentPasscode').value;
        const next = document.getElementById('newPasscode').value;
        const saved = localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_PASSCODE;

        if (current !== saved) {
            notify('Current passcode is incorrect.', 'error');
            return;
        }

        if (next.length < 6) {
            notify('Use at least 6 characters.', 'error');
            return;
        }

        localStorage.setItem(ADMIN_PASSCODE_KEY, next);
        document.getElementById('passcodeForm').reset();
        notify('Passcode updated.', 'success');
    });
}

function normalizeCategory(value) {
    const cleaned = String(value || '').toLowerCase().trim();
    return CATEGORY_LABELS[cleaned] ? cleaned : 'other';
}

async function ensureCatalogSeeded() {
    loadCatalog();
    if (catalog.length > 0) return;

    try {
        const response = await fetch('products.html');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const cards = doc.querySelectorAll('.product-card');

        catalog = Array.from(cards).map((card, index) => {
            const name = card.querySelector('.product-title')?.textContent?.trim() || `Product ${index + 1}`;
            return {
                id: `prod-${index + 1}`,
                name,
                category: normalizeCategory(card.getAttribute('data-category')),
                description: card.querySelector('.product-description')?.textContent?.trim() || '',
                image: card.querySelector('img')?.getAttribute('src') || '',
                imageAlt: card.querySelector('img')?.getAttribute('alt') || name,
                price: ''
            };
        });

        persistCatalog();
    } catch (error) {
        notify('Could not seed products. Open products page once, then return here.', 'error');
    }
}

function loadCatalog() {
    try {
        const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        catalog = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        catalog = [];
    }
}

function persistCatalog() {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
}

function renderCatalog() {
    const list = document.getElementById('productList');
    const stats = document.getElementById('catalogStats');

    if (!list) return;

    const grouped = {};
    catalog.forEach(item => {
        const c = normalizeCategory(item.category);
        grouped[c] = (grouped[c] || 0) + 1;
    });

    stats.textContent = `${catalog.length} products loaded`;

    const rows = catalog
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(item => {
            const thumb = item.image || 'https://placehold.co/120x90?text=No+Image';
            return `
                <div class="admin-row" data-id="${escapeHTML(item.id)}">
                    <img class="admin-thumb" src="${escapeHTML(thumb)}" alt="${escapeHTML(item.imageAlt || item.name)}">
                    <div class="admin-meta">
                        <h4>${escapeHTML(item.name)}</h4>
                        <p><span class="badge">${escapeHTML(CATEGORY_LABELS[normalizeCategory(item.category)] || 'Other')}</span> ${item.price ? ` | ${escapeHTML(item.price)}` : ''}</p>
                    </div>
                    <div class="admin-actions">
                        <button class="btn btn-outline btn-small" data-action="edit" data-id="${escapeHTML(item.id)}"><i class="fas fa-pen"></i></button>
                    </div>
                </div>`;
        })
        .join('');

    list.innerHTML = rows || '<p style="padding:12px;">No products found.</p>';

    list.querySelectorAll('[data-action="edit"]').forEach(button => {
        button.addEventListener('click', () => {
            const product = catalog.find(item => item.id === button.getAttribute('data-id'));
            if (product) populateForm(product);
        });
    });
}

function populateForm(product) {
    document.getElementById('editorTitle').textContent = `Edit: ${product.name}`;
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = normalizeCategory(product.category);
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productImage').value = product.image || '';
    document.getElementById('productImageAlt').value = product.imageAlt || product.name;
    document.getElementById('productPrice').value = product.price || '';
    updatePreview();
}

function resetForm() {
    document.getElementById('editorTitle').textContent = 'Edit Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    updatePreview();
}

function saveProduct() {
    const id = document.getElementById('productId').value || `prod-${Date.now()}`;
    const payload = {
        id,
        name: document.getElementById('productName').value.trim(),
        category: normalizeCategory(document.getElementById('productCategory').value),
        description: document.getElementById('productDescription').value.trim(),
        image: document.getElementById('productImage').value.trim(),
        imageAlt: document.getElementById('productImageAlt').value.trim(),
        price: document.getElementById('productPrice').value.trim()
    };

    const existingIndex = catalog.findIndex(item => item.id === id);
    if (existingIndex >= 0) {
        catalog[existingIndex] = payload;
    } else {
        catalog.push(payload);
    }

    persistCatalog();
    renderCatalog();
    populateForm(payload);
    notify('Product saved. Changes are live on Products and Quote pages.', 'success');
}

function updatePreview() {
    const img = document.getElementById('imagePreview');
    const text = document.getElementById('previewText');
    const src = document.getElementById('productImage').value.trim();

    if (!src) {
        img.style.display = 'none';
        text.style.display = 'block';
        text.textContent = 'Image preview will appear here.';
        return;
    }

    img.src = src;
    img.style.display = 'block';
    text.style.display = 'none';
}

function notify(message, type = 'success') {
    const colors = {
        success: '#2d6a4f',
        error: '#b00020'
    };

    const el = document.createElement('div');
    el.style.cssText = `position:fixed;top:90px;right:20px;background:${colors[type] || colors.success};color:#fff;padding:12px 16px;border-radius:10px;z-index:4000;box-shadow:0 8px 20px rgba(0,0,0,.2);font-family:Poppins,sans-serif;`;
    el.textContent = message;
    document.body.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 2500);
}

function escapeHTML(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
