// 20+ Commands, Multi-lingual, 24/7, Fun Commands, Meme and Image Generator, Crypto, Economy/Currency, Fun commands
// Multi-lingual support, get acronym and word meanings, receive live footage from NASA,
// Generate QR codes, get XKCD comics, 
// get trending YouTube videos, breaking news, bitcoin prices, 
// make memes, and more! 

const Discord = require('discord.js');
let token_obj = require(`token.json`);
var token = token_obj["token"];
let imgflip_pass_obj = require(`imgflip_pass.json`);
var imgflip_pass = imgflip_pass_obj["pass"];
let cmd_info_obj = require(`commands_info.json`);


let translate_creds_obj = require(`translate-creds.json`);


const client = new Discord.Client();

// RESOURCES
var emoji_list = ["😃", "🤣", "👌", "😍", "👌", "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "😇", "🤠", "🤥", "🤫", "🤭", "🧐", "🤓"]
let json1 = require(`dictionary.json`); // This is an old-style JSON dictionary, with ancient definitions from the 19th and 20th Century.

// NPM PACKAGES
var moby = require('moby')
const fetch = require('node-fetch');
const request = require('request');
const formData = require('form-data');
var fs = require('fs');
var emoji = require("emojilib/emojis.json")
var Jimp = require("jimp");

// Global Variables
var new_image_name = "test56.jpg" 
       


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Running on ${client.guilds.size} servers`);
});

client.on('userUpdate', newUser => {
    console.log(`${newUser} just changed her username from ${newUser.oldUser}!`)
});

client.on("guildCreate", guild => {
    var message = `Joined a new server called: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members! :D`;
    console.log(message);
    
    client.user.setActivity(`Running on ${client.guilds.size} servers`);

  });
  
  client.on("guildDelete", guild => {
    console.log(`Bot has been removed from the following server: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });

