
//Function To Replace <br> Or <br /> to \r\n
function br2nl(str) {
    return str.replace(/<br\s*\/?>/mg,"\r\n");
}

//Fetching The E-Mails & Count
chrome.storage.local.get(function (fetch) {
    var showEmailCount = fetch._emailsFound;
    var showEmailCountGlobal = fetch.regmeail;
    var showEmails = fetch._saveMailList;
    var regmeail = fetch.regmeail;

    if (showEmailCountGlobal == undefined) {
        showEmailCountGlobal = "0";
    } else {
        showEmailCountGlobal = showEmailCountGlobal.length;
    }
    if (showEmailCount == undefined) {
        showEmailCount = "0";
    }
    if (showEmails == undefined) {
    	showEmails = ""
    }

    $("#showEmailCountGlobal span").text(showEmailCountGlobal);
    $("#showEmailCount span").text(showEmailCount);
    $("#showEmails").html(showEmails);
    // $("#regmeail").html(regmeail);
    console.log('charge et afiche les donnée dans le popup.html');

    //Exporting From Element To Txt
    var $exportBtn = $("#exportBtn");
	if(showEmails == "" || showEmails == "---") {
        $exportBtn.hide();
	} else {
        $exportBtn.show();
		$exportBtn.attr("href", "data:text/plain;base64," + btoa(br2nl(showEmails)));
	}
});

function resetemail() {
    chrome.storage.local.set({'regmeail': []});
    $("#showEmailCountGlobal span").text(0);
}
function listemail() {
    chrome.storage.local.get('regmeail', function (result) {
        // console.log(JSON.stringify(result.regmeail));
        $("#regmeail").html(result.regmeail.join());
    });
}


$("#resetmail").on("click", function() {
    resetemail();
    // console.log('Liste des emails remis à 0');
});
$("#listemail").on("click", function() {
    listemail();
});

$("#dumpage").on("click", function() {
    chrome.tabs.create({'url': 'dump.html', 'active': true}, function(tab){
    });
});



