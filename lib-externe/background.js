/*
    Email Extractor Developed By Mr. Alien - Vaibhav Mehta

    Stackoverflow:  http://stackoverflow.com/users/1542290/mr-alien
    Email :         firekillz@gmail.com


	If you reached here that means you are either interested in the code
	or you want to know how badly I code, SO FUCK OFF, and steal someone else's code,
	cuz MINE SUCKS, TRUST ME :)
*/

chrome.browserAction.setBadgeText({text: '0'}); //Set Initial Badge Count
chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] }); //Styling The Badge


//Updating The Count On Notification Badge
chrome.runtime.onMessage.addListener(function(msg) {
	if ((msg.from == "content") && (msg.subject == "sendMailCount")) {
		if(msg.mailCount == 0) {
			chrome.browserAction.setBadgeText({text: '0'});
		} else {
			chrome.browserAction.setBadgeText({text: msg.mailCount.toString()});
		}
	}
});


//Storing The Emails Found
//This Completes My Awesome Plugin So I <3 It
chrome.runtime.onMessage.addListener(function(msg) {
	if ((msg.from == "content") && (msg.subject == "sendEmails")) {
		var mailList = msg.mails;
		var emailsFound = msg.mailsFound;

		chrome.storage.local.set({
	    	'_saveMailList': mailList,
	    	'_emailsFound' : emailsFound
		});
	}
});