const projectName = "product-landing-page";
localStorage.setItem("example_project", "Product Landing Page");

var mobile = /android|iphone|ipad|ipod|blackberry|mini|windows\sce|palm/i.test(
  navigator.userAgent.toLowerCase()
);
if (mobile) {
  $(".video-container").hide();
}
$(".navbar-collapse a").click(function () {
  $(".navbar-collapse").collapse("hide");
});
function handleFirstTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
  }
}
window.addEventListener("keydown", handleFirstTab);
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    if (
      location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 60,
          },
          1000,
          function () {
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            }
          }
        );
      }
    }
  });
