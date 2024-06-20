document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('isActive', function (result) {
        const isActive = result.isActive;
        const buttonContainer = document.getElementById('buttonContainer');

        // Create Start Button
        const startButton = document.createElement('button');
        startButton.id = 'startButton';
        startButton.className = 'start-button';
        startButton.textContent = 'Start';

        // Create Stop Button
        const stopButton = document.createElement('button');
        stopButton.id = 'stopButton';
        stopButton.className = 'stop-button';
        stopButton.textContent = 'Stop';

        // Append buttons based on isActive state
        if (isActive) {
            stopButton.style.display = 'block';
            buttonContainer.appendChild(stopButton);
        } else {
            startButton.style.display = 'block';
            buttonContainer.appendChild(startButton);
        }

        // Add event listeners
        startButton.addEventListener('click', function () {
            chrome.storage.local.set({ isActive: true }, function () {
                stopButton.style.display = 'block';
                startButton.style.display = 'none';
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true
                }));
            });
        });

        stopButton.addEventListener('click', function () {
            chrome.storage.local.set({ isActive: false }, function () {
                stopButton.style.display = 'none';
                startButton.style.display = 'block';
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true
                }));
            });
        });
    });
});
