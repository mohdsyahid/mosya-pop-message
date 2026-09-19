// Basic tests for alerts (placeholder - will be expanded)
import { describe, it, expect, vi } from 'vitest';

describe('Mosya Pop Message', () => {
  describe('Configuration', () => {
    it('should have default config', () => {
      expect(typeof MosyaPopMessage).toBe('object');
    });

    it('should expose all API methods', () => {
      expect(typeof MosyaPopMessage.alert).toBe('function');
      expect(typeof MosyaPopMessage.confirm).toBe('function');
      expect(typeof MosyaPopMessage.prompt).toBe('function');
      expect(typeof MosyaPopMessage.toast).toBe('function');
      expect(typeof MosyaPopMessage.progress).toBe('function');
    });
  });
});
