(() => {
    const message = `
このアプリ内に表記している参加料金・フィールドマップは古い情報の場合がございます。、
ここでの情報は参考程度に、最新の情報は各施設の公式サイトをご確認ください。`;

    function showStartupPopup() {
        const overlay = document.createElement('div');
        overlay.className = 'startup-popup-overlay';
        overlay.setAttribute('role', 'presentation');

        const popup = document.createElement('div');
        popup.className = 'startup-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'true');
        popup.setAttribute('aria-labelledby', 'startup-popup-title');

        const title = document.createElement('h2');
        title.id = 'startup-popup-title';
        title.textContent = 'はじめに';

        const content = document.createElement('p');
        content.className = 'startup-popup-message';
        content.textContent = message;

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'startup-popup-close';
        closeButton.textContent = '閉じる';

        const closePopup = () => {
            overlay.remove();
        };

        closeButton.addEventListener('click', closePopup);

        popup.append(title, content, closeButton);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        closeButton.focus();
    }

        // share popup

    function showSharePopup() {
        const overlay = document.createElement('div');
        overlay.className = 'share-popup-overlay';
        overlay.setAttribute('role', 'presentation');

        const popup = document.createElement('div');
        popup.className = 'share-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'true');
        popup.setAttribute('aria-labelledby', 'share-popup-title');

        const title = document.createElement('h2');
        title.id = 'share-popup-title';
        title.textContent = 'share';

        const qrImage = document.createElement('img');
        qrImage.className = 'share-popup-qr';
        qrImage.src = 'images/QR.png';
        qrImage.alt = '共有用QRコード';

        const linkRow = document.createElement('div');
        linkRow.className = 'share-popup-link-row';

        const link = document.createElement('input');
        link.type = 'text';
        link.className = 'share-popup-link';
        link.value = 'https://81yoshi.github.io/AirsoftFieldMap/';
        link.readOnly = true;
        link.setAttribute('aria-label', '共有リンク');

        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'share-popup-copy';
        copyButton.setAttribute('aria-label', 'リンクをコピー');

        const copyStatus = document.createElement('p');
        copyStatus.className = 'share-popup-status';
        copyStatus.setAttribute('aria-live', 'polite');

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'share-popup-close';
        closeButton.textContent = '閉じる';

        const closePopup = () => {
            overlay.remove();
        };

        copyButton.addEventListener('click', async () => {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(link.value);
                } else {
                    throw new Error('Clipboard API is unavailable');
                }
                copyStatus.textContent = 'リンクをコピーしました';
            } catch (error) {
                copyStatus.textContent = 'コピーに失敗しました。リンクを選択してコピーしてください。';
                console.error('couldn\'t copy the link:', error);
            }
        });

        closeButton.addEventListener('click', closePopup);

        linkRow.append(link, copyButton);
        popup.append(title, qrImage, linkRow, copyStatus, closeButton);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        closeButton.focus();
    }

    const shareButton = document.getElementById('share-button');
    if (shareButton) shareButton.addEventListener('click', showSharePopup);

    showStartupPopup();
})();