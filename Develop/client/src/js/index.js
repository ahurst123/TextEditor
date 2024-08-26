import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

import { getDb, putDb } from './idb';
import './styles.css';

window.addEventListener('load', async () => {
  const editor = document.querySelector('#editor');

  // Retrieve and display content from IndexedDB on load
  const data = await getDb();
  if (data) {
    editor.value = data;
  }

  editor.addEventListener('input', (event) => {
    putDb(event.target.value);
  });
});