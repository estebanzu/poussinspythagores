// =============================================
// AUDIO & TTS — Sound effects and speech
// =============================================

import { state, cachedFrenchVoice } from './state.js';

export function playAudioTone(type) {
  if (state.isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'success') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      osc.frequency.setValueAtTime(1046.50, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'fail') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'trophy') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.06, now + idx * 0.1);
        gain.gain.setValueAtTime(0.06, now + idx * 0.1 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.15);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.18);
      });
    }
  } catch (err) {
    console.warn("Audio error", err);
  }
}

export function toggleMute() {
  state.isMuted = !state.isMuted;
  localStorage.setItem('mathscp_muted', state.isMuted);
  applySoundIcons();
  playAudioTone('click');
}

export function applySoundIcons() {
  const onSvg = document.getElementById('svg-sound-on');
  const offSvg = document.getElementById('svg-sound-off');
  if (state.isMuted) {
    onSvg.classList.add('hidden');
    offSvg.classList.remove('hidden');
  } else {
    onSvg.classList.remove('hidden');
    offSvg.classList.add('hidden');
  }
}

export function getFrenchVoice() {
  if (cachedFrenchVoice) return cachedFrenchVoice;
  const voices = window.speechSynthesis.getVoices();
  cachedFrenchVoice = voices.find(v => v.lang.startsWith('fr') || v.lang === 'fr-FR') || null;
  return cachedFrenchVoice;
}

export function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const cleanText = text.replace(/<[^>]*>/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'fr-FR';
  const frenchVoice = getFrenchVoice();
  if (frenchVoice) utterance.voice = frenchVoice;
  utterance.rate = 0.92;
  utterance.pitch = 1.12;
  window.speechSynthesis.speak(utterance);
}

export function speakQuestion() {
  const textEl = document.getElementById('game-question-text');
  if (textEl) speakText(textEl.innerText);
}
