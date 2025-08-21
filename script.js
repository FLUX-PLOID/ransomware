document.addEventListener('DOMContentLoaded', () => {
    const sound = document.getElementById('warningSound');
    const fileCount = document.getElementById('fileCount');
    const timer = document.getElementById('timer');
    const unlockBtn = document.getElementById('unlockBtn');
    const codeInput = document.getElementById('codeInput');
    
    // Play warning sound (loop)
    sound.play().catch(e => console.log('Audio play failed:', e));
    
    // Block mouse right click
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Block keyboard shortcuts
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.key === 'F12' || e.key === 'F5') {
            e.preventDefault();
        }
    });
    
    // Block back button
    history.pushState(null, null, location.href);
    window.onpopstate = () => history.pushState(null, null, location.href);
    
    // Animate file encryption
    let progress = 0;
    const fileInterval = setInterval(() => {
        progress += 1;
        fileCount.innerHTML = `Encrypting files: <span>${progress}%</span>`;
        if (progress >= 100) clearInterval(fileInterval);
    }, 50);
    
    // Countdown timer
    let seconds = 300; // 5 minutes
    const timerInterval = setInterval(() => {
        seconds--;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        if (seconds <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "00:00";
            timer.style.color = "#00ff00";
        }
    }, 1000);
    
    // Unlock function
    unlockBtn.addEventListener('click', () => {
        if (codeInput.value === 'SECURE123') {
            clearInterval(fileInterval);
            clearInterval(timerInterval);
            sound.pause();
            
            // Allow closing the page
            window.onbeforeunload = null;
            
            alert("Simulation ended successfully!\n\nThis demonstration showed how ransomware locks a system.");
            window.location.href = 'about:blank';
        } else {
            alert("Invalid code! Try again.\nHint: Check the disclaimer message");
            codeInput.value = '';
        }
    });
});