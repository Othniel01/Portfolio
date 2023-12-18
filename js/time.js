function updateTime() {
  // Get the time
  var currentTime = new Date();

  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12;

  var formattedTime = hours + ":" + padZero(minutes) + " " + ampm;

  document.getElementById("currentTime").textContent = formattedTime;
}

function padZero(num) {
  return num < 10 ? "0" + num : num;
}

setInterval(updateTime, 1000);

updateTime();
