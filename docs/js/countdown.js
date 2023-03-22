// Set the countdown date to April 21, 2023
const countdownDate = new Date("April 21, 2023 00:00:00").getTime();

// Update the countdown every second
const countdownTimer = setInterval(function() {

  // Get today's date and time
  const now = new Date().getTime();

  // Calculate the distance between now and the countdown date
  const distance = countdownDate - now;

  // Calculate days, hours, minutes and seconds remaining
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the countdown element with the remaining time
  const summary = document.getElementById('countdown-summary')
  if (distance > 0) {
    summary.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s before clone deletion`
  } else {
    clearInterval(countdownTimer);
    countdownElement.innerHTML = "Sorry, you're going down now. Bye-bye plagiarizer!";
  }

}, 1000);
