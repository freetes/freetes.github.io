const animateTime = 300

function toggleList() {
  // 电脑端
  if(screen.width > 800){
    if($(".list").css('display') == 'none'){
      $(".markdown-body").animate({width: '67%', padding: '8px 1%', margin: '0 1% 0 0'}, animateTime).promise().done(function () {
        $(".list").toggle(animateTime)
      })
    }
    else{
      $(".list").toggle(animateTime).promise().done(function (){
        $(".markdown-body").animate({ width: '80%', padding: '8px 9%', margin: '0 1%'}, animateTime)
      })
    }
  }
  else{
    $(".list").slideToggle(animateTime)
  }
}
