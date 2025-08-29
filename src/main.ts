import './style.css';
import { discoCipher } from './discoCipher';

class DiscoCipherApp {
  private inputTextArea: HTMLTextAreaElement;
  private outputTextArea: HTMLTextAreaElement;
  private transformBtn: HTMLButtonElement;
  private liveModeToggle: HTMLInputElement;
  private isLiveMode: boolean = true;

  constructor() {
    this.inputTextArea = document.getElementById('input-text') as HTMLTextAreaElement;
    this.outputTextArea = document.getElementById('output-text') as HTMLTextAreaElement;
    this.transformBtn = document.getElementById('transform-btn') as HTMLButtonElement;
    this.liveModeToggle = document.getElementById('live-mode-toggle') as HTMLInputElement;

    this.initializeEventListeners();
    this.updateButtonState();
  }

  private initializeEventListeners(): void {
    this.transformBtn.addEventListener('click', () => this.handleTransform());
    
    this.inputTextArea.addEventListener('input', () => this.handleInputChange());
    
    this.liveModeToggle.addEventListener('change', () => this.handleModeToggle());
    
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
      this.updateButtonState();
    }, 300);
  }

  private handleInputChange(): void {
    if (this.isLiveMode) {
      this.performRealtimeTransform();
    }
    this.updateButtonState();
  }

  private handleModeToggle(): void {
    this.isLiveMode = this.liveModeToggle.checked;
    
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
    } else {
      this.outputTextArea.value = '';
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