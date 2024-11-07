import { CommandContext } from '../structures/CommandContext';
import { 
  ChatInputCommandInteraction, 
  SlashCommandBuilder, 
  type SlashCommandSubcommandsOnlyBuilder 
} from 'discord.js';

export interface TextCommand {
  name: string;
  description: string;
  aliases?: string[];
  execute: (ctx: CommandContext) => Promise<void>;
}

export interface SlashCommand {
  data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
} 