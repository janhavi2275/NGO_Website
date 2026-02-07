/**
 * Component Loader (Local Compatibility Version)
 * Loads header and footer components using embedded JS strings
 * to work across all protocols including file://
 */

// Embedded HTML Content
const HEADER_HTML = `
<!-- Navigation -->
<nav class="navbar">
    <div class="container">
        <a href="../index.html" class="navbar-brand" id="navBrand">
            <i class="fas fa-hands-helping"></i> Navinya Foundation
        </a>
        <button class="navbar-toggler" id="navToggle">
            <i class="fas fa-bars"></i>
        </button>
        <ul class="navbar-nav" id="navMenu">
            <li><a href="../index.html" class="nav-link" id="navHome">Home</a></li>
            <li><a href="../pages/about.html" class="nav-link" id="navAbout">About Us</a></li>
            <li><a href="../pages/programs.html" class="nav-link" id="navPrograms">Programs</a></li>
            <li><a href="../pages/impact.html" class="nav-link" id="navImpact">Impact</a></li>
            <li><a href="../pages/blog.html" class="nav-link" id="navBlog">News</a></li>
            <li><a href="../pages/contact.html" class="nav-link" id="navContact">Contact</a></li>
            <li><a href="../pages/donate.html" class="btn btn-primary" id="navDonate">Donate Now</a></li>
        </ul>
    </div>
</nav>
`;

const FOOTER_HTML = `
<!-- Footer -->
<footer>
    <div class="container">
        <div class="footer-grid">
            <!-- About -->
            <div class="footer-section">
                <h4>Navinya Foundation</h4>
                <p>Creating new beginnings through education, empowerment, and sustainable development in rural
                    Maharashtra.</p>
                <div class="social-links">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                </div>
            </div>

            <!-- Quick Links -->
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="../pages/about.html">About Us</a></li>
                    <li><a href="../pages/impact.html">Our Impact</a></li>
                    <li><a href="../pages/blog.html">News & Updates</a></li>
                    <li><a href="../pages/resources.html">Resources</a></li>
                    <li><a href="../pages/contact.html">Contact Us</a></li>
                </ul>
            </div>

            <!-- Get Involved -->
            <div class="footer-section">
                <h4>Get Involved</h4>
                <ul>
                    <li><a href="../pages/donate.html">Donate</a></li>
                    <li><a href="../pages/volunteer.html">Volunteer</a></li>
                    <li><a href="../pages/partner.html">Partner With Us</a></li>
                    <li><a href="../pages/careers.html">Careers</a></li>
                    <li><a href="../pages/internships.html">Internships</a></li>
                </ul>
            </div>

            <!-- Contact Info -->
            <div class="footer-section">
                <h4>Contact Us</h4>
                <ul>
                    <li><i class="fas fa-map-marker-alt"></i> Shirpur, Dhule, Maharashtra 425405</li>
                    <li><i class="fas fa-phone"></i> +91-XXXXX-XXXXX</li>
                    <li><i class="fas fa-envelope"></i> info@navinyafoundation.org</li>
                </ul>
                <p class="mt-3"><strong>80G Registered</strong><br>Tax benefits on donations</p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2025 Navinya Foundation. All rights reserved. | <a href="../pages/privacy.html"
                    style="color: rgba(255,255,255,0.7);">Privacy Policy</a> | <a href="../pages/terms.html"
                    style="color: rgba(255,255,255,0.7);">Terms of Service</a></p>
        </div>
    </div>
</footer>
`;

// Function to load header
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = HEADER_HTML;
        fixNavigationLinks();
        initializeMobileMenu();
    }
}

// Function to load footer
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = FOOTER_HTML;
    }
}

// Function to fix navigation links based on page location
function fixNavigationLinks() {
    const currentPath = window.location.pathname;
    const atRoot = isRoot();

    if (atRoot) {
        // Fix header links for root page
        // Shared components use ../ index and ../pages/ links
        const navLinks = document.querySelectorAll('.nav-link, .navbar-brand');
        navLinks.forEach(link => {
            let href = link.getAttribute('href');
            if (href) {
                // Change ../pages/about.html to pages/about.html
                if (href.startsWith('../pages/')) {
                    link.setAttribute('href', href.replace('../', ''));
                }
                // Change ../index.html to index.html
                else if (href === '../index.html') {
                    link.setAttribute('href', 'index.html');
                }
            }
        });

        // Special handling for the Donate button which might have different formatting
        const donateBtn = document.getElementById('navDonate');
        if (donateBtn) {
            let href = donateBtn.getAttribute('href');
            if (href && href.startsWith('../')) {
                donateBtn.setAttribute('href', href.replace('../', ''));
            }
        }

        // Fix footer links for root page
        // The footer is now loaded directly, so we can query its content
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            const footerLinks = footerPlaceholder.querySelectorAll('a[href^="../"]');
            footerLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.setAttribute('href', href.replace('../', ''));
            });
        }
    }

    // Highlight active page
    highlightActivePage();
}

// Function to highlight the active page in navigation
function highlightActivePage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        if (!href) return;

        // Normalize href for comparison (remove ../ and ./ and target folders)
        const normalizedHref = href.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');

        // Check if we are at the root
        const isIndex = normalizedHref === 'index.html';
        const atRoot = isRoot();

        if ((isIndex && atRoot) ||
            (!isIndex && normalizedHref !== '' && (currentPath.endsWith(normalizedHref) || currentPath.includes('/' + normalizedHref)))) {
            link.classList.add('active');
        }
    });
}

// Helper to determine if we are at the root
function isRoot() {
    const path = window.location.pathname;
    return !path.includes('/pages/') && !path.includes('\\pages\\');
}

// Function to initialize mobile menu toggle
function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadHeader();
        loadFooter();
    });
} else {
    loadHeader();
    loadFooter();
}
