    // Toggle side navigation on button click
    document.getElementById("toggleNav").addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent event bubbling
        let sideNav = document.getElementById("side");

        // Toggle width of side navigation
        if (sideNav.style.width === "300px") {
            sideNav.style.width = "0"; // Close it
        } else {
            sideNav.style.width = "300px"; // Open it
        }
    });

    // Close the side navigation when clicking outside of it
    document.addEventListener("click", function(event) {
        let sideNav = document.getElementById("side");
        let toggleButton = document.getElementById("toggleNav");

        // Check if click is outside of sideNav and toggleButton
        if (!sideNav.contains(event.target) && !toggleButton.contains(event.target)) {
            sideNav.style.width = "0"; // Hide the side navigation
        }
    });

    // Prevent the side navigation from closing when clicking inside it
    document.getElementById("side").addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent event bubbling to the document
    });


 
function openNav() {
  document.getElementById("mySidenav").style.width = "270px";
  document.getElementById("main").style.marginLeft = "0px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
 



  // Function to check if cookies are enabled
  function areCookiesEnabled() {
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith('user_cookies=enabled'));
  }

  // Automatically show the cookie consent popup when the page loads
  window.onload = function() {
    if (!areCookiesEnabled()) {
      var cookieModal = new bootstrap.Modal(document.getElementById('cookieModal'));
      cookieModal.show();
    } else {
      // If cookies are enabled, show the cart
      document.getElementById('cartContent').style.display = 'block';
    }
  };

  // Handle saving cookie settings
  document.getElementById('saveSettings').addEventListener('click', function () {
    var enableCookies = document.getElementById('enableCookies').checked;

    if (enableCookies) {
      // Enable cookies (set cookie)
      document.cookie = "user_cookies=enabled; path=/; max-age=31536000"; // 1 year expiration
      alert('Cookies have been enabled. You can now view your cart.');
      
      // Show the cart
      document.getElementById('cartContent').style.display = 'block';
    } else {
      // Disable cookies (clear cookies)
      document.cookie = "user_cookies=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      alert('Cookies have been disabled.');
    }

    // Close the modal after saving settings
    var modal = bootstrap.Modal.getInstance(document.getElementById('cookieModal'));
    modal.hide();
  });





function uploadFiles() {
            const fileInput = document.getElementById('fileInput');
            const files = fileInput.files;  // Get the uploaded files
            const displayArea = document.getElementById('fileDisplayArea');
            
            displayArea.innerHTML = ''; // Clear previous files before uploading new ones

            // Loop through each file
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Create a file reader to read the file content
                const reader = new FileReader();

                reader.onload = function(e) {
                    const fileContent = e.target.result;

                    // If the file is an image, display it
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = fileContent;
                        img.style.maxWidth = '300px';  // Set a max width for images
                        displayArea.appendChild(img);
                    }
                    // If it's a text file, display the text content
                    else if (file.type === 'text/plain') {
                        const text = document.createElement('p');
                        text.textContent = fileContent;
                        displayArea.appendChild(text);
                    }
                    // For other files, just show the file name
                    else {
                        const fileName = document.createElement('p');
                        fileName.textContent = 'Uploaded: ' + file.name;
                        displayArea.appendChild(fileName);
                    }
                };

                // Read the file content (for images or text files)
                if (file.type.startsWith('image/') || file.type === 'text/plain') {
                    reader.readAsDataURL(file); // For images
                } else {
                    reader.readAsText(file); // For text files
                }
            }
        }

        // Function to clear the display area
        function clearDisplay() {
            const displayArea = document.getElementById('fileDisplayArea');
            displayArea.innerHTML = '';  // Clear the content of the display area
            document.getElementById('fileInput').value = '';  // Reset the file input
        }
        

document.addEventListener('DOMContentLoaded', function () {
    // Example function to simulate login status check (replace with actual login check)
    function isLoggedIn() {
        // Replace this with actual logic to check user login status
        // For example, check if a session cookie/token is present
        return !!localStorage.getItem('loggedIn'); // Example using localStorage
    }

    // Toggle visibility based on login status
    if (isLoggedIn()) {
        document.getElementById('login-btn').style.display = 'none';  // Hide login button
        document.getElementById('logout-btn').style.display = 'block';  // Show logout button
    } else {
        document.getElementById('login-btn').style.display = 'block';  // Show login button
        document.getElementById('logout-btn').style.display = 'none';  // Hide logout button
    }
});

// Function to show logout modal
function showLogoutModal() {
    // Here you can display the modal asking the user to confirm logout
    // For now, we just log out
    alert("Logging out...");
    // Perform actual logout action here (e.g., remove session, clear tokens)
    localStorage.removeItem('loggedIn'); // Example using localStorage
    // Reload the page or update the UI
    location.reload(); 
}
         




// Function to check if a cookie exists
function getCookie(name) {
    const cookieArr = document.cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0]) {
            return cookiePair[1];
        }
    }
    return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Show the cookie banner if the user hasn't accepted cookies
window.onload = function() {
    if (!getCookie("cookiesAccepted")) {
        document.getElementById("cookieBanner").style.display = "block";
    }
};

// Set the cookie and hide the banner when the user accepts cookies
document.getElementById("acceptCookies").addEventListener("click", function() {
    setCookie("cookiesAccepted", "true", 365);  // Accept for 1 year
    document.getElementById("cookieBanner").style.display = "none";
});