/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  $('.tweet-form').on('submit', (event) => {
    //alert("Handler for .submit() called.");
    event.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData
    })
      .done(function () {
        alert("success");
      });
    const loadtweets = function () {
      $.ajax({
        url: '/tweets',
        method: 'GET'
      })
        .then((result) => {
          console.log('then', result);
          renderTweets(result);
        })
        .catch((error) => {
          console.log('catch', error);
        });
    }
    console.log("loadtweets", loadtweets());


    const renderTweets = function (tweets) {

      // calls createTweetElement for each tweet
      tweets.forEach(tweet => {
        console.log("tweet inside forEach inside the render function:", tweet);

        let stringToInsert = createTweetElement(tweet);
        $('#tweet-container').append(stringToInsert);
        console.log("stringToInsert:", stringToInsert);
      });

    }


    const createTweetElement = function (tweet) {
      let $tweet = $(`<article id="tweet-container">
    <header class="tweet-header" style="justify-content: space-between">
      <p><i class="fa-solid fa-user-tie"></i> Newton</p></p>
      <p>@username</p>
    </header>
    <p class="tweet-article">This is my first Tweet!</p>
    <footer class="tweet-footer">
      <p>5 days ago</p>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-sharp fa-solid fa-retweet"></i>
    </footer></article>`);
      console.log("tweet object returned from createTweet function:", $tweet);
      return $tweet;
    }

   
  });
});