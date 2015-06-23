$(document).ready(function load() {
  var li = document.createElement('li');
  var h4 = document.createElement('h4');
  var h3 = document.createElement('h3');
  var list;
  var $this = $(this);
  $('ul').append(li);
  $('li').append(h3, h4);
  // get запрос
  $.get(window.url, function getList(data) {
    // данні перероблюємо та сортуємо
    data.map(function it(item) {

      if (item.status === 'removed') {
        console.log(item.name);
        $('.removed  h3').text(item.name);
        $('.removed h4').text(item.phone);
      }
      if (item.status === 'active') {
        $('.active  h3').text(item.name);
      }
      if (item.status === 'redcard') {
        $('.redcard  h3').text(item.name);
      }
    });
  });

});