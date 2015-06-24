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
  //
  $('.active').children('ul').sortable({
    connectWith: ".redcard > ul, .removed > ul",
    update : function zed(event, ui) {
      if (ui.item.closest('.active')) {
        ui.item.attr({'data-status': 'active'});
      }
    }
  });
  $('.redcard').children('ul').sortable({
    connectWith: ".active > ul, .removed > ul",
    update : function() {
      if (ui.item.closest('redcard')) {
        ui.item.attr('data-status', 'redcard');
      }
    }
  });
  $('.removed').children('ul').sortable({
    update : function() {
      if (ui.item.closest('.removed')) {
        ui.item.attr('data-status', 'removed');
      }
    }
  });
  //controller

  //
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
  });
});