(function () {
  var list = {
    remove: [],
    redcard: [],
    active: []
  };
  var $activeUl = $('.active ul');
  var $redCardUl = $('.redcard ul');
  var $removedUl = $('.removed ul');

  // localstorage
  function localSave() {
  }

  function localLoad() {
  }

  //controller
  $('ul').sortable({
    placeholder: 'placeholder',
    connectWith: 'ul',
    receive: function (event, ui) {
      if (ui.sender.parents('.removed').length) {
//          ui.sender.sortable('cancel');
      } else {
        var newItem = $(this).data('kind');
        var id = $(ui.item).data('id');
        $.post(window.url + '/' + id, {status: newItem}).error(function () {
          ui.sender.sortable('cancel');
        });
      }
    },
    stop: function (event, ui) {

    }

  });
  // get запрос and view??
  $.get(window.url).success(function getList(data) {
    data.map(function it(item) {
      //template = $('<li><h3>' + item.name + '</h3><h4>' + item.phone + '</h4></li>');
      //template.attr({'data-id': item.id, 'data-status': item.status});
      if (item.status === 'removed') {
        //$removedUl.append(template);
        list.remove.push(item);
      }
      if (item.status === 'active') {
        //$activeUl.append(template);
        list.active.push(item);
      }
      if (item.status === 'redcard') {
        //$redCardUl.append(template);
        list.redcard.push(item);
      }
    });
  });
})();
//
//