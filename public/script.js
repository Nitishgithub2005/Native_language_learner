// Initialize state
let darkMode = false;
let currentLanguage = 'english';
let words = []; // Will be fetched from the backend
let currentWordIndex = 0;
// Screens DOM Elements
const screens = {
    language: document.getElementById('languageScreen'),
    learning: document.getElementById('learningScreen'),
    profile: document.getElementById('profileScreen')
};

// Navigation Elements
document.getElementById('backBtn').addEventListener('click', handleBack);
document.getElementById('homeBtn').addEventListener('click', () => showScreen('language'));
document.getElementById('profileBtn').addEventListener('click', () => showScreen('profile'));
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

//daily word



// Fetch user profile data from the backend
// Update the fetchUserProfile function
async function fetchUserProfile() {
    try {
        const response = await fetch('/api/profile', {
            method: 'GET',
            credentials: 'include', 
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Error response:", error);
            
            // Hide loading spinner
            document.getElementById('profileLoadingSpinner').classList.add('hidden');
            
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Update profile elements
        document.getElementById('username').textContent = data.username || "User";
        document.getElementById('userEmail').textContent = data.email || "No email provided";
        document.getElementById('preferredLanguage').value = data.preferredLanguage || "";
        document.getElementById('currentStreak').textContent = `${data.currentStreak || 0} days`;
        document.getElementById('highestStreak').textContent = `${data.highestStreak || 0} days`;

        // Hide loading spinner and show profile content
        document.getElementById('profileLoadingSpinner').classList.add('hidden');
        document.getElementById('profileContent').classList.remove('hidden');

    } catch (error) {
        console.error("Error fetching user profile:", error);
        
        // Hide loading spinner
        document.getElementById('profileLoadingSpinner').classList.add('hidden');
        
        alert("An error occurred while fetching the profile. Please try again later.");
    }
}

// Modify the existing event listener to ensure profile is loaded
document.addEventListener('DOMContentLoaded', () => {
    const profileScreen = document.getElementById('profileScreen');
    const profileBtn = document.getElementById('profileBtn');

    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            // Show loading spinner
            document.getElementById('profileLoadingSpinner').classList.remove('hidden');
            document.getElementById('profileContent').classList.add('hidden');
            
            // Fetch profile data
            fetchUserProfile();
        });
    }
});
//logout
document.getElementById('logoutBtn').addEventListener('click', handleLogout);

function handleLogout() {
    // Add logout logic, such as clearing the session or token
    alert("You have logged out!");
    window.location.href = "/"; // Redirect to login page after logout
}


// Reminder Modal
const reminderModal = document.getElementById('reminderModal');
document.getElementById('reminderBtn').addEventListener('click', () => {
    reminderModal.classList.remove('hidden');
});
document.getElementById('cancelReminder').addEventListener('click', () => {
    reminderModal.classList.add('hidden');
});
document.getElementById('saveReminder').addEventListener('click', () => {
    const time = document.getElementById('reminderTime').value;
    if (time) {
        localStorage.setItem('reminderTime', time);
        alert('Reminder set successfully!');
        reminderModal.classList.add('hidden');
    }
});

// Screen Management
function showScreen(screenId) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenId].classList.remove('hidden');
    screens[screenId].classList.add('slide-in');
    
    if (screenId === 'language') {
        updateProgress();
    } else if (screenId === 'learning') {
        updateWord();
    } else if (screenId === 'profile') {
        updateProfile();
    }
}

// Navigation Functions
function handleBack() {
    if (!screens.language.classList.contains('hidden')) {
        showScreen('language');
    } else if (!screens.learning.classList.contains('hidden')) {
        showScreen('language');
    } else if (!screens.profile.classList.contains('hidden')) {
        showScreen('language');
    }
}
//toggle
function toggleTheme() {
    darkMode = !darkMode;

    // Toggle body background color
    document.body.classList.toggle('bg-gray-900');
    document.body.classList.toggle('text-white'); // Ensure the body text color toggles too

    // Toggle text and background colors for specific elements
    document.querySelectorAll('.bg-white, .text-black, .text-gray-800').forEach(el => {
        el.classList.toggle('bg-gray-800'); // Dark mode background
        el.classList.toggle('bg-white'); // Light mode background
        el.classList.toggle('text-white'); // Dark mode text
        el.classList.toggle('text-black'); // Light mode text
    });

    // Update the theme toggle icon
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.innerHTML = darkMode 
        ? '<i class="bi bi-moon text-xl"></i>' 
        : '<i class="bi bi-sun text-xl"></i>';
}




