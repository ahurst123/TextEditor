// client/src/js/idb.js
import { openDB } from 'idb';

const initdb = async () =>
  openDB('textEditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('content')) {
        console.log('content store already exists');
        return;
      }
      db.createObjectStore('content', { keyPath: 'id', autoIncrement: true });
      console.log('content store created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');
  const db = await openDB('textEditor', 1);
  const tx = db.transaction('content', 'readwrite');
  const store = tx.objectStore('content');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET from the database');
  const db = await openDB('textEditor', 1);
  const tx = db.transaction('content', 'readonly');
  const store = tx.objectStore('content');
  const request = store.get(1);
  const result = await request;
  result ? console.log('🚀 - data retrieved from the database', result.value) : console.log('🚀 - data not found in the database');
  return result?.value;
};

initdb();
