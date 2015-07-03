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
  var app = angular.module('jsbursa', []);

  // model?? directive?
  app.directive('draggableList', function () {
    return {
      restrict: 'E',
      scope: {
        student: '='
      },
      replace: true,
      template: ' <ul><li  data-id="{{student.id}}" data-status="{{student.status}}"><h3>{{student.name}}</h3><h4>{{student.phone}}</h4></li></ul>',
      link: function ($scope, $element) {
        $scope.$watch('students', function (newValue, oldValue) {
          console.log('изменилось', newValue, oldValue, $element);
        }, true);
        $element.sortable({
          placeholder: 'placeholder',
          connectWith: $element.parent(),
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
        $scope.$applyAsync();
      }
    };
  });
  //controller  list student
  app.controller('ListCtrlStud', function ($scope, studentService) {
    studentService.getStudent().success(function (newData) {
      console.log('success');
      $scope.students = newData;
    }).error(function () {
      console.log('fail');
    });
  });
  //  $applyAsync([exp]);
  app.service('studentService', function ($http) {
    this.getStudent = function () {
      return $http.get(window.url);
    };
  });

  //controller sort


  //app.service('listSortService', function(){
  //
  //  this.listSort = function () {
  //    return {
  //
  //      }
  //  };
  //});

  // localstorage
  // save
  function Save() {
    localStorage.setItem('defaltSortOrder', JSON.stringify(defaltSortOrder));
  }

  // load
  function Load() {
    JSON.parse(localStorage.getItem('defaltSortOrder'));
  }

})();