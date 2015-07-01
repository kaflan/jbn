(function () {
  var defaltSortOrder = {
    remove: [],
    redcard: [],
    active: []
  };
  var $lists = {
    active: $('.active ul'),
    redcard: $('.redcard ul'),
    removed: $('.removed ul')
  };
  var sortOrder;
  var data;
  var app = angular.module('student', []);
  // controller
  //app.controller('', function(){});
  // view
  // model-view
  app.directive('draggableList', function () {
    return {
      restrict: 'E',
      template: '<ul><li data-id="item.id" data-status="item.status" ng-repeat="item in students"><h3>{{item.name}}}</h3><h4>{{item.phone}}</h4></li></ul>'
    }
  });
  app.controller('ListCtrlStud', function ($scope, studentService) {
    studentService.success(function (newData) {
      console.log('success');
      $scope.students = newData;
    }).fail(function () {
      console.log('fail');
    });
  });
  app.service('studentService', function ($http) {
    this.getStudent = function () {
      return $http.get(window.url);
    };
  });

  // localstorage
  // save
  function Save() {
    localStorage.setItem('defaltSortOrder', JSON.stringify(defaltSortOrder));
  }

  // load
  function Load() {
    JSON.parse(localStorage.getItem('defaltSortOrder'));
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

})();
//angular???

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