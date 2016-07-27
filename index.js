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

/*controller.hears(['adam'],['ambient'],function(bot,message) {
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
}*/

controller.hears([':bouquet:'],['ambient'],function(bot,message) {
  bot.startConversation(message, q01);
});

q22 = function(response, convo) {
convo.ask("Please type your gift message below", function(response, convo) {
        convo.say('Interesting... :wink:');
        q19(response, convo);
  convo.next();
});
}

q26 = function(response, convo) {
convo.ask("What do you want to change? A) bouquet selection B) delivery address C) gift message or D) Delivery time", function(response, convo) {
    if (response.text.toUpperCase() == 'A') {
        convo.say("Let's try this again");
        q04(response, convo);
    } else if (response.text.toUpperCase() == 'B') {
        convo.say("Let's try this again");
        q15(response, convo);
    } else if (response.text.toUpperCase() == 'C') {
        convo.say("Let's try this again");
        q22(response, convo);
    } else if (response.text.toUpperCase() == 'D') {
        convo.say("Sure :timer_clock:, let's try this again.");
        q18(response, convo);
    } else {
        convo.say("Let's go from the beginning again...")
        q01(response, convo)
    }
  convo.next();
});
}

q06 = function(response, convo) {
convo.ask("OK ok ok chill out. What colour range would you prefer? A) Bright & colourful or B) Muted pastels - type 'A' or 'B' to answer.", function(response, convo) {
  if (response.text.toUpperCase() == 'A') {
      convo.say("You're so wild. Good choice");
      q11(response, convo);
      }
   if (response.text.toUpperCase() == 'B') {
      convo.say('Sophisticated eh? ')
      q12(response, convo)
} else {
convo.say("Just stick to the rules buddy - type 'A' or 'B' to answer. ")
       q02(response, convo)
   }
convo.next();
});
}

q11 = function(response, convo) {
convo.ask("Which of these statements best decribes the recipient? A) Bright & fun, B) Summery, light & carefree, C) Traditional & classic or D):pineapple: :pineapple: :pineapple: :pineapple: :pineapple: - type 'A', 'B', 'C' or 'D' to answer.", function(response, convo) {
  if (response.text.toUpperCase() == 'A') {
      convo.say("SWEET BRO. We've selected The Zara for you");
      q13(response, convo);
      }
   if (response.text.toUpperCase() == 'B') {
      convo.say("Not much of a summer tho is it. Good choice, we've selected The Charlie for you")
      q13(response, convo)
      }
if (response.text.toUpperCase() == 'C') {
      convo.say('If the Queen was a customer, she would select The Esme ')
      q13(response, convo)
      }
if (response.text.toUpperCase() == 'D') {
      convo.say(':pineapple: PINEAPPLEZZZZZZZZZZ :pineapple:')
      q13(response, convo)
} else {
convo.say("Seriously, we've only got until 6pm - type 'A', 'B', 'C' or 'D' to answer. ")
       q11(response, convo)
   }
convo.next();
});
}

q13 = function(response, convo) {
convo.ask("Are you happy with our selection?", function(response, convo) {
  if (response.text.toUpperCase() == 'YES') {
      convo.say('Excellent :heart_eyes_cat: ');
      q15(response, convo);
      }
   if (response.text.toUpperCase() == 'NO') {
      convo.say(":crying_cat_face:  O dear, let's try something else :new_moon_with_face:")
      q14(response, convo)
      } else {
convo.say("Seriously, we've only got until 6pm - type 'A', 'B', 'C' or 'D' to answer. :new_moon_with_face: :new_moon_with_face: :new_moon_with_face: ")
       q13(response, convo)
   }
convo.next();
});
}

q23 = function(response, convo) {
convo.ask("On a scale of 0 to 10, how likely are you to recommend us to a friend/colleague/cat?", function(response, convo) {
  if (response.text.toUpperCase() == '10') {
      convo.say(':heart_eyes_cat: BE MY VALENTINE');
      q24(response, convo);
      } else  if (response.text.toUpperCase() == '9') {
      convo.say('Excellent :heart_eyes_cat: ');
      q24(response, convo);
      } else if (response.text.toUpperCase() == '8') {
      convo.say('You are THE BEST :kissing_closed_eyes: ');
      q24(response, convo);
      } else if (response.text.toUpperCase() == '7') {
      convo.say('Good enough! :upside_down_face:');
      q24(response, convo);
      } else if (response.text.toUpperCase() == '6') {
      convo.say('Okkkkkkkk thanks :new_moon_with_face: ');
      q24(response, convo);
      } else if (response.text.toUpperCase() == '5') {
      convo.say('wut :thinking_face: ');
      q24(response, convo);
      } else if (response.text.toUpperCase() == '4') {
      convo.say('Who the f**k selects a 4?? Moron');
      q24(response, convo);
      } else if (response.text.toUpperCase() == '3') {
      convo.say("I'll find you and kick you in the cat :pouting_cat:");
      q24(response, convo);
      } else if (response.text.toUpperCase() == '2') {
      convo.say('Go sit on a :pineapple: ');
      q24(response, convo);
      } else if (response.text.toUpperCase() == '1') {
      convo.say(":no_mouth: lucky I have no mouth or I'd call you names");
      q24(response, convo);
      } else if (response.text.toUpperCase() == '0') {
      convo.say("Just f**k off, I'll post lilys to your cat");
      q24(response, convo);
      } else {
convo.say("It isn't a difficult thing to do is it. 0 to 10 you plonker :new_moon_with_face: ")
       q23(response, convo)
   }
convo.next();
});
}

