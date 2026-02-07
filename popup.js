document.addEventListener('DOMContentLoaded', async () => {

    const TARGET_HOST = "smartcsg.karnataka.gov.in";

    const toggleBtn = document.getElementById('toggleBtn');
    const siteNameEl = document.getElementById('siteName');
    const badgeActive = document.getElementById('badge-active');
    const badgeUnsupported = document.getElementById('badge-unsupported');
    const badgeDisabled = document.getElementById('badge-disabled');
    const logsBtn = document.getElementById('logsBtn');

    let isEnabled = true;
    let currentSite = "";
    let isTargetSite = false;

    const storageData = await chrome.storage.local.get(['isEnabled']);
    if (storageData.isEnabled !== undefined) {
        isEnabled = storageData.isEnabled;
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab?.url) {
        try {
            const url = new URL(tab.url);
            currentSite = url.hostname;
            isTargetSite = currentSite.includes(TARGET_HOST);
        } catch (e) {
            currentSite = "Unknown Page";
        }
    }

    render();

    toggleBtn.addEventListener('click', () => {
        isEnabled = !isEnabled;
        chrome.storage.local.set({ isEnabled });
        render();
    });

    function render() {
        if (isEnabled) {
            toggleBtn.classList.add('active');
        } else {
            toggleBtn.classList.remove('active');
        }

        badgeActive.classList.remove('visible');
        badgeUnsupported.classList.remove('visible');
        badgeDisabled.classList.remove('visible');

        siteNameEl.textContent = currentSite || "Unknown";

        if (!isEnabled) {
            badgeDisabled.classList.add('visible');
        } else if (isTargetSite) {
            badgeActive.classList.add('visible');
            if (tab?.id) {
                triggerAutofill(tab.id);
            }
        } else {
            badgeUnsupported.classList.add('visible');
        }
    }
});

logsBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'logs.html' });
});

function triggerAutofill(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
            const captchaContainer = document.querySelector('.Captcha-box .fw-bold');
            const inputField = document.getElementById('captcha');

            if (captchaContainer && inputField) {
                const captchaText = captchaContainer.firstChild ? captchaContainer.firstChild.textContent.trim() : captchaContainer.textContent.trim();

                inputField.value = captchaText;

                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));

                console.log(`Captcha autofilled (Manual Trigger): "${captchaText}"`);
                logToStorage(`Captcha autofilled (Manual Trigger): "${captchaText}"`);
            }
        }
    });
}