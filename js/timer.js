/**
 * Savoria Interactive Kitchen Timer
 * Supports custom timers, step-specific timers, audio alarms, and notifications.
 */

class KitchenTimer {
  constructor(options = {}) {
    this.totalSeconds = options.duration || 300;
    this.remainingSeconds = this.totalSeconds;
    this.isRunning = false;
    this.intervalId = null;
    this.onTick = options.onTick || null;
    this.onComplete = options.onComplete || null;
    this.label = options.label || 'Cooking Timer';
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    KitchenAudio.init();

    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      if (this.onTick) {
        this.onTick(this.remainingSeconds, this.totalSeconds);
      }

      if (this.remainingSeconds <= 0) {
        this.stop();
        KitchenAudio.playAlarm();
        if (this.onComplete) {
          this.onComplete(this.label);
        }
      }
    }, 1000);
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset(newDuration = null) {
    this.pause();
    if (newDuration !== null) {
      this.totalSeconds = newDuration;
    }
    this.remainingSeconds = this.totalSeconds;
    if (this.onTick) {
      this.onTick(this.remainingSeconds, this.totalSeconds);
    }
  }

  addSeconds(secs) {
    this.remainingSeconds += secs;
    this.totalSeconds += secs;
    if (this.onTick) {
      this.onTick(this.remainingSeconds, this.totalSeconds);
    }
  }

  stop() {
    this.pause();
    this.remainingSeconds = 0;
  }

  static formatTime(seconds) {
    const totalSecs = Math.max(0, Math.floor(seconds));
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

// Global Quick Timer Manager
const TimerManager = (function () {
  let activeTimer = null;
  let floatingTimerEl = null;

  function init() {
    floatingTimerEl = document.getElementById('floating-timer-widget');
  }

  function startQuickTimer(seconds, label = 'Step Timer') {
    if (activeTimer) {
      activeTimer.stop();
    }

    showFloatingWidget(label);

    activeTimer = new KitchenTimer({
      duration: seconds,
      label: label,
      onTick: (remaining, total) => {
        updateFloatingWidget(remaining, total, label);
      },
      onComplete: (completedLabel) => {
        onTimerFinished(completedLabel);
      }
    });

    activeTimer.start();
    KitchenAudio.playChime();
  }

  function showFloatingWidget(label) {
    if (!floatingTimerEl) floatingTimerEl = document.getElementById('floating-timer-widget');
    if (!floatingTimerEl) return;
    floatingTimerEl.classList.remove('hidden');
    floatingTimerEl.classList.add('active');
    const labelEl = floatingTimerEl.querySelector('.timer-widget-label');
    if (labelEl) labelEl.textContent = label;
  }

  function updateFloatingWidget(remaining, total, label) {
    if (!floatingTimerEl) return;
    const timeEl = floatingTimerEl.querySelector('.timer-widget-time');
    const progressEl = floatingTimerEl.querySelector('.timer-progress-fill');
    if (timeEl) timeEl.textContent = KitchenTimer.formatTime(remaining);
    if (progressEl) {
      const pct = Math.max(0, Math.min(100, ((total - remaining) / total) * 100));
      progressEl.style.width = `${pct}%`;
    }
  }

  function onTimerFinished(label) {
    if (!floatingTimerEl) return;
    const timeEl = floatingTimerEl.querySelector('.timer-widget-time');
    if (timeEl) timeEl.textContent = 'DONE! 🎉';
    floatingTimerEl.classList.add('alarm-flashing');

    if (window.Toast) {
      window.Toast.show(`⏰ Timer Finished: ${label}!`, 'success', 8000);
    }

    setTimeout(() => {
      if (floatingTimerEl) floatingTimerEl.classList.remove('alarm-flashing');
    }, 8000);
  }

  function pauseActive() {
    if (activeTimer) activeTimer.pause();
  }

  function resumeActive() {
    if (activeTimer) activeTimer.start();
  }

  function dismiss() {
    if (activeTimer) activeTimer.stop();
    if (floatingTimerEl) {
      floatingTimerEl.classList.remove('active', 'alarm-flashing');
      floatingTimerEl.classList.add('hidden');
    }
  }

  function addTime(secs = 60) {
    if (activeTimer) {
      activeTimer.addSeconds(secs);
    }
  }

  return {
    init,
    startQuickTimer,
    pauseActive,
    resumeActive,
    dismiss,
    addTime,
    KitchenTimer
  };
})();
