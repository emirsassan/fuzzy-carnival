import { SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from '../../types/Command';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export const execute: SlashCommand['execute'] = async (interaction) => {
  await interaction.reply('Pong!');
}; 