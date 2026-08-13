document.addEventListener('DOMContentLoaded', async () => {

    const TARGET_HOST = "smartcsg.karnataka.gov.in";

    const siteNameEl = document.getElementById('siteName');
    const badgeActive = document.getElementById('badge-active');
    const badgeUnsupported = document.getElementById('badge-unsupported');
    const logsBtn = document.getElementById('logsBtn');

    let currentSite = "";
    let isTargetSite = false;

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

    function render() {
        badgeActive.classList.remove('visible');
        badgeUnsupported.classList.remove('visible');

        siteNameEl.textContent = currentSite || "Unknown";

        if (isTargetSite) {
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
            const captchaContainer = document.querySelector('.captcha-code-modern1');
            const inputField = document.querySelector('.captcha-input-modern1');

            if (captchaContainer && inputField) {
                const captchaText = captchaContainer.firstChild ? captchaContainer.firstChild.textContent.trim() : captchaContainer.textContent.trim();

                inputField.value = captchaText;

                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));

                console.log(`Captcha autofilled (Manual Trigger): "${captchaText}"`);
            }
        }
    });
}