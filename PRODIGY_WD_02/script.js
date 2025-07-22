let startTime = 0;
let running = false;
let interval;

function startStop() {
  if (!running) {
    startTime = Date.now() - (startTime || 0);
    interval = setInterval(updateDisplay, 10);
    document.getElementById("startStop").innerText = "Pause";
    running = true;
  } else {
    clearInterval(interval);
    document.getElementById("startStop").innerText = "Start";
    running = false;
  }
}

function reset() {
  clearInterval(interval);
  startTime = 0;
  running = false;
  document.getElementById("display").innerText = "00:00:00.00";
  document.getElementById("lapTimes").innerHTML = "";
  document.getElementById("startStop").innerText = "Start";
}

function lap() {
  if (!running) return;
  const lapTime = document.createElement("li");
  lapTime.innerText = document.getElementById("display").innerText;
  document.getElementById("lapTimes").appendChild(lapTime);
}

function updateDisplay() {
  const time = Date.now() - startTime;
  const ms = time % 1000;
  const sec = Math.floor(time / 1000) % 60;
  const min = Math.floor(time / (1000 * 60)) % 60;
  const hrs = Math.floor(time / (1000 * 60 * 60));

  const formatted = `${pad(hrs)}:${pad(min)}:${pad(sec)}.${pad(ms, 2)}`;
  document.getElementById("display").innerText = formatted;
}

function pad(num, digits = 2) {
  return num.toString().padStart(digits, '0');
}
