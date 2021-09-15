// Require the necessary discord.js classes
const fs = require('fs');
const axios = require('axios');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    setInterval(fetchSuscribed, 5000);
});


// Waiting for commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
    
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);

// Function to all suscribed
const fetchSuscribed = async() =>{
    const res = await axios.get('http://localhost:5005/diff');
    const liq = res.data.data;
    if(liq.length === 0){
        return
    }
    const sus = fs.readFileSync('data/suscribed.json');
    const dialogArray = [];
    liq.forEach(product =>{
        const dialog = new MessageEmbed()
	        .setTitle(product.name)
	        .setColor("#00d879")
            .setURL(product.url)
	        .setThumbnail(product.image)
	        .addFields(
		        { name: "Precio", value: product.price}
	        ); 
        dialogArray.push(dialog);
    });

    JSON.parse(sus).forEach(element => {
        client.users.fetch(element).then(
            (user) => user.send({ embeds: dialogArray })
        )     
    });
}