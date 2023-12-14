const video = document.getElementById('myVideo');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');

const intervals = [
  { start: 7, end: 13.5, label: 'Response Time (7-13.5s)' },
  { start: 45, end: 57, label: 'Response Time (45-57s)' },
  { start: 90, end: 115, label: 'Response Time (90-115s)' },
];

let recording = false;
let startTime = 0;
let intervalsClicked = {};

// Initialize intervalsClicked object
intervals.forEach(interval => {
  intervalsClicked[interval.label] = false;
});

// Function to calculate current video time
function getCurrentTime() {
  return video.currentTime;
}

// Function to add Response times to localStorage
function addResponseTime(buttonId, ResponseTime, intervalLabel) {
  const storedTimes = JSON.parse(localStorage.getItem('ResponseTimes')) || {};

  if (!storedTimes[buttonId]) {
    storedTimes[buttonId] = {};
  }
  storedTimes[buttonId][intervalLabel] = ResponseTime;

  localStorage.setItem('ResponseTimes', JSON.stringify(storedTimes));
  // localStorage.setItem(`reaction_${localStorageCounter}`, JSON.stringify(storedTimes));

}

// Event listener for video time updates
video.addEventListener('timeupdate', () => {
  const currentTime = getCurrentTime();

  if (!recording) {
    for (const interval of intervals) {
      if (
        currentTime >= interval.start &&
        currentTime <= interval.end &&
        !intervalsClicked[interval.label]
      ) {
        recording = true;
        startTime = currentTime; // Store the start time
        break;
      }
    }
  } else {
    let found = false;
    for (const interval of intervals) {
      if (currentTime >= interval.start && currentTime <= interval.end) {
        found = true;
        break;
      }
    }
    if (!found) {
      recording = false;
    }
  }
});
function formatTime(currentTime) {
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime - minutes * 60);
  const milliseconds = ((currentTime - minutes * 60 - seconds) * 1000).toFixed(0);
  return `${minutes}:${seconds}:${milliseconds}`;
}
// Function to handle button clicks and arrow key presses
function handleButtonClick(buttonId) {
  if (recording) {
    const currentTime = getCurrentTime();
    const ResponseTime =formatTime(currentTime - startTime) ; // Calculate the Response time
    addResponseTime(buttonId, ResponseTime, intervals.find(interval => !intervalsClicked[interval.label]).label);
    intervalsClicked[intervals.find(interval => !intervalsClicked[interval.label]).label] = true;
    recording = false;
  }
}

// Event listeners for button clicks
button1.addEventListener('click', () => {
  handleButtonClick('Left Turn');
});

button2.addEventListener('click', () => {
  handleButtonClick('Straight');
});

button3.addEventListener('click', () => {
  handleButtonClick('Right Turn');
});

button4.addEventListener('click', () => {
  if (
    !intervalsClicked['Response Time (45-57s)'] &&
    button4.style.display !== 'none' &&
    recording
  ) {
    handleButtonClick('Button 4');
  }
});

document.addEventListener('keydown', (event) => {
  const currentTime = getCurrentTime();
  const keyName = event.key;

  let buttonId = '';
  switch (keyName) {
    case 'ArrowLeft':
      buttonId = 'LeftLane';
      break;
    case 'ArrowRight':
      buttonId = 'RightLane';
      break;
    case ' ':
      buttonId = 'Brake';
      break;
    case 'ArrowUp':
      buttonId = 'Straight';
      break;
    default:
      break;
  }

  if (recording && buttonId !== '') {
    event.preventDefault(); // Prevent default action
    handleButtonClick(`${buttonId} (${keyName})`);
  }
});

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.querySelector('.sidebar-toggle i.fa-bars');
  var sidebarClose = document.querySelector('.sidebar-toggle i.fa-times');
  var mainContent = document.querySelector('.main-content');

  if (sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
    mainContent.classList.remove('active');
    mainContent.style.marginRight = '0';
    sidebarToggle.style.display = 'inline-block';
    sidebarClose.style.display = 'none';
  } else {
    sidebar.classList.add('show');
    mainContent.classList.add('active');

    mainContent.style.marginRight = '440px'; // Adjust margin accordingly
    sidebarToggle.style.display = 'none';
    sidebarClose.style.display = 'inline-block';
  }
}
