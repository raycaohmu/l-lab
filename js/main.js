// L-Lab Research Platform - Main JavaScript Functions

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Set colors based on type
    const colors = {
        success: { bg: '#27ae60', text: '#fff' },
        error: { bg: '#e74c3c', text: '#fff' },
        warning: { bg: '#f39c12', text: '#fff' },
        info: { bg: '#3498db', text: '#fff' }
    };
    
    const color = colors[type] || colors.info;
    
    toast.style.cssText = `
        background: ${color.bg};
        color: ${color.text};
        padding: 12px 20px;
        border-radius: 4px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-size: 14px;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        pointer-events: auto;
        cursor: pointer;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    toast.textContent = message;
    
    // Add click to dismiss
    toast.addEventListener('click', function() {
        hideToast(toast);
    });
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        hideToast(toast);
    }, 3000);
}

function hideToast(toast) {
    if (toast && toast.parentNode) {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// Global state and data
let currentUser = null;
let isLoggedIn = false;
let comments = [];
let researchData = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateDateTime();
    loadInitialContent();
    setInterval(updateDateTime, 1000);
});

// Application initialization
function initializeApp() {
    console.log('L-Lab Research Platform initializing...');
    
    // Initialize event listeners
    setupEventListeners();
    
    // Load user session if exists
    loadUserSession();
    
    // Initialize real-time features
    initializeRealTimeFeatures();
    
    // Initialize create buttons
    initializeCreateButtons();
    
    console.log('L-Lab Platform initialized successfully');
}

// Setup main event listeners
function setupEventListeners() {
    // Navigation events
    document.addEventListener('click', handleNavigationClick);
    
    // Modal close events
    document.addEventListener('click', handleModalClose);
    
    // Form submission events
    document.addEventListener('submit', handleFormSubmission);
    
    // Window events
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleScroll);
}

// Handle navigation clicks
function handleNavigationClick(event) {
    if (event.target.matches('.main-nav a')) {
        event.preventDefault();
        const section = event.target.textContent;
        navigateToSection(section);
    }
}

// Navigation function
function navigateToSection(section) {
    console.log(`Navigating to: ${section}`);
    
    // Remove active class from all nav links
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    const activeLink = Array.from(document.querySelectorAll('.main-nav a'))
        .find(link => link.textContent.includes(section));
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update content based on section
    updateMainContent(section);
    
    // Load section-specific content
    loadSectionSpecificContent(section);
    
    // Show toast notification
    showToast(`Switched to ${section} section`, 'success');
}

// Update main content based on section
function updateMainContent(section) {
    const featuredArticle = document.querySelector('.featured-article');
    if (!featuredArticle) return;
    
    const sectionContent = {
        'Research': {
            category: 'Featured Research',
            title: 'Digital pathology analysis reveals immune checkpoint inhibitor resistance mechanisms in non-small cell lung cancer',
            subtitle: 'A comprehensive computational framework for understanding acquired resistance through spatial tumor microenvironment analysis'
        },
        'Methods': {
            category: 'Methodology',
            title: 'Advanced machine learning algorithms for biomarker discovery in cancer research',
            subtitle: 'Novel approaches to identify prognostic and predictive biomarkers using multi-omics data integration'
        },
        'Data': {
            category: 'Data Science',
            title: 'Large-scale genomic data analysis reveals new therapeutic targets',
            subtitle: 'Comprehensive analysis of TCGA and GEO datasets using cloud computing infrastructure'
        },
        'Tools': {
            category: 'Research Tools',
            title: 'L-Lab Toolkit: Open-source software for digital pathology analysis',
            subtitle: 'User-friendly tools for researchers to analyze histopathological images and clinical data'
        },
        'About': {
            category: 'About L-Lab',
            title: 'Leading innovation in AI-driven biomedical research',
            subtitle: 'Our mission to advance precision medicine through cutting-edge computational biology'
        }
    };
    
    const content = sectionContent[section] || sectionContent['Research'];
    
    // Update article content
    const categoryEl = featuredArticle.querySelector('.article-category');
    const titleEl = featuredArticle.querySelector('.article-title');
    const subtitleEl = featuredArticle.querySelector('.article-subtitle');
    
    if (categoryEl) categoryEl.textContent = content.category;
    if (titleEl) titleEl.textContent = content.title;
    if (subtitleEl) subtitleEl.textContent = content.subtitle;
    
    // Add fade-in animation
    featuredArticle.classList.add('fade-in');
}

// Date and time updates
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('en-US', options);
    
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = dateString;
    }
    
    // Update weather info periodically
    if (now.getMinutes() % 30 === 0 && now.getSeconds() === 0) {
        updateWeatherInfo();
    }
}

// Weather information update
function updateWeatherInfo() {
    const temperatures = ['18°C', '19°C', '20°C', '21°C', '22°C', '23°C', '24°C'];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
    
    const tempElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('weather-condition');
    
    if (tempElement) {
        tempElement.textContent = temperatures[Math.floor(Math.random() * temperatures.length)];
    }
    
    if (conditionElement) {
        conditionElement.textContent = conditions[Math.floor(Math.random() * conditions.length)];
    }
}

// Load initial content
function loadInitialContent() {
    loadArticleContent();
    loadSidebarContent();
    loadCommentsContent();
    loadArticleStats();
}

// Load article content
function loadArticleContent() {
    const metaContainer = document.querySelector('.article-meta');
    const abstractContainer = document.querySelector('.article-abstract');
    const readMoreContainer = document.querySelector('.read-more');
    
    if (metaContainer) {
        metaContainer.innerHTML = `
            <div class="author-info">
                <div class="author-avatar">LC</div>
                <span>Dr. Lei Cao, Prof. Sarah Johnson</span>
            </div>
            <span>Published June 15, 2025</span>
            <span>DOI: 10.1000/xyz123</span>
            <span>5 min read</span>
        `;
    }
    
    if (abstractContainer) {
        abstractContainer.textContent = `Immune checkpoint inhibitors have revolutionized cancer treatment, yet acquired resistance remains a significant challenge. This study presents a novel computational framework combining digital pathology, spatial transcriptomics, and machine learning to identify resistance mechanisms in non-small cell lung cancer patients...`;
    }
    
    if (readMoreContainer) {
        readMoreContainer.innerHTML = `
            Read Full Article <i class="fas fa-arrow-right"></i>
        `;
    }
}

// Load article statistics
function loadArticleStats() {
    const statsContainer = document.querySelector('.article-stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="stat-item" onclick="toggleStat(this)">
                <i class="fas fa-eye"></i>
                <span class="stat-number">2,847</span>
                <span>views</span>
            </div>
            <div class="stat-item" onclick="toggleStat(this)">
                <i class="fas fa-download"></i>
                <span class="stat-number">342</span>
                <span>downloads</span>
            </div>
            <div class="stat-item" onclick="toggleStat(this)">
                <i class="fas fa-quote-right"></i>
                <span class="stat-number">28</span>
                <span>citations</span>
            </div>
            <div class="stat-item" onclick="toggleStat(this)">
                <i class="fas fa-share-alt"></i>
                <span class="stat-number">156</span>
                <span>shares</span>
            </div>
            <div class="stat-item" onclick="toggleStat(this)">
                <i class="fas fa-thumbs-up"></i>
                <span class="stat-number">89</span>
                <span>likes</span>
            </div>
        `;
    }
}

