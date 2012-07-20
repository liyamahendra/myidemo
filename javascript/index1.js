
function init(){
	window.addEventListener("deviceready", onDeviceReady, true);
}
$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});
function onDeviceReady()
{

}

function nullHandler() {}

//===================================================
function searchAttroney() {
	var attorneySearchKey = document.getElementById("attorneySearchOptions").value;
	var attorneySearchValue = document.getElementById("attorneySearchKey").value;
		
	if(attorneySearchValue == "")
	{
		navigator.notification.alert(
		    'Please enter the data you want to search', 
		    nullHandler,         
		    'Error',         
		    'OK'               
		);
		return;
	}
		
	if(navigator.network.connection.type == Connection.UNKNOWN || navigator.network.connection.type == Connection.NONE)
	{
		navigator.notification.alert(
		    'Please connect to the internet and try again...', 
		    nullHandler,         
		    'Connection Error',         
		    'OK'               
		);
		return;
	}
	
	var url = "http://www.littleblackbooktx.com/api/search.php?region=north&entity=attorney&key=" + attorneySearchKey + "&value=" + attorneySearchValue;
	console.log("URL: " + url);
    
    toggleSearchProgress(1);
	
	$.ajax({
	  url: url,
	  dataType: 'json',
	  success: function(data){
	  	renderResults(data);
        toggleSearchProgress(0);
	  }, 
	  error: function(data){
	  	navigator.notification.alert(
		    'Error occurred while connecting to the server, please try again...', 
		    nullHandler,         
		    'Connection Error',         
		    'OK'               
		);
	  }
	});
}

