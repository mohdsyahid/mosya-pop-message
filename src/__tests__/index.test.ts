// Test suite for Mosya Pop Message
import { describe, it, expect } from 'vitest';

describe('Mosya Pop Message API', () => {
  it('should have global window object', () => {
    expect(typeof window).not.toBe('undefined');
  });

  describe('Core Functions', () => {
    it('should expose alert function', () => {
      expect(window.MosyaPopMessage?.alert).toBeDefined();
      expect(typeof window.MosyaPopMessage?.alert).toBe('function');
    });

    it('should expose confirm function', () => {
      expect(window.MosyaPopMessage?.confirm).toBeDefined();
      expect(typeof window.MosyaPopMessage?.confirm).toBe('function');
    });

    it('should expose prompt function', () => {
      expect(window.MosyaPopMessage?.prompt).toBeDefined();
      expect(typeof window.MosyaPopMessage?.prompt).toBe('function');
    });

    it('should expose toast namespace', () => {
      expect(window.MosyaPopMessage?.toast).toBeDefined();
      expect(typeof window.MosyaPopMessage?.toast).toBe('object');
    });

    it('should expose progress function', () => {
      expect(window.MosyaPopMessage?.progress).toBeDefined();
      expect(typeof window.MosyaPopMessage?.progress).toBe('function');
    });
  });

  describe('Toast Methods', () => {
    const toast = window.MosyaPopMessage?.toast;

    if (toast) {
      it('should have info method', () => {
        expect(toast.info).toBeDefined();
        expect(typeof toast.info).toBe('function');
      });

      it('should have success method', () => {
        expect(toast.success).toBeDefined();
        expect(typeof toast.success).toBe('function');
      });

      it('should have warning method', () => {
        expect(toast.warning).toBeDefined();
        expect(typeof toast.warning).toBe('function');
      });

      it('should have error method', () => {
        expect(toast.error).toBeDefined();
        expect(typeof toast.error).toBe('function');
      });

      it('should have question method', () => {
        expect(toast.question).toBeDefined();
        expect(typeof toast.question).toBe('function');
      });
    }
  });
});
