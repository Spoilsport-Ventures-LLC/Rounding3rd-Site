function loadFooter() {
    const footerHTML = `
    <footer>
        <div class="container footer-content">
            <div class="footer-brand">
                <span class="logo">Rounding Third</span>
                <p>Dating analytics for the modern era.</p>
            </div>

            <div class="footer-links">
                <div class="link-group">
                    <h4>Product</h4>
                    <a href="index.html">Home</a>
                    <a href="mailto:support@roundingthird.app">Support</a>
                </div>
                <div class="link-group">
                    <h4>Legal</h4>
                    <a href="tos.html">Terms</a>
                    <a href="privacy.html">Privacy</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Spoilsport Ventures LLC</p>
        </div>
    </footer>
    `;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    }
}

function loadHeader() {
    const headerHTML = `
    <nav>
        <div class="container nav-flex">
            <a href="index.html" class="logo">
                <img src="img/headerlogo.png" alt="Rounding Third Logo" class="nav-logo-img">
            </a>
            <div class="nav-links">
                <!-- TODO: Add download link once launched -->
                <a href="#">Download</a>
                <a href="tos.html">Terms</a>
                <a href="privacy.html">Privacy</a>
            </div>
        </div>
    </nav>
    `;

    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
});