// Toggle stat item active state
function toggleStat(element) {
    element.classList.toggle('active');
    
    // Simulate interaction
    const numberEl = element.querySelector('.stat-number');
    const currentValue = parseInt(numberEl.textContent.replace(',', ''));
    
    if (element.classList.contains('active')) {
        numberEl.textContent = (currentValue + 1).toLocaleString();
        showToast('Thank you for your interaction!', 'success');
    } else {
        numberEl.textContent = Math.max(0, currentValue - 1).toLocaleString();
    }
}

// Load sidebar content
function loadSidebarContent() {
    const sidebarContainer = document.querySelector('.sidebar-section');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <h3 class="sidebar-title">Research Highlights</h3>
            <div class="research-highlight">
                <div class="highlight-title">AI-Powered Drug Discovery</div>
                <div class="highlight-desc">Novel machine learning algorithms accelerate the identification of potential therapeutic compounds.</div>
            </div>
            <div class="research-highlight">
                <div class="highlight-title">Precision Medicine Initiative</div>
                <div class="highlight-desc">Personalized treatment strategies based on individual genomic profiles and biomarker analysis.</div>
            </div>
            <div class="research-highlight">
                <div class="highlight-title">Digital Pathology Platform</div>
                <div class="highlight-desc">Advanced image analysis tools for automated diagnosis and prognosis prediction.</div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-item-sidebar" onclick="animateStatCard(this)">
                    <span class="stat-number-sidebar">1,247</span>
                    <div class="stat-label">Publications</div>
                </div>
                <div class="stat-item-sidebar" onclick="animateStatCard(this)">
                    <span class="stat-number-sidebar">89</span>
                    <div class="stat-label">Projects</div>
                </div>
                <div class="stat-item-sidebar" onclick="animateStatCard(this)">
                    <span class="stat-number-sidebar">156</span>
                    <div class="stat-label">Collaborators</div>
                </div>
                <div class="stat-item-sidebar" onclick="animateStatCard(this)">
                    <span class="stat-number-sidebar">23</span>
                    <div class="stat-label">Awards</div>
                </div>
            </div>
            
            <h4 style="margin-top: 30px; margin-bottom: 16px; color: #1a1a1a;">Recent Publications</h4>
            <ul class="recent-articles">
                <li class="recent-article" onclick="selectArticle(this)">
                    <div class="recent-title">Machine learning in cancer genomics: applications and challenges</div>
                    <div class="recent-authors">Zhang, L., Smith, J., et al.</div>
                    <div class="recent-stats">
                        <span><i class="fas fa-eye"></i> 1,823</span>
                        <span><i class="fas fa-download"></i> 245</span>
                    </div>
                </li>
                <li class="recent-article" onclick="selectArticle(this)">
                    <div class="recent-title">Biomarker discovery using deep learning approaches</div>
                    <div class="recent-authors">Johnson, M., Brown, K., et al.</div>
                    <div class="recent-stats">
                        <span><i class="fas fa-eye"></i> 967</span>
                        <span><i class="fas fa-download"></i> 132</span>
                    </div>
                </li>
                <li class="recent-article" onclick="selectArticle(this)">
                    <div class="recent-title">Computational methods for drug repurposing</div>
                    <div class="recent-authors">Davis, R., Wilson, T., et al.</div>
                    <div class="recent-stats">
                        <span><i class="fas fa-eye"></i> 1,456</span>
                        <span><i class="fas fa-download"></i> 189</span>
                    </div>
                </li>
            </ul>
        `;
    }
}

// Animate stat card
function animateStatCard(element) {
    const numberEl = element.querySelector('.stat-number-sidebar');
    const currentValue = parseInt(numberEl.textContent);
    const increment = Math.floor(Math.random() * 5) + 1;
    
    numberEl.textContent = (currentValue + increment).toLocaleString();
    
    // Add a temporary animation class
    element.style.transform = 'scale(1.05)';
    setTimeout(() => {
        element.style.transform = '';
    }, 200);
}

// Select article
function selectArticle(element) {
    // Remove active class from all articles
    document.querySelectorAll('.recent-article').forEach(article => {
        article.style.backgroundColor = '';
    });
    
    // Highlight selected article
    element.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
    
    const title = element.querySelector('.recent-title').textContent;
    showToast(`Selected: ${title.substring(0, 30)}...`, 'success');
}

// Load comments content
function loadCommentsContent() {
    const commentsHeader = document.querySelector('.comments-header');
    if (commentsHeader) {
        commentsHeader.innerHTML = `
            <h3 class="comments-title">
                <i class="fas fa-comments"></i>
                Discussion (12)
            </h3>
            <button class="add-comment-btn" onclick="toggleCommentForm()">
                <i class="fas fa-plus"></i>
                Add Comment
            </button>
        `;
    }
    
    loadCommentsList();
    setupCommentForm();
}

// Load comments list
function loadCommentsList() {
    const sampleComments = [
        {
            id: 1,
            author: 'Dr. Emily Chen',
            avatar: 'EC',
            date: '2 hours ago',
            content: 'Excellent work! The spatial analysis approach is particularly innovative. Have you considered applying this to other cancer types?',
            likes: 12,
            replies: 3
        },
        {
            id: 2,
            author: 'Prof. Michael Rodriguez',
            avatar: 'MR',
            date: '5 hours ago',
            content: 'The computational framework shows great promise. I would be interested in collaborating on validation studies.',
            likes: 8,
            replies: 1
        },
        {
            id: 3,
            author: 'Dr. Sarah Kim',
            avatar: 'SK',
            date: '1 day ago',
            content: 'Very comprehensive analysis. The machine learning models demonstrate impressive accuracy. Looking forward to the full publication.',
            likes: 15,
            replies: 2
        }
    ];
    
    const commentsList = document.getElementById('comments-list');
    if (commentsList) {
        commentsList.innerHTML = sampleComments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <div class="comment-avatar">${comment.avatar}</div>
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <span class="comment-action" onclick="likeComment(${comment.id})">
                        <i class="fas fa-thumbs-up"></i> ${comment.likes}
                    </span>
                    <span class="comment-action" onclick="replyToComment(${comment.id})">
                        <i class="fas fa-reply"></i> Reply
                    </span>
                    <span class="comment-action">
                        <i class="fas fa-share"></i> Share
                    </span>
                </div>
            </div>
        `).join('');
    }
}

