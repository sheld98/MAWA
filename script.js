document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    let isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    let loggedInUser = sessionStorage.getItem("loggedInUser");
    let loginTime = sessionStorage.getItem("loginTime"); // Get the login timestamp

    // Admin and User Credentials
    const validAccounts = {
        "othienosheldon@gmail.com": "0720973275", // Admin 1
        "mouriceambuche@gmail.com": "0706657428", // Admin 2
        "stephenomondi667@gmail.com": "0707070767", // Regular User
        "bukachivince281@gmail.com": "0798490505", // New User
        "ogotelvyz@gmail.com": "0708374191", // New User
        "patricktelwa056@gmail.com": "+97471815533", // New User
        "phanicehope17@gmail.com": "0700193451", // New User
        "oduorstephine4@gmail.com": "0701738937", // New User
        "edwinnyanje94@gmail.com": "0742120397", // New User
        "philipambani20@gmail.com": "0700429223", // New User
        "clementinaoyiengo1998@gmail.com": "0792902616", // New User
        "info.duyu@gmail.com": "0748890006", // New User
        "mapesageophrey12@gmail.com": "0740944490", // New User
        "mervin.shitindo@gmail.com": "0746270207", // New User
        "onyangoemmanuel45@gmail.com": "0796180982", // New User
        "abutibonface22@gmail.com": "0111307366", // New User
        "bradleybrian765@gmail.com": "0741973374", // New User
        "shariffibnaslam@gmail.com": "0746359653", // New User
        "munyendokevin98@gmail.com": "0711607580", // New User
        "lukangatia19@gmail.com": "0745047989", // New User
        "hadetesharon@gmail.com": "0746273815", // New User
         "brianswat777@gmail.com": "0799166274", // New User
    };

    // Check if the session has expired (30 minutes)
    if (isLoggedIn && loginTime) {
        const currentTime = new Date().getTime();
        const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
        if (currentTime - parseInt(loginTime) > sessionDuration) {
            // Session expired
            sessionStorage.clear(); // Clear session data
            isLoggedIn = false; // Update login status
            alert("Your session has expired. Please log in again.");
            window.location.href = "index.html"; // Redirect to login page
            return;
        }
    }

    // Redirect if not logged in and trying to access restricted pages
    if (!isLoggedIn && !window.location.pathname.endsWith("index.html")) {
        window.location.href = "index.html"; // Redirect to login page
        return;
    }

    // If already logged in and on the login page, redirect to the home page
    if (isLoggedIn && window.location.pathname.endsWith("index.html")) {
        window.location.href = "home.html";
        return;
    }

    // Login Form Validation
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Check if credentials are valid
            if (validAccounts[email] && validAccounts[email] === password) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("loggedInUser", email); // Store logged-in user
                sessionStorage.setItem("loginTime", new Date().getTime()); // Store login timestamp

                // Redirect the user to the home page
                window.location.href = "home.html";
            } else {
                alert("Incorrect username or password. Please try again.");
            }
        });
    }

    // Logout Functionality (Works on All Pages)
    const logoutBtns = document.querySelectorAll(".logout-btn");
    logoutBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            sessionStorage.clear(); // Clear login session
            window.location.href = "index.html"; // Redirect to login page
        });
    });

    // Auto Logout When Leaving the Site
    window.addEventListener("beforeunload", function () {
        // No need to clear sessionStorage here; we rely on the login timestamp
    });

    // Check if User is Admin
    const isAdmin = isLoggedIn && (loggedInUser === "othienosheldon@gmail.com" || loggedInUser === "mouriceambuche@gmail.com");

    // Show upload buttons only if user is an admin
    const uploadButtons = document.querySelectorAll(".uploadBtn");
    if (isAdmin) {
        uploadButtons.forEach(button => button.classList.remove("hidden"));
    }

    // Sidebar Toggle Functionality
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.getElementById("sidebarToggle");

    if (toggleButton) {
        toggleButton.addEventListener("click", function (event) {
            sidebar.classList.toggle("active");
            document.body.classList.toggle("sidebar-open"); // Helps in styling if needed
        });
    }

    // Collapse Sidebar When Clicking Outside
    document.addEventListener("click", function (event) {
        if (sidebar && !sidebar.contains(event.target) && event.target !== toggleButton) {
            sidebar.classList.remove("active");
            document.body.classList.remove("sidebar-open");
        }
    });

    // Add Blog Functionality (Admins Only)
    const addBlogBtn = document.getElementById("addBlogBtn");
    const blogPosts = document.getElementById("blogPosts");

    // Load existing blogs from localStorage
    function loadBlogs() {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogPosts.innerHTML = blogs.length > 0 ? "" : "<p>No blog posts yet.</p>";

        blogs.forEach(blog => {
            const blogPost = document.createElement("div");
            blogPost.className = "blog-post";
            blogPost.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
                <small>Posted by: ${blog.author}</small>
            `;
            blogPosts.appendChild(blogPost);
        });
    }

    // Save a new blog to localStorage
    function saveBlog(title, content, author) {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push({ title, content, author });
        localStorage.setItem("blogs", JSON.stringify(blogs));
        loadBlogs(); // Refresh blog list
    }

    // Initialize blog posts
    loadBlogs();

    if (addBlogBtn) {
        addBlogBtn.addEventListener("click", function () {
            if (!isAdmin) {
                alert("You are not allowed to add a blog. Only admins can post.");
                return;
            }

            const blogTitle = prompt("Enter the blog title:");
            const blogContent = prompt("Enter the blog content:");
            if (blogTitle && blogContent) {
                saveBlog(blogTitle, blogContent, "Admin");
            }
        });
    }
});
