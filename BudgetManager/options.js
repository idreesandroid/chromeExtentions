$(function(){
	$("#saveLimit").click(function(){
		var limit = $("#limit").val();
		if(limit){
			chrome.storage.sync.set({'limit': limit}, function(){
			close();				
			});
		}else{
			alert("Please enter limit value");
			$("#limit").focus();
		}
	});

	chrome.storage.sync.get(['total','limit'],function(getTotal){
		$("#showTotal").text(getTotal.total);
		$("#showLimit").text(getTotal.limit);
	});
	
	$("#resetTotal").click(function(){
		var total = 0;
		chrome.storage.sync.set({'total': total}, function(){
		var notifResetTotal = {
						type : 'basic',
						iconUrl : 'bm48.png',
						title : 'Reset Total',
						message : "Total has been rest to Zero"
					}
		 	chrome.notifications.create('notifResetTotal',notifResetTotal);
		 	chrome.notifications.clear('notifResetTotal'); 		
		});	
	});
});