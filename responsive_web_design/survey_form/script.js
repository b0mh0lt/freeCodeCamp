const projectName = 'survey-form';
localStorage.setItem('example_project', 'Survey Form');

$(document).ready(function() {
  $('select').formSelect();
  $('#day')
    .focus(function() {
      $('#number-label').css('color', '#607d8b');
    })
    .blur(function() {
      $('#number-label').css('color', '#9e9e9e');
    });
  $('#city')
    .focus(function() {
      $('#country-label').css('color', '#607d8b');
    })
    .blur(function() {
      $('#country-label').css('color', '#9e9e9e');
    });
});