// Setup comment form
function setupCommentForm() {
    const commentsSection = document.getElementById('comments-section');
    if (commentsSection) {
        const commentFormHTML = `
            <div class="comment-form" id="comment-form">
                <textarea placeholder="Share your thoughts on this research..." rows="4"></textarea>
                <div class="comment-form-actions">
                    <button class="cancel-comment-btn" onclick="toggleCommentForm()">Cancel</button>
                    <button class="submit-comment-btn" onclick="submitComment()">
                        <i class="fas fa-paper-plane"></i> Post Comment
                    </button>
                </div>
            </div>
        `;
        commentsSection.insertAdjacentHTML('beforeend', commentFormHTML);
    }
}

// Real-time features initialization
function initializeRealTimeFeatures() {
    // Simulate real-time updates
    setInterval(() => {
        updateViewCount();
    }, 30000); // Update every 30 seconds
    
    // Simulate new comments
    setInterval(() => {
        if (Math.random() > 0.8) {
            simulateNewComment();
        }
    }, 60000); // Check every minute
}

// Update view count
function updateViewCount() {
    const viewStat = document.querySelector('.stat-item .fas.fa-eye')?.parentElement;
    if (viewStat) {
        const numberEl = viewStat.querySelector('.stat-number');
        const currentViews = parseInt(numberEl.textContent.replace(',', ''));
        const increment = Math.floor(Math.random() * 5) + 1;
        numberEl.textContent = (currentViews + increment).toLocaleString();
    }
}

