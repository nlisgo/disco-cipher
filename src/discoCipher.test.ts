import { describe, it, expect } from 'vitest';
import { discoCipher } from './discoCipher';

describe('DiscoCipher', () => {
  describe('basic word sorting', () => {
    it('should sort characters in a simple word', () => {
      expect(discoCipher('hello')).toBe('ehllo');
    });

    it('should handle single character words', () => {
      expect(discoCipher('a')).toBe('a');
    });

    it('should handle empty string', () => {
      expect(discoCipher('')).toBe('');
    });

    it('should preserve case while sorting alphabetically', () => {
      expect(discoCipher('Hello')).toBe('eHllo');
    });
  });

  describe('multiple words', () => {
    it('should handle multiple words separated by spaces', () => {
      expect(discoCipher('hello world')).toBe('ehllo dlorw');
    });

    it('should handle the example from requirements', () => {
      expect(discoCipher('Hi, my name is Dave!')).toBe('Hi, my aemn is aDev!');
    });
  });

  describe('punctuation handling', () => {
    it('should preserve punctuation in original positions', () => {
      expect(discoCipher('hello!')).toBe('ehllo!');
    });

    it('should handle multiple punctuation marks', () => {
      expect(discoCipher('wow!!!')).toBe('oww!!!');
    });

    it('should handle punctuation at the beginning', () => {
      expect(discoCipher('!hello')).toBe('!ehllo');
    });

    it('should handle punctuation in the middle', () => {
      expect(discoCipher('hel-lo')).toBe('ehl-lo');
    });

    it('should handle complex punctuation patterns', () => {
      expect(discoCipher('test,123!@#')).toBe('estt,123!@#');
    });
  });

  describe('numbers and special characters', () => {
    it('should preserve numbers in original positions', () => {
      expect(discoCipher('hello123')).toBe('ehllo123');
    });

    it('should handle mixed letters, numbers, and symbols', () => {
      expect(discoCipher('a1b2c3')).toBe('a1b2c3');
    });

    it('should handle only numbers', () => {
      expect(discoCipher('123')).toBe('123');
    });

    it('should handle only punctuation', () => {
      expect(discoCipher('!!!')).toBe('!!!');
    });
  });

  describe('case sensitivity', () => {
    it('should sort case-insensitively but preserve original case', () => {
      expect(discoCipher('BaC')).toBe('aBC');
    });

    it('should handle mixed case in longer words', () => {
      expect(discoCipher('HeLLo')).toBe('eHLLo');
    });
  });

  describe('edge cases', () => {
    it('should handle words with only one letter', () => {
      expect(discoCipher('I am a')).toBe('I am a');
    });

    it('should handle multiple spaces', () => {
      expect(discoCipher('hello  world')).toBe('ehllo  dlorw');
    });

    it('should handle leading and trailing spaces', () => {
      expect(discoCipher(' hello world ')).toBe(' ehllo dlorw ');
    });

    it('should handle sentences with various punctuation', () => {
      expect(discoCipher('Hello, world! How are you?')).toBe('eHllo, dlorw! How aer ouy?');
    });
  });
});