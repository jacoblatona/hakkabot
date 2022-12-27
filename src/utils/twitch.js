import { USER_ID, ACCESS_TOKEN, CLIENT_ID } from "../lib/constants.js";

const headers = {
  headers: {
    "Client-ID": CLIENT_ID,
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const baseUrl = `https://api.twitch.tv/helix`;

export const getTitle = async (channel, username) => {
  const url = `${baseUrl}/channels?broadcaster_id=${USER_ID}`;

  try {
    const res = await fetch(url, headers);
    const result = await res.json();

    let message;

    if (result.data === undefined || result.data.length == 0) {
      message = `@${username}, ${channel} is currently offline!`;
    } else {
      message = `@${username}, ${result.data[0]?.title}`;
    }

    return message;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowerCount = async (channel, username) => {
  const url = `${baseUrl}/users/follows?to_id=${USER_ID}`;

  try {
    const res = await fetch(url, headers);
    const result = await res.json();

    let message;

    if (result.data) {
      message = `@${username}, ${channel} has a total of ${result["total"]} followers!`;
    } else {
      message = `@${username} Uh Oh! I can't seem to get the follower count :/`;
    }

    return message;
  } catch (error) {
    console.log(error);
  }
};

export const getSubscriberCount = async (channel, username) => {
  const url = `${baseUrl}/subscriptions?broadcaster_id=${USER_ID}`;

  try {
    const res = await fetch(url, headers);
    const result = await res.json();

    let message;

    if (result.data) {
      message = `@${username}, ${channel} has a total of ${result["total"]} subscribers!`;
    } else {
      message = `@${username} Uh Oh! I can't seem to get the subscriber count :/`;
    }

    return message;
  } catch (error) {
    console.log(error);
  }
};

export const updateTitle = async (channel, username, title) => {
  const url = `${baseUrl}/channels?broadcaster_id=${USER_ID}`;

  try {
    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-type": "application/json;",
      },
    });

    const msg = "Title updated successfully!";

    return msg;
  } catch (error) {
    console.log(error);
  }
};
