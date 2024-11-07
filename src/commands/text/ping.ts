import type { TextCommand } from '../../types/Command';

export const name = 'ping';
export const description = 'Replies with Pong!';
export const aliases = ['p'];

export const execute: TextCommand['execute'] = async (ctx) => {
  const ephemeral = ctx.getBooleanFlag('ephemeral');
  const custom = ctx.getStringFlag('message');

  const message = custom ? custom : 'Pong!';
  
  if (ephemeral) {
    await ctx.send(`${message} (Only you can see this)`);
  } else {
    await ctx.send(message);
  }
}; 