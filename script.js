// Select necessary elements
const noteArea = document.getElementById('note');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const imageUploader = document.getElementById('imageUploader');

// Load saved note and dark mode state from localStorage on page load
window.onload = function() {
    const savedNote = localStorage.getItem('note');
    const darkMode = localStorage.getItem('darkMode');

    if (savedNote) {
        noteArea.innerHTML = savedNote;
    }

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Switch to Light Mode';
    }
};

// Save note content to localStorage
saveBtn.addEventListener('click', function() {
    const noteContent = noteArea.innerHTML;
    localStorage.setItem('note', noteContent);
    alert('Note saved!');
});

// Clear the note and remove from localStorage
clearBtn.addEventListener('click', function() {
    noteArea.innerHTML = '';
    localStorage.removeItem('note');
    alert('Note cleared!');
});

// Toggle dark mode
darkModeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = 'Switch to Dark Mode';
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = 'Switch to Light Mode';
    }
});

// Function to format text (bold, italic, underline, etc.)
function format(command) {
    document.execCommand(command, false, null);
}

// Change text color
function setColor() {
    const colorPicker = document.getElementById('colorPicker');
    document.execCommand('foreColor', false, colorPicker.value);
}

// Upload and insert image
imageUploader.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            noteArea.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});