// Fetch words from backend API
async function fetchWords(language) {
    try {
        console.log(`Attempting to fetch words for language: ${language}`);
        
        const response = await fetch(`http://localhost:5050/api/words?language=${language}`);
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error fetching words: ${response.status} - ${errorText}`);
            throw new Error(`Error: ${response.statusText}`);
        }

        const fetchedWords = await response.json();
        
        console.log('Fetched words:', fetchedWords);

        if (!fetchedWords || fetchedWords.length === 0) {
            console.warn('No words found for the selected language');
            document.getElementById('currentWord').textContent = 'No words available for this language!';
            return;
        }

        words = fetchedWords; // Store fetched words
        currentWordIndex = 0; // Reset to the first word
        updateWord(); // Call function to render words
    } catch (error) {
        console.error("Detailed error fetching words:", error);
        document.getElementById('currentWord').textContent = `Error: ${error.message}`;
    }
}

// Update the word display
// Update the displayed word details
function populateLanguageDropdown() {
    const dropdown = document.getElementById("languageDropdown");
    if (words.length > 0) {
        const sampleLanguages = Object.keys(words[0].meanings); // Extract languages from the first word
        dropdown.innerHTML = sampleLanguages
            .map(lang => `<option value="${lang}">${lang}</option>`)
            .join("");
    }
}

// Update the displayed word details
// Modify existing updateWord function
function updateWord() {
    if (words.length === 0) {
        document.getElementById('currentWord').textContent = 'No words available!';
        document.getElementById('meaning').textContent = '';
        document.getElementById('wordCount').textContent = 'Word 0/0';
        return;
    }

    const word = words[currentWordIndex];
    const meaningLanguage = document.getElementById('meaningLanguage').value;

    document.getElementById('currentWord').textContent = word.word;
    
    // Use the selected language to display meaning
    const meaning = word.meanings[meaningLanguage] || 'Meaning not available';
    document.getElementById('meaning').textContent = meaning;
    
    document.getElementById('wordCount').textContent = `Word ${currentWordIndex + 1}/${words.length}`;
}

// Add event listener for language selection change
document.addEventListener('DOMContentLoaded', () => {
    const meaningLanguageSelect = document.getElementById('meaningLanguage');
    if (meaningLanguageSelect) {
        meaningLanguageSelect.addEventListener('change', updateWord);
    }
});

// Handle language selection change
// document.getElementById("languageDropdown").addEventListener("change", function (event) {
//     selectedLanguage = event.target.value;
//     updateWord(); // Refresh the word display with the selected language
// });


// Pronounce the current word
function pronounceWord() {
    if (words.length === 0) {
        alert('No words available to pronounce!');
        return;
    }
    const word = words[currentWordIndex]?.word;
    
    console.log('Current Language:', currentLanguage); // Debug logging
    console.log('Current Word:', word);

    if (currentLanguage === 'english' || currentLanguage === 'hindi') {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = { 
            'english': 'en-US', 
            'hindi': 'hi-IN' 
        }[currentLanguage];
        window.speechSynthesis.speak(utterance);
    } else {
        const audioFilePath = `/audio/${currentLanguage}/${word}.mp3`;
        const audio = new Audio(audioFilePath);
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
            alert(`Unable to pronounce word in ${currentLanguage}`);
        });
    }
}
function markAsLearned() {
    if (words.length === 0) return;
    const word = words[currentWordIndex];

    // You can update the learned status on the backend or in localStorage as needed
    alert(`Word '${word.word}' marked as learned!`);
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Modify language selection event listeners
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const language = btn.dataset.lang.toLowerCase(); // Standardize language
            currentLanguage = language;
            fetchWords(language.charAt(0).toUpperCase() + language.slice(1)); // Capitalize for API
            document.getElementById('languageScreen').classList.add('hidden');
            document.getElementById('learningScreen').classList.remove('hidden');
        });
    });

    // Initial language fetch



    // Word navigation
    document.getElementById('nextWord').addEventListener('click', () => {
        if (words.length === 0) return;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        updateWord();
    });

    document.getElementById('prevWord').addEventListener('click', () => {
        if (words.length === 0) return;
        currentWordIndex = (currentWordIndex - 1 + words.length) % words.length;
        updateWord();
    });

    // Pronounce button
    document.getElementById('pronounceBtn').addEventListener('click', pronounceWord);
    document.getElementById('markLearned').addEventListener('click', markAsLearned);
    // Initial language fetch
    // fetchWords(currentLanguage) 
    fetchWords(currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1))
    // fetchWords('English');

    // Reminder functionality
    const reminderTime = localStorage.getItem('reminderTime');
    if (reminderTime) {
        document.getElementById('reminderTime').value = reminderTime;
    }
});

// reminder
document.addEventListener("DOMContentLoaded", () => {
    // Bind Cancel button functionality
    document.getElementById("cancelReminder").addEventListener("click", closeModal);

    // Bind Save button functionality
    document.getElementById("saveReminder").addEventListener("click", scheduleReminder);

    // Request notification permission
    if ("Notification" in window) {
        Notification.requestPermission().then(function (permission) {
            if (permission !== "granted") {
                alert("Please allow notification access!");
            }
        });
    } else {
        alert("This browser does not support notifications.");
    }
});

let timeoutIds = []; // Store timeout IDs for reminders

function closeModal() {
    document.getElementById("reminderModal").classList.add("hidden"); // Hide modal
}

function openModal() {
    document.getElementById("reminderModal").classList.remove("hidden"); // Show modal
}
//this is fetch only for reminder
async function fetchwo(language) {
    try {
        const response = await fetch(`http://localhost:5050/api/words?language=${language}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        const wordData = await response.json();
        console.log("Fetched Word Data:", wordData);

        // Ensure at least one word exists in the response
        if (Array.isArray(wordData) && wordData.length > 0) {
            // Option 1: Pick the first word
           // return wordData[0];

            // Option 2: Pick a random word (uncomment this line if desired)
             return wordData[Math.floor(Math.random() * wordData.length)];
        } else {
            throw new Error("No words available in the response.");
        }
    } catch (error) {
        console.error("Error fetching words:", error);
        return null;
    }
}
async function scheduleReminder() {
    const time = document.getElementById("time").value;
    const preferredLanguage = document.getElementById("preferredLanguage").value;

    if (!time) {
        alert("Please select a time!");
        return;
    }

    const currentDate = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const scheduledTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);

    const timeDifference = scheduledTime - currentDate;

    if (timeDifference > 0) {
        console.log(`Reminder set for ${time} with a time difference of ${timeDifference} ms.`);
        addReminderToTable(time);

        const word = await fetchwo(preferredLanguage);
        console.log("Fetched word for reminder:", word);

        const timeoutId = setTimeout(() => {
            const notificationSound = document.getElementById("notificationSound");
            if (notificationSound) {
                try {
                    notificationSound.play();
                } catch (error) {
                    console.error("Error playing notification sound:", error);
                }
            } else {
                console.warn("Notification sound element not found.");
            }

            const notificationMessage = word && word.word && word.meaning
                ? `${word.word}: ${word.meaning}`
                : `It's time for your reminder set at ${time}!`;

            if ("Notification" in window && Notification.permission === "granted") {
                new Notification("Reminder", {
                    body: notificationMessage,
                    requireInteraction: true,
                });
            } else {
                console.error("Notification not supported or permission denied.");
                alert(notificationMessage); // Fallback alert
            }
        }, timeDifference);

        timeoutIds.push(timeoutId); // Save timeout ID for future reference
        closeModal(); // Close modal after setting the reminder
    } else {
        console.error("The scheduled time is in the past.");
        alert("The scheduled time is in the past. Please select a future time.");
    }
}

function addReminderToTable(time) {
    const tableBody = document.getElementById("reminderTableBody");
    const row = tableBody.insertRow();

    const timeCell = row.insertCell(0);
    const actionCell = row.insertCell(1);

    timeCell.textContent = time; // Add the time to the table cell
    actionCell.innerHTML = '<button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onclick="deleteReminder(this);">Delete</button>';
}

function deleteReminder(button) {
    const row = button.closest("tr");
    const index = row.rowIndex - 1; // Adjust for table header row

    clearTimeout(timeoutIds[index]); // Clear the corresponding timeout
    timeoutIds.splice(index, 1); // Remove the timeout ID from the array

    row.remove(); // Remove the row from the table
}