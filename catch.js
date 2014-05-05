var catchUpdate = {
	// url_ : 'http://www.yyets.com/resource/32023',
	requestUpdate : function() {
		// var urls = [];
		// urls.push(this.url_);
		// console.log(urls);
		// chrome.storage.local.set({"urls":urls});
		var that = this;
		chrome.storage.local.get("urls", function(item){
			console.log(item.urls);
			var req = new XMLHttpRequest();
		    req.open("GET", item.urls[0], true);
			//req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			req.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With");
			req.setRequestHeader("Access-Control-Allow-Origin", "http://www.yyets.com");
			req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		    req.onload = that.showUpdate_.bind(that);
		    req.send(null);
		});
	},
	constructUpdate_ : function(updateList) {
		var rmvb = document.getElementById("RMVB");
		var hdtv = document.getElementById("HDTV");
		for (var i = 0; i < updateList.length; i++) {
			var download = updateList[i].querySelector("div.download>a[type=ed2k]");
			var aNode = document.createElement("a");
			aNode.setAttribute("href", download.getAttribute("href"));
			aNode.setAttribute("class", "link");
			aNode.innerHTML = updateList[i].getAttribute("episode");
			
			if (updateList[i].getAttribute("format") == "RMVB") {
				rmvb.appendChild(aNode);
			}
			else if (updateList[i].getAttribute("format") == "HR-HDTV") {
				hdtv.appendChild(aNode);
			}
		}
	},
	showUpdate_ : function(e) {
		var page = (new DOMParser()).parseFromString(e.target.responseText, "text/html");
		var desc = page.querySelector("meta[name='keywords']");
		var resod_list = page.querySelectorAll("#tabs>div.box_1>ul.resod_list>li");
		// console.log(resod_list);
		// console.log(page);
		// console.log(desc);
		this.constructUpdate_(resod_list);
		this.showVideoName_(desc);
	},
	showVideoName_ : function(desc) {
		var descTag = document.getElementById("desc");
		descTag.innerHTML = desc.getAttribute("content");
	},
	addResource : function() {
		var addButton = document.querySelector("input[name='add']");
		addButton.onclick = function() {
			var resource = document.querySelector("input[name='resource']");
			chrome.storage.local.get("urls", function(item){
				var urls = item.urls;
				urls.push(resource.value);
				chrome.storage.local.set({"urls":urls});
			});
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	catchUpdate.requestUpdate();
	catchUpdate.addResource();
});