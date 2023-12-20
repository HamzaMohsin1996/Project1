jQuery.noConflict();
(function( $ ) {
  $(function() {
    // More code using $ as alias to jQuery
    // $('button').click(function(){
    //     $('#exampleModal').modal('show');
    // });
    $(".custom-modal-btn").click(function(){
      $("#vehicle-view-popup").modal('show');
    });
    $(".close-popup-btn").click(function(){
      $("#vehicle-view-popup").modal('hide');
    });
    $('.custom-btn-white').on('click', function() {
      // Remove 'active' class from all buttons
      $('.custom-btn-white').removeClass('active');
  
      // Add 'active' class to the clicked button
      $(this).addClass('active');
    });
    $('.new-btn').on('click', function() {
      // Remove 'active' class from all buttons
      $('.new-btn').removeClass('active');
  
      // Add 'active' class to the clicked button
      $(this).addClass('active');
    });
    
  });
})(jQuery);
const video = document.getElementById('myVideo');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');

const intervals = [
  { start: 17, end: 24, label: 'Response Time (17-24s)' },
  { start: 36, end: 42.5, label: 'Response Time (36-42.5s)' },
  { start: 74, end: 86, label: 'Response Time (74-86s)' },
  { start: 119, end: 130, label: 'Response Time (119-130s)' },
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
    const responseTime = formatTime(currentTime - startTime);
    const intervalLabel = intervals.find(interval => !intervalsClicked[interval.label]).label;

    addResponseTime(buttonId, responseTime, intervalLabel); // Store in local storage
    updateTable(buttonId, responseTime, intervalLabel); // Update the table

    intervalsClicked[intervalLabel] = true;
    recording = false;
  }
}

button2.addEventListener('click', () => {
  handleButtonClick('Straight ANV');
});

button3.addEventListener('click', () => {
  handleButtonClick('Right ANV');
});

button4.addEventListener('click', () => {
  if (
    !intervalsClicked['Response Time (45-57s)'] &&
    button4.style.display !== 'none' &&
    recording
  ) {
    handleButtonClick('Stop ANV');
  }
});

document.addEventListener('keydown', (event) => {
  const currentTime = getCurrentTime();
  const keyName = event.key;

  let buttonId = '';
  switch (keyName) {
    case 'd':
      buttonId = 'RightLane ANV';
      break;
    case 's':
      buttonId = 'Stop ANV';
      break;
    case 'w':
      buttonId = 'Straight ANV';
      break;
    default:
      break;
  }

  if (recording && buttonId !== '') {
    event.preventDefault(); // Prevent default action
    handleButtonClick(`${buttonId} (${keyName})`);
  }
});
// Function to update the table with response times
function updateTable(buttonId, responseTime, intervalLabel) {
  const clickTimesTable = document.getElementById('clickTimesTable');
  const newRow = clickTimesTable.insertRow(-1);

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);

  cell1.innerHTML = buttonId;
  cell2.innerHTML = intervalLabel;
  cell3.innerHTML = responseTime;
}


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
