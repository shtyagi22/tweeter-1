/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  //LOAD TWEETS FUNCTION
  const loadtweets = function () {
    console.log("loadtweets called!");
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
  loadtweets();

  //RENDER TWEETS
  const renderTweets = (data) => {

    data.forEach(function (tweet) {
      let stringToInsert = createTweetElement(tweet);
      $('#tweet-container').append(stringToInsert);
    });

  }


  //CREATE TWEETS ELEMENT
  const createTweetElement = function (tweet) {

    let $tweet = $(`<article class="tweet-container">
    <header class="tweet-header" style="justify-content: space-between">
    <p><i class="fa-solid fa-user-tie"></i>${tweet["user"].name}</p></p><p>${tweet["user"].handle}</p></header>
  <p class="tweet-article">${tweet["content"].text}</p>
  <footer class="tweet-footer">
    <p>${tweet["created_at"]}</p>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-heart"></i>
    <i class="fa-sharp fa-solid fa-retweet"></i>
  </footer></article>`);

    return $tweet;
  }

  $('.tweet-form').on('submit', (event) => {

    alert("Handler for .submit() called.");
    event.preventDefault();
    const $formData = $('.tweet-form');
    //const $textInput = $('.tweet-text');


    //Serializing for data
    const data = $formData.serialize();


    //making ajax post request
    $.ajax({
      url: "/tweets",
      method: "post",
      data: data
    })
      .done(function () {
        alert("success");
        $('#tweet-container').empty();
        loadtweets();
      });



  });
});