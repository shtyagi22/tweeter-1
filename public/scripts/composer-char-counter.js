$(document).ready(function () {
  $(".tweet-text").on('input', onInput);
});

const onInput = function (event) {
  let $input = $(this);
  let len = $input.val().length;
  let charsLeft = 140 - len;

  const $form = $input.closest('form');
  const $counter = $form.find('span.counter');

  $counter.text(charsLeft);
  
}