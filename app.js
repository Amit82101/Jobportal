// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//new app
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json'); // Make sure to have your service account JSON file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Temporary in-memory storage for job postings
let jobPostings = [
    {
        title: "Citi Group",
        description: "Apps Programmer analyst",
        applicationLink: "https://jobs.citi.com/job/-/-/287/71615296816",
        category: "Full-time",
        experience: "2 years",
        logo: "https://seeklogo.com/images/C/Citi-logo-D7212B58B7-seeklogo.com.png" // Example logo URL
    },
    {
        title: "Web Tech ",
        description: "SDE",
        applicationLink: "https://wabtec.wd1.myworkdayjobs.com/en-US/wabtec_careers/job/Bengaluru-India/Intern---Engineering_R0088569",
        category: "Intern",
        experience: "Fresher",
        logo: "https://wabtec.wd1.myworkdayjobs.com/wday/cxs/wabtec/wabtec_careers/sidebarimage/5f8a90c2e24b01661c88f46027021001"
    },
    {
        title: "IBM",
        description: "Associate System Engineer",
        applicationLink: "https://careers.ibm.com/job/21123930/associate-system-engineer-mumbai-in/",
        category: "Full-time",
        experience: "Fresher",
        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAbFBMVEX///8AAAC0tLT19fX8/PyFhYWZmZkICAhqamqvr69iYmKKior5+fmBgYGWlpbn5+epqanBwcHh4eHU1NQ5OTl6enrNzc3u7u5zc3NZWVnb29u6uro+Pj40NDSgoKBNTU1GRkYZGRkrKysgICAIPS4/AAADhklEQVR4nO3aaXeiMBQG4KhRy5awVHArVef//8dhSyCL9IwS9HTe50s1N6ReT7yQACEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4F64sqGEUGtgtQrD8cOpMrw5inL4xLxobdodCcmiwIrFSbqSn9Vba+EoV4bP9fjac5jMfmFzqj6mNdA4B1n3/dIPI/g9HL3YGfH9myWzWFxZ2hwd+mYsHYyeX2dNJl9aeJyQ1LNFpPYj08SM8MHo3Bwkt38O+NXYwTd959UEOnyM86uSRze+GZD1yjaGzxwmY5abrgAsxwpAIwgJtdWPgxi7OFiiO6fJbE1tMpaA2ovXpdls/kq6sbllCKfJLJlFUM2gY7D5QVAlc2JmOxPJ5JYh2NJhMr9RKGjt1AyEodFGQxU1elqGdibtZguLuRoo5PQQARqLmcVk2cr1edZkE6tTkKVkHomoNZ+ZGkhlFRJn7vBsXpkwrWL5TeZ6HUvIPGQyX1oyx7FkynvJLOpfef6qZHjstU6FGii6dq+ffyfZJOdN5qni+ivJ9UZtBrtDhZ8DdKxpELK1wb9Kd90ak2lzge8sC9FGtOlnZGIsVZd0Y7RpP0dn7lazo/4r7p36XrIAfN66F5dc1InL9WXV7H5p1lzLwUlwI1rP5bZ7dRAvysvcyRy72RQZ0+zeJItXg15imkVBGnQbJFH7NyqzTdTvksB/bbJpVpD1cCMu8laczT3NHikAg2xkAbhybenKSPb5NtXsH0vzlqvp35IXJDPVSbOaZiQY9CkLwln3ZjfXEuB3mepCU31HR4d2ZaolwLKqCjQXg3n1r6Q4GSM49tjiLBa9+sVZ9YFpKd8FdaJfb1PN+tokAoNk5BbYsJoNvoBbfWZ5QTWbZkODNSeflce6weoYF/1n29CYaquJqm9Hh4Zxz27PBsqB7TVOmLB+I5aX6tgut2ef3DjfK70Wt/aX5S3aQWrZRe3i9i6A/brrsVsaf9pksu/6TfsPsrPaxWUyT9xsSuubTerhH+05N4x9eVcp3Ss9Di5vNsG7evLWuX64WLHlnjhFFqf5bp0/9lDDojudU/2hBnGdEMtruf7arPVuT2jc1vmdx022Ihm+F5ff/bWZ+2QeeRDoKNcJVDs8kJFUXL3IlabY4nCYzMSPaJn/QB8Hl2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAc/gL3HBQkeHGzawAAAAASUVORK5CYII="
    },
    {
        title: "Xoriant Hiring",
        description: "C++ Developer",
        applicationLink: "https://xoriant.taleo.net/careersection/jobdetail.ftl?job=2400003492",
        category: "Full-time",
        experience: "3 years",
        logo: "https://xoriant.taleo.net/careersection/theme/261241/1138980031609/en/theme/images/logo-with-tagline-white-color.png"
    },
    {
        title: "Morgan Stanley",
        description: "C++ Developer",
        applicationLink: "https://ms.taleo.net/careersection/2/jobdetail.ftl?job=3257541&lang=en&src=JB-10109",
        category: "Full-time",
        experience: "2 years",
        logo: "https://i.pinimg.com/originals/e9/6c/0a/e96c0a272b688696826189822221b6f9.png"
    },
    {
        title: "AspenTech",
        description: "C++ Developer",
        applicationLink: "https://aspentech.wd5.myworkdayjobs.com/aspentech/job/Bengaluru-India/C---Developers_R6599",
        category: "Full-time",
        experience: "Fresher",
        logo: "https://aspentech.wd5.myworkdayjobs.com/aspentech/assets/logo"
    },
    {
        title: "Flowbiz",
        description: "Backend Engineer",
        applicationLink: "https://valorem.keka.com/careers/jobdetails/69890",
        category: "Full-time",
        experience: "1 years",
        logo: "https://valorem.keka.com/ats/documents/6530c1b8-e9b5-4e70-97f7-21b5f6d9b19e/orglogo/03191a9b2e064b599b23b3b5d7a17189.png"
    },

    {
        title: "Google",
        description: "Software Engineer",
        applicationLink: "https://valorem.keka.com/careers/jobdetails/69890https://www.google.com/about/careers/applications/jobs/results/123826017989993158-software-engineer-university-graduate-2025",
        category: "Full-time",
        experience: "1 years",
        logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"

    },

    {
        title: "Qualcomm",
        description: "Associate Software Engineer",
        applicationLink: "https://careers.qualcomm.com/careers",
        category: "Full-time",
        experience: "1 years",
        logo: "https://static.vscdn.net/images/careers/demo/qualcomm/1686210880::Qualcomm-Logo.png"

    },
    // Add more job postings as needed
];


