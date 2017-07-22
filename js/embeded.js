(function (callback) {
  var script = document.createElement('script');
  script.setAttribute('src', '//code.jquery.com/jquery-2.2.4.min.js');
  script.addEventListener('load', function() {
    var script = document.createElement('script');
    script.textContent = '(' + callback.toString() + ')(jQuery.noConflict(true));';
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
})(function ($) {
  $(document).ready(function(){
    function put_time_label(){
      var time_label = $('<span></span>', {
        'text':  '? h',
        'id':    'time-label',
        'class': 'board-header-btn-text'
      })[0];
      var calc_btn = $('<a></a>', {
        'text':  'Recalculate',
        'class': 'board-header-btn board-header-btn-without-icon'
      });
      $('.board-header-btn.board-header-btn-name').append(time_label);

      function calc() {
        var labels = $('.card-label');
        var hours = 0;
        $.each(labels, function(k, v){
          var result = v.title.match(/(\d+\.?\d*)h/);
          if (result != null) {
            hours += parseFloat(result[1]);
          }
        });
        if (hours > 0) {
          $('#time-label')[0].innerText = hours + 'h';
        }
      }

      function calcEveryList() {
        var list = $('.list');
        $.each(list, function(k, v){
          var hours = 0;
          var labels = $(v).find('.card-label');
          $.each(labels, function(k2, v2){
            var result = v2.title.match(/(\d+\.?\d*)h/);
            if (result != null) {
              hours += parseFloat(result[1]);
            }
          });
          var target = $(v).find('.list-header')[0];
          $(target).append('<h3>' + hours + 'h</h3>');
        });
      }

      calc_btn.bind('click', calc);
      $('div.board-header').append(calc_btn);
      calc();
      calcEveryList();
    }

    setTimeout(put_time_label, 1000);
  });
});
