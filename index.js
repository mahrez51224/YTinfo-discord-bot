// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
// |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|

// did you see casperMusic? chack out: https://discord.gg/ws9jA2cR5s

/**
   ⚠️ stop right there ⚠️

   did you know you are stealing my project when you remove the copyright?
   you can just contact me http://discord.com/users/933856726770413578 for publish it
   or if you are using it for your server know the no one will see the copyrights only you in the project
   so why you are removing it?, be nice and just leave it


   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
 */

const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const ytch = require("yt-channel-info");
const videos = require("./modules/videos");
const playlists = require("./modules/playlists");
const stats = require("./modules/stats");
const community = require("./modules/community");

client.on("ready", async () => {
  console.log(`⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️`)
  console.log(client.user.username + " is rerady.")
  let commands = [
    {
      name: "get-yt-info",
      description: "get youtube channel info from the url",
      type: 1,
      options: [
        {
          name: "url",
          description: "the channel url",
          type: 3,
          required: true,
        },
      ],
    },
  ];
  await client.application?.commands
    .set(commands)
    .catch((err) => console.log(err));
  await client.user.setStatus("idle");
  await client.user.setActivity({
    name: "youtube | /get-yt-info",
    type: "WATCHING",
  });
});

client.on("interactionCreate", async (i) => {
  if (!i.isCommand()) return;
  if (i.commandName == "get-yt-info") {
    await i.deleteReply();
    let channelUrl = i.options.getString("url", true);

    // get channel id
    let channelId = await getChannelId(channelUrl);
    let payload = {
      channelId: channelId, // Required
      channelIdType: 0,
    };
    ytch
      .getChannelInfo(payload)
      .then(async (response) => {
        if (!response.alertMessage) {
          let embed = new Discord.MessageEmbed()
            .setColor(0x2c2f33)
            .setImage(
              response?.authorBanners[response?.authorBanners.length - 1]
                ?.url || ""
            )
            .setThumbnail(
              response?.authorThumbnails[response?.authorThumbnails.length - 1]
                ?.url || ""
            )
            .setDescription(response?.description || "_ _")
            .setFields(
              {
                name: "Is Verified:",
                value: "**" + response?.isVerified + "**" || "_ _",
                inline: true,
              },
              {
                name: "Is OfficialArtist:",
                value: "**" + response?.isOfficialArtist + "**" || "_ _",
                inline: true,
              },
              {
                name: "subscribersCount:",
                value: "**" + response?.subscriberText + "**" || "_ _",
                inline: true,
              }
            )
            .setTitle(response?.author || "")
            .setURL(response?.authorUrl || "");
          await (
            await i.channel.send({
              embeds: [embed],
              components: [
                new Discord.MessageActionRow().addComponents(
                  new Discord.MessageButton()
                    .setCustomId("v")
                    .setLabel("Videos")
                    .setStyle("PRIMARY"),
                  new Discord.MessageButton()
                    .setCustomId("p")
                    .setLabel("Playlists")
                    .setStyle("PRIMARY"),
                  new Discord.MessageButton()
                    .setCustomId("s")
                    .setLabel("Stats")
                    .setStyle("PRIMARY"),
                  new Discord.MessageButton()
                    .setCustomId("c")
                    .setLabel("Community")
                    .setStyle("PRIMARY")
                ),
              ],
            })
          )
            .createMessageComponentCollector({
              componentType: "BUTTON",
              time: 99999999,
              filter: (i2) => i.user.id == i2.user.id,
            })
            .on("collect", async (button) => {
              await button.deferUpdate().catch(() => {});
              switch (button.customId) {
                case "v":
                  await videos(channelId, button, i);
                  break;
                case "p":
                  await playlists(channelId, button, i);
                  break;
                case "s":
                  await stats(channelId, button, i);
                  break;
                case "c":
                  await community(channelId, button, i);
                  break;
                default:
                  break;
              }
            });
        } else {
          return i.channel.send("Channel could not be found.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

/**
 *
 * @param {string} url
 * @returns {string}
 */
async function getChannelId(url) {
  let data = new Promise((resolve, reject) => {
    if (url.includes("https://www.youtube.com/channel/"))
      resolve(url.split("https://www.youtube.com/channel/").join(""));
    else if (url.includes("https://www.youtube.com/user/"))
      resolve(url.split("https://www.youtube.com/user/").join(""));
    else if (url.includes("https://www.youtube.com/c/"))
      resolve(url.split("https://www.youtube.com/c/").join(""));
    else reject("url not supported.");
  });
  return data.then((id) => {
    return id;
  });
}

client.login(fs.readFileSync(__dirname + "/token.txt", { encoding: "utf-8" }));

/**
   ⚠️ stop right there ⚠️

   did you know you are stealing my project when you remove the copyright?
   you can just contact me http://discord.com/users/933856726770413578 for publish it
   or if you are using it for your server know the no one will see the copyrights only you in the project
   so why you are removing it?, be nice and just leave it

   
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
   |****  ⚠️ ALL COPYRIGHTS GOSE TO DEF(http://discord.com/users/933856726770413578) ⚠️  ****|
 */
