const fs = require('fs');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unsuscribe')
		.setDescription('Te elimina de la lista de notificaiones'),
	async execute(interaction) {
		await interaction.reply("Desuscribiendo...");
		const usersId = fs.readFileSync('data/suscribed.json');
		const parsed = JSON.parse(usersId);
		parsed.splice(parsed.indexOf(interaction.user.id),1);
		const sus = new Set(parsed);
		fs.writeFileSync('data/suscribed.json',JSON.stringify(Array.from(sus)));
		await interaction.user.send('Ya no te molestaré más :c');
	},
};