export async function getTwitchToken() {
  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: import.meta.env.TWITCH_CLIENT_ID,
      client_secret: import.meta.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export async function getLatestVODs(userId, limit = 6) {
  const token = await getTwitchToken();
  const res = await fetch(
    `https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=${limit}`,
    {
      headers: {
        'Client-ID': import.meta.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data;
}

export async function getLatestClips(userId, limit = 6) {
  const token = await getTwitchToken();
  const res = await fetch(
    `https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=${limit}`,
    {
      headers: {
        'Client-ID': import.meta.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data;
}

export async function getTwitchUserId(username) {
  const token = await getTwitchToken();
  const res = await fetch(
    `https://api.twitch.tv/helix/users?login=${username}`,
    {
      headers: {
        'Client-ID': import.meta.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.data[0]?.id;
}