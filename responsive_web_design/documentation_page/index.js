const projectName = 'technical-docs-page';
localStorage.setItem('example_project', 'Technical Docs Page');
$(function() {
  $("a[href*='#']:not([href='#'])").click(function() {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top - 80
          },
          1000
        );
        return false;
      }
    }
  });
});
$('#quickStartDropdown').click(function() {
  $('#referenceDropdown').dropdown('toggle');
  $('#contributingDropdown').dropdown('toggle');
});
$('#referenceDropdown').click(function() {
  $('#quickStartDropdown').dropdown('toggle');
  $('#contributingDropdown').dropdown('toggle');
});
$('#contributingDropdown').click(function() {
  $('#quickStartDropdown').dropdown('toggle');
  $('#referenceDropdown').dropdown('toggle');
});
$('.dropdown-item').click(function() {
  $('.navbar-collapse').collapse('hide');
});
$('body').scrollspy({
  target: '.navbar',
  offset: 80
});
