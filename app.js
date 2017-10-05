var express = require('express');
var app = express();

var FBBotFramework = require('fb-bot-framework');

// Initialize
var bot = new FBBotFramework({
    page_token: "EAAHkfvKXgGkBAJCZAksrUqfXKwyEZBIkJB2bZB5isoQqCyboIENGv6CT8rRyfMxYbo2YnH1FMImYZBt82iIfS0o3B5bYMP0lZAZBfeR2hc6ac97mdFxFXao1t5IybiipP5Sf9eEZAYVIbCnetjLL8Y54AONlcf3UZCw9zTdLMFVbAZAcZAsLI0t0bj",
    verify_token: "xuxufootball"
});

// Setup Express middleware for /webhook
app.use('/webhook', bot.middleware());

// Setup listener for incoming messages
bot.on('message', function (userId, message) {
	console.log(message)
	console.log('-------------------')
    // Send text message
    // bot.sendTextMessage(userId, "Echo Message:" + message);

    // Send quick replies
    var replies = [
        {
            "content_type": "text",
            "title": "👍",
            "payload": "thumbs_up"
        },
        {
            "content_type": "text",
            "title": "👎",
            "payload": "thumbs_down"
        }
    ];
    bot.sendQuickReplies(userId, message, replies);
});

bot.on('quickreply', function (userId, payload) {
    bot.sendTextMessage(userId, "payload:" + payload);
});

// Config the Get Started Button and register a callback
bot.setGetStartedButton("GET_STARTED");
bot.on('postback', function (userId, payload) {

    if (payload == "GET_STARTED") {
        getStarted(userId);
    }

    // Other postback callbacks here
    // ...

});

function getStarted(userId) {

    // Get started process 
}

// Setup listener for attachment
bot.on('attachment', function (userId, attachment) {

    // Echo the audio attachment
    if (attachment[0].type == "audio") {
        bot.sendAudioAttachment(userId, attachment[0].payload.url);
    }

});

app.get("/", function (req, res){
  res.send("hello world");
});

// Make Express listening
//Make Express listening
app.listen(4000);

module.exports = app;
