import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { loadEvents } from './handlers/eventHandler';
import { loadCommands } from './handlers/commandHandler';
import { config } from './config';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, any>;
    textCommands: Collection<string, any>;
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();
client.textCommands = new Collection();

async function init() {
  await loadEvents(client);
  await loadCommands(client);
  await client.login(config.token);
}

init().catch(console.error); 