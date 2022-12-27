import { Client } from "tmi.js";
import { CHANNEL, TMIOPTIONS } from "./lib/constants.js";
import {
  getTitle,
  getFollowerCount,
  getSubscriberCount,
  updateTitle,
} from "./utils/twitch.js";

const client = new Client(TMIOPTIONS);

client.connect();
client.on("message", handleMessage);
client.on("connected", () => {
  client.say(CHANNEL, "Woooooooossshhhhh, hakkabot is in the building!");
});

function handleMessage(channel, tags, message, self) {
  const username = tags.username;

  if (self) {
    return;
  }

  const msg = message.trim();

  if (msg.toLowerCase() === "!hello") {
    client.say(channel, `@${username} wazzzzzupppppp!`);
  } else if (msg.toLowerCase() === "!title") {
    getTitleHandler(channel, username);
  } else if (msg.toLowerCase() === "!followers") {
    getFollowerCountHandler(channel, username);
  } else if (msg.toLowerCase() === "!subs") {
    getSubscriberCountHandler(channel, username);
  } else if (msg.startsWith("!updatetitle")) {
    if (!tags.mod && `#${tags.username}` !== channel) return;

    const newTitle = msg.split("!updatetitle")[1];
    updateTitleHandler(channel, username, newTitle);
  }
}

// COMMANDS

const getTitleHandler = async (channel, username) => {
  const msg = await getTitle(channel, username);
  client.say(channel, msg);
};

const getFollowerCountHandler = async (channel, username) => {
  const msg = await getFollowerCount(channel, username);
  client.say(channel, msg);
};

const getSubscriberCountHandler = async (channel, username) => {
  const msg = await getSubscriberCount(channel, username);
  client.say(channel, msg);
};

const updateTitleHandler = async (channel, username, title) => {
  const msg = await updateTitle(channel, username, title);
  client.say(channel, msg);
};

// REMINDERS
const PRIME_INTERVAL = 60 * 1000;
const STRETCH_INTERVAL = 3600 * 1000;
const WATER_INTERVAL = 1800 * 1000;

const twitchPrimeReminder = () => {
  const msg = `Have you heard of twitch prime? It let's you subscribe for FREE! Learn more here https://twitch.tv/prime`;
  client.say(CHANNEL, msg);
};

const stetchReminder = () => {
  const msg = `Time to stretch! Get up! @${CHANNEL}`;
  client.say(CHANNEL, msg);
};

const waterReminder = () => {
  const msg = `Time to hydrate! Now Now Now! @${CHANNEL}`;
  client.say(CHANNEL, msg);
};

setInterval(twitchPrimeReminder, PRIME_INTERVAL);
setInterval(stetchReminder, STRETCH_INTERVAL);
setInterval(waterReminder, WATER_INTERVAL);
