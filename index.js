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
  var bot2 = controller.spawn({
  //controller.spawn({
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

/*controller.hears(['apitime'],['ambient'], function(bot, message) {
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
				bot.reply(message, 'type: ' + skus[i].type + '. ID: ' + skus[i].id);
			}
		})
	})
)};*/

controller.hears(['adam'],['ambient'],function(bot,message) {
  bot.startConversation(message, q08);
});

q08 = function(response, convo) {
convo.say("We have chosen the Harper")
//var bot = slack_botkit.spawn(team);
var attachments = [{
    fallback: 'text',
    image_url: 'http://bw-site-images-processed-staging.s3.amazonaws.com/letterbox-main/3-months-of-flowers/website_small/8b99fdd71721c30ced2a7e022d6fc088.jpg',
    title_link: 'https://bloomandwild.com/',
    color: '#7CD197'
  }]
var msg = {
      attachment: attachments
      }
    
    //bot2.reply(convo, msg);
    bot2.reply(response, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp)
  })
    convo.ask("Do you want flowers delivered today?", function(response, convo) {
        if (response.text.uppercase == 'NO') {
            convo.say("This bot is not for you. Click HERE")
           
      } else {
            convo.say("Great! I was hoping you would say that")
            q02(response, convo)
        }
      convo.next();
    });
}

split01 = function(response, convo) {
  convo.ask("What flower do you want? Zara, Charlie or Willow", function(response, convo) {
  	if (response.text == 'Zara') {
  		convo.say('Zara!!');
  		askPizzaSize(response, convo);
  	} else {
  		convo.say('please say something else')
  		askPizzaWhereDeliver(response, convo)
  	}
    convo.next();
  });
}

controller.hears(['flowertime'],['ambient'],function(bot,message) {
  bot.startConversation(message, askPizzaFlavor);
});

askPizzaFlavor = function(response, convo) {
  convo.ask("What flower do you want? Zara, Charlie or Willow", function(response, convo) {
    convo.say('Awesome. ' + response.text + ' it is then');
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

controller.hears([':bouquet:'], ['direct_message', 'direct_mention'], function (bot, message) {
  var text = 'no image, oh well.'
  var attachments = [{
    fallback: text,
    image_url: 'http://bw-site-images-processed-staging.s3.amazonaws.com/letterbox-main/3-months-of-flowers/website_small/8b99fdd71721c30ced2a7e022d6fc088.jpg',
    title_link: 'https://bloomandwild.com/',
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp)
  })
})

/*controller.hears(['adam2'], ['direct_message', 'direct_mention'], function (bot, message) {
  var text = 'no image, oh well.'
  var attachments = [{
    fallback: text,
    text: 'Pick a button',
    color: '#7CD197',
    actions: [{
    	name: 'A',
    	text: 'A-text',
    	type: 'button',
    	value: 'A-value'
    	}, {
    	name: 'B',
    	text: 'B-text',
    	type: 'button',
    	value: 'B-value'
    	}]
  }]

  bot.reply(message, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp)
  })
})*/

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})
