const fs = require('fs');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suscribe')
		.setDescription('Te suscribe a la lista de notificaiones'),
	async execute(interaction) {
		await interaction.reply("Suscribiendo...");
		const usersId = fs.readFileSync('data/suscribed.json');
		const parsed = JSON.parse(usersId);
		parsed.push(interaction.user.id);
		const sus = new Set(parsed);
		fs.writeFileSync('data/suscribed.json',JSON.stringify(Array.from(sus)));
		await interaction.user.send('Ya estas suscrito de pana!');
	},
};