$(function(){
	chrome.storage.sync.get('total', function(budget){
		$("#total").text(budget.total);
	});
	chrome.storage.sync.get('limit', function(budget){
		$("#limit").text(budget.limit);
	});
	$("#spendAmount").click(function(){
		chrome.storage.sync.get(['total','limit'], function(budget){
			var newTotal = 0;	
			if(budget.total){
				newTotal += parseInt(budget.total);
			}
			var amount = $('#amount').val();
			if(amount){
				newTotal += parseInt(amount);
			}
			chrome.storage.sync.set({'total': newTotal}, function(){
				if(amount >= budget.limit || newTotal >= budget.limit){
					var notifOption = {
						type : 'basic',
						iconUrl : 'bm48.png',
						title : 'Limit Reached!',
						message : "Oh. oh! Looks like you've reached your limit"
					}
					chrome.notifications.create('limitNotif',notifOption);
					chrome.notifications.clear('limitNotif'); 
				}
			});
			$("#total").text(newTotal);
			$("#amount").val('');
		})
	})
});