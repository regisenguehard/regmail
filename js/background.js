

chrome.browserAction.setBadgeText({text: 'x'});
chrome.browserAction.setBadgeBackgroundColor({ color: [128, 128, 128, 128] });

// Charge les emails
var regmeail = [];
chrome.storage.local.get('regmeail', function (result) {
    regmeail = result.regmeail;
});




// console.log('background.js chargé');




chrome.runtime.onMessage.addListener(function(msg) {
	//Updating The Count On Notification Badge
// console.log('maj notification badge' + '______from : ' + msg.from + '______subject : ' + msg.subject + '______mails : ' + msg.mails + '______mailsFound : ' + msg.mailsFound);
	if ((msg.from == "content") && (msg.subject == "sendMailCount")) {
		if(msg.mailCount == 0) {
			chrome.browserAction.setBadgeText({text: '0'});
		} else {
			chrome.browserAction.setBadgeText({text: msg.mailCount.toString()});
		}
	}

	//Storing The Emails Found
	//This Completes My Awesome Plugin So I <3 It
// console.log('Enregistrer ');
	if ((msg.from == "content") && (msg.subject == "sendEmails")) {
		var mailList = msg.mails;
		var emailsFound = msg.mailsFound;

		chrome.storage.local.set({
	    	'_saveMailList': mailList,
	    	'_emailsFound' : emailsFound
		});
	}

	function unique(list) {
		var result = [];
		$.each(list, function(i, e) {
			if ($.inArray(e, result) == -1) result.push(e);
		});
		return result;
	}

	if ((msg.from == "content") && (msg.subject == "saveregmails")) {
/*
		var lesmails = msg.lesmails;

		regmeail.concat(lesmails);

		chrome.storage.local.set({'regmeail': regmeail}, function() {
			console.log('Settings saved ' + regmeail.length);
		});
*/

		lesmails2 = [];
		titi = msg.lesmails;
		// console.log('- ' + JSON.stringify(titi));
		chrome.storage.local.get('regmeail', function (result) {
	        lesmails2 = result.regmeail;
			// console.log('-- ' + JSON.stringify(lesmails2));
			tagada = titi.concat(lesmails2);
			// console.log('--- ' + JSON.stringify(tagada));
			tagada = unique(tagada);
			// console.log('---- ' + titi.length);
			chrome.storage.local.set({'regmeail': tagada}, function() {
				// console.log('Settings saved ' + JSON.stringify(titi));
			});
	    });
	}

});


/*
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
      var storageChange = changes[key];
      console.log('Storage key "%s" in namespace "%s" changed. ' +
                  'Old value was "%s", new value is "%s".',
                  key,
                  namespace,
                  storageChange.oldValue,
                  storageChange.newValue);
    }
});

/*

*/


// console.log('fin background.js');
