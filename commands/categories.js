const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const axios  = require('axios');
const baseurl = require('../baseurl.js');

async function fetchCat(){
    const res = await axios.get(`${baseurl}/categories`);
    const cat = res.data.data;
    return cat;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('categories')
		.setDescription('Elige la categoría de los productos que quieres ver'),
	async execute(interaction) {
        const optionList = await fetchCat();
		const selector = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Selecciona una categoría')
					.addOptions(optionList),
			);

		await interaction.reply({content: "Aquí las tienes :3", components: [selector], ephemeral:true});
	},
};