$(function (){
   var colorName = $("#backGroundColor").val();
   var fontColor = $("#fontColor").val();
    $("#backGroundColor").on("change past keyup", function (){
        colorName = $(this).val();
        fontColor = $("#fontColor").val();
    });
    $("#btnChange").click(function(){
        colorName = $("#backGroundColor").val();
        fontColor = $("#fontColor").val();
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
          chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: colorName, fontColor : fontColor})
      });
    })
});