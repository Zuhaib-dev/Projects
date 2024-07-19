document.addEventListener('DOMContentLoaded', function() {
    const timeDisplay = document.getElementById('time');
    const alarmTimeInput = document.getElementById('alarmTime');
    const setAlarmButton = document.getElementById('setAlarmButton');
    const stopAlarmButton = document.getElementById('stopAlarmButton');
    const snoozeAlarmButton = document.getElementById('snoozeAlarmButton');
    const alarmMessage = document.getElementById('alarmMessage');
    const alarmSound = document.getElementById('alarmSound');
    let alarmTime = null;
    let alarmTimeout = null;

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        if (alarmTime && `${hours}:${minutes}` === alarmTime) {
            alarmMessage.textContent = 'Wake up!';
            alarmSound.play();
            clearTimeout(alarmTimeout);
        }
    }

    setAlarmButton.addEventListener('click', function() {
        alarmTime = alarmTimeInput.value;
        alarmMessage.textContent = `Alarm set for ${alarmTime}`;
    });

    stopAlarmButton.addEventListener('click', function() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmMessage.textContent = 'Alarm stopped';
    });

    snoozeAlarmButton.addEventListener('click', function() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmMessage.textContent = 'Alarm snoozed for 5 minutes';
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        alarmTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    });

    setInterval(updateTime, 1000);
    updateTime();
});
