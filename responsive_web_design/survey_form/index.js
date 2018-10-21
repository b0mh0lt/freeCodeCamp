const project_name = 'survey-form';
localStorage.setItem('example_project', 'Survey Form');
$(document).ready(function() {
  var code = {};
  $.ajax({
    url: 'https://geoip-db.com/json/',
    async: false,
    dataType: 'json',
    success: function(data) {
      code = data.country_code;
    }
  });
  $("#country option[value='" + code + "']").attr('selected', true);
  $('select').material_select();
  $('select[required]').css({
    position: 'absolute',
    display: 'inline',
    height: 0,
    padding: 0,
    width: 0
  });
  $('#number')
    .focus(function() {
      $('#number-label').css('color', '#90A4AE');
    })
    .blur(function() {
      $('#number-label').css('color', '#9E9E9E');
    });
  $('#no')
    .focus(function() {
      $('#number-label').css('color', '#90A4AE');
    })
    .blur(function() {
      $('#number-label').css('color', '#9E9E9E');
    });
});
