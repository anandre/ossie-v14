import type { ChatInputCommandInteraction, User} from 'discord.js';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Path } from '../data/classes/path.js';
import { db } from '../data/database/database.js';
import type { CharacterData } from '../data/interfaces/characterData.js';
import type { Command } from './index.js';

export default {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription("View a character's profile!")
		.addUserOption((option) =>
			option.setName('user').setDescription('(Optional) The user whose character you want to view'),
		)
		.addBooleanOption((option) => option.setName('hide').setDescription('Whether the profile is hidden from view'))
		.toJSON(),
	async execute(interaction: ChatInputCommandInteraction) {
        // make the boolean behavior better - want to respond with no character as ephemeral always
        const hide = Boolean(interaction.options.getBoolean('hide'));
		await interaction.deferReply({ ephemeral: hide });
        let user;
        if (interaction.options.getUser('user')) {
            user = interaction.options.getUser('user');
        } else {
            user = interaction.user
        }
        
		const prepare = db.prepare('SELECT * FROM players WHERE ID = ?');
		const res = prepare.all(user.id);
		if (res.length === 0) {
			// add mention for the register command
			await interaction.editReply({ content: `No character found! Use the \`/register\` command to start!` });
            return;
        }

        const player = new Path(res[0] as CharacterData);
        const embed = new EmbedBuilder().setTitle(`${player.name}'s Profile!`).addFields({
            name: '\u200B',
            value: `**STR:** ${player.str}`,
            inline: true
        }, {
            name: '\u200B',
            value: `**Level:** ${player.level}
            **XP**: ${player.xp}
            **Gold:**: ${player.gold}`,
            inline: true
        })
        await interaction.editReply({ embeds: [embed] });
	},
} satisfies Command;