q21 = function(response, convo) {
convo.ask("Type 'YES' to approve your order.", function(response, convo) {
    if (response.text.toUpperCase() == 'YES') {
        convo.say("Excellent:heart_eyes_cat: Thank you for your order! If you'd like to track your delivery, just type 'Track my order' or 'MEOW' whenever you want to check.");
        q23(response, convo);
    } else {
        convo.say("Oh dear...")
        q26(response, convo)
    }
  convo.next();
});
}

q19 = function(response, convo) {
convo.ask("Use your card ending XX339? :money_mouth_face:", function(response, convo) {
    
        convo.say(“Brill:nerd_face:”)
        q20(response, convo);

convo.next();
});
}

q18 = function(response, convo) {
convo.ask("When do you want this delivered? A) ASAP B) 2-4pm C) 3-5pm D) 4-6pm", function(response, convo) {
    if (response.text.toUpperCase() == 'A') {
        convo.say('Swell.:racing_car:');
        q22(response, convo);
    } else if (response.text.toUpperCase() == 'B') {
        convo.say('Swell.:racing_car:');
        q22(response, convo);
    } else if (response.text.toUpperCase() == 'C') {
        convo.say('Swell.:racing_car:');
        q22(response, convo);
    } else if (response.text.toUpperCase() == 'D') {
        convo.say('Swell.:racing_car:');
        q22(response, convo);
    } else {
        convo.say("Type 'A', 'B', 'C' or 'D', you noob.:face_with_rolling_eyes:")
        q18(response, convo)
    }
  convo.next();
});
}

q17 = function(response, convo) {
convo.ask("Have we got that right? 535 Kings Road, SW10 0SZ, London :octocat:", function(response, convo) {

       convo.say(“Great :smile_cat:”)
       q27(response, convo);

convo.next();
});
}

q15 = function(response, convo) {
convo.ask("What’s the postcode please ? :angel: ", function(response, convo) {
    
        convo.say(“Thanks:+1:”)
        q16(response, convo);

convo.next();
});
}

q16 = function(response, convo) {
convo.ask("What's the house number or name? :house:", function(response, convo) {
        convo.say('Got it.:wink:');
        q17(response, convo);
  convo.next();
});
}

q25 = function(response, convo) {
convo.ask("Are you happy with our selection?", function(response, convo) {
   if (response.text.toUpperCase() == 'YES') {
       convo.say('Excellent :heart_eyes_cat: ');
       q15(response, convo);
 } else  if (response.text.toUpperCase() == 'NO') {
       convo.say(":crying_cat_face:  O dear, let's try something else :new_moon_with_face:")
       q14(response, convo)

 } else {
 convo.say("Seriously, we've only got until 6pm - type 'A', 'B', 'C' or 'D' to answer. :new_moon_with_face: :new_moon_with_face: :new_moon_with_face: ")
        q25(response, convo)
    }
 convo.next();
});
}

q13 = function(response, convo) {
convo.ask("Are you happy with our selection?", function(response, convo) {
   if (response.text.toUpperCase() == 'YES') {
       convo.say('Excellent :heart_eyes_cat: ');
       q15(response, convo);
 } else
    if (response.text.toUpperCase() == 'NO') {
       convo.say(":crying_cat_face:  O dear, let's try something else :new_moon_with_face:")
       q14(response, convo)

 } else {
 convo.say("Seriously, we've only got until 6pm - type 'A', 'B', 'C' or 'D' to answer. :new_moon_with_face: :new_moon_with_face: :new_moon_with_face: ")
        q13(response, convo)
    }
 convo.next();
});
}

q11 = function(response, convo) {
convo.ask("Which of these statements best decribes the recipient? A) Bright & fun, B) Summery, light & carefree, C) Traditional & classic or D):pineapple: :pineapple: :pineapple: :pineapple: :pineapple: - type 'A', 'B', 'C' or 'D' to answer.", function(response, convo) {
   if (response.text.toUpperCase() == 'A') {
       convo.say("SWEET BRO. We've selected The Zara for you");
       q13(response, convo);
 } else
    if (response.text.toUpperCase() == 'B') {
       convo.say("Not much of a summer tho is it. Good choice, we've selected The Charlie for you")
       q13(response, convo)
} else 
 if (response.text.toUpperCase() == 'C') {
       convo.say('If the Queen was a customer, she would select The Esme ')
       q13(response, convo)
} else 
 if (response.text.toUpperCase() == 'D') {
       convo.say(':pineapple: PINEAPPLEZZZZZZZZZZ :pineapple:')
       q13(response, convo)

 } else {
 convo.say("Seriously, we've only got until 6pm - type 'A', 'B', 'C' or 'D' to answer. ")
        q11(response, convo)
    }
 convo.next();
});
}

