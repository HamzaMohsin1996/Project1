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

let timerInterval;
let startTime;

function startTimer() {
    startTime = Date.now();

    timerInterval = setInterval(function () {
        const elapsedTime = new Date(Date.now() - startTime);
        const hours = pad(elapsedTime.getUTCHours());
        const minutes = pad(elapsedTime.getUTCMinutes());
        const seconds = pad(elapsedTime.getUTCSeconds());

        timeElapsedSpan.textContent = `${hours}:${minutes}:${seconds}`;
        updateFlipClock(`${hours}${minutes}${seconds}`);
    }, 10); // Update every 10 milliseconds for more precise timing
}

function stopTimer() {
    clearInterval(timerInterval);
}

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

video.addEventListener('timeupdate', function () {
  const currentTime = video.currentTime;
  if (currentTime >= 5) {
    video.pause();
    videoButtons.style.display = 'block'; // Display control buttons at 5 seconds
    startTimer(); // Start the timer when video pauses at 5 seconds
  }
});

function startTimer() {
  startTime = Date.now();
  timerDiv.style.display = 'block'; // Display timer on button click

  timerInterval = setInterval(function () {
    const elapsedTime = new Date(Date.now() - startTime).toISOString().substr(11, 12);
    timeElapsedSpan.innerText = elapsedTime;
  }, 10); // Update every 10 milliseconds for more precise timing
}

function stopTimer() {
  clearInterval(timerInterval);
  const elapsedTime = new Date(Date.now() - startTime).toISOString().substr(11, 12);
  elapsedTimeDisplay.innerText = elapsedTime;
  displayTimeRecord(elapsedTime);
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
  setTimeout(() => {
    videoButtons.style.display = 'block'; // Show buttons after 5 seconds
  }, 5000);
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

// Function to stop timer and add time record when any button inside videoButtons is clicked
videoButtons.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    stopTimer();
  }
});
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

