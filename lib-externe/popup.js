/*
    Email Extractor Developed By Mr. Alien - Vaibhav Mehta

    Stackoverflow:  http://stackoverflow.com/users/1542290/mr-alien
    Email :         firekillz@gmail.com
*/

//Function To Replace <br> Or <br /> to \r\n
function br2nl(str) {
    return str.replace(/<br\s*\/?>/mg,"\r\n");
}

//Fetching The E-Mails & Count
chrome.storage.local.get(function (fetch) {
    var showEmails = fetch._saveMailList;
    var showEmailCount = fetch._emailsFound;

    if(showEmails == undefined) {
    	showEmails = "None Found"
    }

    if(showEmailCount == undefined) {
    	showEmailCount = "0";
    }

    $("#showEmailCount").html('Total Email ID\'s Found : ' + '<strong>' + showEmailCount + '</strong>');
    $("#showEmails").html(showEmails);


    //Exporting From Element To Txt
    var $exportBtn = $("#exportBtn");
	if(showEmails == "" || showEmails == "None Found") {
		$exportBtn.attr("href", "#");
		$exportBtn.removeAttr("download");
	} else {
		$exportBtn.attr("href", "data:text/plain;base64," + btoa(br2nl(showEmails)));
		$exportBtn.attr("download");
	}
});


$("#overlay img").on("click", function() {
	$(this).parent().fadeOut(1000);
});

$("#help").on("click", function() {
	$("#overlay").fadeIn(1000);
});