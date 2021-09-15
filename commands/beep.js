const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const dialog = new MessageEmbed()
	.setTitle("Bot Talk")
	.setColor("#00d879")
	.setThumbnail('https://www.freeiconspng.com/uploads/robot-icon-4.png')
	.addFields(
		{ name: "YOU", value: 'Beep' },
		{ name: 'BOT:', value: 'Boop!'},
		{ name: "YOU", value: '0110101' },
		{ name: 'BOT:', value: 'Beep Boop Beep Boop!'},
	);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('A nice bot talk'),
	async execute(interaction) {
		await interaction.reply({ embeds: [dialog] });
	},
};