q05 = function(response, convo) {
convo.ask("Would you like us to choose the bouquet for you? :bouquet: Type 'YES' or 'NO' to answer.", function(response, convo) {
    if (response.text == 'YES') {
        convo.say('Awesome.');
        q08(response, convo);
    } else {
        convo.say('Soz, please say type 'YES' for demo. :middle_finger: ')
        q05(response, convo)
    }
  convo.next();
});
} 

q03 = function(response, convo) {
convo.ask(" What’s the occasion? A) Business:briefcase: B) Personal :cat:", function(response, convo) {
    if (response.text.toUpperCase() == 'A') {
        convo.say("No problem!")
        q04(response, convo);
    } else if (response.text.toUpperCase() == 'B') {
        convo.say("Great!")
        q05(response, convo);
}
convo.next();
});
}

q02 = function(response, convo) {
convo.ask("How much are you looking to spend on your bouquet? A) £27-£35 B) £36-£52 - type 'A' or 'B' to answer.", function(response, convo) {
    if (response.text == 'A') {
        convo.say('Perfect.');
        q03(response, convo);
    } else {
        convo.say('Please say type 'A' for demo. :poop:')
        q02(response, convo)
    }
  convo.next();
});
}

q01 = function(response, convo) {
convo.ask("Do you want flowers delivered today?", function(response, convo) {
    if (response.text.toUpperCase() == 'NO') {
        convo.say("This bot is not for you. Click HERE")
       
  } else {
        convo.say("Great! I was hoping you would say that")
        q02(response, convo)
    }
  convo.next();
});
}

q07 = function(response, convo) {
convo.say("We have selected the Esme")
convo.ask("Are you happy to continue your order ", function(response, convo) {
    if (response.text.toUpperCase() == 'NO') {
        convo.say("This bot is not for you. Click HERE")
        q04(response, convo)
  } else {
        convo.say("Great! I was hoping you would say that")
        q15(response, convo)
    }
  convo.next();
});
}

q08 = function(response, convo) {
convo.say("We have selected the Esme")
convo.ask("Are you happy to continue your order ", function(response, convo) {
    if (response.text.toUpperCase() == 'NO') {
        convo.say("This bot is not for you. Click HERE")
        q04(response, convo)
  } else {
        convo.say("Great! I was hoping you would say that")
        q15(response, convo)
    }
  convo.next();
});
}

q27 = function(response, convo) {
convo.ask("What's the recipient's name?", function(response, convo) {
        convo.say("Thanks")
        q18(response, convo)
  convo.next();
});
}

q20 = function(response, convo) {
convo.say("Please check you're happy with your order")
convo.say("The Esme for Theresa May at 10 Downing Street - ASAP")
convo.ask("Are you happy to continue your order ", function(response, convo) {
    if (response.text.toUpperCase() == 'NO') {
    convo.say("Oh dear...")
    q26(response, convo)
  } else {
  convo.say("Excellent:heart_eyes_cat: Thank you for your order! If you'd like to track your delivery, just type 'Track my order' or 'MEOW' whenever you want to check.");
  q23(response, convo);
    }
  convo.next();
});
}

q12 = function(response, convo) {
convo.ask("What best describes your recipient? A) Quirky & crafty B) Stylish & elegant C) A little bit special", function(response, convo) {
    if (response.text.toUpperCase() == 'A') {
        convo.say("Awesome. We've selected The Posy Party");
        q25(response, convo);
    } else if (response.text.toUpperCase() == 'B') {
        convo.say("Awesome. We've selected The Willow");
        q25(response, convo);
    } else if (response.text.toUpperCase() == 'C') {
        convo.say("Awesome. We've selected The Jessica");
        q25(response, convo);
    } else {
        convo.say('Please type 'A','B','C'.')
        q12(response, convo)
    }
  convo.next();
});
}

q24 = function(response, convo) {
convo.say("Awesome. We've selected The Willow");
convo.next();
}

q04 = function(response, convo) {
convo.ask("Would you like us to select a bouquet for you? Type 'YES' or 'NO'.", function(response, convo) {
    if (response.text.toUpperCase() == 'YES') {
        convo.say('Woohoo! Coming up...');
        q07(response, convo);
    } else if (response.text.uppercase == 'NO') {
        convo.say('Rightio...');
        q06(response, convo);
    } else {
        convo.say("Type 'YES' or 'NO'... honestly...:face_with_rolling_eyes:")
        q04(response, convo)
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
