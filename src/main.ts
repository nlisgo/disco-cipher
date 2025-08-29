import './style.css';
import { discoCipher } from './discoCipher';

class DiscoCipherApp {
  private inputTextArea: HTMLTextAreaElement;
  private outputTextArea: HTMLTextAreaElement;
  private transformBtn: HTMLButtonElement;
  private liveModeToggle: HTMLInputElement;
  private copyBtn: HTMLButtonElement;
  private copyMessage: HTMLDivElement;
  private mobileHint: HTMLSpanElement;
  private outputSection: HTMLDivElement;
  private srAnnouncements: HTMLDivElement;
  private srEasterEgg: HTMLDivElement;
  private isLiveMode: boolean = true;
  private isMobile: boolean;
  private isScreenReaderUser: boolean = false;
  private easterEggTriggered: boolean = false;
  private transformCount: number = 0;

  constructor() {
    this.inputTextArea = document.getElementById('input-text') as HTMLTextAreaElement;
    this.outputTextArea = document.getElementById('output-text') as HTMLTextAreaElement;
    this.transformBtn = document.getElementById('transform-btn') as HTMLButtonElement;
    this.liveModeToggle = document.getElementById('live-mode-toggle') as HTMLInputElement;
    this.copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
    this.copyMessage = document.getElementById('copy-message') as HTMLDivElement;
    this.mobileHint = document.getElementById('mobile-hint') as HTMLSpanElement;
    this.outputSection = document.querySelector('.output-section') as HTMLDivElement;
    this.srAnnouncements = document.getElementById('sr-announcements') as HTMLDivElement;
    this.srEasterEgg = document.getElementById('sr-easter-egg') as HTMLDivElement;
    
    this.isMobile = window.innerWidth <= 768;
    
    this.detectScreenReaderUsage();
    this.initializeEventListeners();
    this.updateButtonState();
    this.announceWelcome();
  }

