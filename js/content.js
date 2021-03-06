
//On Tab Switch Trigger Reloader
window.addEventListener('focus', function() {
    compteMails();
});

var activeTab = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange"
    };

    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }

    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();


function compteMails() {
	var getChunk = $("html").html(); //Fetching Entire Body

// console.log('compteMails');

	//Extracting Emails From Chunk
	function extractEmails(chunk) {
	    return chunk.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/ig);
	}

	//Filtering Out The Emails By Removing The Duplicates
	function unique(list) {
		var result = [];
		$.each(list, function(i, e) {
			if ($.inArray(e, result) == -1) result.push(e);
		});
		return result;
	}

	//Object To Normal Text
	function objectToString(object) {
		var stringify = "";
		for (var property in object) {
			stringify += object[property] + '<br>';
		}
		return stringify;
	}

	//Check If Found Any Emails, IF NOT
	if(extractEmails(getChunk) == null) {
		chrome.runtime.sendMessage({
		    from: "content",
		    subject: "sendMailCount",
		    mailCount: 0
		});

		chrome.runtime.sendMessage({
		    from: "content",
		    subject: "sendEmails",
		    mails: '',
		    mailsFound: '0'
		});
	} else { //IF FOUND
		chrome.runtime.sendMessage({
		    from: "content",
		    subject: "sendMailCount",
		    mailCount: unique(extractEmails(getChunk)).length
		});

		chrome.runtime.sendMessage({
		    from: "content",
		    subject: "sendEmails",
		    mails: objectToString(unique(extractEmails(getChunk))),
		    mailsFound: unique(extractEmails(getChunk)).length
		});

		chrome.runtime.sendMessage({
		    from: "content",
		    subject: "saveregmails",
		    lesmails: unique(extractEmails(getChunk))
		});


/*
		titi = extractEmails(getChunk);
		console.log('- ' + titi.length);
		chrome.storage.local.get('regmeail', function (result) {
	        lesmails = result.regmeail;
			console.log('- ' + lesmails.length);
			titi.concat(lesmails);
			console.log('- ' + titi.length);
			titi = unique(titi);
			console.log('- ' + titi.length);
			chrome.storage.local.set({'regmeail': titi}, function() {
				console.log('Settings saved ' + titi.length);
			});
	    });
*/
		// console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_');
	}
}



//On DOM Update
var timeout = null;
document.addEventListener("DOMSubtreeModified", function() {
	// console.log('addEventListener DOMSubtreeModified');
    if(timeout) {
        clearTimeout(timeout);
    }
    if(activeTab() == true) {
	    timeout = setTimeout(compteMails, 500);
	}
}, false);
