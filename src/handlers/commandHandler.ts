import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

export async function loadCommands(client: Client) {
  const commandsPath = join(import.meta.dir, '../commands');
  
  // load slash commands
  const slashCommandsPath = join(commandsPath, 'slash');
  const slashCommandFiles = readdirSync(slashCommandsPath).filter(file => file.endsWith('.ts'));

  for (const file of slashCommandFiles) {
    const command = await import(join(slashCommandsPath, file));
    client.commands.set(command.data.name, command);
  }

  // load text commands
  const textCommandsPath = join(commandsPath, 'text');
  const textCommandFiles = readdirSync(textCommandsPath).filter(file => file.endsWith('.ts'));

  for (const file of textCommandFiles) {
    const command = await import(join(textCommandsPath, file));
    client.textCommands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach((alias: string) => {
        client.textCommands.set(alias, command);
      });
    }
  }
} 