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
    
  });
})(jQuery);
const video = document.getElementById('videoPlayer');
const videoButtons = document.getElementById('videoButtons');
const timerDiv = document.getElementById('timer');
const timeElapsedSpan = document.getElementById('timeElapsed');
const elapsedTimeDisplay = document.getElementById('elapsedTimeDisplay');
const timeTableBody = document.getElementById('timeTableBody');
let pauseDuration = 5; // Default pause duration in seconds
let timerRunning = false; // Initialize a variable to track if the timer is running


let timerInterval;
let startTime;

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function updateFlipClock(time) {
    const digits = time.split('');

    document.querySelectorAll('.flip-clock').forEach((clock, index) => {
        const [top, bottom] = clock.querySelectorAll('.card');

        top.textContent = digits[index];
        bottom.textContent = digits[index];

        top.style.transform = 'rotateX(0deg) translateY(-100%) rotateX(-180deg)';
        bottom.style.transform = 'rotateX(180deg)';
    });
}
 

// ... (other code)

function startTimer() {
  startTime = Date.now(); // Set the start time when the timer starts
  timerDiv.style.display = 'block'; // Display timer on button click

  // Show the table when the timer starts
  document.getElementById('timeTable').style.display = 'table';

  timerInterval = setInterval(function () {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime; // Calculate elapsed time
    const formattedElapsedTime = formatTime(elapsedTime);
    timeElapsedSpan.textContent = formattedElapsedTime;
    updateFlipClock(formattedElapsedTime);
  }, 10); // Update every 10 milliseconds for more precise timing
}

function stopTimer() {
  clearInterval(timerInterval);

  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;

    const formattedElapsedTime = formatTime(elapsedTime);
    elapsedTimeDisplay.innerText = formattedElapsedTime;
    displayTimeRecord(formattedElapsedTime);
}

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / (60 * 60 * 1000));
  const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  const remainingMilliseconds = milliseconds % 1000;

  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);
  const formattedMilliseconds = padMilliseconds(remainingMilliseconds);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function padMilliseconds(milliseconds) {
  if (milliseconds < 10) {
    return `00${milliseconds}`;
  } else if (milliseconds < 100) {
    return `0${milliseconds}`;
  }
  return milliseconds;
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

function displayTimeRecord(elapsedTime) {
  const videoName = video.src.substring(video.src.lastIndexOf('/') + 1); // Extract video name from the source
    const newRow = `<tr><td>${videoName}</td><td>${elapsedTime}</td></tr>`;
    timeTableBody.innerHTML += newRow;
    document.getElementById('timeTable').style.display = 'table';
  
}

function playVideo(videoSrc) {
    stopTimer(); // Stop the timer
    video.src = videoSrc; // Change video source
    video.play();
    videoButtons.style.display = 'none'; // Hide buttons after video change
    timerDiv.style.display = 'none'; // Hide timer display

    if (videoSrc.includes('bus-inside-view')) {
        pauseDuration = 9; // Pause duration for 'bus-inside-view' video is 10 seconds
    } else if (videoSrc.includes('front-view')) {
        pauseDuration = 5; // Pause duration for 'front-view' video is 50 seconds
    } else {
        pauseDuration = 3; // Default pause duration for other videos
    }

    video.addEventListener('timeupdate', function pauseAtDuration() {
        const currentTime = video.currentTime;
        if (currentTime >= pauseDuration) {
            video.pause();
            videoButtons.style.display = 'block'; // Display control buttons at specified pause duration
            startTimer(); // Start the timer when video pauses
            video.removeEventListener('timeupdate', pauseAtDuration); // Remove the event listener after pausing
        }
    });

    setTimeout(() => {
        videoButtons.style.display = 'block'; // Show buttons after the specified pause duration
    }, pauseDuration * 1000);
}

// Initialize the default video
playVideo('https://ia601502.us.archive.org/31/items/front-view_202311/front-view.mp4');

// Function to handle button clicks
function handleButtonClick(event) {
    if (event.target.tagName === 'BUTTON') {
        stopTimer();
        if (event.target.id === 'leftBtn') {
            playVideo('https://ia601206.us.archive.org/18/items/bus-inside-view/bus-inside-view.mp4');
        } else if (event.target.id === 'upBtn') {
            playVideo('https://ia601502.us.archive.org/31/items/front-view_202311/front-view.mp4');
        } else if (event.target.id === 'rightBtn') {
            playVideo('https://ia601202.us.archive.org/35/items/bus-inner-view/bus-inner-view.mp4');
        }
    }
}
function playLeftVideo() {
  playVideo('https://ia601206.us.archive.org/18/items/bus-inside-view/bus-inside-view.mp4');
}

function playFrontVideo() {
  playVideo('https://ia601502.us.archive.org/31/items/front-view_202311/front-view.mp4');
}

function playThirdVideo() {
  playVideo('https://ia601202.us.archive.org/35/items/bus-inner-view/bus-inner-view.mp4');
}

// Event listener for button clicks
videoButtons.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  if (event.target.tagName === 'BUTTON') {
    stopTimer();
    if (event.target.id === 'leftButton') {
      playLeftVideo();
    } else if (event.target.id === 'frontButton') {
      playFrontVideo();
    } else if (event.target.id === 'rightButton') {
      playThirdVideo();
    }
  }
}
function handleMouseHover(event) {
  if (event.target.tagName === 'BUTTON') {
    if (event.target.id === 'leftButton') {
      // Handle mouse hover on left button
      // For example: Show some tooltip or perform some action
    } else if (event.target.id === 'frontButton') {
      // Handle mouse hover on front button
      // For example: Show some tooltip or perform some action
    } else if (event.target.id === 'rightButton') {
      // Handle mouse hover on right button
      // For example: Show some tooltip or perform some action
    }
  }
}

videoButtons.addEventListener('click', handleButtonClick);

videoButtons.addEventListener('mouseover', handleMouseHover);

document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowLeft') {
    playLeftVideo();
  } else if (event.code === 'ArrowUp') {
    playFrontVideo();
  } else if (event.code === 'ArrowRight') {
    playThirdVideo();
  }
});

