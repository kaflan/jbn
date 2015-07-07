(function () {
  var app = angular.module('jsbursa', []);
  // model?? directive?
  var data = null;
  app.directive('draggableList', function () {
    return {
      restrict: 'E',
      scope: {
        items: '=',
        id: '@'
      },
      replace: true,
      template: ' <ul><li  ng-repeat="item in items"  data-id="{{item.id}}" data-status="{{item.status}}"><h3>{{item.name}}</h3><h4>{{item.phone}}</h4></li></ul>',
      link: function ($scope, $element, attrs) {
        var remove;
        function saveToStorage(array) {
          var arrToStorage = [];
          angular.forEach(array, function (item) {
            arrToStorage.push(item);
          });
          localStorage.setItem($scope.id, angular.toJson(arrToStorage));
        }
        function loadInStorage() {
          data = JSON.parse(localStorage.getItem($scope.id));
        }
        //}
        loadInStorage();
        if($.isEmptyObject(data) === false){
          console.log(data);
          $scope.items = data;
        }
        $scope.$watch('items', function (newValue, oldValue) {
          if($.isEmptyObject(newValue) === false){
            console.log(newValue);
            saveToStorage(newValue);
          }
          console.log('изменено :', newValue, 'изменилось c : ', oldValue);
        }, true);
        $element.sortable({
          placeholder: 'placeholder',
          connectWith: 'ul',
          remove: function (event, ui) {
            $scope.$applyAsync();
            remove = true;
          },
          start: function start(event, ui) {
            var a = $(ui.item).index();
            $(ui.item).data('item', $scope.items[a]);
            $scope.items.splice(a, 1);
          },
          receive: function (event, ui) {
            var a = $(ui.item).index();
            //$(ui.item).data({'item' : $scope.items[a]});
            var getDat = $(ui.item).data('item');
            $scope.items.splice(a, 0, getDat);
            var tempItems = angular.copy($scope.items);
            $scope.items = [];
            $scope.$applyAsync();
            setTimeout(function () {
              $scope.items = tempItems;
              $scope.$applyAsync();
            }, 0);
          },
          stop: function (event, ui) {
            if (remove) {
              remove = false;
              return;
            }
            var a = $(ui.item).index();
            var getDat = $(ui.item).data('item');
            console.log('stop', getDat);
            console.log(a);
            $scope.items.splice(a, 0, getDat);
            $scope.$applyAsync();
          }
        });
      }
    };
  });
  //controller  list student
  app.controller('ListCtrlStud', function ($scope) {
    var itemArr = [{"id": "1", "name": "Jeremy Lane", "phone": "(466) 514-6617", "status": "active"}, {
      "id": "2",
      "name": "Austin Hunt",
      "phone": "(314) 333-4959",
      "status": "removed"
    },
      {"id": "5", "name": "Jeremiah Jordan", "phone": "(769) 969-5203", "status": "removed"}, {
        "id": "6",
        "name": "Susie Frazier",
        "phone": "(917) 781-9869",
        "status": "removed"
      },
      {"id": "7", "name": "Sally Larson", "phone": "(965) 429-2716", "status": "active"}];
    var anArray = [];
    var oneArray = [];
    $scope.active = itemArr;
    $scope.redcard = anArray;
    $scope.removed = oneArray;
  });

})
();