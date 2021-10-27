const Discord = require("discord.js")

const client = new Discord.Client({
	intents: 32511,
	allowedMentions: ["users"],
})

/* keyboard letters */
const keyboard = [
    "abcde".split(""),
    "fghij".split(""),
    "klmno".split(""),
    "pqrst".split(""),
    "uvwxy".split(""),
]

client.on("ready", () => console.log(`Logged in as ${client.user.tag}`))

client.on("messageCreate", async msg => {
    if (msg.content == "!name") {
        let messageComponents = [];

        /* create all of the buttons */
        keyboard.forEach(row => {
            let actionRow = new Discord.MessageActionRow()

            row.forEach(letter => {
                let button = new Discord.MessageButton()
                button.setCustomId(`letter-${letter}`)
                button.setLabel(letter)
                button.setStyle("PRIMARY")

                actionRow.addComponents([button])
            })

            messageComponents.push(actionRow)
        })

        /* send the messages */
        await msg.reply({
            content: "enter your name:\n",
            components: messageComponents
        })

        await msg.channel.send("*if your name has a z in it, you don't get to use this bot*")
    }
})

client.on("interactionCreate", interaction => {
    if (interaction.isButton() && interaction.customId.startsWith("letter-")) {
        let letter = interaction.customId.split("-")[1]; // which letter was clicked
        let isFirst = interaction.message.content.endsWith(":") // for adding a space after "your name:"

        /* edit the message */
        interaction.update({
            content: interaction.message.content + (isFirst ? " " : "") + letter
        })
    }
})

client.login("")
