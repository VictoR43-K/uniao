// ===================================
// MODERN PREMIUM WEBSITE JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

const CATALOG_STORAGE_KEY = 'uniaoProductCatalogV1';
const TAWK_PROPERTY_ID = '69b281889dd4d71c370f2a92';
const TAWK_WIDGET_ID = 'default';
const DESCRIPTION_SUFFIX_BY_CATEGORY = {
    sisal: ' Carefully processed for high tensile strength and consistency, ideal for ropes, twines, and industrial export supply.',
    coffee: ' Carefully sourced and graded to maintain aroma, flavor consistency, and reliable bulk export quality.',
    grains: ' Cleaned and sorted for dependable food-grade quality, suitable for wholesale buyers and international shipment.',
    fruits: ' Selected for freshness and export readiness, with careful handling to preserve taste and shelf life in transit.',
    nuts: ' Sorted and quality-checked for size and taste consistency, ideal for wholesale packing and food processing.',
    spices: ' Clean and aromatic batches prepared for culinary and processing use, with stable quality for bulk procurement.',
    vegetables: ' Freshly sourced with strict quality checks, suitable for local distribution and large-volume supply contracts.',
    oils: ' Processed to consistent quality standards and packaged for dependable wholesale and export distribution.',
    other: ' Prepared with consistent quality control and reliable documentation for wholesale and export orders.'
};
const PRODUCT_USE_CASE_BY_CATEGORY = {
    sisal: ['rope manufacturing', 'twine production', 'industrial fiber applications'],
    coffee: ['retail roasting programs', 'bulk export contracts', 'specialty and commercial blends'],
    grains: ['food processing lines', 'wholesale distribution', 'institutional supply contracts'],
    fruits: ['fresh produce retail', 'food service supply', 'processing and export channels'],
    nuts: ['snack processing', 'bakery production', 'bulk ingredient supply'],
    spices: ['seasoning blends', 'food manufacturing', 'hospitality and catering use'],
    vegetables: ['fresh market distribution', 'hospitality kitchens', 'institutional procurement'],
    oils: ['cooking oil distribution', 'food manufacturing', 'private label packing'],
    other: ['wholesale procurement', 'processing lines', 'export supply chains']
};
const PRODUCT_QUALITY_TRAITS = [
    'consistent grading',
    'reliable lot quality',
    'careful post-harvest handling',
    'traceable sourcing',
    'export-ready preparation',
    'stable supply planning'
];
const PRODUCT_HANDCRAFTED_DESCRIPTIONS = {
    'UG Grade Sisal Fiber': 'Top-grade UG sisal fiber with strong, uniform strands and excellent durability. Ideal for premium rope, twine, and industrial packaging applications where consistency matters.',
    'SSUG Grade Sisal Fiber': 'Premium SSUG sisal fiber selected for cleaner texture, high strength, and superior finishing. Preferred by buyers requiring refined export-grade natural fiber performance.',
    'Sisal Yarn': 'Natural sisal yarn spun for dependable tensile performance and smooth handling. Suitable for weaving, baling, craft manufacturing, and commercial twine production.',
    'Arabica Coffee': 'High-quality Arabica beans with balanced acidity, clean cup profile, and rich aroma. Prepared for specialty roasters, café chains, and premium export buyers.',
    'Robusta Coffee': 'Strong-bodied Robusta coffee with bold flavor and reliable caffeine content. Excellent for blends, instant coffee production, and large-scale commercial roasting.',
    'Kenya Tea': 'Premium Kenyan black tea known for bright liquor, brisk character, and consistent leaf quality. Suitable for packers, blenders, and international tea distributors.',
    'Rice': 'Carefully milled rice with clean grains, low impurities, and dependable cooking performance. Ideal for wholesalers, retailers, and institutional food supply programs.',
    'Wheat': 'Food-grade wheat selected for uniform kernel size and stable processing quality. Well-suited for flour mills, bakery production, and long-term bulk procurement.',
    'Maize': 'Premium maize grain with consistent grading and reliable moisture standards. Suitable for food processing, milling operations, and large wholesale distribution.',
    'Barley': 'Quality barley grain with strong consistency for feed, malt, and food use. Prepared for dependable supply to processors and export-oriented buyers.',
    'Sorghum': 'Clean sorghum grain with good uniformity and reliable nutritional value. Appropriate for food products, feed programs, and regional export contracts.',
    'Millet': 'Nutritious millet grain with carefully sorted lots and stable market quality. Suitable for healthy food brands, processors, and bulk distribution channels.',
    'Oats': 'Wholesome oats with consistent grain quality for flakes, cereals, and food manufacturing. Ideal for retail packaging, ingredient supply, and export trade.',
    'Rye': 'Premium rye grain prepared for reliable milling and processing outcomes. Best for flour blending, bakery use, and specialty grain procurement.',
    'Quinoa': 'High-quality quinoa with clean grading and export-ready handling standards. Suitable for health-focused brands, food processors, and wholesale importers.',
    'Lentil': 'Carefully sorted lentils with uniform size and dependable cooking quality. Ideal for packaged food suppliers, distributors, and institutional buyers.',
    'Chickpea': 'Quality chickpeas selected for consistency, appearance, and processing performance. Well-suited for canning, flour production, and wholesale distribution.',
    'Pea': 'Clean dried peas prepared to stable quality standards for food and ingredient supply. Suitable for processors, packers, and large-scale procurement programs.'
};
const PRODUCT_IMAGE_MIGRATIONS = {
    'UG Grade Sisal Fiber': 'images/sisal%20fiber.webp',
    'Sisal Yarn': 'images/sisal%20yarn.webp',
    'Apple': 'images/apple.webp',
    'Arabica Coffee': 'images/Arabica%20coffee.webp',
    'Avocado': 'images/avocado.webp',
    'Banana': 'images/banana.webp',
    'Robusta Coffee': 'images/Robusta%20coffee.webp',
    'Blackberry': 'images/blackberry.webp',
    'Blueberry': 'images/blueberry.webp',
    'Rice': 'images/Rice.webp',
    'Wheat': 'images/Wheat.webp',
    'Maize': 'images/maize.webp',
    'Barley': 'images/Barley.webp',
    'Cherry': 'images/cherry.webp',
    'Chickpea': 'images/chickpea.webp',
    'Coconut': 'images/coconut.webp',
    'Date': 'images/date.webp',
    'Grapefruit': 'images/grapefruit.webp',
    'Guava': 'images/guava.webp',
    'Lemon': 'images/lemon.webp',
    'Lentil': 'images/lentil.webp',
    'Lime': 'images/lime.webp',
    'Mango': 'images/mango.webp',
    'Millet': 'images/millet.webp',
    'Oats': 'images/oats.webp',
    'Orange': 'images/orange.webp',
    'Papaya': 'images/papaya.webp',
    'Pea': 'images/pea.webp',
    'Peach': 'images/peach.webp',
    'Pear': 'images/pear.webp',
    'Pineapple': 'images/pineapple.webp',
    'Plum': 'images/plum.webp',
    'Quinoa': 'images/quinoa.webp',
    'Raisin': 'images/raisin.webp',
    'Rye': 'images/rye.webp',
    'Sorghum': 'images/sorghum.webp',
    'Strawberry': 'images/strawberry.webp',
    'Tangerine': 'images/tangerine.webp'
};
const CATEGORY_LABELS = {
    all: 'All Products',
    sisal: 'Sisal Fiber Products',
    coffee: 'Coffee & Tea',
    grains: 'Grains',
    fruits: 'Fruits',
    nuts: 'Nuts',
    spices: 'Spices & Herbs',
    vegetables: 'Vegetables',
    oils: 'Essential Oils',
    other: 'Other Products'
};

