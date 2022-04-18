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

const ytch = require("yt-channel-info");
const Discord = require("discord.js");
const moment = require("moment");

/**
 *
 * @param {string} channelId
 * @param {Discord.ButtonInteraction} button
 * @param {Discord.ButtonInteraction} i
 */

module.exports = (channelId, button, i) => {
  let payload = {
    channelId: channelId,
  };
  ytch
    .getChannelCommunityPosts(payload)
    .then(async (response) => {
      if (!response.alertMessage) {
        button.message.edit({
          embeds: [
            new Discord.MessageEmbed()
              .setColor(button.message.embeds[0].color)
              .setDescription(
                response?.items
                  ?.map(
                    (value, index) =>
                      `${index + 1}. [${
                        value.postText
                      }](https://www.youtube.com/post/${
                        value.postId
                      })\nPublished at: \`${
                        value.publishedText
                      }\` | Comment count: \`${
                        value.commentCount
                      }\` | Vote count: \`${value.voteCount}\``
                  )
                  .slice(0, 15)
                  .join("\n")
              ),
          ],
          components: [],
          content: "Channel could not be found.",
        });
      } else {
        button.message.edit({
          embeds: [],
          components: [],
          content: "Channel could not be found.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