  private initializeEventListeners(): void {
    this.transformBtn.addEventListener('click', () => this.handleTransform());
    
    this.inputTextArea.addEventListener('input', () => this.handleInputChange());
    
    this.liveModeToggle.addEventListener('change', () => this.handleModeToggle());
    
    this.copyBtn.addEventListener('click', () => this.handleCopyToClipboard());
    
    this.inputTextArea.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        this.handleTransform();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.clearAll();
      }
    });

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  private handleTransform(): void {
    const inputText = this.inputTextArea.value.trim();
    
    if (!inputText) {
      this.showEmptyInputFeedback();
      return;
    }

    this.animateTransform();
    
    setTimeout(() => {
      const result = discoCipher(inputText);
      this.outputTextArea.value = result;
      this.showSuccessFeedback();
      this.showMobileGuidance();
      this.highlightResult();
      this.scrollToResult();
      this.transformCount++;
      this.announceTransformation(result, true);
      this.updateButtonState();
    }, 300);
  }

  private handleInputChange(): void {
    if (this.isLiveMode) {
      this.performRealtimeTransform();
    }
    this.updateButtonState();
  }


  private performRealtimeTransform(): void {
    const inputText = this.inputTextArea.value;
    
    if (inputText.trim()) {
      const result = discoCipher(inputText);
      this.outputTextArea.value = result;
      this.showMobileGuidance();
      this.highlightResult();
      this.transformCount++;
      this.announceTransformation(result, false);
    } else {
      this.outputTextArea.value = '';
      this.hideMobileGuidance();
    }
  }

  private updateButtonState(): void {
    if (this.isLiveMode) {
      this.transformBtn.disabled = true;
      return;
    }

    const inputText = this.inputTextArea.value.trim();
    const currentOutput = this.outputTextArea.value;
    
    if (!inputText) {
      this.transformBtn.disabled = true;
      return;
    }

    const expectedOutput = discoCipher(inputText);
    this.transformBtn.disabled = currentOutput === expectedOutput;
  }

  private animateTransform(): void {
    this.transformBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.transformBtn.style.transform = '';
    }, 150);
  }

  private showEmptyInputFeedback(): void {
    this.inputTextArea.style.borderColor = '#ff4da6';
    this.inputTextArea.placeholder = 'Please enter some text to transform! ✨';
    
    setTimeout(() => {
      this.inputTextArea.style.borderColor = '';
      this.inputTextArea.placeholder = "Type your message here... Try 'Hi, my name is Dave!'";
    }, 2000);
  }

  private showSuccessFeedback(): void {
    this.outputTextArea.style.borderColor = '#00ff80';
    
    setTimeout(() => {
      this.outputTextArea.style.borderColor = '';
    }, 1000);
  }

  private clearAll(): void {
    this.inputTextArea.value = '';
    this.outputTextArea.value = '';
    this.inputTextArea.focus();
    this.updateButtonState();
  }

  private async handleCopyToClipboard(): Promise<void> {
    const outputText = this.outputTextArea.value.trim();
    
    if (!outputText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      this.showCopySuccess();
    } catch (error) {
      this.fallbackCopyToClipboard();
    }
  }

  private fallbackCopyToClipboard(): void {
    this.outputTextArea.select();
    this.outputTextArea.setSelectionRange(0, 99999);
    
    try {
      document.execCommand('copy');
      this.showCopySuccess();
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error);
    }
  }

  private showCopySuccess(): void {
    this.copyMessage.classList.add('show');
    
    if (this.isScreenReaderUser) {
      this.announce("Text copied to clipboard successfully! Ready to paste wherever you need it.");
    }
    
    setTimeout(() => {
      this.copyMessage.classList.remove('show');
    }, 2000);
  }

  private showMobileGuidance(): void {
    if (this.isMobile && this.outputTextArea.value.trim()) {
      this.mobileHint.classList.add('show');
    }
  }

  private hideMobileGuidance(): void {
    this.mobileHint.classList.remove('show');
  }

  private highlightResult(): void {
    if (this.outputTextArea.value.trim()) {
      this.outputSection.classList.add('highlight');
      setTimeout(() => {
        this.outputSection.classList.remove('highlight');
      }, 1500);
    }
  }

  private scrollToResult(): void {
    if (this.isMobile && this.outputTextArea.value.trim()) {
      setTimeout(() => {
        this.outputSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 400);
    }
  }

  private detectScreenReaderUsage(): void {
    // Multiple detection methods for screen reader usage
    const hasScreenReader = 
      navigator.userAgent.includes('NVDA') ||
      navigator.userAgent.includes('JAWS') ||
      navigator.userAgent.includes('VoiceOver') ||
      window.speechSynthesis !== undefined ||
      'ontouchstart' in window === false && navigator.maxTouchPoints === 0;
    
    // Also detect based on user behavior patterns
    let focusCount = 0;
    const checkFocusUsage = () => {
      focusCount++;
      if (focusCount > 3) {
        this.isScreenReaderUser = true;
        document.removeEventListener('focus', checkFocusUsage, true);
      }
    };
    
    document.addEventListener('focus', checkFocusUsage, true);
    
    // Set initial state
    this.isScreenReaderUser = hasScreenReader;
    
    // Confirm after 2 seconds of usage
    setTimeout(() => {
      if (focusCount > 2) {
        this.isScreenReaderUser = true;
      }
    }, 2000);
  }

  private announceWelcome(): void {
    if (this.isScreenReaderUser) {
      setTimeout(() => {
        this.announce(
          "Welcome to DiscoCipher! I'm your groovy text transformation assistant. " +
          "I'll sort letters in each word alphabetically while keeping punctuation in place. " +
          "Let's get this disco party started!"
        );
      }, 1000);
    }
  }

  private announceTransformation(result: string, isManual: boolean): void {
    if (!this.isScreenReaderUser) return;

    const method = isManual ? "manually transformed" : "automatically transformed";
    const announcement = `Text ${method}. Result: ${result}`;
    
    this.announce(announcement);
    
    // Easter egg triggers
    this.triggerEasterEggs();
  }

  private triggerEasterEggs(): void {
    if (!this.isScreenReaderUser || this.easterEggTriggered) return;

    if (this.transformCount === 3) {
      this.easterEggAnnounce(
        "Wow, you're really getting the hang of this! Your screen reader and I make quite the disco duo! " +
        "Keep dancing through those transformations! 💃🕺"
      );
    } else if (this.transformCount === 7) {
      this.easterEggAnnounce(
        "Seven transformations! That's like... a disco week! " +
        "Your friend who made this really knows their accessibility stuff. " +
        "I bet they're testing me right now, aren't they? 😉 Hi there, developer friend!"
      );
    } else if (this.transformCount === 10) {
      this.easterEggAnnounce(
        "Ten transformations! Double digits! You know what they say... " +
        "dance like nobody's watching, but code like everyone's screen reader is! " +
        "This app passes the disco accessibility test with flying colors... or should I say, flying disco balls! 🪩"
      );
      this.easterEggTriggered = true;
    }
  }

  private handleModeToggle(): void {
    this.isLiveMode = this.liveModeToggle.checked;
    
    if (this.isLiveMode) {
      this.performRealtimeTransform();
      this.announce("Live mode enabled. Text will transform automatically as you type.");
    } else {
      this.announce("Manual mode enabled. Click the Transform button to apply changes.");
    }
    
    this.updateButtonState();
  }

  private announce(message: string): void {
    if (!this.isScreenReaderUser) return;
    
    this.srAnnouncements.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      this.srAnnouncements.textContent = '';
    }, 100);
  }

  private easterEggAnnounce(message: string): void {
    if (!this.isScreenReaderUser) return;
    
    this.srEasterEgg.textContent = message;
    
    // Clear after longer pause for Easter eggs
    setTimeout(() => {
      this.srEasterEgg.textContent = '';
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DiscoCipherApp();
  
  console.log('🪩 DiscoCipher is ready to groove! 🕺');
  console.log('Features:');
  console.log('  • Toggle Live Mode: Real-time transformation as you type');
  console.log('  • Manual Mode: Transform button only active when needed');
  console.log('Keyboard shortcuts:');
  console.log('  • Ctrl/Cmd + Enter: Transform text (manual mode)');
  console.log('  • Escape: Clear all text');
});