
chrome.storage.local.get('regmeail', function (result) {
    $("#regmeail").html(result.regmeail.join("\n"));
});
