class SoundService {
    constructor() {
      this.sounds = {
        boardFill: new Audio('/sounds/board-fill.mp3'),
        dailyDouble: new Audio('/sounds/daily-double.mp3'),
        questionReveal: new Audio('/sounds/question-reveal.mp3'),
        correctAnswer: new Audio('/sounds/correct-answer.mp3'),
        wrongAnswer: new Audio('/sounds/wrong-answer.mp3'),
        timeUp: new Audio('/sounds/time-up.mp3'),
        themeMusic: new Audio('/sounds/theme-music.mp3'),
      };
  
      // Configure theme music
      this.sounds.themeMusic.loop = true;
      this.sounds.themeMusic.volume = 0.5;
    }
  
    play(soundName) {
      const sound = this.sounds[soundName];
      if (sound) {
        sound.currentTime = 0; // Reset to start
        sound.play().catch(e => console.log('Sound play failed:', e));
      }
    }
  
    stop(soundName) {
      const sound = this.sounds[soundName];
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    }
  
    stopAll() {
      Object.values(this.sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
      });
    }
  }
  
  export const soundService = new SoundService();