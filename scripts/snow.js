// SNOW EFFECT - Comment out the script tag in index.html to disable

let snowPileCount = 0;
const maxSnowPileFlakes = 5000; // Maximum snowflakes in pile
let pendingPileAdditions = 0; // Track pending pile additions

// Create snow pile container if it doesn't exist
function ensureSnowPileContainer() {
  if (!document.getElementById('snow-pile')) {
    const pile = document.createElement('div');
    pile.id = 'snow-pile';
    // Add to a wrapper that won't affect document flow
    document.documentElement.appendChild(pile);
  }
  return document.getElementById('snow-pile');
}

// Create falling snowflake container if it doesn't exist
function ensureSnowfallContainer() {
  if (!document.getElementById('snowfall-container')) {
    const container = document.createElement('div');
    container.id = 'snowfall-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '500';
    container.style.overflow = 'hidden';
    document.documentElement.appendChild(container);
  }
  return document.getElementById('snowfall-container');
}

function addToSnowPile() {
  if (snowPileCount >= maxSnowPileFlakes) return;
  
  // Random delay to prevent batching (0-3 seconds)
  const randomDelay = Math.random() * 3000;
  
  pendingPileAdditions++;
  
  setTimeout(() => {
    if (snowPileCount >= maxSnowPileFlakes) {
      pendingPileAdditions--;
      return;
    }
    
    const pile = ensureSnowPileContainer();
    const flake = document.createElement('div');
    flake.className = 'snow-pile-flake';
    flake.textContent = '❄';
    
    // Random size variation
    const size = Math.random() * 0.5 + 0.7;
    flake.style.fontSize = size + 'em';
    
    // Random rotation for natural look
    flake.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Position absolutely within the pile container
    flake.style.position = 'absolute';
    const randomX = Math.random() * (window.innerWidth - 30);
    const randomY = Math.random() * (window.innerHeight * 0.25 - 30);
    flake.style.left = randomX + 'px';
    flake.style.bottom = randomY + 'px';
    
    // Start with opacity 0 and fade in
    flake.style.opacity = '0';
    pile.appendChild(flake);
    
    // Trigger animation with slight stagger
    setTimeout(() => {
      flake.style.transition = 'opacity 5s ease-in';
      flake.style.opacity = '0.95';
    }, 50);
    
    snowPileCount++;
    pendingPileAdditions--;
  }, randomDelay);
}

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.textContent = '❄';
  
  // Random horizontal position (full window width)
  const randomX = Math.random() * window.innerWidth;
  snowflake.style.left = randomX + 'px';
  
  // Start from top of viewport (not document)
  snowflake.style.top = '-10px';
  
  // Random animation duration (8-15 seconds) - slower fall
  const duration = Math.random() * 7 + 8;
  snowflake.style.animationDuration = duration + 's';
  
  // Random horizontal drift
  const drift = Math.random() * 100 - 50;
  snowflake.style.setProperty('--drift', drift + 'px');
  
  // Calculate fall distance (viewport height to prevent infinite scroll)
  const fallDistance = window.innerHeight + 100;
  snowflake.style.setProperty('--fall-distance', fallDistance + 'px');
  
  // Random size variation
  const size = Math.random() * 0.5 + 0.8;
  snowflake.style.fontSize = size + 'em';
  
  // Add slight delay to animation
  const delay = Math.random() * 0.5;
  snowflake.style.animationDelay = delay + 's';
  
  // Add to fixed container instead of body
  const container = ensureSnowfallContainer();
  container.appendChild(snowflake);
  
  // Remove snowflake after animation completes and add to pile
  setTimeout(() => {
    snowflake.remove();
    addToSnowPile();
  }, (duration + delay) * 3000); // Add extra delay before adding to pile
}

// Create snowflakes continuously (slower spawn rate)
setInterval(createSnowflake, 300);

// Optional: Create initial batch of snowflakes
for (let i = 0; i < 10; i++) {
  setTimeout(createSnowflake, i * 100);
}
