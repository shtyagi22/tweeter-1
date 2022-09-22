$(document).ready(function () {
  $(".tweet-text").on('input', onInput);
});

const onInput = function (event) {
  console.log("my input text");
  let $input = $(this);
  let len = $input.val().length;
  let charsLeft = 140 - len;

  const $form = $input.closest('form');
  const $counter = $form.find('span.counter');

  $counter.text(charsLeft);
  if (charsLeft < 0) {
    $('.counter').addClass("red-counter");
  } else {
    $('.counter').removeClass("red-counter");
  }
}