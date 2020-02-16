$(function(){
    function buildHTML(message) {
      if (message.image) {
        var html = 
          `<div class="message" data-message-id=${message.id}>
            <div class="message__list">
              <div class="message__list--name>
                ${message.user_name}
              </div>
              <div class="message__list--timestamp">
                ${message.created_at}
              </div>
              <div class="message__text">
                <p>
                </p>
                ${message.body}
              </div>
              <img src=${message__text__image}
            </div>
          </div>`
        return html;
      } else {
        var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="message__list">
              <div class="message__list--name">
                ${message.user_name}
              </div>
              <div class="message__list--timestamp">
                ${message.created_at}
              </div>
              <div class="message__text">
                <p>
                </p>
                ${message.body}
              </div>
            </div>
          </div>`
          return html;
        };
        }
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
});