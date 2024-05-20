$(document).on(':passagedisplay', () => {
  if (tags() != 'noui') {
    $('#ui-bar').show();
    $('#ui-bar-tray').append("<span id='ui-bar-time'>??:??:??</span>");
    $('#ui-bar-tray').append(
      "<span id='ui-bar-status-1' class='text-blue' style='top: 10em'>速</span>"
    );
    /*
    $('#ui-bar-tray').append(
      "<span id='ui-bar-status-1' style='top: 10em'>力</span>"
    );
    $('#ui-bar-tray').append(
      "<span id='ui-bar-status-1' style='top: 11.2em'>速</span>"
    );
    $('#ui-bar-tray').append(
      "<span id='ui-bar-status-1' style='top: 12.4em'>敏</span>"
    );
    $('#ui-bar-tray').append(
      "<span id='ui-bar-status-1' style='top: 13.6em'>体</span>"
    );
    $('#ui-bar-tray').append(
      "<span id='ui-bar-status-1' style='top: 14.8em'>灵</span>"
    );
    $('#ui-bar-tray').append(
      "<span id='ui-bar-status-1' style='top: 16em'>幸</span>"
    );
    */
    console.debug('Append Time to UI tray');
  } else {
    $('#ui-bar').hide();
    console.debug('No UI');
  }
});