// Simulate new comment
function simulateNewComment() {
    const commentsList = document.getElementById('comments-list');
    const commentsTitle = document.querySelector('.comments-title');
    
    if (commentsList && commentsTitle) {
        const newComment = `
            <div class="comment-item" style="background: rgba(231, 76, 60, 0.05); border-left: 3px solid var(--primary-color);">
                <div class="comment-header">
                    <div class="comment-avatar">RW</div>
                    <span class="comment-author">Dr. Robert Wilson</span>
                    <span class="comment-date">Just now</span>
                </div>
                <div class="comment-content">This research opens up new possibilities for personalized treatment approaches. Excited to see the clinical applications!</div>
                <div class="comment-actions">
                    <span class="comment-action" onclick="likeComment(999)">
                        <i class="fas fa-thumbs-up"></i> 0
                    </span>
                    <span class="comment-action" onclick="replyToComment(999)">
                        <i class="fas fa-reply"></i> Reply
                    </span>
                    <span class="comment-action">
                        <i class="fas fa-share"></i> Share
                    </span>
                </div>
            </div>
        `;
        
        commentsList.insertAdjacentHTML('afterbegin', newComment);
        
        // Update comment count
        const currentCount = parseInt(commentsTitle.textContent.match(/\d+/)[0]);
        commentsTitle.innerHTML = `
            <i class="fas fa-comments"></i>
            Discussion (${currentCount + 1})
        `;
        
        showToast('New comment added to the discussion!', 'success');
    }
}

// Handle window resize
function handleWindowResize() {
    // Adjust layout for different screen sizes
    const isMobile = window.innerWidth <= 768;
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
        if (isMobile) {
            mainContent.style.gridTemplateColumns = '1fr';
        } else {
            mainContent.style.gridTemplateColumns = '2fr 1fr';
        }
    }
}

