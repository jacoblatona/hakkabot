import * as dotenv from "dotenv";
dotenv.config();

export const USER_ID = "119217090";
export const CHANNEL = "jaralato";
export const CLIENT_ID = process.env.CLIENT_ID;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
export const TMIOPTIONS = {
  options: { debug: true },
  identity: {
    username: "hakkabot",
    password: `${OAUTH_TOKEN}`,
  },
  connection: {
    reconnect: true,
  },
  channels: [CHANNEL],
};
