$(document).on(':passagedisplay', () => {
  if(tags() != "noui") {
    $('#ui-bar').show();
    $('#ui-bar-tray').append("<span id='ui-bar-time'>10:00:00</span>");
    $('#ui-bar-tray').append("<span id='ui-bar-status-1' style='top: 7.4em'>力</span>");
    $('#ui-bar-tray').append("<span id='ui-bar-status-1' style='top: 8.6em'>速</span>");
    $('#ui-bar-tray').append("<span id='ui-bar-status-1' style='top: 9.8em'>敏</span>");
    $('#ui-bar-tray').append("<span id='ui-bar-status-1' style='top: 11em'>体</span>");
    $('#ui-bar-tray').append("<span id='ui-bar-status-1' style='top: 12.2em'>灵</span>");
    $('#ui-bar-tray').append("<span id='ui-bar-status-1' style='top: 13.4em'>幸</span>");
    console.debug("Append Time to UI tray");
  }
  else {
    $('#ui-bar').hide();
    console.debug("No UI");
  }
});
