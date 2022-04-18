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

/**
 *
 * @param {string} channelId
 * @param {Discord.ButtonInteraction} button
 * @param {Discord.ButtonInteraction} i
 */

module.exports = (channelId, button, i) => {
  let payload = {
    channelId: channelId,
    sortBy: "newest",
    channelIdType: 0,
  };
  ytch
    .getChannelVideos(payload)
    .then(async (response) => {
      if (!response.alertMessage) {
        await (
          await button.message.edit({
            embeds: [
              new Discord.MessageEmbed()
                .setColor(button.message.embeds[0].color)
                .setDescription(
                  response?.items
                    ?.map(
                      (value, index) =>
                        `${index + 1}. [${
                          value.title
                        }](https://www.youtube.com/watch?v=${
                          value.videoId
                        })\npublished at: \`${
                          value.publishedText
                        }\` | views: \`${value.viewCountText}\` | duration: \`${
                          value.durationText
                        }\``
                    )
                    .slice(0, 15)
                    .join("\n")
                ),
              response?.items.length > 15
                ? new Discord.MessageEmbed()
                    .setColor(button.message.embeds[0].color)
                    .setDescription(
                      response?.items
                        ?.map(
                          (value, index) =>
                            `${index + 1}. [${
                              value.title
                            }](https://www.youtube.com/watch?v=${
                              value.videoId
                            })\npublished at: \`${
                              value.publishedText
                            }\` | views: \`${
                              value.viewCountText
                            }\` | duration: \`${value.durationText}\``
                        )
                        .slice(15, 30)
                        .join("\n")
                    )
                : new Discord.MessageEmbed().setDescription("_ _"),
            ],
            components:
              response?.items.length == 30
                ? [
                    new Discord.MessageActionRow().addComponents(
                      new Discord.MessageButton()
                        .setCustomId("more")
                        .setLabel("More?")
                        .setStyle("SUCCESS")
                    ),
                  ]
                : [
                    new Discord.MessageActionRow().addComponents(
                      new Discord.MessageButton()
                        .setCustomId("more")
                        .setLabel("More?")
                        .setDisabled(true)
                        .setStyle("SUCCESS")
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
            if (button.customId !== "more") return;
            let payload = {
              continuation: response?.continuation,
            };
            ytch
              .getChannelVideosMore(payload)
              .then(async (response2) => {
                if (!response2.alertMessage) {
                  await (
                    await button.message.edit({
                      embeds: [
                        new Discord.MessageEmbed()
                          .setColor(button.message.embeds[0].color)
                          .setDescription(
                            response2?.items
                              ?.map(
                                (value, index) =>
                                  `${index + 1}. [${
                                    value.title
                                  }](https://www.youtube.com/watch?v=${
                                    value.videoId
                                  })\npublished at: \`${
                                    value.publishedText
                                  }\` | views: \`${
                                    value.viewCountText
                                  }\` | duration: \`${value.durationText}\``
                              )
                              .slice(0, 15)
                              .join("\n")
                          ),
                        response2?.items.length > 15
                          ? new Discord.MessageEmbed()
                              .setColor(button.message.embeds[0].color)
                              .setDescription(
                                response2?.items
                                  ?.map(
                                    (value, index) =>
                                      `${index + 1}. [${
                                        value.title
                                      }](https://www.youtube.com/watch?v=${
                                        value.videoId
                                      })\npublished at: \`${
                                        value.publishedText
                                      }\` | views: \`${
                                        value.viewCountText
                                      }\` | duration: \`${value.durationText}\``
                                  )
                                  .slice(15, 30)
                                  .join("\n")
                              )
                          : new Discord.MessageEmbed().setDescription("_ _"),
                      ],
                      components:
                        response2?.items.length == 30
                          ? [
                              new Discord.MessageActionRow().addComponents(
                                new Discord.MessageButton()
                                  .setCustomId("more")
                                  .setLabel("More?")
                                  .setStyle("SUCCESS")
                              ),
                            ]
                          : [
                              new Discord.MessageActionRow().addComponents(
                                new Discord.MessageButton()
                                  .setCustomId("more")
                                  .setLabel("More?")
                                  .setDisabled(true)
                                  .setStyle("SUCCESS")
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
                      if (button.customId !== "more") return;
                      let payload = {
                        continuation: response2?.continuation,
                      };
                      ytch
                        .getChannelVideosMore(payload)
                        .then(async (response3) => {
                          if (!response3.alertMessage) {
                            await await button.message.edit({
                              embeds: [
                                new Discord.MessageEmbed()
                                  .setColor(button.message.embeds[0].color)
                                  .setDescription(
                                    response3?.items
                                      ?.map(
                                        (value, index) =>
                                          `${index + 1}. [${
                                            value.title
                                          }](https://www.youtube.com/watch?v=${
                                            value.videoId
                                          })\npublished at: \`${
                                            value.publishedText
                                          }\` | views: \`${
                                            value.viewCountText
                                          }\` | duration: \`${
                                            value.durationText
                                          }\``
                                      )
                                      .slice(0, 15)
                                      .join("\n")
                                  ),
                                response3?.items.length > 15
                                  ? new Discord.MessageEmbed()
                                      .setColor(button.message.embeds[0].color)
                                      .setDescription(
                                        response3?.items
                                          ?.map(
                                            (value, index) =>
                                              `${index + 1}. [${
                                                value.title
                                              }](https://www.youtube.com/watch?v=${
                                                value.videoId
                                              })\npublished at: \`${
                                                value.publishedText
                                              }\` | views: \`${
                                                value.viewCountText
                                              }\` | duration: \`${
                                                value.durationText
                                              }\``
                                          )
                                          .slice(15, 30)
                                          .join("\n")
                                      )
                                  : new Discord.MessageEmbed().setDescription(
                                      "_ _"
                                    ),
                              ],
                              components:
                                response3?.items.length == 30
                                  ? [
                                      new Discord.MessageActionRow().addComponents(
                                        new Discord.MessageButton()
                                          .setCustomId("more")
                                          .setLabel("More?")
                                          .setStyle("SUCCESS")
                                      ),
                                    ]
                                  : [
                                      new Discord.MessageActionRow().addComponents(
                                        new Discord.MessageButton()
                                          .setCustomId("more")
                                          .setLabel("More?")
                                          .setDisabled(true)
                                          .setStyle("SUCCESS")
                                      ),
                                    ],
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
                          button.message.edit({
                            embeds: [],
                            components: [],
                            content: "Channel could not be found.",
                          });
                        });
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
                button.message.edit({
                  embeds: [],
                  components: [],
                  content: "Channel could not be found.",
                });
              });
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