client.on('message', msg => {
    var define = "define";
    var msg_content = msg.content;
    var msg_array = msg_content.split(" ");
    var cmd = msg_array[0];
    console.log(cmd)

    var slice = msg_content.slice(0, 6);
    var write_to_file = ""

    var msg_author = msg.author.username;
    console.log(msg.guild.name)

    fs.appendFile('test.txt', `\nMessage Content: ${msg_content} Author: ${msg_author} Timestamp: ${msg.createdTimestamp} Date: ${msg.createdAt} Server: ${msg.guild.name} Server Count: ${msg.guild.memberCount} Reg: ${msg.guild.region}`, (err) => {  
        if (err) throw err;
    });
    // TEST EMOJIS
    // var keys = Object.keys(emoji);
    // var emojip = ""
    // for (var i = 101; i < 200; i += 1){
    //     var emoji_md = ` :${keys[i]}: `
    //     emojip += emoji_md
    // }
    // msg.reply(emojip)
    //

  if (msg.content === "hi"){
    msg.reply("It's so lovely to see you, " + msg.author);
    msg.react("😄")
    }

    else if (cmd === "avatar"){
        var avatar_compliments = [`:eyes: I like your avatar A LOT :)`, `Hey, guys! Check out ${msg.author}s neat profile pic :eyes:`, "Oooh, I like this profile pic of yours... :eyes:", "B) Love that profile pic."];
        var randomNumber = getRandomNumber(0, avatar_compliments.length - 1);
        var randomCompliment = avatar_compliments[randomNumber];
        msg.reply(randomCompliment + "\n" + msg.author.avatarURL);
        for (var i = 0; i < 10; i += 1){
            var randomNumber = getRandomNumber(0, emoji_list.length - 1);
            var randomEmoji = emoji_list[randomNumber];
            msg.react(randomEmoji)
        }
    }
    else if (msg.content === "pls react"){
        for (var i = 0; i < 10; i += 1){
            var randomNumber = getRandomNumber(0, emoji_list.length - 1);
            var randomEmoji = emoji_list[randomNumber];
            msg.react(randomEmoji);
        }
    }

    else if (cmd === "define"){
        msg.reply("Query successful.")
        var word = msg.content.slice(7, msg_content.length)
        word = word.toUpperCase();
        msg.reply(word);
        var definition = json1[word];
        msg.reply(definition);
    }

    else if (cmd === "population"){
        msg.reply("Getting you your population stats . . .")
        let url = 'http://api.population.io/1.0/population/World/today-and-tomorrow/?format=json';

        fetch(url)
        .then(res => res.json())
        .then((out) => {
        var total_population = out.total_population[1].population;    
        console.log(total_population)
        msg.reply("There are" + total_population + "humans living on Earth right now.");
        })
        .catch(err => { throw err });
    }
    else if (cmd === "reddit"){
        msg.reply("Getting you some nice Reddit posts . . .")
        let reddit_url = 'https://www.reddit.com/r/ProgrammerHumour/.json';
        
        fetch(reddit_url)
        .then(res => res.json())
        .then((out) => {
        var randomNumber = getRandomNumber(0, 26)
        var reddit_data = out.data.children[randomNumber].data;   
        var url = reddit_data.url;
        var author = reddit_data.author;
        msg.reply("Posted by:" + author);
        msg.reply(url) 
        console.log(url)
        })
        .catch(err => { throw err });
    }

    else if (cmd === "til"){
        msg.reply("Getting you some TODAY I LEARNED from the TIL Subreddit. . . :surprise:")
        let til_url = "https://www.reddit.com/r/todayilearned.json";
        
        fetch(til_url)
        .then(res => res.json())
        .then((out) => {
        var randomNumber = getRandomNumber(1, 25)
        var reddit_data = out.data.children[randomNumber].data;   
        var title = reddit_data.title;
        var article_url = reddit_data.url;
        var author = reddit_data.author;
        console.log(reddit_data)
        msg.reply("Posted by: " + author)
        msg.reply(title);
        msg.reply(article_url);

        })
        .catch(err => { throw err });
    }
    else if (cmd === "news"){
        msg.reply("Pinging Reddit for some world headlines: :earth_africa:")
        let til_url = "https://www.reddit.com/r/worldnews.json";
        
        fetch(til_url)
        .then(res => res.json())
        .then((out) => {
        var randomNumber = getRandomNumber(1, 25)
        var reddit_data = out.data.children[randomNumber].data;   
        var title = reddit_data.title;
        var article_url = reddit_data.url;
        var author = reddit_data.author;
        console.log(reddit_data)
        msg.reply("Posted by: " + author)
        msg.reply(title);
        msg.reply(article_url);

        })
        .catch(err => { throw err });
    }
    else if (cmd === "search"){
        msg.reply("Query successful.")
        var word = msg.content.slice(7, msg_content.length)
        var synonyms = moby.search(word);
        if (synonyms.length > 100){
            console.log(synonyms)

        }
        else{
            msg.reply(synonyms);

        }

    }

    else if (cmd === "acronym"){
        var acronym = msg_array[1];
        console.log(msg_array)
        msg.reply("Pinging Acronym Database for some cool acronym meanings . . .")
        var acronym_uri = `http://acronyms.silmaril.ie/cgi-bin/xaa?${acronym}`;

        request(acronym_uri, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            //console.log(body);
            var split_body = body.split("\n");
            //console.log(split_body)
            var num_acronyms = split_body[4];
            if (num_acronyms.includes("0")){
                msg.reply("No acronyms exist with this abbreviation.")
            }
            else{
                var header = "```ml" + "\n" +
                "Acronym Meanings for " + acronym + "👀 \n" +
                "```"
                msg.channel.send(header)
                for (var i = 6; i < split_body.length - 1; i += 4){
                    var line = split_body[i]
                    line = line.trim()

                    var split_acr_array = line.split(" ");

                    console.log(split_acr_array)
                    var first_item = split_acr_array[0]
                    console.log("First item" + first_item)
                    if (split_acr_array.length === 1){
                        first_item = first_item.slice(7, first_item.length - 8)
                        split_acr_array[0] = first_item

                    }
                    else{    

                        var strpd_item = first_item.slice(7, first_item.length + 5);
                        split_acr_array[0] = strpd_item;
    
                        
                        var last_item = split_acr_array[split_acr_array.length - 1];
                        var strpd_last_item = last_item.slice(0, split_acr_array.length - 11);
                        split_acr_array[split_acr_array.length - 1] = strpd_last_item;
                    }
                
                    console.log(split_acr_array)
                    var final_acronym = split_acr_array.toString()
                    final_acronym = final_acronym.split(",").join(" ")
                    msg.channel.send(final_acronym)

            }
        }
        });
        
    }


    // if (cmd === "wiki"){
    //     var search_term = msg_content.slice(5, msg_content.length);
    //     console.log(search_term)
    //     search_term = search_term.split(" ").join("%20");
    //     console.log(search_term)
    //     var wiki_link = `https://en.wikitionary.org/w/api.php?action=query&titles=${search_term}&prop=revisions&rvprop=content&format=json&formatversion=2`
    //     fetch(wiki_link)
    //     .then(res => res.json())
    //     .then((out) => {
    //     var wiki_info = out;
    //     var wiki_content = wiki_info.query.pages[0].revisions[0].content;
    //     console.log(wiki_content)
    //     msg.reply(wiki_content)
    //     })
    //     .catch(err => { throw err });
        
    // }
    
    // HELP COMMAND
    else if (cmd === 'help') {
        if (msg_array.length > 1 ){
           
            var cmd = msg_array[1];
            var cmd_example = cmd + "_examples";
            var cmd_info = cmd_info_obj.commands[0][cmd];
            console.log("Definition: " + cmd_info)
            msg.channel.send("`" + cmd + "`" + " " + cmd_info)

            var examples = cmd_info_obj.examples[0][cmd_example];
            
            if (examples != ""){
                console.log(examples)
            var examples_template = "```ml" + "\n" +
            "Example Commands 👀" + "\n" +
            "\n" +
            "```" + "`" + examples + "`"
            msg.channel.send(examples_template)
            }
        }
        else {
            var help_output = ""
            var search_cmds = "`news` `population` `translate` `search` `define` `bitcoin` `acronym` "
            var space_cmds = "`neo` `earth` `iss` `astronauts` "
            var fun_cmds = "`xkcd` `qr` `!meme` `identify` `fmt`"

            var search_header = "```ml" + "\n" +
            "Info Commands 🔍" + "\n" +
            "```"
            help_output += search_header
            help_output += search_cmds


            var space_header = "```ml" + "\n" +
            "Space Commands 🌌🌠🌃" + "\n" +
            "```"
            help_output += space_header
            help_output += space_cmds

            var fun_header = "```ml" + "\n" +
            "Fun Commands 🎲 ✨🌈" + "\n" +
            "```"
            help_output += fun_header
            help_output += fun_cmds
            var help_message = "```ml" + "\n" +
            "To get more info. on a certain command, plus examples, type `help command` where command is one of those above." + "\n" +
            "```" + "eg: `help qr`"
            help_output += help_message
            
            msg.channel.send(help_output)
            console.log(help_output)
            var examples = "```ml" + "\n" +
            "Example Commands 👀" + "\n" +
            "define dancing" + "\n" +
            "```"
        
        }

    
        var general_cmds = "```glsl" + "\n" +
        "avatar : POWER UP that avatar of yours. " + "\n" +
        "```"
    
        var general_cmds2 = "```tex" + "\n" +
        "avatar : POWER UP that avatar of yours. " + "\n" +
        "```"
    

        var avatar_cmd = "```tex" + "\n" +
        "avatar : $ POWER UP that avatar of yours." + "\n" + 
        "```"
        
        var help = "\n `pls react` : Get a tonload of reactions for no reason. 👀 🤣 😃 😄 😅 😆 😉" +
        "\n `define` : Get an old-style definition of a word. Try it, it's hilarious XD  \n `earth` : Get a live photo of the Earth as taken from NOAA DSCVRY."
    
        var reddit = "\n ```ml " + "\n" +
        "Reddit Commands" + "\n" +
        "```"
   
      }

    
   




});



