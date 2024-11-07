import { Client, Events } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: Client) {
  console.log(`Ready! Logged in as ${client.user?.tag}`);
  
  const commands = Array.from(client.commands.values()).map(cmd => cmd.data);
  await client.application?.commands.set(commands);
} 