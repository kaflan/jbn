/**
 * Created by kaflan on 05.07.15.
 */
(function () {
  var ngStud = angular.module("jsbursa", []);

  ngStud.directive("draggableList", function ($compile) {
    var template = "<ul><li id='{{it.id}}' data-name='{{it.name}}' data-phone='{{it.phone}}' data-status='{{it.status}}' ng-repeat='it in items'><h3>{{it.name}}</h3><h4>{{it.phone}}</h4></li></ul>"; // track by it.id
    var extractIds = function(arr){
      var index = [];
      angular.forEach(arr, function(item) {
        this.push(item.id);
      }, index);
      return index;
    };
    var getKeyByArgs = function(id, name, phone) {
      return id + '-^-' + name + '-^-' + phone;
    };
    var getKey = function(obj) {
      return getKeyByArgs(obj.id, obj.name, obj.phone);
    };
    var getObjByArgs = function(id, name, phone) {
      var key = getKeyByArgs(id, name, phone);
      return $("body").data(key);
    };
    var storeObjToData = function(obj) {
      var key = getKey(obj);
      if($("body").data(key) === undefined){
        $("body").data(key, obj);
      }
    };
    var storeArrayToData = function(arr) {
      var i;
      for(i = 0; i < arr.length; i ++) {
        storeObjToData(arr[i]);
      }
    };

    var getSorted = function(arr, sortArr) {
      var carr = arr.slice(0);
      var result = [];
      var i;
      var j;
      var mark = 'DELETED-MARK';
      for(i = 0; i < carr.length; i ++) {
        if(i < sortArr.length) {
          for(j = 0; j < carr.length; j ++) {
            if(+sortArr[i] === +carr[j].id) {
              result[result.length] = carr[j];
              carr.splice(j, 1, mark);
            }
          }
        }
      }
      for(i = 0; i < carr.length; i ++) {
        if(carr[i] !== mark)
          result[result.length] = carr[i];
      }
      return result;
    };
    return {
      restrict: 'E',
      replace: true,
      scope: { items: "=?", id: "@" },
      link: function (scope, element, attrs) {
        var i;
        var j;
        var index = [];
        if(scope.items === undefined){
          scope.items = [];
        }
        storeArrayToData(scope.items);
        if (scope.id !== undefined) {
          index = localStorage.getItem(scope.id);
          if (index !== null) {
            scope.items = getSorted(scope.items, JSON.parse(index));
          } else {
            localStorage.setItem(scope.id, JSON.stringify(extractIds(scope.items)));
          }
        }
        element.html(template); //.show();
        $compile(element.contents())(scope);

        scope.$watch('items', function(newValue, oldValue) {
          if (newValue)
            storeArrayToData(newValue);
        }, true);

        //scope.items.push({"id":"11", "name":"Vasya", "phone":"123-45-78"});

        $(element[0].firstChild).sortable({
          connectWith: 'ul',
          stop: function (event, ui) {
            // console.log('stop ' + ui.item[0].id + ' parentNode.id=' + ui.item[0].parentNode.id + ' this.id=' + this.id + ' theScope.items.length=' + theScope.items.length + ' ' + ui.sender);
            scope.$apply();
          },
          update: function (event, ui) {
            var children = this.children;
            var i = 0;
            var j = 0;
            var cid = 0;
            var found = false;
            var name = ui.item[0].attributes['data-name'].value;
            var phone = ui.item[0].attributes['data-phone'].value;
            var status = ui.item[0].attributes['data-status'].value;
            var newitems = [];
            var newitem = null;
            for (i = 0; i < children.length; i ++){
              cid = +children[i].id;
              found = false;
              for (j = 0; j < scope.items.length; j ++){
                if (+scope.items[j].id === cid){
                  newitem = getObjByArgs(scope.items[j].id, scope.items[j].name, scope.items[j].phone); // delete newitem.$$hashKey
                  delete newitem.$$hashKey;
                  newitems.push(newitem/*{"id":cid, "name":name, "phone":phone, "status":status}*/);
                  //newitems.push({"id":scope.items[j].id, "name":scope.items[j].name, "phone":scope.items[j].phone, "status":scope.items[j].status});
                  found = true;
                  break;
                }
              }
              if (found === false && ui.sender !== null){
                newitem = getObjByArgs(cid, name, phone);
                delete newitem.$$hashKey;
                newitems.push(newitem/*{"id":cid, "name":name, "phone":phone, "status":status}*/);
              }
            }
            scope.items = newitems;
            //hui = scope.items;
            if (scope.id !== undefined) {
              localStorage.setItem(scope.id, JSON.stringify(extractIds(newitems)));
            }
            // console.log('update ' + ui.item[0].id + ' parentNode.id=' + ui.item[0].parentNode.id + ' this.id=' + this.id + ' theScope.items.length=' + theScope.items.length + ' ' + ui.sender);
          }
        });
      }
    };
  });

  ngStud.factory("StudentsService", function () {
    return {
      ActiveStudents: function () {
        return [
          {"id":"1", "name":"Vasya", "phone":"123-45-78", "status":"stat1"},
          {"id":"2", "name":"Petya", "phone":"777-56-22", "status":"stat1"},
          {"id":"3", "name":"Pasha", "phone":"223-12-56", "status":"stat1"}];
      },
      RedcardStudents: function () {
        return [
          {"id":"4", "name":"Kolya", "phone":"444-55-77", "status":"stat1"},
          {"id":"5", "name":"Alex", "phone":"222-66-88", "status":"stat1"},
          {"id":"6", "name":"Ilya", "phone":"255-66-99", "status":"stat1"}];
      },
      RemovedStudents: function () {
        return [/*
         {"id":"7", "name":"Azis", "phone":"888-55-77", "status":"stat1"},
         {"id":"8", "name":"Mrazish", "phone":"888-66-88", "status":"stat1"},
         {"id":"9", "name":"Moiseev", "phone":"200-66-99", "status":"stat1"}*/];
      }
    };
  });

  ngStud.controller("StudentsController", function ($scope, StudentsService) {
    $scope.activeStudents = StudentsService.ActiveStudents();
    $scope.redcardStudents = StudentsService.RedcardStudents();
    $scope.removedStudents = StudentsService.RemovedStudents();
  });
})();