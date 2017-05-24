$(function(){
  $('#demonbox button').click(function(){
    $('#pop-up').css('display','block');
    $('body').css('overflow-y','hidden');
  })
  $('#cancel-btn').click(function(){
    $('#pop-up').css('display','none');
    $('body').css('overflow-y','auto');
  });

});
