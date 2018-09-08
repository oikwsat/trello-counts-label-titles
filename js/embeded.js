(function (callback) {
  var script = document.createElement('script');
  script.setAttribute('src', '//code.jquery.com/jquery-3.3.1.min.js');
  script.addEventListener('load', function() {
    var script = document.createElement('script');
    script.textContent = '(' + callback.toString() + ')(jQuery.noConflict(true));';
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
})(function ($) {
  $(document).ready(function(){
    function main(){
      var board_additional = $('<span></span>', {
        'text':  '?cards / ?h',
        'id':    'time-label',
        'style': 'font-size: 14px;'
      });

      var calc_btn = $('<a></a>', {
        'text':  'Recalculate',
        'class': 'board-header-btn board-header-btn-without-icon'
      });

      /**
       * calc for all cards
       */
      function calcTotal() {
        var cards  = $('a.list-card');      // all cards
        var labels = $('span.card-label');  // all labels

        var hours = 0;
        $.each(labels, function(k, v){
          var result = v.title.match(/(\d+\.?\d*)h/);
          if (result != null) {
            hours += parseFloat(result[1]);
          }
        });

        // e.g. 3cards / 1.5h
        $('#time-label')[0].innerText = cards.length + 'cards / ' + hours + 'h';
      }

      /**
       * calc for cards each list
       */
      function calcEveryList() {
        $.each($('.list'), function(k, v){
          var cards  = $(v).find('a.list-card');      // cards of list
          var labels = $(v).find('span.card-label');  // labels of list

          var hours = 0;
          $.each(labels, function(k2, v2){
            var result = v2.title.match(/(\d+\.?\d*)h/);
            if (result != null) {
              hours += parseFloat(result[1]);
            }
          });

          var target = $(v).find('.list-header')[0];
          var time_label = $(target).find('div.list-header-num-cards')[0];

          var text = cards.length + 'cards / ' + hours + 'h';

          if (time_label === undefined) {
            // when time_label doesn't exist yet, append it
            $(target).append($('<div></div>', {
              'text':  text,
              'class': 'list-header-num-cards'
            }));
          } else {
            // when time_label exist, update text
            $(time_label)[0].innerText = text;
          }
        });
      }

      function calc() {
        calcTotal();
        calcEveryList();
      }
      calc_btn.bind('click', calc);

      $('.board-header-btn.board-header-btn-name').append(board_additional);
      $('div.board-header').append(calc_btn);

      calc();
    }

    setTimeout(main, 1000);
  });
});
