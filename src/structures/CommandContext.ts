import { Message, EmbedBuilder, TextChannel, Guild, GuildMember, MessagePayload, type MessageCreateOptions } from 'discord.js';

export class CommandContext {
  message: Message;
  args: string[];
  flags: Record<string, string | boolean>;
  guild: Guild | null;
  channel: TextChannel | null;
  member: GuildMember | null;

  constructor(message: Message, args: string[], flags: Record<string, string | boolean>) {
    this.message = message;
    this.args = args;
    this.flags = flags;
    this.guild = message.guild;
    this.channel = message.channel as TextChannel;
    this.member = message.member;
  }

  /**
   * Get a flag by name
   * @param name - The name of the flag
   * @returns The flag value
   */
  getFlag(name: string): string | boolean | undefined {
    return this.flags[name];
  }

  /**
   * Get a string flag by name
   * @param name - The name of the flag
   * @returns The flag value
   */
  getStringFlag(name: string): string | undefined {
    const value = this.flags[name];
    return typeof value === 'string' ? value : undefined;
  }

  /**
   * Get a boolean flag by name
   * @param name - The name of the flag
   * @returns The flag value
   */
  getBooleanFlag(name: string): boolean {
    return !!this.flags[name];
  }

  /**
   * Send a message to the channel
   * @param content - The content of the message
   * @returns The message
   */
  async send(content: string | MessagePayload | MessageCreateOptions) {
    return await this.channel?.send(content);
  }

  /**
   * Reply to the message
   * @param content - The content of the reply
   * @returns The reply
   */
  async reply(content: string | MessagePayload | MessageCreateOptions) {
    return await this.message.reply(content);
  }

  /**
   * Reply to the message with an embed
   * @param embed - The embed to reply with
   * @returns The reply
   */
  async replyEmbed(embed: EmbedBuilder) {
    return await this.message.reply({ embeds: [embed] });
  }

  /**
   * Reply to the message with an error embed
   * @param content - The content of the error
   * @returns The error reply
   */
  async error(content: string) {
    return await this.message.reply({
      content: `❌ ${content}`,
      allowedMentions: { repliedUser: false }
    });
  }
} 