// Main initialization function
function initializeWebsite() {
    initCatalogSync();
    initTawkToLiveChat();
    hideLoadingScreen();
    initNavigation();
    initThemeToggle();
    initScrollEffects();
    initProductFilters();
    initCounterAnimation();
    initFormHandling();
    prefillQuoteFromQuery();

    const runDeferredEnhancements = () => {
        initParticles();
        initTestimonials();
        initScrollAnimations();
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(runDeferredEnhancements, { timeout: 1200 });
    } else {
        setTimeout(runDeferredEnhancements, 200);
    }
}

function initTawkToLiveChat() {
    const propertyId = String(TAWK_PROPERTY_ID || '').trim();
    const widgetId = String(TAWK_WIDGET_ID || 'default').trim() || 'default';

    if (!propertyId) return;

    const loadTawkScript = () => {
        if (document.getElementById('tawkto-script')) return;

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        window.Tawk_API.customStyle = {
            visibility: {
                desktop: {
                    position: 'bl',
                    xOffset: 24,
                    yOffset: 112
                },
                mobile: {
                    position: 'bl',
                    xOffset: 20,
                    yOffset: 102
                }
            }
        };
        window.Tawk_API.onLoad = function() {
            if (typeof window.Tawk_API.addEvent === 'function') {
                window.Tawk_API.addEvent('site_visit', {
                    page: window.location.pathname,
                    title: document.title,
                    referrer: document.referrer || 'direct'
                });
            }
        };

        const script = document.createElement('script');
        script.id = 'tawkto-script';
        script.async = true;
        script.src = `https://embed.tawk.to/${encodeURIComponent(propertyId)}/${encodeURIComponent(widgetId)}`;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.head.appendChild(script);
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadTawkScript, { timeout: 2000 });
    } else {
        setTimeout(loadTawkScript, 600);
    }
}

