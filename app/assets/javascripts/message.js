$(function(){

  var buildHTML = function(message) {
    if (message.body && message.image) {
      var html = `<div class="message" data-message-id= message.id>
        <div class="message__list">
          <div class="message__list--name">
            message.user_name
          </div>
          <div class="message__list--timestamp">
            message.created_at
          </div>
        </div>
        <div class="message__text">
          <p class="message__text">
            message.body
          </p>
          <img src="message.image" class="message__text__image" >
        </div>
      </div>`
      return html;
    } else if (message.body) {
      var html = `<div class="message" data-message-id= message.id>
        <div class="message__list">
          <div class="message__list--name">
            message.user_name
          </div>
          <div class="message__list--timestamp">
            message.created_at
          </div>
        </div>
        <div class="message__text">
          <p class="message__text">
          </p>
            message.body
        </div>
      </div>`
      return html;
    } else if (message.image) {
      var html = `<div class="message" data-message-id=message.id>
        <div class="message__list">
          <div class="message__list--name">
            message.user_name
          </div>
          <div class="message__list--timestamp">
            message.created_at
          </div>
        </div>
        <div class="message__text__image">
          <img src="message.image" class="message__text__image" >
        </div>
      </div>`
      return html;
    };
  };
      
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message').append(html);
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0] .scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

    var reloadMessages = function(){
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: "get",
        dataType: "json",
        data: {id: last_message_id}
      })
      .done(function(messages){
        if (messages.length !== 0) {
          var inserHTML = '';
          $.each(messages, function(i,message){
            inserHTML += buildHTML(message);
          });
          $('.chat-main__message').append(inserHTML);
          $('.chat-main__message').animate({scrollTop: $('.chat-main__message')[0].scrollHeight});
          }
        })
        .fail(function(){
          alert("ユーザー検索に失敗しました");
        });
      };
      if (document.location.href.match(/\/groups\/\+d\/messages/)) {
        setInterval(reloadMessages, 7000);
      }
  });