function displayAcronym(request){
console.log("Display Result called.")
if (request.readyState === 4){
    console.log("Ready state is 4");
    if (request.status === 200){
        console.log("Ready state is 200.")
        console.log("RESPONSE IS: " + request.responseText.trim() )
        var message_content = request.responseText.trim()
        console.log(message_content)
        if (message_content != "0"){          
    }
}
else{
    console.log("ERROR IN RECEIVAL OF REQUEST.");
}
}
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumberAstronauts(){


}

function createLanguageTranslator(){
    var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
    var watson_username = translate_creds_obj["username"];
    var watson_pass = translate_creds_obj["password"];
    var watson_url = translate_creds_obj["url"];

    var languageTranslator = new LanguageTranslatorV2({
        username: watson_username,
        password: watson_pass,
        url : watson_url,
        headers: {
            'X-Watson-Learning-Opt-Out': 'true'
        }
    });

    return languageTranslator;
}

function searchMatchingEmojis(word){
    var keywords;
    var obj;
    var word;
    var emojimd;
    var counter = 0;
        
        // for (var key in obj){

            // var keyword;
            // counter = counter + 1
            // for (var j = 0; j < keywords.length; j += 1){
            //     keyword = keywords[j];
            //     if (keyword === word){
            //         emoji_md = ":" + key + ":"
            //         matched_emojis.push(emoji_md);
            //     }
            // }        
    }


function sendImage(msg, image){
    
        // Send an embed with a local image inside
        msg.channel.send('This is an embed', {
            embed: {
            thumbnail: {
                url: 'attachment://file.jpg'
                }
            },
            files: [{
                attachment: image,
                name: image
            }]
        })
            .then(console.log)
            .catch(console.error);
}

client.login(token);


// Ideas

// Maybe include text to speech for definitions if possible.
// Whereis Earth at this moment in time?
// Allow the bot's answer be primarily on the time when asked with "How are you?"
// Natural Language Processing -- this would be implemented with an NLP lib of some sort.
// Create images using profile pics
// Check for cool apis to try out
// Get stats on movies from the Movie DB
// Get trending songs from Spotify
// Get trending videos from YouTube.
// google translate
// https://launchlibrary.net/docs/1.3/api.html
// Add further logging only for messages sent by the bot.
// Allow for stats to be made and published to a dashboard system of some sort.
// Add an XP system, so that every time a user posts two or more commands, they get further XP.
// EmojiPasta --> improve
// Unsplash Integration --> need to apply for an API Key.
// allow the user to get the avatar of another use.