function normalizeCategory(value) {
    const cleaned = String(value || '')
        .toLowerCase()
        .trim()
        .replace(/\s*&\s*/g, '-')
        .replace(/\s+/g, '-');

    if (!cleaned) return 'other';

    if (CATEGORY_LABELS[cleaned]) return cleaned;
    if (cleaned.includes('spice') || cleaned.includes('herb')) return 'spices';
    if (cleaned.includes('oil')) return 'oils';
    if (cleaned.includes('grain') || cleaned.includes('bean')) return 'grains';
    if (cleaned.includes('fruit')) return 'fruits';
    if (cleaned.includes('nut')) return 'nuts';
    if (cleaned.includes('sisal')) return 'sisal';
    if (cleaned.includes('coffee') || cleaned.includes('tea')) return 'coffee';
    if (cleaned.includes('vegetable')) return 'vegetables';

    return 'other';
}

function getCategoryLabel(category) {
    return CATEGORY_LABELS[normalizeCategory(category)] || 'Other Products';
}

function escapeHTML(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttribute(text) {
    return escapeHTML(text).replace(/`/g, '&#96;');
}

function getJpegFallbackPath(imagePath) {
    const source = String(imagePath || '');
    if (!source) return '';
    return source.replace(/\.webp(\?.*)?$/i, '.jpeg$1');
}

function applyImageFallback(imgElement, preferredSrc) {
    if (!imgElement) return;

    const fallbackSrc = getJpegFallbackPath(preferredSrc);
    if (fallbackSrc && fallbackSrc !== preferredSrc) {
        imgElement.onerror = () => {
            if (imgElement.dataset.fallbackApplied === '1') return;
            imgElement.dataset.fallbackApplied = '1';
            imgElement.src = fallbackSrc;
        };
    } else {
        imgElement.onerror = null;
    }
}

function deterministicChoice(seed, options) {
    const source = String(seed || 'product');
    if (!Array.isArray(options) || options.length === 0) return '';
    let hash = 0;
    for (let index = 0; index < source.length; index += 1) {
        hash = ((hash << 5) - hash) + source.charCodeAt(index);
        hash |= 0;
    }
    const normalized = Math.abs(hash);
    return options[normalized % options.length];
}

function buildUniqueDescriptionAddon(name, category) {
    const normalizedCategory = normalizeCategory(category);
    const trait = deterministicChoice(`${name}-trait`, PRODUCT_QUALITY_TRAITS) || 'reliable quality';
    const useCase = deterministicChoice(
        `${name}-use`,
        PRODUCT_USE_CASE_BY_CATEGORY[normalizedCategory] || PRODUCT_USE_CASE_BY_CATEGORY.other
    ) || 'bulk procurement';

    return ` Features ${trait} and is best suited for ${useCase}.`;
}

function expandProductDescription(name, description, category) {
    const normalizedCategory = normalizeCategory(category);
    const suffix = DESCRIPTION_SUFFIX_BY_CATEGORY[normalizedCategory] || DESCRIPTION_SUFFIX_BY_CATEGORY.other;
    const exportPhrase = 'best suited for';
    const productName = String(name || 'Product').trim() || 'Product';
    const handcrafted = PRODUCT_HANDCRAFTED_DESCRIPTIONS[productName];

    if (handcrafted) {
        return handcrafted;
    }

    let base = String(description || '').trim();

    Object.values(DESCRIPTION_SUFFIX_BY_CATEGORY).forEach((legacySuffix) => {
        if (base.endsWith(legacySuffix)) {
            base = base.slice(0, -legacySuffix.length).trim();
        }
    });

    if (!base) {
        base = `${productName} offers reliable quality and consistent sourcing for professional buyers`;
    }

    if (base.toLowerCase().includes(exportPhrase) && base.length >= 160) {
        return base;
    }

    const baseWithPeriod = /[.!?]$/.test(base) ? base : `${base}.`;
    const uniqueAddon = buildUniqueDescriptionAddon(productName, normalizedCategory);
    return `${baseWithPeriod}${uniqueAddon}${suffix}`;
}

function extractCatalogFromProductsDOM() {
    const cards = document.querySelectorAll('.product-card');
    if (cards.length === 0) return [];

    const catalog = [];

    cards.forEach((card, index) => {
        const title = card.querySelector('.product-title')?.textContent?.trim() || `Product ${index + 1}`;
        const description = card.querySelector('.product-description')?.textContent?.trim() || '';
        const image = card.querySelector('img')?.getAttribute('src') || '';
        const alt = card.querySelector('img')?.getAttribute('alt') || title;
        const category = normalizeCategory(card.getAttribute('data-category'));

        catalog.push({
            id: `prod-${index + 1}`,
            name: title,
            description: expandProductDescription(title, description, category),
            image,
            imageAlt: alt,
            category,
            price: ''
        });
    });

    return catalog;
}

function getStoredCatalog() {
    try {
        const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) return null;
        return parsed;
    } catch (error) {
        return null;
    }
}

function setStoredCatalog(catalog) {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
}

function migrateCatalogData(catalog) {
    if (!Array.isArray(catalog) || catalog.length === 0) {
        return { catalog, changed: false };
    }

    let changed = false;
    const updatedCatalog = catalog.map(product => {
        let nextProduct = product;

        const localImagePath = PRODUCT_IMAGE_MIGRATIONS[product?.name];
        if (localImagePath && product?.image !== localImagePath) {
            changed = true;
            nextProduct = {
                ...nextProduct,
                image: localImagePath
            };
        }

        const expandedDescription = expandProductDescription(
            nextProduct?.name,
            nextProduct?.description,
            nextProduct?.category
        );

        if (expandedDescription !== (nextProduct?.description || '')) {
            changed = true;
            nextProduct = {
                ...nextProduct,
                description: expandedDescription
            };
        }

        return nextProduct;
    });

    return { catalog: updatedCatalog, changed };
}

function renderProductsGridFromCatalog(catalog) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid || !Array.isArray(catalog) || catalog.length === 0) return;

    const cardsMarkup = catalog.map(product => {
        const safeName = escapeHTML(product.name);
        const safeDescription = escapeHTML(
            expandProductDescription(product.name, product.description, product.category)
        );
        const safeImage = escapeAttribute(product.image || '');
        const safeAlt = escapeAttribute(product.imageAlt || product.name || 'Product image');
        const safeCategory = escapeAttribute(normalizeCategory(product.category));
        const safePrice = escapeHTML(product.price || '');
        const quoteName = (product.name || '').replace(/'/g, "\\'");
        const priceMarkup = safePrice ? `<p class="product-price">${safePrice}</p>` : '';

        return `<div class="product-card" data-category="${safeCategory}">`
            + `<div class="product-image"><img src="${safeImage}" alt="${safeAlt}" loading="lazy" decoding="async"></div>`
            + `<div class="product-info">`
            + `<h3 class="product-title">${safeName}</h3>`
            + `<p class="product-description">${safeDescription}</p>`
            + priceMarkup
            + `<button class="btn btn-outline btn-small" onclick="getQuote('${quoteName}')"><i class="fas fa-paper-plane"></i> Get Quote</button>`
            + `</div></div>`;
    }).join('');

    productsGrid.innerHTML = cardsMarkup;
    productsGrid.querySelectorAll('img').forEach((img) => {
        applyImageFallback(img, img.getAttribute('src') || '');
    });
}

function applyCatalogToExistingProductsDOM(catalog) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid || !Array.isArray(catalog) || catalog.length === 0) return false;

    const cards = productsGrid.querySelectorAll('.product-card');
    if (cards.length === 0) return false;

    const productByName = new Map(catalog.map(product => [String(product.name || '').trim(), product]));

    cards.forEach(card => {
        const titleElement = card.querySelector('.product-title');
        if (!titleElement) return;

        const productName = String(titleElement.textContent || '').trim();
        const product = productByName.get(productName);
        if (!product) return;

        const normalizedCategory = normalizeCategory(product.category);
        card.setAttribute('data-category', normalizedCategory);

        const imageElement = card.querySelector('img');
        if (imageElement) {
            imageElement.src = product.image || imageElement.src;
            imageElement.alt = product.imageAlt || product.name || imageElement.alt;
            imageElement.loading = 'lazy';
            imageElement.decoding = 'async';
            applyImageFallback(imageElement, imageElement.src);
        }

        const descriptionElement = card.querySelector('.product-description');
        if (descriptionElement) {
            descriptionElement.textContent = expandProductDescription(
                product.name,
                product.description,
                product.category
            );
        }

        let priceElement = card.querySelector('.product-price');
        const hasPrice = Boolean(product.price && String(product.price).trim());
        if (hasPrice) {
            if (!priceElement) {
                priceElement = document.createElement('p');
                priceElement.className = 'product-price';
                const infoContainer = card.querySelector('.product-info');
                const quoteButton = infoContainer?.querySelector('.btn');
                if (infoContainer) {
                    if (quoteButton) {
                        infoContainer.insertBefore(priceElement, quoteButton);
                    } else {
                        infoContainer.appendChild(priceElement);
                    }
                }
            }

            if (priceElement) {
                priceElement.textContent = product.price;
            }
        } else if (priceElement) {
            priceElement.remove();
        }
    });

    return true;
}

function syncQuoteOptionsFromCatalog(catalog) {
    const productSelect = document.getElementById('product');
    if (!productSelect || !Array.isArray(catalog) || catalog.length === 0) return;

    const grouped = {};
    catalog.forEach(product => {
        const category = normalizeCategory(product.category);
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(product);
    });

    const orderedCategories = Object.keys(CATEGORY_LABELS).filter(key => key !== 'all' && grouped[key]);

    let markup = '<option value="">Select a product</option>';
    orderedCategories.forEach(category => {
        const label = getCategoryLabel(category);
        markup += `<optgroup label="${escapeAttribute(label)}">`;
        grouped[category]
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(product => {
                markup += `<option value="${escapeAttribute(product.name)}">${escapeHTML(product.name)}</option>`;
            });
        markup += '</optgroup>';
    });

    productSelect.innerHTML = markup;
}

function initCatalogSync() {
    const hasProductsGrid = Boolean(document.getElementById('productsGrid'));
    const hasQuoteSelect = Boolean(document.getElementById('product'));
    if (!hasProductsGrid && !hasQuoteSelect) return;

    let catalog = getStoredCatalog();

    if (!catalog && hasProductsGrid) {
        catalog = extractCatalogFromProductsDOM();
        if (catalog.length > 0) {
            setStoredCatalog(catalog);
        }
    }

    if (!catalog || catalog.length === 0) return;

    const migrationResult = migrateCatalogData(catalog);
    catalog = migrationResult.catalog;
    if (migrationResult.changed) {
        setStoredCatalog(catalog);
    }

    if (hasProductsGrid) {
        const updatedInPlace = applyCatalogToExistingProductsDOM(catalog);
        if (!updatedInPlace) {
            renderProductsGridFromCatalog(catalog);
        }
    }

    if (hasQuoteSelect) {
        syncQuoteOptionsFromCatalog(catalog);
    }
}

// ===================================
// LOADING SCREEN
// ===================================
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 150);
}

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const hashNavLinks = Array.from(navLinks).filter(link => link.getAttribute('href').startsWith('#'));

    if (!navbar || !hamburger || !navMenu) return;

    // Sticky navbar on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active navigation link based on scroll position
    if (hashNavLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            hashNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// THEME TOGGLE (Dark/Light Mode)
// ===================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    if (!themeToggle) return;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add animation effect
        themeToggle.style.transform = 'scale(0.8) rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===================================
// SCROLL EFFECTS
// ===================================
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// PRODUCT FILTERS
// ===================================
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    const applyFilter = (filter) => {
        const targetFilter = (filter || 'all').toLowerCase();
        const targetButton = Array.from(filterButtons).find(
            btn => btn.getAttribute('data-filter') === targetFilter
        );

        if (!targetButton) {
            return;
        }

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        targetButton.classList.add('active');

        // Filter products with animation
        productCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');

            if (targetFilter === 'all' || category === targetFilter) {
                setTimeout(() => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            applyFilter(filter);

            if (window.location.hash !== `#${filter}`) {
                history.replaceState(null, '', `#${filter}`);
            }
        });
    });

    const hashFilter = window.location.hash.replace('#', '').toLowerCase();
    if (hashFilter) {
        applyFilter(hashFilter);
    }

    window.addEventListener('hashchange', () => {
        const updatedHashFilter = window.location.hash.replace('#', '').toLowerCase();
        applyFilter(updatedHashFilter || 'all');
    });
}

