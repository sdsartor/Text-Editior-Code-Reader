import { openDB } from 'idb';
// The code below uses the import above and adds a function that waits before running.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// The data will be posted using the data below.
export const putDb = async (content) => {
console.log('Post data to the database');

const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readwrite');
const store = tx.objectStore('jate');
const request = store.add({ id: 1, value: content });
const result = await request;
console.log('The database has received your request!🚀', result); 
};


// Added code allows for the database to look for code and then establish a connection before running the many consts below.
export const getDb = async () => {
console.log('Database is receiving data');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readonly');
const store = tx.objectStore('jate');
const request = store.getAll();
const result = await request;
console.log('result.value', 'The database has received your request!🚀', result);
return result;
};

// This calls and activates the function in all places above.
initdb();
