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
        title: "Google",
        description: "Software Engineer",
        applicationLink: "https://valorem.keka.com/careers/jobdetails/69890https://www.google.com/about/careers/applications/jobs/results/123826017989993158-software-engineer-university-graduate-2025",
        category: "Full-time",
        experience: "1 years",
        logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"

    },
    {
        title: "Microsoft",
        description: "Technical Program Manager",
        applicationLink: "https://careers.qualcomm.com/careers",
        category: "Intern",
        experience: "Fresher",
        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAkFBMVEX///+BvAYFpvD/ugjzUyUAo/D/twC92pR6uQD7z8bzThnyOADI4KiSxTv1eV2byVJSuPP/x1PB5PoAne//36j/wzuUz/f/2pT4qJjzSAv95N/4oI7i7s+62Y/H4KLyQwDyKACOwy/82ND0a0vT5riXx0iq0WrM6fs/s/L/5bf/xUf/0Gr/wTDb7/z+7s//36L62YWvAAAA5UlEQVR4nO3aV05CYQCE0WsFUaSJBRFQig1l/7vz4Y8ml9chQZLzLWByFjBVJWmvje6zHsvM+KkRNamhLqYPUbMyM2lmPddRrdOoyzJz1TyKakNBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEdJmraipr9onb5Cnq5zpqXmcWyE7WqJP2HXrtZb2Xm/aMX9VlD9c+yBmXm5jxruIU6jvpDnURBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBHShqsJNX0CZ8Ba1rqK/bsDLzfZe1qSTttR9VofAdHuhbPwAAAABJRU5ErkJggg=="

    },
   
    {
        title: "Amazon",
        description: "SDE Intern",
        applicationLink: "https://www.amazon.jobs/en/jobs/2750545/sde-i-intern-6m-july-dec",
        category: "Intern",
        experience: "Fresher",
        logo: "https://w7.pngwing.com/pngs/732/34/png-transparent-logo-amazon-com-brand-flipkart-others-text-orange-logo.png"

    },
    {
        title: "Qualcomm",
        description: "Associate Software Engineer",
        applicationLink: "https://careers.qualcomm.com/careers",
        category: "Full-time",
        experience: "1 years",
        logo: "https://static.vscdn.net/images/careers/demo/qualcomm/1686210880::Qualcomm-Logo.png"

    },
    {
        title: "SAP Labs",
        description: "AI Developer Associate",
        applicationLink: "https://jobs.sap.com/job/Bangalore-AI-Developer-Associate-560066/1111797101/",
        category: "Full-time",
        experience: "1 years",
        logo: "data:image/jpeg;base64,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"

    },
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