// ===================================
// COUNTER ANIMATION
// ===================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Trigger animation when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
}

// ===================================
// FORM HANDLING
// ===================================
function initFormHandling() {
    // Quote Form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmit);
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleQuoteSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Show success message
    showNotification('Thank you! Your quote request has been submitted. We\'ll contact you within 24 hours.', 'success');

    // Reset form
    e.target.reset();

    // In production, you would send data to server:
    // fetch('/api/quote', { method: 'POST', body: JSON.stringify(data) })
}

function handleNewsletterSubmit(e) {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;

    // Show success message
    showNotification('Thank you for subscribing to our newsletter!', 'success');

    // Reset form
    e.target.reset();

    // In production, send to server
}

// ===================================
// NOTIFICATIONS
// ===================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#2d6a4f' : '#d4a574'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="font-size: 24px;"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// PRODUCT QUICK VIEW
// ===================================
function openQuickView(productName) {
    showNotification(`Quick view for ${productName} - Feature coming soon!`, 'info');
}

// ===================================
// GET QUOTE FOR PRODUCT
// ===================================
function getQuote(productName) {
    const quoteSection = document.getElementById('quote');
    if (!quoteSection) {
        window.location.href = `quote.html?product=${encodeURIComponent(productName)}`;
        return;
    }

    // Scroll to quote form
    quoteSection.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        const productSelect = document.getElementById('product');
        selectProductOption(productSelect, productName);
    }, 800);
}

