// function updateClock() {
//     const now = new Date();

//     // Format hours and minutes
//     let hours = now.getHours();
//     let minutes = now.getMinutes();
//     let seconds = now.getSeconds();

//     // Convert to 12-hour format
//     let ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // 0 becomes 12

//     // Pad minutes/seconds with leading zero
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     // Update DOM
//     document.getElementById("timeWithoutSeconds").textContent = `${hours}:${minutes} ${ampm}`;
//     document.getElementById("timeInSeconds").textContent = `:${seconds}`;
// }

// updateClock();
// setInterval(updateClock, 1000);

// Define only the relevant iqamah times
const iqamahTimes = {
  Dhuhr: "11:45 AM",
  Asr: "03:20 PM"
};

// Convert "hh:mm AM/PM" to a Date object today
function parseTime(timeStr) {
  const now = new Date();
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
}

// Find next prayer (only Dhuhr or Asr)
function getNextPrayer() {
  const now = new Date();
  const dhuhrTime = parseTime(iqamahTimes.Dhuhr);
  const asrTime = parseTime(iqamahTimes.Asr);

  if (now < dhuhrTime) {
    return { prayer: "Remaining Until Dhuhr Iqamah", prayerTime: dhuhrTime };
  } else if (now < asrTime) {
    return { prayer: "Remaining Until Asr Iqamah", prayerTime: asrTime };
  } else {
    // After Asr, next is tomorrow's Dhuhr
    const tomorrowDhuhr = parseTime(iqamahTimes.Dhuhr);
    tomorrowDhuhr.setDate(tomorrowDhuhr.getDate() + 1);
    return { prayer: "Remaining Until Dhuhr Iqamah", prayerTime: tomorrowDhuhr };
  }
}

// Update countdown
function updateCountdown() {
  const now = new Date();
  const { prayer, prayerTime } = getNextPrayer();

  const diffMs = prayerTime - now;
  const diffSec = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;

  // Update DOM
  document.getElementById("whichPrayer").textContent = prayer;
  document.getElementById("timeWithoutSeconds").textContent =
    `${hours.toString().padStart(2,"0")} Hours, ${minutes.toString().padStart(2,"0")} Minutes, 
    ${seconds.toString().padStart(2,"0")} Seconds`;
}

// Run immediately and every second
updateCountdown();
setInterval(updateCountdown, 1000);