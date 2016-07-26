var Botkit = require('botkit')
var http = require('http')
var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }

    console.log('Connected to Slack RTM')
  })
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, { debug: true })
}

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
  bot.reply(message, 'Hello.')
})

/*controller.hears(['send flowers'], ['direct_mention'], function (bot, message) {
  //bot.reply(message, 'give me an address first.')
  bot.startConversation(message,function(err,convo) {

    convo.say('Hello!');
    convo.say('Have a nice day!');

  });
})*/

/*controller.hears(['question me'], 'direct_mention', function(bot,message) {
  // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {
    convo.ask('How are you?',function(response,convo) {
      convo.say('Cool, you said: ' + response.text);
      convo.next();

    });

  })

})*/

/*controller.hears(['flowertime'], 'direct_mention', function(bot,message) {
    askFlavor = function(response, convo) {
      convo.ask('What flower do you want? Zara, Charlie or Willow', function(response, convo) {
        convo.say('Awesome.');
        askSize(response, convo);
        convo.next();
      });
    }
    askSize = function(response, convo) {
      convo.ask('What address?', function(response, convo) {
        convo.say('Ok.')
        askWhereDeliver(response, convo);
        convo.next();
      });
    }
    askWhereDeliver = function(response, convo) {
      convo.ask('When do you want? Now, Tomorrow or other', function(response, convo) {
        convo.say('Ok! Good bye.');
        convo.next();
      });
    }

    bot.startConversation(message, askFlavor);
})*/

controller.hears(['apitime'],['ambient'], function(bot, message)
var url = '/v2/skus?filter[active]=true&include=collection,default_bouquet,default_bouquet.bouquet_images'
http.get({
		host: 'api.bloomandwild.com',
		path: url
	}, function(response){
		var body = '';
		response.on('data',function(d){
			body += d;
		})
		response.on('end', function(){
			var data = JSON.parse(body);
			var skus = data;
			//var days = data.forecast.simpleforecast.forecastday;
			for(i = 0;i<skus.length;i++)
			{
				//bot.reply(message, 'name: ' + skus[i].attributes.name);
				bot.repl(message, 'type: ' + skus[i].type + '. ID: ' + skus[i].ID);
			}
		})
	})
)

controller.hears(['flowertime'],['ambient'],function(bot,message) {
  bot.startConversation(message, askPizzaFlavor);
});

askPizzaFlavor = function(response, convo) {
  convo.ask("What flower do you want? Zara, Charlie or Willow", function(response, convo) {
    convo.say("Awesome.");
    askPizzaSize(response, convo);
    convo.next();
  });
}
askPizzaSize = function(response, convo) {
  convo.ask("What address?", function(response, convo) {
    convo.say("Ok.")
    askPizzaWhereDeliver(response, convo);
    convo.next();
  });
}
askPizzaWhereDeliver = function(response, convo) { 
  convo.ask("When do you want? Now, Tomorrow or other", function(response, convo) {
    convo.say("Ok! Goodbye.");
    convo.next();
  });
}

controller.hears(['hello', 'hi'], ['direct_message'], function (bot, message) {
  bot.reply(message, 'Hello.')
  bot.reply(message, 'It\'s nice to talk to you directly.')
})

controller.hears('.*', ['mention'], function (bot, message) {
  bot.reply(message, 'You really do care about me. :heart:')
})

controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
  var help = 'I will respond to the following messages: \n' +
      '`bot hi` for a simple message.\n' +
      '`bot attachment` to see a Slack attachment message.\n' +
      '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
      '`bot help` to see this again.'
  bot.reply(message, help)
})

controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
  var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
  var attachments = [{
    fallback: text,
    pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
    title: 'Host, deploy and share your bot in seconds.',
    image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
    title_link: 'https://beepboophq.com/',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})