// Handle scroll events
function handleScroll() {
    const header = document.querySelector('.main-header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    }
}

// User session management
function loadUserSession() {
    const savedUser = localStorage.getItem('llabUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateUIForLoggedInUser();
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
    const accessBtn = document.querySelector('.access-btn');
    const userMenu = document.getElementById('user-menu');
    
    if (accessBtn && isLoggedIn) {
        // Create user profile dropdown
        accessBtn.innerHTML = `
            <div class="user-profile-menu">
                <i class="fas fa-user"></i> ${currentUser?.name || 'User'}
                <i class="fas fa-chevron-down" style="margin-left: 5px; font-size: 10px;"></i>
                <div class="profile-dropdown" id="profile-dropdown">
                    <div class="profile-user-info">
                        <div class="profile-user-name">${currentUser?.name || 'User'}</div>
                        <div class="profile-user-role">${currentUser?.role || 'Member'}</div>
                    </div>
                    <button class="profile-dropdown-item" onclick="showUserDashboard()">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </button>
                    <button class="profile-dropdown-item" onclick="showUserContent()">
                        <i class="fas fa-file-alt"></i> My Content
                    </button>
                    <button class="profile-dropdown-item" onclick="showUserProfile()">
                        <i class="fas fa-user-edit"></i> Edit Profile
                    </button>
                    <button class="profile-dropdown-item" onclick="showUserSettings()">
                        <i class="fas fa-cog"></i> Settings
                    </button>
                    ${currentUser?.role === 'admin' ? `
                        <button class="profile-dropdown-item" onclick="showAdminPanel()">
                            <i class="fas fa-shield-alt"></i> Admin Panel
                        </button>
                    ` : ''}
                    <div style="border-top: 1px solid #e0e0e0; margin: 8px 0;"></div>
                    <button class="profile-dropdown-item" onclick="logout()" style="color: #e74c3c;">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        `;
        accessBtn.onclick = toggleProfileDropdown;
    }
    
    if (userMenu) {
        userMenu.style.display = isLoggedIn ? 'block' : 'none';
    }
    
    // Show create buttons for logged in users
    updateCreateButtonsVisibility();
}

// Show user dashboard
function showUserDashboard() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    
    // Create dashboard modal
    let modal = document.getElementById('user-dashboard-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'user-dashboard-modal';
        modal.className = 'login-modal';
        modal.innerHTML = `
            <div class="login-content" style="max-width: 800px;">
                <button class="close-btn" onclick="hideUserDashboard()">&times;</button>
                <div class="login-header">
                    <h2>Welcome back, ${currentUser?.firstName || 'User'}!</h2>
                    <p>Here's your activity summary and quick actions</p>
                </div>
                <div id="dashboard-content">
                    <!-- Dashboard content will be loaded here -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    loadDashboardContent();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideUserDashboard() {
    const modal = document.getElementById('user-dashboard-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function loadDashboardContent() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;
    
    // Get user statistics
    const userContent = JSON.parse(localStorage.getItem('llabUserContent') || '{}');
    const userContentCount = Object.values(userContent).flat().filter(content => content.author === currentUser?.name).length;
    
    const joinDate = new Date(currentUser?.joinDate || Date.now());
    const daysSinceJoin = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
    
    container.innerHTML = `
        <div class="dashboard-stats">
            <div class="stat-card">
                <div class="stat-number">${userContentCount}</div>
                <div class="stat-label">Content Created</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${daysSinceJoin}</div>
                <div class="stat-label">Days as Member</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${currentUser?.role || 'User'}</div>
                <div class="stat-label">Account Type</div>
            </div>
        </div>
        
        <div class="dashboard-section">
            <h3>Quick Actions</h3>
            <div class="quick-actions">
                <button class="action-btn" onclick="hideUserDashboard(); showUGCEditor();" style="background: var(--primary-color); color: white;">
                    <i class="fas fa-plus"></i> Create Content
                </button>
                <button class="action-btn" onclick="hideUserDashboard(); showUserContent();" style="background: #3498db; color: white;">
                    <i class="fas fa-file-alt"></i> My Content
                </button>
                <button class="action-btn" onclick="hideUserDashboard(); showUserProfile();" style="background: #27ae60; color: white;">
                    <i class="fas fa-user-edit"></i> Edit Profile
                </button>
            </div>
        </div>
        
        <div class="dashboard-section">
            <h3>Account Information</h3>
            <div class="account-info">
                <div class="info-item">
                    <strong>Name:</strong> ${currentUser?.name || 'Not set'}
                </div>
                <div class="info-item">
                    <strong>Email:</strong> ${currentUser?.email || 'Not set'}
                </div>
                <div class="info-item">
                    <strong>Institution:</strong> ${currentUser?.institution || 'Not set'}
                </div>
                <div class="info-item">
                    <strong>Position:</strong> ${currentUser?.position || 'Not set'}
                </div>
                <div class="info-item">
                    <strong>Research Area:</strong> ${currentUser?.researchArea || 'Not set'}
                </div>
                <div class="info-item">
                    <strong>Member Since:</strong> ${joinDate.toLocaleDateString()}
                </div>
            </div>
        </div>
    `;
}

// Profile dropdown toggle function
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profileMenu = document.querySelector('.user-profile-menu');
    const dropdown = document.getElementById('profile-dropdown');
    
    if (profileMenu && dropdown && !profileMenu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// User profile and settings functions
function showUserProfile() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    
    // Create user profile modal
    let modal = document.getElementById('user-profile-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'user-profile-modal';
        modal.className = 'login-modal';
        modal.innerHTML = `
            <div class="login-content" style="max-width: 600px;">
                <button class="close-btn" onclick="hideUserProfile()">&times;</button>
                <div class="login-header">
                    <h2>Edit Profile</h2>
                    <p>Update your profile information and research interests</p>
                </div>
                <form id="profile-form" onsubmit="handleProfileUpdate(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="profile-first-name">First Name</label>
                            <input type="text" id="profile-first-name" name="firstName" value="${currentUser?.firstName || ''}" required>
                        </div>
                        <div class="form-group">
                            <label for="profile-last-name">Last Name</label>
                            <input type="text" id="profile-last-name" name="lastName" value="${currentUser?.lastName || ''}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="profile-email">Email Address</label>
                        <input type="email" id="profile-email" name="email" value="${currentUser?.email || ''}" readonly style="background: #f5f5f5;">
                    </div>
                    <div class="form-group">
                        <label for="profile-institution">Institution</label>
                        <input type="text" id="profile-institution" name="institution" value="${currentUser?.institution || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="profile-position">Position</label>
                        <select id="profile-position" name="position" required>
                            <option value="">Select your position...</option>
                            <option value="Professor" ${currentUser?.position === 'Professor' ? 'selected' : ''}>Professor</option>
                            <option value="Associate Professor" ${currentUser?.position === 'Associate Professor' ? 'selected' : ''}>Associate Professor</option>
                            <option value="Assistant Professor" ${currentUser?.position === 'Assistant Professor' ? 'selected' : ''}>Assistant Professor</option>
                            <option value="Postdoc" ${currentUser?.position === 'Postdoc' ? 'selected' : ''}>Postdoctoral Researcher</option>
                            <option value="PhD Student" ${currentUser?.position === 'PhD Student' ? 'selected' : ''}>PhD Student</option>
                            <option value="Research Scientist" ${currentUser?.position === 'Research Scientist' ? 'selected' : ''}>Research Scientist</option>
                            <option value="Research Associate" ${currentUser?.position === 'Research Associate' ? 'selected' : ''}>Research Associate</option>
                            <option value="Clinician" ${currentUser?.position === 'Clinician' ? 'selected' : ''}>Clinician</option>
                            <option value="Data Scientist" ${currentUser?.position === 'Data Scientist' ? 'selected' : ''}>Data Scientist</option>
                            <option value="Industry Professional" ${currentUser?.position === 'Industry Professional' ? 'selected' : ''}>Industry Professional</option>
                            <option value="Other" ${currentUser?.position === 'Other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="profile-research-area">Research Area</label>
                        <select id="profile-research-area" name="researchArea" required>
                            <option value="">Select your research area...</option>
                            <option value="Artificial Intelligence" ${currentUser?.researchArea === 'Artificial Intelligence' ? 'selected' : ''}>Artificial Intelligence</option>
                            <option value="Machine Learning" ${currentUser?.researchArea === 'Machine Learning' ? 'selected' : ''}>Machine Learning</option>
                            <option value="Bioinformatics" ${currentUser?.researchArea === 'Bioinformatics' ? 'selected' : ''}>Bioinformatics</option>
                            <option value="Computational Biology" ${currentUser?.researchArea === 'Computational Biology' ? 'selected' : ''}>Computational Biology</option>
                            <option value="Digital Pathology" ${currentUser?.researchArea === 'Digital Pathology' ? 'selected' : ''}>Digital Pathology</option>
                            <option value="Medical Imaging" ${currentUser?.researchArea === 'Medical Imaging' ? 'selected' : ''}>Medical Imaging</option>
                            <option value="Genomics" ${currentUser?.researchArea === 'Genomics' ? 'selected' : ''}>Genomics</option>
                            <option value="Drug Discovery" ${currentUser?.researchArea === 'Drug Discovery' ? 'selected' : ''}>Drug Discovery</option>
                            <option value="Clinical Research" ${currentUser?.researchArea === 'Clinical Research' ? 'selected' : ''}>Clinical Research</option>
                            <option value="Public Health" ${currentUser?.researchArea === 'Public Health' ? 'selected' : ''}>Public Health</option>
                            <option value="Other" ${currentUser?.researchArea === 'Other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="profile-bio">Bio / About</label>
                        <textarea id="profile-bio" name="bio" rows="4" placeholder="Tell us about your research interests and background...">${currentUser?.bio || ''}</textarea>
                    </div>
                    <button type="submit" class="login-btn">
                        <span class="btn-text">Update Profile</span>
                        <span class="loading" style="display: none;"></span>
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideUserProfile() {
    const modal = document.getElementById('user-profile-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function handleProfileUpdate(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.login-btn');
    
    // Show loading state
    setLoadingState(submitBtn, true);
    
    setTimeout(() => {
        try {
            // Update current user object
            const updatedUser = {
                ...currentUser,
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                institution: formData.get('institution'),
                position: formData.get('position'),
                researchArea: formData.get('researchArea'),
                bio: formData.get('bio'),
                profileComplete: true,
                lastUpdated: new Date().toISOString()
            };
            
            currentUser = updatedUser;
            localStorage.setItem('llabUser', JSON.stringify(currentUser));
            
            // Update in users array if it exists
            const users = JSON.parse(localStorage.getItem('llabUsers') || '[]');
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('llabUsers', JSON.stringify(users));
            }
            
            // Update UI
            updateUIForLoggedInUser();
            
            // Hide modal
            hideUserProfile();
            
            showToast('Profile updated successfully!', 'success');
            
        } catch (error) {
            console.error('Profile update error:', error);
            showToast('Failed to update profile. Please try again.', 'error');
        }
        
        setLoadingState(submitBtn, false);
    }, 1500);
}

function showUserSettings() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    
    showToast('User settings feature coming soon!', 'info');
}

// Initialize create buttons functionality
function initializeCreateButtons() {
    console.log('Initializing create buttons...');
    
    // Show/hide create buttons based on login status
    updateCreateButtonsVisibility();
    
    // Add floating action button if it doesn't exist
    addFloatingActionButton();
}

// Update create buttons visibility based on login status
function updateCreateButtonsVisibility() {
    const headerCreateBtn = document.getElementById('header-create-btn');
    const floatingCreateBtn = document.getElementById('floating-create-btn');
    
    if (isLoggedIn) {
        if (headerCreateBtn) headerCreateBtn.style.display = 'flex';
        if (floatingCreateBtn) floatingCreateBtn.style.display = 'flex';
    } else {
        if (headerCreateBtn) headerCreateBtn.style.display = 'none';
        if (floatingCreateBtn) floatingCreateBtn.style.display = 'none';
    }
}

// Add floating action button dynamically
function addFloatingActionButton() {
    if (document.getElementById('floating-create-btn')) return; // Already exists
    
    const floatingBtn = document.createElement('div');
    floatingBtn.id = 'floating-create-btn';
    floatingBtn.className = 'floating-create-btn';
    floatingBtn.style.display = isLoggedIn ? 'flex' : 'none';
    floatingBtn.innerHTML = `
        <i class="fas fa-plus"></i>
    `;
    floatingBtn.onclick = toggleCreateMenu;
    
    document.body.appendChild(floatingBtn);
}

// Toggle create menu visibility
function toggleCreateMenu() {
    const createMenu = document.getElementById('create-menu');
    if (!createMenu) {
        createCreateMenu();
        return;
    }
    
    if (createMenu.style.display === 'none' || createMenu.style.display === '') {
        showCreateMenu();
    } else {
        hideCreateMenu();
    }
}

// Show create menu
function showCreateMenu() {
    let createMenu = document.getElementById('create-menu');
    if (!createMenu) {
        createCreateMenu();
        createMenu = document.getElementById('create-menu');
    }
    
    createMenu.style.display = 'block';
    createMenu.style.opacity = '0';
    createMenu.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        createMenu.style.opacity = '1';
        createMenu.style.transform = 'translateY(0)';
    }, 10);
}

// Hide create menu
function hideCreateMenu() {
    const createMenu = document.getElementById('create-menu');
    if (createMenu) {
        createMenu.style.opacity = '0';
        createMenu.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            createMenu.style.display = 'none';
        }, 200);
    }
}

