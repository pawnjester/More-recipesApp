$(".delete").click(function () {
    $(this).parents(".col-md-4").hide();
});


$('.view').click(function(){
   window.location.href='detail.html';
   return false;
})

$('#likes').on('click', () => {
  const likes = +$('#likess').text() + 1;
  $('#likess').text(likes);
});