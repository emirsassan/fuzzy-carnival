import { Events, Message } from 'discord.js';
import { config } from '../config';
import { CommandContext } from '../structures/CommandContext';
import { FlagParser } from '../utils/FlagParser';

export const name = Events.MessageCreate;
export const once = false;

export async function execute(message: Message) {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const rawArgs = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = rawArgs.shift()?.toLowerCase();
  if (!commandName) return;

  const command = message.client.textCommands.get(commandName);
  if (!command) return;

  const { args, flags } = FlagParser.parse(rawArgs);
  const ctx = new CommandContext(message, args, flags);

  try {
    await command.execute(ctx);
  } catch (error) {
    console.error(error);
    await message.reply('There was an error executing this command!');
  }
} 