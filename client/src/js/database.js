// Import the openDB method from the 'idb' library
import { openDB } from 'idb';

// Function to initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    // Upgrade function called when the database version changes
    upgrade(db) {
      // Check if the object store 'jate' already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // If 'jate' doesn't exist, create a new object store with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open the 'jate' database
  const jateDb = await openDB("jate", 1);
  // Start a read-write transaction
  const tx = jateDb.transaction("jate", "readwrite");
  // Access the 'jate' object store
  const store = tx.objectStore("jate");
  // Put the content into the object store with a predefined key (e.g., 1)
  const request = store.put({ id: 1, value: content });
  // Wait for the request to complete
  const result = await request;
  console.log("Data saved to the database", result);
};

// Method to retrieve all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open the 'jate' database
  const jateDb = await openDB("jate", 1);
  // Start a read-only transaction
  const tx = jateDb.transaction("jate", "readonly");
  // Access the 'jate' object store
  const store = tx.objectStore("jate");
  // Get the content with the key (e.g., 1)
  const request = store.get(1);
  // Wait for the request to complete
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// Initialize the IndexedDB database when the module is imported
initdb();
