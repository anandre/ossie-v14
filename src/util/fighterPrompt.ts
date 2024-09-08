import type { ChatInputCommandInteraction, Snowflake } from 'discord.js';

/* export async function fighterPrompt(interaction: ChatInputCommandInteraction): Promise<Choice> {
    
} */

type Choice = {
	ability?: string;
	action: string;
	fighter?: Snowflake;
	item?: string;
	target: string;
};
