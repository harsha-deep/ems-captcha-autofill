function logToStorage(msg) {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const logLine = `[${timestamp}] ${msg}`;

    chrome.storage.local.get({ appLogs: [] }, (result) => {
        const newLogs = result.appLogs;
        newLogs.push(logLine);
        if (newLogs.length > 100) newLogs.shift();
        chrome.storage.local.set({ appLogs: newLogs });
    });
}


function attemptAutofill() {
    const captchaContainer = document.querySelector('.Captcha-box .fw-bold');
    const inputField = document.getElementById('captcha');

    if (captchaContainer && inputField) {
        let captchaText = "";

        if (captchaContainer.firstChild && captchaContainer.firstChild.nodeType === Node.TEXT_NODE) {
            captchaText = captchaContainer.firstChild.textContent.trim();
        } else {
            captchaText = captchaContainer.innerText.trim();
        }

        if (captchaText && inputField.value !== captchaText) {
            inputField.value = captchaText;

            inputField.dispatchEvent(new Event('input', { bubbles: true }));
            inputField.dispatchEvent(new Event('change', { bubbles: true }));

            console.log(`Autofilled captcha: "${captchaText}"`);
            logToStorage(`SUCCESS: Autofilled captcha '${captchaText}'`);
        }
    }
}

attemptAutofill();

const observer = new MutationObserver((_mutations) => {
    attemptAutofill();
});

observer.observe(document.body, { childList: true, subtree: true });