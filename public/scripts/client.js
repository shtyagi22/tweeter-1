/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  //LOAD TWEETS FUNCTION
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
    <p style="text-align:left">${tweet["created_at"]}</p>
    
    <i style="float:right" class="fa-solid fa-flag"></i>
    <i style="float:right" class="fa-solid fa-heart"></i>
    <i style="float:right" class="fa-sharp fa-solid fa-retweet"></i>
   
    
  </footer></article>`);

    return $tweet;
  }

  $('.tweet-form').on('submit', (event) => {

    //alert("Handler for .submit() called.");
    event.preventDefault();
    const $formData = $('.tweet-form');
    const $textInput = $('.tweet-text');
    const textContent = $textInput.val();
    if (textContent.length === 0) {
      alert("Input can't be empty");
      return;
    }
    if(textContent.length > 140){
      alert("Input can't be more than 140 chars");
      return;
    }


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
        $textInput.val("");
        loadtweets();
      });



  });
});