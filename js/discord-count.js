const DISCORD_GUILD_IDS = [
  '1334220700528939132',
  '1391749349117001738'
];

let totalOnlineUsers = 0;
let fetchInterval;

async function fetchDiscordStats() {
  try {
    let combinedOnline = 0;
    
    for (const guildId of DISCORD_GUILD_IDS) {
      const response = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.presence_count !== undefined) {
          combinedOnline += data.presence_count;
        }
      }
    }
    
    totalOnlineUsers = combinedOnline;
    updateDiscordDisplay();
    
  } catch (error) {
    console.error('Error fetching Discord stats:', error);
    updateDiscordDisplay(true);
  }
}

function updateDiscordDisplay(isError = false) {
  const countElement = document.querySelector('.discord-stats .count');
  
  if (countElement) {
    if (isError) {
      countElement.textContent = '--';
    } else {
      countElement.textContent = totalOnlineUsers;
    }
  }
}

function startDiscordUpdates() {
  fetchDiscordStats();
  
  fetchInterval = setInterval(() => {
    fetchDiscordStats();
  }, 60000);
}

function stopDiscordUpdates() {
  if (fetchInterval) {
    clearInterval(fetchInterval);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startDiscordUpdates);
} else {
  startDiscordUpdates();
}

window.addEventListener('beforeunload', stopDiscordUpdates);