function selectProductOption(productSelect, productName) {
    if (!productSelect || !productName) return;

    const options = productSelect.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === productName) {
            productSelect.selectedIndex = i;
            productSelect.style.transition = 'all 0.3s';
            productSelect.style.boxShadow = '0 0 0 3px rgba(45, 106, 79, 0.3)';
            setTimeout(() => {
                productSelect.style.boxShadow = '';
            }, 1000);
            return;
        }
    }
}

function prefillQuoteFromQuery() {
    const productSelect = document.getElementById('product');
    if (!productSelect) return;

    const params = new URLSearchParams(window.location.search);
    const requestedProduct = params.get('product');
    if (!requestedProduct) return;

    selectProductOption(productSelect, requestedProduct);
}

// ===================================
// TESTIMONIAL CAROUSEL
// ===================================
function initTestimonials() {
    const carousel = document.getElementById('testimonialCarousel');
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');

    if (!carousel || !track || !dotsContainer) return;

    const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
    if (slides.length === 0) return;

    let currentIndex = 0;
    let intervalId = null;

    const render = () => {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const goTo = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        render();
    };

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    const startAuto = () => {
        stopAuto();
        intervalId = setInterval(next, 4500);
    };

    const stopAuto = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    if (nextBtn) nextBtn.addEventListener('click', () => {
        next();
        startAuto();
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prev();
        startAuto();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goTo(index);
            startAuto();
        });
    });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    render();
    startAuto();
}

// ===================================
// PARTICLES ANIMATION
// ===================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const startX = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${startX}%;
        top: 100%;
        animation: float ${duration}s linear ${delay}s infinite;
    `;

    container.appendChild(particle);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(`
        .why-us-card,
        .mvv-card,
        .contact-card,
        .feature-item
    `);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Optimize scroll events
const optimizedScroll = throttle(() => {
    // Your scroll logic here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🌱 Uniao Group Limited', 'color: #2d6a4f; font-size: 24px; font-weight: bold;');
console.log('%cPremium Agricultural Products from Kenya', 'color: #40916c; font-size: 14px;');
console.log('%cWebsite built with modern web technologies', 'color: #666; font-size: 12px;');

// ===================================
// EXPORT FOR GLOBAL ACCESS
// ===================================
window.openQuickView = openQuickView;
window.getQuote = getQuote;