// Route to render the admin page (for adding jobs)
app.get('/admin', (req, res) => {
    res.render('admin', { jobPostings });
});

// Route for adding a job (admin functionality)
app.post('/add-job', (req, res) => {
    const { title, description } = req.body;
    jobPostings.push({ title, description });
    res.redirect('/admin');
});

// Route for user page to view job postings
app.get('/', (req, res) => {
    res.render('user', { jobPostings });
});

// Route for applying to a job
app.get('/apply/:index', (req, res) => {
    const jobIndex = req.params.index;
    const job = jobPostings[jobIndex];

    if (job) {
        res.render('apply', { job }); // Create apply.ejs to render the job details
    } else {
        res.redirect('/'); // Redirect if the job is not found
    }
});



// Delete a job posting
app.post('/delete-job/:index', (req, res) => {
    const index = req.params.index; // Get the index of the job to delete
    if (index >= 0 && index < jobPostings.length) {
        jobPostings.splice(index, 1); // Remove the job posting from the array
        res.redirect('/admin'); // Redirect to the admin page
    } else {
        res.status(404).send('Job posting not found');
    }
});
app.get('/jobs', (req, res) => {
    res.render('user', { jobPostings }); // Send the same jobPostings array to the user view
});


app.get('/jobportal', (req, res) => {
    // Replace with actual jobs from your database
    const jobs = [
        { title: "Software Engineer", description: "Full-time position at a startup", applyLink: "https://example.com/apply1" },
        { title: "UI/UX Designer", description: "Internship opportunity", applyLink: "https://example.com/apply2" },
        { title: "DevOps Engineer", description: "Full-time position with 2+ years experience", applyLink: "https://example.com/apply3" }
    ];

    res.render('index', { jobs }); // Renders the 'index.ejs' file and passes jobs
});
app.use(express.static('public'));
//adding pages 1
app.get('/resources', (req, res) => {
    res.render('resources');
});
//adding page 2
app.get('/roadmaps', (req, res) => {
    res.render('roadmaps');
});
app.get('/jobportal', (req, res) => {
    res.render('jobportal');
});

app.set('views', path.join(__dirname, 'views')); // Ensure this points to the correct directory
app.set('view engine', 'ejs'); // Ensure the view engine is set to ejs


app.get('/resources', (req, res) => {
    res.render('resources', { currentPage: 'resources' });
});

app.get('/jobportal', (req, res) => {
    res.render('jobportal', { currentPage: 'home' });
});

app.get('/roadmaps', (req, res) => {
    res.render('roadmaps', { currentPage: 'roadmaps' });
});



// Import necessary modules


// Serve the HTML page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Google Login with Firebase</title>
            <script src="https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js"></script>
        </head>
        <body>
            <h1>Firebase Google Login</h1>
            <div id="user-container"></div>
            <button id="login-button">Login with Google</button>
            <button id="logout-button" style="display: none;">Logout</button>

            <script>
                // Your Firebase configuration
                const firebaseConfig = {
                    apiKey: "AIzaSyB74Uvpu7f1Mp8sC07cH4miHxtkbRywzcA",
                    authDomain: "my-app-aef68.firebaseapp.com",
                    projectId: "my-app-aef68",
                    storageBucket: "my-app-aef68.appspot.com",
                    messagingSenderId: "957894236268",
                    appId: "1:957894236268:web:f4a8349effeee8df6a6049",
                    measurementId: "G-4C9WSYR2HC"
                };

                // Initialize Firebase
                const app = firebase.initializeApp(firebaseConfig);
                const auth = firebase.auth();

                // Update UI based on user status
                auth.onAuthStateChanged(user => {
                    console.log('User state changed:', user); // Log the user object
                    const userContainer = document.getElementById('user-container');
                    const loginButton = document.getElementById('login-button');
                    const logoutButton = document.getElementById('logout-button');

                    if (user) {
                        // Ensure user.displayName is available before using it
                        const displayName = user.displayName ? user.displayName : "User";
                        userContainer.innerHTML = '<p>Welcome, ' + displayName + '!</p>';
                        loginButton.style.display = 'none';
                        logoutButton.style.display = 'block';
                    } else {
                        userContainer.innerHTML = '<p>Please log in</p>';
                        loginButton.style.display = 'block';
                        logoutButton.style.display = 'none';
                    }
                });

                // Login with Google
                document.getElementById('login-button').onclick = function() {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    auth.signInWithPopup(provider).catch(error => {
                        console.error('Login failed:', error);
                    });
                };

                // Logout
                document.getElementById('logout-button').onclick = function() {
                    auth.signOut().catch(error => {
                        console.error('Logout failed:', error);
                    });
                };
            </script>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});
