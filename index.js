const Discord = require('discord.js');
const bot = new Discord.Client();
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;

bot.on('ready', () => {
    console.log(`${bot.user.username} готов производить контент`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    })

    bot.user.setActivity("OREO SPECIAL");
});

bot.on('message', async message =>{

    if(message.channel.type == 'dm') return;

    if(message.author.id == 208583885666254849) {
        message.react('🦊')
    }

    if(message.content === prefix + 'embed') {
        embed(message);
        return;
    }

    if(message.content === prefix + 'test') {
        test(message);
        return;
    }

});

async function test(message) {

}

async function embed(message) {
    let embemb = new Discord.MessageEmbed()
        .setTitle('Создание красивого закрепленного сообщения')
        .setColor('#f08c46')
        .setDescription(`
            Введите цвет hex
            Введите заголовок
            Введите описание
        `);
    message.channel.send(embemb);

    let filter = m => m.author.id === message.author.id;
    let paramc = await message.channel.awaitMessages(filter, { max: 1 });
    let titlec = await message.channel.awaitMessages(filter, { max: 1 });
    let desc = await message.channel.awaitMessages(filter, { max: 1 });

    let createEmbed = new Discord.MessageEmbed()
    //.setImage('https://cdn.discordapp.com/attachments/725430133565030470/726397637666013234/rules.gif')
    .setColor(`${paramc.first().content}`)
    .setTitle(`${titlec.first().content}`)
    .setDescription(`${desc.first().content}`);

    message.channel.send(createEmbed);

    await message.channel.messages.fetch({ limit: 5 }).then(messages =>{
    message.channel.bulkDelete(messages)
    });
}

bot.login(token);