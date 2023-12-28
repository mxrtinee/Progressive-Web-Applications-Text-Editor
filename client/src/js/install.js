// Get the button element with the ID 'buttonInstall'
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Stores the beforeinstallprompt event for later use
  window.deferredPrompt = event;
  // Shows the install button by removing the 'hidden' class
  butInstall.classList.toggle("hidden", false);
});

// Implements a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  // Retrieves the stored beforeinstallprompt event
  const promptEvent = window.deferredPrompt;

  // If the event is not available, return early
  if (!promptEvent) {
    return;
  }

  // Trigger the installation prompt
  promptEvent.prompt();

  // Resets the stored event to null after prompting
  window.deferredPrompt = null;

  // Hides the install button after prompting
  butInstall.classList.toggle("hidden", true);
});

// Adds an event handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // Resets the stored beforeinstallprompt event to null
  window.deferredPrompt = null;
});
