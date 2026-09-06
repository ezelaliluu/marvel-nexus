// Web Audio API cosmic synthesizer for zero-dependency sound effects
class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientOsc = null;
    this.ambientGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.03, this.ctx.currentTime, 0.2);
    }
    return this.isMuted;
  }

  // Deep space ambient hum
  startAmbientHum() {
    this.init();
    if (!this.ctx || this.ambientOsc || this.isMuted) return;

    try {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      this.ambientOsc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      this.ambientOsc.type = "sine";
      this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A1

      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(110, this.ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, this.ctx.currentTime);

      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.03, this.ctx.currentTime);

      this.ambientOsc.connect(filter);
      subOsc.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc.start();
      subOsc.start();
    } catch (e) {
      console.warn("Ambient hum start failed", e);
    }
  }

  // Stone resonance chime (hovering or clicking an Infinity Stone / card)
  playStoneResonance(freq = 440) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.85);
    } catch (e) {
      console.warn("Stone resonance error", e);
    }
  }

  // The Thanos Snap: crisp snap frequency burst + deep sub-bass cosmic shockwave
  playSnapSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      if (this.ctx.state === "suspended") this.ctx.resume();
      const t = this.ctx.currentTime;

      // 1. Crisp Snap click
      const bufferSize = this.ctx.sampleRate * 0.06;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.015));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.setValueAtTime(1200, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(t);

      // 2. Cosmic sub-bass explosion
      const boom = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boom.type = "sine";
      boom.frequency.setValueAtTime(140, t);
      boom.frequency.exponentialRampToValueAtTime(25, t + 1.2);

      boomGain.gain.setValueAtTime(0.4, t);
      boomGain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

      boom.connect(boomGain);
      boomGain.connect(this.ctx.destination);

      boom.start(t + 0.02);
      boom.stop(t + 1.45);
    } catch (e) {
      console.warn("Snap sound error", e);
    }
  }
}

export const soundFx = new SoundController();
