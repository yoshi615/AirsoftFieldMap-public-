(() => {
    const message = `
このアプリ内に表記している参加料金は土日祝の金額です。
平日、半日等の料金は各欄のリンクから確認できます。
また、各欄にあるフィールドマップは実際のものに比べて古い場合がありますので、
最新の情報は各施設の公式サイトをご確認ください。`;

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
            document.removeEventListener('keydown', handleKeydown);
        };

        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                closePopup();
            }
        };

        closeButton.addEventListener('click', closePopup);

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closePopup();
            }
        });

        document.addEventListener('keydown', handleKeydown);

        popup.append(title, content, closeButton);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        closeButton.focus();
    }

    showStartupPopup();
})();