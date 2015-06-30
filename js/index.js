(function () {
  var defaltSortOrder = {
    remove: [],
    redcard: [],
    active: []
  };
  var $lists = {
    active : $('.active ul'),
    redcard: $('.redcard ul'),
    removed: $('.removed ul')
  };

  var data;
  $.get(window.url).success(function getList(newData) {
    data = newData;
  });

  // localstorage
  // save
  function Save() {
  }
  // load
  function Load() {
  }

  //controller
  $('ul').sortable({
    placeholder: 'placeholder',
    connectWith: 'ul',
    receive: function (event, ui) {
      if (ui.sender.parents('.removed').length) {
//          ui.sender.sortable('cancel');
      } else {
        var newStatus = $(this).data('status');
        var id = $(ui.item).data('id');
        $.post(window.url + '/' + id, {status: newStatus}).error(function () {
          ui.sender.sortable('cancel');
        });
      }
    },
    stop: function (event, ui) {

    }

  });
  // get запрос and view??

})();
(function () {
  var app = angular.module('student', []);
  // controller
 app.controller('', function(){});
  // view
  // model-view
  // app.directive('draggableList', function(){});
})();
//data.map(function it(item) {
//  //template = $('<li><h3>' + item.name + '</h3><h4>' + item.phone + '</h4></li>');
//  //template.attr({'data-id': item.id, 'data-status': item.status});
//  if (item.status === 'removed') {
//    //$removedUl.append(template);
//    list.remove.push(item);
//  }
//  if (item.status === 'active') {
//    //$activeUl.append(template);
//    list.active.push(item);
//  }
//  if (item.status === 'redcard') {
//    //$redCardUl.append(template);
//    list.redcard.push(item);
//  }
//});