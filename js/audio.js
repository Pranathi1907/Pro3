/**
 * Savoria Kitchen Audio & Speech Synthesis Suite
 * Pure Web Audio API chime generation (no external mp3 files needed)
 * + Hands-free Speech Assistant for interactive cooking mode.
 */

const KitchenAudio = (function () {
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play a soft pleasant culinary tap
  function playClick() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Audio might be blocked until user interacts
    }
  }

  // Play crisp chef chime when step is completed or favorite is saved
  function playChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.09, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
      });
    } catch (e) {}
  }

  // Play a ringing kitchen timer alarm sound
  function playAlarm() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const startTime = ctx.currentTime;
      for (let burst = 0; burst < 3; burst++) {
        const t = startTime + burst * 0.35;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, t); // A5
        osc.frequency.setValueAtTime(1174.66, t + 0.1); // D6

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.28);
      }
    } catch (e) {}
  }

  // Speech Synthesis Assistant for hands-free cooking
  let isSpeaking = false;
  let currentUtterance = null;

  function speak(text, onEndCallback) {
    if (!('speechSynthesis' in window)) {
      if (onEndCallback) onEndCallback();
      return;
    }
    stopSpeech();

    const cleanText = text.replace(/[*_#`]/g, '');
    currentUtterance = new SpeechSynthesisUtterance(cleanText);
    currentUtterance.rate = 0.95;
    currentUtterance.pitch = 1.0;

    // Prefer high quality natural voices if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Karen')));
    if (naturalVoice) {
      currentUtterance.voice = naturalVoice;
    }

    currentUtterance.onstart = () => {
      isSpeaking = true;
      document.dispatchEvent(new CustomEvent('speech:start'));
    };

    currentUtterance.onend = () => {
      isSpeaking = false;
      document.dispatchEvent(new CustomEvent('speech:end'));
      if (onEndCallback) onEndCallback();
    };

    currentUtterance.onerror = () => {
      isSpeaking = false;
      document.dispatchEvent(new CustomEvent('speech:end'));
    };

    window.speechSynthesis.speak(currentUtterance);
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      document.dispatchEvent(new CustomEvent('speech:end'));
    }
  }

  function getSpeechState() {
    return isSpeaking;
  }

  return {
    init: getAudioContext,
    playClick,
    playChime,
    playAlarm,
    speak,
    stopSpeech,
    getSpeechState
  };
})();
