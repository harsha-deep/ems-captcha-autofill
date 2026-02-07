document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('log-container');
    const clearBtn = document.getElementById('clear');
    const refreshBtn = document.getElementById('refresh');

    function loadLogs() {
        chrome.storage.local.get({ appLogs: [] }, (result) => {
            if (result.appLogs.length === 0) {
                container.textContent = "No logs recorded yet.";
            } else {
                container.textContent = result.appLogs.join('\n');
            }
        });
    }

    clearBtn.addEventListener('click', () => {
        chrome.storage.local.set({ appLogs: [] }, () => {
            loadLogs();
        });
    });

    refreshBtn.addEventListener('click', loadLogs);

    loadLogs();
});