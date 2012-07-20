var screenStack = [];
//------------------------------------------------------------------
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
//------------------------------------------------------------------

function setSearchForValue(listIndex)
{
	if(listIndex == 1)
	{
		document.getElementById("searchFor").value = "attorney";
	}
	else if(listIndex == 2)
	{
		document.getElementById("searchFor").value = "judge";		
	}
	
	$("#homeScreen").hide();
	$("#optionsScreen").show("slide", { direction: "right" }, 250);
	
	screenStack.push("homeScreen");
}

function goBack(currentScreen)
{
	if(screenStack.length > 0)
	{
		var currentScreenObject = document.getElementById(currentScreen);
		currentScreenObject.style.display = "none";

		var previousScreen = screenStack.pop();
		var previousScreenObject = document.getElementById(previousScreen);		
		//previousScreenObject.style.display = "block";
		$(previousScreenObject).show("slide", { direction: "left" }, 250);
		
	}
}