function renderResults(results) {
	
	if(results != null && results.status == "success" && results.count > 0)
	{
		if(results.count == 1)
		{
			showDetails(results.data[0].BarCard , results.data[0].Prefix, results.data[0].FirstName, results.data[0].LastName, results.data[0].Suffix, results.data[0].Company, results.data[0].Address1, results.data[0].Address2, results.data[0].Address3, results.data[0].City, results.data[0].State, results.data[0].Zip, results.data[0].Phone);
		}
		else
		{
			var htmlContent = '<ul class="list-view">';
			for(var ctr2=0; ctr2 < results.count; ctr2++) {
				htmlContent += '<li><a href="#" onclick=\'showDetails("' + results.data[ctr2].BarCard + '","' + results.data[ctr2].Prefix + '","' + results.data[ctr2].FirstName + '","' + results.data[ctr2].LastName + '","' + results.data[ctr2].Suffix + '","' + results.data[ctr2].Company + '","' + results.data[ctr2].Address1 + '","' + results.data[ctr2].Address2 + '","' + results.data[ctr2].Address3 + '","' + results.data[ctr2].City + '","' + results.data[ctr2].State + '","' + results.data[ctr2].Zip + '","' + results.data[ctr2].Phone + '");\'>' + results.data[ctr2].FirstName + ' ' + results.data[ctr2].LastName  + '</a></li>';
			}
			htmlContent += "</ul>";
			
			$("#searchResultScreenWrapper").html(htmlContent); 
			
			window.location.href = "#searchresults";
		}
	}
	else
	{
		navigator.notification.alert(
		    'No results found matching your term...', 
		    nullHandler,         
		    'No Match',         
		    'OK'               
		);
		return;
	}
}
//===================================================
function searchJudge()
{
	var judgeSearchKey = document.getElementById("judgeSearchOptions").value;
	var judgeSearchValue = document.getElementById("judgeSearchKey").value;
	
	if(judgeSearchValue == "")
	{
		navigator.notification.alert(
		    'Please enter the data you want to search', 
		    nullHandler,         
		    'Error',         
		    'OK'               
		);
		return;
	}

	if(navigator.network.connection.type == Connection.UNKNOWN || navigator.network.connection.type == Connection.NONE)
	{
		navigator.notification.alert(
		    'Please connect to the internet and try again...', 
		    nullHandler,         
		    'Connection Error',         
		    'OK'               
		);
		return;
	}
			
	var url = "http://www.littleblackbooktx.com/api/search.php?region=north&entity=judge&key=" + judgeSearchKey + "&value=" + judgeSearchValue;
	console.log("URL: " + url);
	
    toggleSearchProgress(1);
    
	$.ajax({
	  url: url,
	  dataType: 'json',
	  success: function(data){
	  	renderResults(data);
        toggleSearchProgress(0);
	  }, 
	  error: function(data){
	  	navigator.notification.alert(
		    'Error occurred while connecting to the server, please try again.', 
		    nullHandler,         
		    'Connection Error',         
		    'OK'               
		);
	  }
	});
}
//===================================================
function showDetails(BarCard,Prefix,FirstName,LastName,Suffix,Company,Address1,Address2,Address3,City,State,Zip,Phone)
{
	console.log("Show details called");
	var htmlContent = "";
	
	htmlContent += "<ul class='details-view grouped'>";
	htmlContent += "	<li><a><span style='color: #4286f5;'>Name: </span>" + Prefix + " " + FirstName + " " + LastName + " " + Suffix + "</a></li>";
	htmlContent += "	<li><a><span style='color: #4286f5;'>Bar #: </span>" + BarCard + "</a></li>";
	htmlContent += "	<li><a><span style='color: #4286f5;'>Company: </span>" + Company + "</a></li>";
	htmlContent += "	<li><a><span style='color: #4286f5;'>Address: </span>" + Address1 + ((Address2 == "") ? "" : "<br />" + Address2) + ((Address3 == "") ? "" : "<br />" + Address3) + "</a></li>";
	htmlContent += "	<li><a><span style='color: #4286f5;'>City: </span>" + City + "<br /><span style='color: #4286f5;'>State: </span>" + State + "<br /><span style='color: #4286f5;'>Zip: </span>" + Zip + "</a></li>";
	htmlContent += "	<li><a href='tel:" + formatPhoneNumber(Phone) + "'><span style='color: #4286f5;'>Phone: </span>" + Phone + "</a></li>";
	htmlContent += "</ul>";
	
	htmlContent += "<ul class='details-view grouped'>";
	htmlContent += "<li  style='text-align: center;'><a id='saying' href='#' style='color: #000;'></a></li>";
	htmlContent += "</ul>";	
	
	$("#searchDetailScreenWrapper").html(htmlContent);
	
	window.location.href = "#searchdetails";
	
	var url = "http://www.littleblackbooktx.com/api/getsaying.php";
	$.ajax({
	  url: url,
	  dataType: 'json',
	  success: function(data){
	  	document.getElementById("saying").innerHTML = data;
	  }, 
	  error: function(data){
	  	navigator.notification.alert(
		    'Error occured while connecting to the server, please try again.', 
		    nullHandler,         
		    'Connection Error',         
		    'OK'               
		);
	  }
	});
}
//===================================================
function formatPhoneNumber(unformattedNumber)
{
	var formattedNumber = "";
	if(unformattedNumber != null && unformattedNumber != "")
	{
		formattedNumber = unformattedNumber.replace("(", "");
		formattedNumber = formattedNumber.replace(")", "");
		formattedNumber = formattedNumber.replace("-", "");
		formattedNumber = formattedNumber.replace(" ", "");
	}
	
	return formattedNumber;
}

function toggleSearchProgress(toggleValue)
{
    if(toggleValue == 0)
    {
        document.getElementById("loadingProgressImage").style.display = "none";
        
        document.getElementById("judgeSearchButton").disabled = false;
        document.getElementById("attorneySearchButton").disabled = false;
        
        document.getElementById("attorneySearchKey").disabled = false;
        document.getElementById("attorneySearchOptions").disabled = false;
        document.getElementById("judgeSearchKey").disabled = false;
        document.getElementById("judgeSearchOptions").disabled = false;
        document.getElementById("judgeSearchCancelButton").disabled = false;
        document.getElementById("attorneySearchCancelButton").disabled = false;        
        
    }else if(toggleValue == 1)
    {
        document.getElementById("loadingProgressImage").style.display = "block";
        
        document.getElementById("judgeSearchButton").disabled = true;
        document.getElementById("attorneySearchButton").disabled = true;   
        
        document.getElementById("attorneySearchKey").disabled = true;
        document.getElementById("attorneySearchOptions").disabled = true;
        document.getElementById("judgeSearchKey").disabled = true;
        document.getElementById("judgeSearchOptions").disabled = true;
        document.getElementById("judgeSearchCancelButton").disabled = true;
        document.getElementById("attorneySearchCancelButton").disabled = true;
    }
}