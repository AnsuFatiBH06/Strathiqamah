function updateClock() {
    const now = new Date();

    // Format hours and minutes
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Convert to 12-hour format
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    // Pad minutes/seconds with leading zero
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Update DOM
    document.getElementById("timeWithoutSeconds").textContent = `${hours}:${minutes} ${ampm}`;
    document.getElementById("timeInSeconds").textContent = `:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);