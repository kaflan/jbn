(function () {
  var data;
  var app = angular.module('jsbursa', []);
  //var itemArr = [{"id":"1","name":"Jeremy Lane","phone":"(466) 514-6617","status":"active"},{"id":"2","name":"Austin Hunt","phone":"(314) 333-4959","status":"removed"},{"id":"3","name":"Ronald Campbell","phone":"(686) 869-6077","status":"removed"},{"id":"4","name":"Don Stewart","phone":"(328) 747-6780","status":"removed"},{"id":"5","name":"Jeremiah Jordan","phone":"(769) 969-5203","status":"removed"},{"id":"6","name":"Susie Frazier","phone":"(917) 781-9869","status":"removed"},{"id":"7","name":"Sally Larson","phone":"(965) 429-2716","status":"active"}];
  // model?? directive?
  app.directive('draggableList', function () {
    return {
      restrict: 'E',
      scope: {
        items: '='
      },
      replace: true,
      template: ' <ul><li  ng-repeat="item in items"  data-id="{{item.id}}" data-status="{{item.status}}"><h3>{{item.name}}</h3><h4>{{item.phone}}</h4></li></ul>',
      link: function ($scope, $element) {
        //console.log(scope.students);
        $scope.$watch('items', function (newValue, oldValue) {

          console.log('изменилось', newValue, oldValue);
        }, true);
        $element.sortable({
          //placeholder: 'placeholder',
          connectWith: 'ul',
          receive: function (event, ui) {
            if (ui.sender.parents('.removed').length) {
////          ui.sender.sortable('cancel');
            } else {
              var newStatus = $(this).data('status');
              var id = $(ui.item).data('id');
              //console.log(ui.item.data('status', newStatus));
              //$.post(window.url + '/' + id, {status: newStatus}).error(function () {
              //  ui.sender.sortable('cancel');
              //});
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
      $scope.active = [];
      $scope.students = newData;
      $scope.redcard = [];
      $scope.remove = [];
      $scope.students.map(function (item) {
        if (item.status === 'active') {
          $scope.active.push(item);
          console.log($scope.active);
          return false;
        }
        if (item.status === 'redcard') {
          $scope.redcard.push(item);
          return false;
        }
        if (item.status === 'removed') {
          $scope.remove.push(item);
          return false;
        }
      })
    }).error(function () {
      console.log('fail');
    });

 //$scope.active = itemArr;
  });

//  $applyAsync([exp]);
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

})
();