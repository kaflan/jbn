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

  //controller
  $('div.active ul, div.redcard ul, div.removed ul').sortable({
    connectWith: 'ul',
    //change atrr and POSt then
    update: function zed(event, ui) {
      if (ui.item.parent().parent().hasClass('active')) {
       ui.item.attr({'data-status': 'active'});

      }
      if(ui.item.parent().parent().hasClass('removed')) {
        ui.item.attr('data-status', 'removed');
      }
      if(ui.item.parent().parent().hasClass('redcard')) {
        ui.item.attr('data-status', 'redcard');

      }

    }
    //,
    //sender: function zeb(event, ui) {
    //    if (ui.item.data('status') === 'remove') {
    //    console.log('lal');
    //    }
    //  }
  }).disableSelection();
  //

  // localstorage
  function localSave() {
    localStorage.setItem('list', JSON.stringify(list));
  }

  function localLoad() {
    list = localStorage.getItem('list');
  }

  // get запрос and view??
  $.get(window.url).success(function getList(data) {
    data.map(function it(item) {
      // прорисовка
      $li = $('<li><h3>' + item.name + '</h3><h4>' + item.phone + '</h4></li>');
      $li.attr({'id': item.id, 'data-status': item.status});
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

  //data.map(function zu(i) {
  //  if (i.status === 'removed') {
  //    li = $('<li><h3>'+i.name+'</h3><h4>'+i.phone+'</h4></li>');
  //    ul = $('ul').append(li);
  //  }
  //});
});