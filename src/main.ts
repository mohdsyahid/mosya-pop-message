// Main entry point for development
import './styles.css';
import { alert, confirm, prompt, toast, progress } from './index';

console.log('Mosya Pop Message v1.0.0 - Ready!');

// Expose globally for testing
if (typeof window !== 'undefined') {
  (window as any).MosyaPopMessage = {
    alert,
    confirm,
    prompt,
    toast,
    progress
  };
}
