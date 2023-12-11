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
const video = document.getElementById('videoPlayer');
const videoButtons = document.getElementById('videoButtons');
const timerDiv = document.getElementById('timer');
const timeElapsedSpan = document.getElementById('timeElapsed');
const timeTable = document.getElementById('timeTable');
const timeTableBody = document.getElementById('timeTableBody');



let videoIndex = 0;


let timerInterval;
let startTime;
const frontButtonVideos = [
  './Assets/images/1.AmbulanceMoveLeft-Audio.mp4',
  './Assets/images/2.AmbulancePass-Audio.mp4',
  './Assets/images/3.ambulanceCrossSuccess-Audio.mp4',
  './Assets/images/4.ambulanceHit-Audio.mp4',
];
const leftButtonVideos = [
    './Assets/images/1.AmbulanceMoveLeft-Audio.mp4',
    './Assets/images/2.AmbulancePass-Audio.mp4',
  './Assets/images/3.ambulanceCrossSuccess-Audio.mp4',
  './Assets/images/4.ambulanceHit-Audio.mp4'
];



let leftVideoIndex = 0;
let frontVideoIndex = 0;
let currentVideos = leftButtonVideos;
// Rest of your existing code...
let timerData = []; // Initialize an array to store timer data

function saveTimerData() {
  localStorage.setItem('timerData', JSON.stringify(timerData));
}

function loadTimerData() {
  const storedData = localStorage.getItem('timerData');
  if (storedData) {
    timerData = JSON.parse(storedData);
  }
}



document.getElementById('leftButton').addEventListener('click', function() {
  stopTimer();
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  recordTime(leftButtonVideos[leftVideoIndex], elapsedTime);

  if (leftVideoIndex < leftButtonVideos.length - 1) {
    leftVideoIndex++;
    video.src = leftButtonVideos[leftVideoIndex];
    startNextVideo(); // Add classes when the next video starts
  } else {
    alert('All left button videos have been played');
  }
});

document.getElementById('frontButton').addEventListener('click', function() {
  stopTimer();
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  recordTime(frontButtonVideos[frontVideoIndex], elapsedTime);

  if (frontVideoIndex < frontButtonVideos.length - 1) {
    frontVideoIndex++;
    video.src = frontButtonVideos[frontVideoIndex];
    startNextVideo(); // Add classes when the next video starts
  } else {
    alert('All front button videos have been played');
  }
});

function startNextVideo() {
  video.play();
  videoButtons.classList.add('hidden');
  timerDiv.classList.add('hidden');
  startTimer();
}

video.addEventListener('ended', function() {
  videoButtons.classList.remove('hidden');
  timerDiv.classList.remove('hidden');
  // timeTable.classList.remove('hidden');  
  startTimer();
});

function startTimer() {
  startTime = Date.now();

  timerInterval = setInterval(function() {
    const elapsedTime = Date.now() - startTime;
    timeElapsedSpan.textContent = formatTime(elapsedTime);
  }, 10); // Update every 10 milliseconds for more precise timing
}

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  const millisecondsPart = padMilliseconds(date.getUTCMilliseconds());

  return `${hours}:${minutes}:${seconds}.${millisecondsPart}`;
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

function padMilliseconds(value) {
  return value.toString().padStart(3, '0');
}

function recordTime(videoName, time) {
  const formattedTime = formatTime(time);
  timerData.push({ videoName, formattedTime });
  saveTimerData(); // Save timer data to local storage after each recording
}

function stopTimer() {
  clearInterval(timerInterval);
}

// // Modify the recordTime function to include formatted time values
// function recordTime(videoName, time) {
//   const formattedTime = formatTime(time);
//   const newRow = `<tr><td>${videoName}</td><td>${formattedTime}</td></tr>`;
//   timeTableBody.innerHTML += newRow;
// }
function displayTimerData() {
  const displayContainer = document.getElementById('timerDataDisplay'); // Replace 'timerDataDisplay' with your display element ID
  displayContainer.innerHTML = ''; // Clear previous data
  
  timerData.forEach((record, index) => {
    const { videoName, formattedTime } = record;
    const row = document.createElement('div');
    row.innerHTML = `<p><strong>Video Name:</strong> ${videoName}</p><p><strong>Time:</strong> ${formattedTime}</p>`;
    displayContainer.appendChild(row);
  });
}
function resetUI() {
  videoButtons.classList.add('hidden');
  timerDiv.classList.remove('hidden');
  timeElapsedSpan.textContent = '00:00:00.000';
}

video.src = currentVideos[videoIndex];
video.play();


document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    handleLeftArrowKeyPress();
  } else if (event.code === 'ArrowUp') {
    handleFrontArrowKeyPress();
  }
});

function handleLeftArrowKeyPress() {
  stopTimer();
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  recordTime(leftButtonVideos[leftVideoIndex], elapsedTime);

  if (leftVideoIndex < leftButtonVideos.length - 1) {
    leftVideoIndex++;
    video.src = leftButtonVideos[leftVideoIndex];
    startNextVideo(); // Add classes when the next video starts
  } else {
    alert('All left button videos have been played');
  }
}

function handleFrontArrowKeyPress() {
  stopTimer();
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  recordTime(frontButtonVideos[frontVideoIndex], elapsedTime);

  if (frontVideoIndex < frontButtonVideos.length - 1) {
    frontVideoIndex++;
    video.src = frontButtonVideos[frontVideoIndex];
    startNextVideo(); // Add classes when the next video starts
  } else {
    alert('All front button videos have been played');
  }
}
loadTimerData();
displayTimerData();


// // Function to request full-screen mode for the video
// function requestFullScreen() {
//   if (video.requestFullscreen) {
//     video.requestFullscreen();
//   } else if (video.mozRequestFullScreen) {
//     video.mozRequestFullScreen();
//   } else if (video.webkitRequestFullscreen) {
//     video.webkitRequestFullscreen();
//   } else if (video.msRequestFullscreen) {
//     video.msRequestFullscreen();
//   }
// }

// // Automatically request full-screen mode when the page loads
// window.onload = () => {
//   requestFullScreen();
// };
function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.querySelector('.sidebar-toggle i.fa-bars');
  var sidebarClose = document.querySelector('.sidebar-toggle i.fa-times');
  var mainContent = document.querySelector('.main-content');

  if (sidebar.classList.contains('show')) {
    sidebar.classList.remove('show');
    mainContent.style.marginRight = '0';
    sidebarToggle.style.display = 'inline-block';
    sidebarClose.style.display = 'none';
  } else {
    sidebar.classList.add('show');
    mainContent.style.marginRight = '440px'; // Adjust margin accordingly
    sidebarToggle.style.display = 'none';
    sidebarClose.style.display = 'inline-block';
  }
}
