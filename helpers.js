// Listen for messages from the service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const rows = document.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');

        if (cells) {
            const statusContainer = cells[1].getElementsByTagName('div');
            const bgColor = window.getComputedStyle(statusContainer[0]).backgroundColor;

            if (bgColor === 'rgb(255, 255, 0)') { // Yellow in RGB format
                sendResponse({ rows: true });
            }
        }
    }

    sendResponse({ rows: false });
});