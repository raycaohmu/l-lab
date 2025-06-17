// Modal Management Functions

// Login modal functions
function showLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        createLoginForm();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function hideLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Registration modal functions
function showRegistration() {
    let modal = document.getElementById('registration-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'registration-modal';
        modal.className = 'login-modal';
        modal.innerHTML = `
            <div class="login-content" style="max-width: 500px;">
                <!-- Content will be added by createRegistrationForm -->
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    createRegistrationForm();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 100);
}

function hideRegistration() {
    const modal = document.getElementById('registration-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function createLoginForm() {
    const loginContent = document.querySelector('.login-content');
    if (loginContent && !loginContent.hasChildNodes()) {
        loginContent.innerHTML = `
            <button class="close-btn" onclick="hideLogin()">&times;</button>
            <div class="login-header">
                <h2>Access Research Platform</h2>
                <p>Sign in to access full research content and collaborate with our team</p>
            </div>
            <form id="login-form" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required placeholder="Enter your password">
                </div>
                <button type="submit" class="login-btn">
                    <span class="btn-text">Sign In</span>
                    <span class="loading" style="display: none;"></span>
                </button>
            </form>
            <div style="text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-light);">
                <p>Demo credentials: admin@llab.com / admin123</p>
                <p>Don't have an account? <a href="#" onclick="hideLogin(); showRegistration();" style="color: var(--primary-color);">Create Free Account</a></p>
            </div>
        `;
    }
}

function createRegistrationForm() {
    const registrationContent = document.querySelector('#registration-modal .login-content');
    if (registrationContent) {
        registrationContent.innerHTML = `
            <button class="close-btn" onclick="hideRegistration()">&times;</button>
            <div class="login-header">
                <h2>Join L-Lab Platform</h2>
                <p>Create your free account to access full research content and collaborate with researchers worldwide</p>
            </div>
            <form id="registration-form" onsubmit="handleRegistration(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label for="reg-first-name">First Name</label>
                        <input type="text" id="reg-first-name" name="firstName" required placeholder="Enter your first name">
                    </div>
                    <div class="form-group">
                        <label for="reg-last-name">Last Name</label>
                        <input type="text" id="reg-last-name" name="lastName" required placeholder="Enter your last name">
                    </div>
                </div>
                <div class="form-group">
                    <label for="reg-email">Email Address</label>
                    <input type="email" id="reg-email" name="email" required placeholder="Enter your email address">
                </div>
                <div class="form-group">
                    <label for="reg-institution">Institution / Organization</label>
                    <input type="text" id="reg-institution" name="institution" required placeholder="University, Hospital, Research Center, etc.">
                </div>
                <div class="form-group">
                    <label for="reg-position">Position / Title</label>
                    <select id="reg-position" name="position" required>
                        <option value="">Select your position...</option>
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Postdoc">Postdoctoral Researcher</option>
                        <option value="PhD Student">PhD Student</option>
                        <option value="Research Scientist">Research Scientist</option>
                        <option value="Research Associate">Research Associate</option>
                        <option value="Clinician">Clinician</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Industry Professional">Industry Professional</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="reg-research-area">Primary Research Area</label>
                    <select id="reg-research-area" name="researchArea" required>
                        <option value="">Select your research area...</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Bioinformatics">Bioinformatics</option>
                        <option value="Computational Biology">Computational Biology</option>
                        <option value="Digital Pathology">Digital Pathology</option>
                        <option value="Medical Imaging">Medical Imaging</option>
                        <option value="Genomics">Genomics</option>
                        <option value="Drug Discovery">Drug Discovery</option>
                        <option value="Clinical Research">Clinical Research</option>
                        <option value="Public Health">Public Health</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="reg-password">Password</label>
                        <input type="password" id="reg-password" name="password" required placeholder="Create a password" minlength="8">
                    </div>
                    <div class="form-group">
                        <label for="reg-confirm-password">Confirm Password</label>
                        <input type="password" id="reg-confirm-password" name="confirmPassword" required placeholder="Confirm your password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="reg-terms" name="terms" required>
                        <span class="checkmark"></span>
                        I agree to the <a href="#" style="color: var(--primary-color);">Terms of Service</a> and <a href="#" style="color: var(--primary-color);">Privacy Policy</a>
                    </label>
                </div>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="reg-newsletter" name="newsletter">
                        <span class="checkmark"></span>
                        Subscribe to L-Lab newsletter for research updates and platform news
                    </label>
                </div>
                <button type="submit" class="login-btn">
                    <span class="btn-text">Create Account</span>
                    <span class="loading" style="display: none;"></span>
                </button>
            </form>
            <div style="text-align: center; margin-top: 20px; font-size: 14px; color: var(--text-light);">
                <p>Already have an account? <a href="#" onclick="hideRegistration(); showLogin();" style="color: var(--primary-color);">Sign In</a></p>
                <div style="margin-top: 10px; font-size: 12px; color: var(--text-light);">
                    <p>By creating an account, you join a community of 10,000+ researchers and gain access to cutting-edge research tools and collaboration opportunities.</p>
                </div>
            </div>
        `;
    }
}

// Enhanced login with better error handling
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const submitBtn = form.querySelector('.login-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loading = submitBtn.querySelector('.loading');
    
    // Clear previous error states
    clearFormErrors(form);
    
    // Validate inputs
    if (!email) {
        showFieldError(form.email, 'Email is required');
        return;
    }
    
    if (!validateEmail(email)) {
        showFieldError(form.email, 'Please enter a valid email address');
        return;
    }
    
    if (!password) {
        showFieldError(form.password, 'Password is required');
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, true);
    
    // Simulate authentication with better error handling
    setTimeout(() => {
        let loginSuccess = false;
        let user = null;
        let errorMessage = '';
        
        // Check demo accounts
        const demoAccounts = {
            'admin@llab.com': { password: 'admin123', role: 'admin', name: 'Dr. Admin' },
            'mod@llab.com': { password: 'mod123', role: 'moderator', name: 'Dr. Moderator' },
            'user@llab.com': { password: 'user123', role: 'user', name: 'Dr. User' }
        };
        
        if (demoAccounts[email] && demoAccounts[email].password === password) {
            user = {
                id: email,
                name: demoAccounts[email].name,
                email: email,
                role: demoAccounts[email].role,
                loginTime: new Date().toISOString()
            };
            loginSuccess = true;
        } else {
            // Check registered users
            const registeredUsers = JSON.parse(localStorage.getItem('llabUsers') || '[]');
            const foundUser = registeredUsers.find(u => u.email === email);
            
            if (foundUser) {
                if (foundUser.password === password) {
                    user = {
                        ...foundUser,
                        loginTime: new Date().toISOString()
                    };
                    loginSuccess = true;
                } else {
                    errorMessage = 'Incorrect password';
                }
            } else {
                errorMessage = 'No account found with this email address';
            }
        }
        
        if (loginSuccess) {
            // Successful login
            currentUser = user;
            isLoggedIn = true;
            
            // Update last login time for registered users
            if (!demoAccounts[email]) {
                const users = JSON.parse(localStorage.getItem('llabUsers') || '[]');
                const userIndex = users.findIndex(u => u.email === email);
                if (userIndex !== -1) {
                    users[userIndex].lastLogin = new Date().toISOString();
                    localStorage.setItem('llabUsers', JSON.stringify(users));
                }
            }
            
            // Save session
            localStorage.setItem('llabUser', JSON.stringify(currentUser));
            
            // Update UI
            updateUIForLoggedInUser();
            
            // Hide modal
            hideLogin();
            
            // Show success message
            showToast(`Welcome back, ${user.name}! Successfully signed in to L-Lab Platform.`, 'success');
            
            // Show role-specific features
            setTimeout(() => {
                if (currentUser.role === 'admin') {
                    showToast('Admin privileges activated. Access admin panel from your profile menu.', 'info');
                } else if (currentUser.role === 'moderator') {
                    showToast('Moderator privileges activated. You can review and approve user content.', 'info');
                }
            }, 2000);
            
        } else {
            // Login failed
            showToast(errorMessage || 'Login failed. Please check your credentials.', 'error');
            
            // Show field-specific error
            if (errorMessage === 'Incorrect password') {
                showFieldError(form.password, errorMessage);
            } else if (errorMessage.includes('email')) {
                showFieldError(form.email, errorMessage);
            }
            
            // Reset form
            setLoadingState(submitBtn, false);
            
            // Shake animation
            form.style.animation = 'shake 0.5s';
            setTimeout(() => form.style.animation = '', 500);
        }
    }, 1500);
}

// Enhanced registration with comprehensive validation
function handleRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.login-btn');
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate all fields
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
        validation.errors.forEach(error => {
            showFieldError(form.querySelector(`[name="${error.field}"]`), error.message);
        });
        showToast('Please fix the highlighted errors and try again.', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, true);
    
    // Simulate registration process
    setTimeout(() => {
        try {
            // Create new user
            const newUser = {
                id: Date.now(),
                name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                email: formData.get('email'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                institution: formData.get('institution'),
                position: formData.get('position'),
                researchArea: formData.get('researchArea'),
                password: formData.get('password'),
                role: 'user',
                joinDate: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                newsletter: formData.get('newsletter') === 'on',
                emailVerified: false,
                profileComplete: false
            };
            
            // Check if email already exists
            const existingUsers = JSON.parse(localStorage.getItem('llabUsers') || '[]');
            if (existingUsers.find(u => u.email === newUser.email)) {
                showFieldError(form.querySelector('[name="email"]'), 'An account with this email already exists');
                setLoadingState(submitBtn, false);
                return;
            }
            
            // Save user to local storage
            existingUsers.push(newUser);
            localStorage.setItem('llabUsers', JSON.stringify(existingUsers));
            
            // Auto-login the new user
            currentUser = newUser;
            isLoggedIn = true;
            localStorage.setItem('llabUser', JSON.stringify(currentUser));
            
            // Update UI
            updateUIForLoggedInUser();
            
            // Hide modal
            hideRegistration();
            
            // Show success messages
            showToast(`Welcome to L-Lab Platform, ${newUser.firstName}! Your account has been created successfully.`, 'success');
            
            setTimeout(() => {
                showToast('Complete your profile and start exploring research content!', 'info');
            }, 3000);
            
        } catch (error) {
            console.error('Registration error:', error);
            showToast('Registration failed. Please try again.', 'error');
            setLoadingState(submitBtn, false);
        }
    }, 2000);
}

// Create menu functions
function toggleCreateMenu() {
    const createMenu = document.getElementById('create-menu');
    if (createMenu) {
        const isVisible = createMenu.style.display === 'block';
        createMenu.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            positionCreateMenu();
        }
    }
}

function hideCreateMenu() {
    const createMenu = document.getElementById('create-menu');
    if (createMenu) {
        createMenu.style.display = 'none';
    }
}

function positionCreateMenu() {
    const createBtn = document.getElementById('floating-create-btn');
    const createMenu = document.getElementById('create-menu');
    
    if (createBtn && createMenu) {
        createMenu.style.position = 'fixed';
        createMenu.style.bottom = '100px';
        createMenu.style.right = '30px';
        createMenu.style.zIndex = '1000';
    }
}

// Content creation functions
function showBlogEditor() {
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    showUGCEditor('', 'blog');
}

function showTutorialEditor() {
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    showUGCEditor('', 'tutorial');
}

function showDocumentUploader() {
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    showUGCEditor('', 'documentation');
}

// UGC Editor Modal Functions
function showUGCEditor(section = '', contentType = '', item = null) {
    const modal = document.getElementById('ugc-editor-modal');
    if (modal) {
        createUGCEditorForm(section, contentType, item);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideUGCEditor() {
    const modal = document.getElementById('ugc-editor-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function createUGCEditorForm(section = '', contentType = '', item = null) {
    const editorContent = document.querySelector('.ugc-editor-content');
    if (editorContent) {
        const isEdit = item !== null;
        
        const getFormTitle = () => {
            if (isEdit) return 'Edit Content';
            switch(contentType) {
                case 'blog': return 'Write Blog Post';
                case 'tutorial': return 'Create Tutorial';
                case 'documentation': return 'Upload Document';
                case 'code': return 'Share Code';
                case 'dataset': return 'Share Dataset';
                default: return 'Create New Content';
            }
        };
        
        const getFormDescription = () => {
            switch(contentType) {
                case 'blog': return 'Share your research insights, findings, and thoughts with the community';
                case 'tutorial': return 'Create step-by-step learning content to help others learn new techniques';
                case 'documentation': return 'Upload protocols, guides, and documentation to share knowledge';
                case 'code': return 'Share code examples, scripts, and programming solutions';
                case 'dataset': return 'Share research data and datasets with proper documentation';
                default: return 'Choose the type of content you want to create and share';
            }
        };
        
        editorContent.innerHTML = `
            <button class="close-btn" onclick="hideUGCEditor()">&times;</button>
            <div class="ugc-editor-header">
                <h2>${getFormTitle()}</h2>
                <p>${getFormDescription()}</p>
            </div>
            <form id="ugc-form" onsubmit="handleUGCSubmission(event)">
                <div class="ugc-form-group">
                    <label for="ugc-title">Title *</label>
                    <input type="text" id="ugc-title" name="title" required 
                           placeholder="Enter a descriptive title for your content"
                           value="${item?.title || ''}">
                </div>
                
                <div class="ugc-form-row">
                    <div class="ugc-form-group">
                        <label for="ugc-section">Section *</label>
                        <select id="ugc-section" name="section" required>
                            <option value="">Select a section</option>
                            <option value="Research" ${(section === 'Research' || item?.section === 'Research') ? 'selected' : ''}>Research</option>
                            <option value="Methods" ${(section === 'Methods' || item?.section === 'Methods') ? 'selected' : ''}>Methods</option>
                            <option value="Data" ${(section === 'Data' || item?.section === 'Data') ? 'selected' : ''}>Data</option>
                            <option value="Tools" ${(section === 'Tools' || item?.section === 'Tools') ? 'selected' : ''}>Tools</option>
                            <option value="About" ${(section === 'About' || item?.section === 'About') ? 'selected' : ''}>About</option>
                        </select>
                    </div>
                    
                    <div class="ugc-form-group">
                        <label for="ugc-type">Content Type *</label>
                        <select id="ugc-type" name="type" required>
                            <option value="">Select content type</option>
                            <option value="blog" ${(contentType === 'blog' || item?.type === 'blog') ? 'selected' : ''}>Blog Post</option>
                            <option value="tutorial" ${(contentType === 'tutorial' || item?.type === 'tutorial') ? 'selected' : ''}>Tutorial</option>
                            <option value="documentation" ${(contentType === 'documentation' || item?.type === 'documentation') ? 'selected' : ''}>Documentation</option>
                            <option value="code" ${(contentType === 'code' || item?.type === 'code') ? 'selected' : ''}>Code Example</option>
                            <option value="dataset" ${(contentType === 'dataset' || item?.type === 'dataset') ? 'selected' : ''}>Dataset</option>
                            <option value="publication" ${(contentType === 'publication' || item?.type === 'publication') ? 'selected' : ''}>Publication</option>
                        </select>
                    </div>
                </div>
                
                <div class="ugc-form-group">
                    <label for="ugc-content">Content *</label>
                    <div class="rich-text-toolbar">
                        <button type="button" onclick="formatText('bold')" title="Bold"><i class="fas fa-bold"></i></button>
                        <button type="button" onclick="formatText('italic')" title="Italic"><i class="fas fa-italic"></i></button>
                        <button type="button" onclick="formatText('underline')" title="Underline"><i class="fas fa-underline"></i></button>
                        <button type="button" onclick="formatText('insertUnorderedList')" title="Bullet List"><i class="fas fa-list-ul"></i></button>
                        <button type="button" onclick="formatText('insertOrderedList')" title="Numbered List"><i class="fas fa-list-ol"></i></button>
                        <button type="button" onclick="insertLink()" title="Insert Link"><i class="fas fa-link"></i></button>
                        <button type="button" onclick="insertCode()" title="Code Block"><i class="fas fa-code"></i></button>
                    </div>
                    <div id="ugc-content" contenteditable="true" class="rich-text-editor" 
                         placeholder="Write your content here... You can use the toolbar above for formatting.">${item?.content || ''}</div>
                    <textarea id="ugc-content-hidden" name="content" style="display: none;" required></textarea>
                </div>
                
                <div class="ugc-form-group">
                    <label for="ugc-tags">Tags</label>
                    <input type="text" id="ugc-tags" name="tags" 
                           placeholder="Enter tags separated by commas (e.g., machine learning, pathology, AI)"
                           value="${item?.tags ? item.tags.join(', ') : ''}">
                    <small>Tags help others discover your content. Use relevant keywords.</small>
                </div>
                
                <div class="ugc-form-group">
                    <label for="ugc-files">Attachments</label>
                    <div class="file-upload-area" id="file-upload-area">
                        <input type="file" id="ugc-files" name="files" multiple accept=".pdf,.doc,.docx,.txt,.py,.r,.ipynb,.csv,.xlsx">
                        <div class="file-upload-text">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Drag and drop files here or click to select</p>
                            <small>Supported: PDF, DOC, TXT, Code files, Data files (Max 10MB each)</small>
                        </div>
                    </div>
                    <div id="file-list" class="file-list"></div>
                </div>
                
                <div class="ugc-form-actions">
                    <button type="button" class="ugc-btn ugc-btn-secondary" onclick="hideUGCEditor()">
                        Cancel
                    </button>
                    <button type="button" class="ugc-btn ugc-btn-secondary" onclick="saveDraft()">
                        <i class="fas fa-save"></i> Save Draft
                    </button>
                    <button type="submit" class="ugc-btn ugc-btn-primary">
                        <span class="btn-text">
                            <i class="fas fa-paper-plane"></i> 
                            ${isEdit ? 'Update Content' : 'Publish Content'}
                        </span>
                        <span class="loading" style="display: none;"></span>
                    </button>
                </div>
            </form>
        `;
        
        // Initialize rich text editor
        initializeRichTextEditor();
        
        // Initialize file upload
        initializeFileUpload();
    }
}

// Rich text editor functions
function initializeRichTextEditor() {
    const editor = document.getElementById('ugc-content');
    const hiddenTextarea = document.getElementById('ugc-content-hidden');
    
    if (editor && hiddenTextarea) {
        editor.addEventListener('input', function() {
            hiddenTextarea.value = editor.innerHTML;
        });
        
        editor.addEventListener('paste', function(e) {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
        });
    }
}

function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('ugc-content').focus();
}

function insertLink() {
    const url = prompt('Enter the URL:');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

function insertCode() {
    const code = prompt('Enter your code:');
    if (code) {
        const codeElement = `<code style="background: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-family: monospace;">${code}</code>`;
        document.execCommand('insertHTML', false, codeElement);
    }
}

function saveDraft() {
    const form = document.getElementById('ugc-form');
    const formData = new FormData(form);
    
    const editor = document.getElementById('ugc-content');
    const hiddenTextarea = document.getElementById('ugc-content-hidden');
    if (editor && hiddenTextarea) {
        hiddenTextarea.value = editor.innerHTML;
    }
    
    const draftData = {
        title: formData.get('title'),
        section: formData.get('section'),
        type: formData.get('type'),
        content: formData.get('content'),
        tags: formData.get('tags'),
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('llabDraft', JSON.stringify(draftData));
    showToast('Draft saved successfully!', 'success');
}

// Handle UGC form submission
function handleUGCSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.ugc-btn-primary');
    
    // Update hidden textarea with editor content
    const editor = document.getElementById('ugc-content');
    const hiddenTextarea = document.getElementById('ugc-content-hidden');
    if (editor && hiddenTextarea) {
        hiddenTextarea.value = editor.innerHTML;
        formData.set('content', editor.innerHTML);
    }
    
    // Validate form
    if (!formData.get('title') || !formData.get('section') || !formData.get('type') || !formData.get('content')) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, true);
    
    // Process submission
    setTimeout(() => {
        try {
            const contentData = {
                id: Date.now().toString(),
                title: formData.get('title'),
                section: formData.get('section'),
                type: formData.get('type'),
                content: formData.get('content'),
                tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
                author: currentUser?.name || 'Anonymous',
                authorEmail: currentUser?.email || '',
                status: currentUser?.role === 'admin' ? 'approved' : 'pending',
                createdAt: new Date().toISOString(),
                likes: 0,
                downloads: 0,
                views: 0
            };
            
            // Save to user content
            const userContent = JSON.parse(localStorage.getItem('llabUserContent') || '{}');
            if (!userContent[contentData.section]) {
                userContent[contentData.section] = [];
            }
            userContent[contentData.section].push(contentData);
            localStorage.setItem('llabUserContent', JSON.stringify(userContent));
            
            // Clear draft
            localStorage.removeItem('llabDraft');
            
            // Hide modal
            hideUGCEditor();
            
            // Show success message
            const statusMessage = contentData.status === 'approved' ? 
                'Content published successfully!' : 
                'Content submitted for review. You will be notified once it\'s approved.';
            showToast(statusMessage, 'success');
            
            // Refresh current section if needed
            if (typeof loadSectionContent === 'function') {
                setTimeout(() => loadSectionContent(contentData.section), 1000);
            }
            
        } catch (error) {
            console.error('Content submission error:', error);
            showToast('Failed to submit content. Please try again.', 'error');
        }
        
        setLoadingState(submitBtn, false);
    }, 2000);
}

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateRegistrationForm(formData) {
    const errors = [];
    
    const requiredFields = ['firstName', 'lastName', 'email', 'institution', 'position', 'researchArea', 'password', 'confirmPassword'];
    requiredFields.forEach(field => {
        if (!formData.get(field) || !formData.get(field).trim()) {
            errors.push({ field, message: 'This field is required' });
        }
    });
    
    const email = formData.get('email');
    if (email && !validateEmail(email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password && password.length < 8) {
        errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
    }
    
    if (password && confirmPassword && password !== confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
    }
    
    if (!formData.get('terms')) {
        errors.push({ field: 'terms', message: 'You must agree to the terms of service' });
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

function clearFormErrors(form) {
    form.querySelectorAll('.field-error').forEach(error => error.remove());
    form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
}

function showFieldError(field, message) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();
    
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function setLoadingState(button, loading) {
    const btnText = button.querySelector('.btn-text');
    const loadingSpinner = button.querySelector('.loading');
    
    if (loading) {
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        button.disabled = true;
    } else {
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
        button.disabled = false;
    }
}

function initializeFileUpload() {
    const fileInput = document.getElementById('ugc-files');
    const uploadArea = document.getElementById('file-upload-area');
    const fileList = document.getElementById('file-list');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });
        
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }
    
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.size > 10 * 1024 * 1024) {
                showToast(`File ${file.name} is too large. Maximum size is 10MB.`, 'error');
                return;
            }
            
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <i class="fas fa-file"></i>
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${(file.size / 1024).toFixed(1)} KB)</span>
                <button type="button" class="remove-file" onclick="this.parentNode.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            fileList.appendChild(fileItem);
        });
    }
}
