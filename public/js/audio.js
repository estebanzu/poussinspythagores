// =============================================
// AUDIO & TTS — Sound effects and speech
// =============================================

import { state } from './state.js';
import { getLang } from './i18n.js';

let audioCtx = null;
let audioUnlocked = false;
let cachedVoices = { fr: null, es: null };

const VOICE_CONFIG = {
  fr: {
    lang: 'fr-FR',
    rate: 0.92,
    pitch: 1.12,
  },
  es: {
    lang: 'es-ES',
    rate: 0.93,
    pitch: 1.1,
  },
};

function pickVoice(voices, langPrefix) {
  if (!voices || voices.length === 0) return null;
  const exact = voices.find(
    (v) => v.lang.toLowerCase() === langPrefix.toLowerCase()
  );
  if (exact) return exact;
  const prefix = voices.find((v) =>
    v.lang.toLowerCase().startsWith(langPrefix.split('-')[0])
  );
  if (prefix) return prefix;
  return null;
}

function refreshVoiceCache() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  cachedVoices.fr = pickVoice(voices, 'fr-FR');
  cachedVoices.es = pickVoice(voices, 'es-ES');
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.addEventListener('voiceschanged', refreshVoiceCache);
}

function unlockAudio() {
  if (audioUnlocked) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  if (!audioCtx) audioCtx = new AudioCtx();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  audioUnlocked = true;
}

if (typeof window !== 'undefined') {
  ['pointerdown', 'keydown', 'touchstart'].forEach((type) => {
    window.addEventListener(type, unlockAudio, { once: true });
  });
}

export function playAudioTone(type) {
  if (state.isMuted) return;
  if (!audioCtx) return;
  try {
    const ctx = audioCtx;
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
      osc.frequency.setValueAtTime(1046.5, now + 0.3);
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
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
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
    console.warn('Audio error', err);
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

export function getVoice(lang) {
  refreshVoiceCache();
  return cachedVoices[lang] || cachedVoices.fr || null;
}

export function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const cleanText = text.replace(/<[^>]*>/g, '').trim();
  if (!cleanText) return;
  const lang = getLang();
  const config = VOICE_CONFIG[lang] || VOICE_CONFIG.fr;
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = config.lang;
  const voice = getVoice(lang);
  if (voice) utterance.voice = voice;
  utterance.rate = config.rate;
  utterance.pitch = config.pitch;
  window.speechSynthesis.speak(utterance);
}

export function speakQuestion() {
  const textEl = document.getElementById('game-question-text');
  if (textEl) speakText(textEl.innerText);
}