// Create the create menu dynamically
function createCreateMenu() {
    if (document.getElementById('create-menu')) return; // Already exists
    
    const createMenu = document.createElement('div');
    createMenu.id = 'create-menu';
    createMenu.className = 'create-menu';
    createMenu.style.display = 'none';
    
    createMenu.innerHTML = `
        <button class="create-menu-item" onclick="showUGCEditor('', 'blog'); hideCreateMenu();">
            <i class="fas fa-pen-fancy" style="color: #3498db;"></i>
            <div class="item-info">
                <div class="item-title">Write Blog</div>
                <div class="item-desc">Share insights and research findings</div>
            </div>
        </button>
        
        <button class="create-menu-item" onclick="showUGCEditor('', 'tutorial'); hideCreateMenu();">
            <i class="fas fa-chalkboard-teacher" style="color: #9b59b6;"></i>
            <div class="item-info">
                <div class="item-title">Create Tutorial</div>
                <div class="item-desc">Step-by-step guides and how-tos</div>
            </div>
        </button>
        
        <button class="create-menu-item" onclick="showUGCEditor('', 'documentation'); hideCreateMenu();">
            <i class="fas fa-file-alt" style="color: #f39c12;"></i>
            <div class="item-info">
                <div class="item-title">Add Documentation</div>
                <div class="item-desc">Technical docs and manuals</div>
            </div>
        </button>
        
        <div class="create-menu-divider"></div>
        
        <button class="create-menu-item" onclick="showUGCEditor('', 'code'); hideCreateMenu();">
            <i class="fas fa-code" style="color: #27ae60;"></i>
            <div class="item-info">
                <div class="item-title">Share Code</div>
                <div class="item-desc">Upload code examples and scripts</div>
            </div>
        </button>
        
        <button class="create-menu-item" onclick="showUGCEditor('', 'dataset'); hideCreateMenu();">
            <i class="fas fa-database" style="color: #e67e22;"></i>
            <div class="item-info">
                <div class="item-title">Share Dataset</div>
                <div class="item-desc">Upload research data and samples</div>
            </div>
        </button>
    `;
    
    document.body.appendChild(createMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!createMenu.contains(event.target) && 
            !event.target.closest('.floating-create-btn') && 
            !event.target.closest('.header-create-btn')) {
            hideCreateMenu();
        }
    });
}

