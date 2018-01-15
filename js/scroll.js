$(document).ready(function() {
  const win = $(window);
  
  let showed = 7;
  let arr = [];
  
  $.getJSON('/archive.json', function(data) {
    $.each(data, function(key, val) {
      arr = val;
    });
  });
  
  if(showed >= arr.length){
    $('.infinite-spinner').fadeOut();
  }

	// Each time user scrolls
	win.scroll(function() {
    // if bottom reached
		if ($(document).height() - win.height() == win.scrollTop() && showed < arr.length) {
			$('.infinite-spinner').fadeIn("1000");
      setTimeout(function(){
        let out = '';
        for(var i = showed; i < arr.length && i < showed + 6; i++){
          if(i % 2 == 1) {
            out += "<div class='row row-centered preview-block appended-posts' style='display: none;'>";
          }
          out += "<div class='text-justify col-md-5 col-centered'><article class='homepage-preview'><div class='cover' style='background-image: url(" + arr[i].cover + ")'></div><div class='post-category'><a href='/" + arr[i].category + "'>" + arr[i].category + "</a></div><header><a href='" + arr[i].link + "'><h1>" + arr[i].title + "</h1></a></header>" + arr[i].excerpt + "</article></div>";
          if(i % 2 == 0) {
            out += "</div>";
          }
        }
        showed += 6;

        $("#extendable").append(out);
        $(".appended-posts").fadeIn(3000);
        $('.infinite-spinner').fadeOut();
      }, 3000);
		}
	});
});