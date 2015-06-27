var list = null;
$(document).ready(function load() {
  var $li;
  var $activeUl = $('div.active ul');
  var $redCardUl = $('div.redcard ul');
  var $removedUl = $('div.removed ul');
  var listRemove = [];
  var listCard = [];
  var listActive = [];
  var $this = $(this);

  // localstorage
  function localSave() {
    localStorage.setItem('list', JSON.stringify(list));
  }

  function localLoad() {
    list = localStorage.getItem('list');
  }

  function drawField() {
    var i;
    var j;
    var curPos;
    var pos;
    for (i = 0; i < list.length; i++) {
      $li = $('<li><h3>' + list[i].name + '</h3><h4>' + list[i].phone + '</h4></li>');
      $li.attr({'data-id': list[i].id, 'data-status': list[i].status});
      for (j = 0; j < list.length; i++) {
        pos = i + j * list.length;
        curPos = list.state[pos];
        if (list[i].status === 'removed') {
          $removedUl.append($li);
        }
        if (list[i].status === 'active') {
          $activeUl.append($li);
        }
        if (list[i].status === 'redcard') {
          $redCardUl.append($li);
        }
        $li.attr({'data-pos' : curPos});
      }
    }
    localSave();
  }
  localLoad();
  if (list !== null) {
    drawField();
  }

  //controller
  $('.active').children('ul').sortable({
    connectWith: ".redcard > ul, .removed > ul",
    receive: function zed(event, ui) {
      if (ui.item.closest('.active')) {
        ui.item.attr({'data-status': 'active'});
        ui.item.attr('data-status', 'active');
        $.post(window.url + '/' + ui.item.data('id').toString(), {'status': event.target.parentNode.className.split(' ')[1]}).done(
          function () {
            console.log('complete');
          }
        ).fail(
          function () {
            $('.active').children('ul').sortable('cancel');
          }
        )
      }
    }
  });
  $('.redcard').children('ul').sortable({
    connectWith: ".active > ul, .removed > ul",
    receive: function red(event, ui) {
      if (ui.item.closest('redcard')) {
        $.post(window.url + '/' + ui.item.data('id').toString(), {'status': event.target.parentNode.className.split(' ')[1]}).done(
          function () {
            console.log('complete');
          }).fail(
          function () {
            $('.redcard').children('ul').sortable('cancel');
          }
        );
        ui.item.attr('data-status', 'redcard');
      }
    }
  });
  $('.removed').children('ul').sortable({
    receive: function (event, ui) {
      if (ui.item.closest('.removed')) {
        $.post(window.url + '/' + ui.item.data('id').toString(), {'status': event.target.parentNode.className.split(' ')[1]}).done(
          function () {
            console.log('complete');
          }).fail(
          function () {
            $('.removed').children('ul').sortable('cancel');
          }
        );
        ui.item.attr('data-status', 'removed');
      }
    }
  });


  //if (ui.item.parent().parent().hasClass('redcard')) {
  //  ui.item.attr('data-status', 'redcard');
  //}
  // get запрос and view??
  $.get(window.url).success(function getList(data) {
    data.map(function it(item) {
      // прорисовка
      $li = $('<li><h3>' + item.name + '</h3><h4>' + item.phone + '</h4></li>');
      $li.attr({'data-id': item.id, 'data-status': item.status});
      if (item.status === 'removed') {
        $removedUl.append($li);
        return listRemove.push(item);
      }
      if (item.status === 'active') {
        $activeUl.append($li);
        return listActive.push(item);
      }
      if (item.status === 'redcard') {
        $redCardUl.append($li);
        return listCard.push(item);
      }
    });
    list = data;
    localSave();
  });
});