// Toggle profile dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';
    }
}

// Close profile dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profile-dropdown');
    const profileMenu = document.querySelector('.user-profile-menu');
    
    if (dropdown && profileMenu && 
        !profileMenu.contains(event.target) && 
        !event.target.closest('.user-profile-menu')) {
        dropdown.style.display = 'none';
    }
});

// Logout function
function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('llab-current-user');
    localStorage.removeItem('llab-user-session');
    
    // Reset UI
    const accessBtn = document.querySelector('.access-btn');
    if (accessBtn) {
        accessBtn.innerHTML = `
            <i class="fas fa-key"></i>
            Access Tutorials
        `;
        accessBtn.onclick = showLogin;
    }
    
    // Hide user-specific elements
    updateCreateButtonsVisibility();
    
    // Hide user menu
    const userMenu = document.getElementById('user-menu');
    if (userMenu) userMenu.style.display = 'none';
    
    // Show success message
    showToast('Successfully logged out', 'success');
    
    console.log('User logged out successfully');
}

// Admin panel function
function showAdminPanel() {
    if (currentUser?.role !== 'admin') {
        showToast('Access denied. Admin privileges required.', 'error');
        return;
    }
    
    // Hide profile dropdown
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    
    // Check if UGC admin panel function exists
    if (typeof showAdminDashboard === 'function') {
        showAdminDashboard();
    } else {
        showToast('Admin panel is being prepared...', 'info');
        // Create a simple admin panel if the full one doesn't exist
        createSimpleAdminPanel();
    }
}

