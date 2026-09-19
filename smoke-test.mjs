import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';

const code = readFileSync('./dist/index.umd.js', 'utf8');
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://example.com' });
dom.window.eval(code);
const M = dom.window.MosyaPopMessage;
const doc = dom.window.document;

let pass = 0, fail = 0;
const check = (name, cond) => { cond ? (pass++, console.log('PASS: ' + name)) : (fail++, console.log('FAIL: ' + name)); };

check('library global exists', !!M);
check('exports alert/confirm/prompt/toast/progress', !!(M.alert && M.confirm && M.prompt && M.toast && M.progress));
check('toast.hide + hideAll exist', typeof M.toast.hide === 'function' && typeof M.toast.hideAll === 'function');

// 1. Alert renders + injects CSS + closes on OK
const alertP = M.alert({ title: 'Test', text: 'Hello', icon: 'success' });
const popup = doc.querySelector('.mosya-container');
check('alert renders container', !!popup);
check('alert has title', !!popup.querySelector('.mosya-title'));
check('CSS injected via <style data-mosya>', !!doc.querySelector('style[data-mosya="true"]'));
const styleText = doc.querySelector('style[data-mosya="true"]')?.textContent || '';
check('CSS contains .mosya-popup rule', styleText.includes('.mosya-popup'));
check('CSS contains toast positions', styleText.includes('mosya-toast-position-top-end'));
popup.querySelector('.mosya-confirm-button').click();
const alertDone = await alertP;
check('alert resolves after OK click', alertDone === undefined && !doc.querySelector('.mosya-container'));

// 2. Confirm true
const confirmP = M.confirm({ title: 'Delete?', confirmButtonText: 'Yes', cancelButtonText: 'Cancel', icon: 'question' });
doc.querySelector('.mosya-confirm-button').click();
check('confirm resolves true', (await confirmP) === true);

// 3. Confirm false via cancel
const confirmP2 = M.confirm({ title: 'Delete?', confirmButtonText: 'Yes', cancelButtonText: 'Cancel', icon: 'question' });
doc.querySelector('.mosya-cancel-button').click();
check('confirm resolves false on cancel', (await confirmP2) === false);

// 4. Toast shown
const toastId = M.toast.success('Item deleted!');
check('toast appears in DOM', !!doc.querySelector('.mosya-toast.success'));

// 5. Toast hide
M.toast.hide(toastId);
await new Promise(r => setTimeout(r, 400));
check('toast removed after hide', !doc.querySelector('.mosya-toast.success'));

// 6. Progress shown/hidden
const pId = M.progress({ title: 'Loading', text: 'Please wait...' });
check('progress popup appears', !!doc.querySelector('.mosya-progress-popup'));
check('progress spinner present', !!doc.querySelector('.mosya-progress-spinner'));
M.updateProgress(pId, { text: '50%...' });
check('updateProgress changes text', doc.querySelector('.mosya-progress-text').textContent === '50%...');
M.hideProgress(pId);
check('progress removed after hideProgress', !doc.querySelector('.mosya-progress-popup'));

// 7. Prompt returns value
const promptP = M.prompt({ title: 'Name?', inputPlaceholder: 'Your name' });
const input = doc.querySelector('.mosya-input');
check('prompt has input field', !!input);
input.value = 'Ali';
doc.querySelector('.mosya-confirm-button').click();
check('prompt resolves input value', (await promptP) === 'Ali');

console.log(`\n=== ${pass} passed, ${fail} failed ===`);
process.exit(fail > 0 ? 1 : 0);
