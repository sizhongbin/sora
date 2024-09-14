const UTIL = {};
UTIL.scrollToBottom = () => {
  $(document).scrollTop($(document).height());
};

UTIL.connect = () => {
  let connected = $('#connect').attr('data-counter');
  console.log(connected);
  connected = +connected + 1;
  console.log(`Connected: ${connected}`);
  $('#connect').attr('data-counter', connected);
};

UTIL.disconnect = () => {
  let connected = $('#connect').attr('data-counter');
  connected = +connected - 1;
  console.log(`Connected: ${connected}`);
  $('#connect').attr('data-counter', connected);
};
