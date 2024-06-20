chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('refreshAlarm', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'refreshAlarm') {
        chrome.storage.local.get('isActive', function (result) {
            if (result.isActive) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs[0]) {
                        chrome.scripting.executeScript(
                            {
                                target: { tabId: tabs[0].id },
                                files: ['helpers.js']
                            },
                            () => {
                                chrome.tabs.sendMessage(tabs[0].id, { action: 'getTbody' }, (response) => {
                                    if (response) {
                                        if (response.rows) {
                                            sendMessage();
                                        }
                                        chrome.tabs.reload(tabs[0].id);
                                    }
                                });
                            }
                        );
                    }
                });
            }
        });
    }
});

async function sendMessage() {
    const botToken = '';
    const taniaId = '';
    const vovaId = '';
    const message = encodeURIComponent('New insurance');

    const url_tania = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${taniaId}&text=${message}`;
    const url_vova = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${vovaId}&text=${message}`;

    try {
        await fetch(url_tania, { method: 'POST' });
        await fetch(url_vova, { method: 'POST' });
    } catch (error) {
        console.error('Error:', error);
    }
}