function createSimpleAdminPanel() {
    // Create admin modal
    let modal = document.getElementById('admin-panel-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'admin-panel-modal';
        modal.className = 'login-modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="login-content" style="max-width: 600px;">
                <button class="close-btn" onclick="document.getElementById('admin-panel-modal').style.display='none'">&times;</button>
                <h2><i class="fas fa-shield-alt"></i> Admin Panel</h2>
                <div style="padding: 20px;">
                    <h3>System Overview</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <strong>Total Users</strong><br>
                            <span style="font-size: 24px; color: #3498db;">3</span>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <strong>Active Sessions</strong><br>
                            <span style="font-size: 24px; color: #27ae60;">1</span>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <strong>Platform Status</strong><br>
                            <span style="color: #27ae60;">Online</span>
                        </div>
                    </div>
                    <h3>Quick Actions</h3>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0;">
                        <button class="btn" onclick="showToast('Feature coming soon!', 'info')" style="background: #3498db; color: white; border: none; padding: 8px 16px; border-radius: 4px;">View Logs</button>
                        <button class="btn" onclick="showToast('System backup initiated', 'success')" style="background: #27ae60; color: white; border: none; padding: 8px 16px; border-radius: 4px;">Backup Data</button>
                        <button class="btn" onclick="showToast('Settings panel coming soon!', 'info')" style="background: #f39c12; color: white; border: none; padding: 8px 16px; border-radius: 4px;">Settings</button>
                    </div>
                    <p style="color: #666; font-size: 14px; margin-top: 20px;">
                        <i class="fas fa-info-circle"></i> This is a simplified admin panel. Full admin features are available in the UGC management system.
                    </p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.style.display = 'flex';
    }
}
