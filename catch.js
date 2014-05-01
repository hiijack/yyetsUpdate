var catchUpdate = {
	url_ : 'http://www.yyets.com/resource/32023',
	requestUpdate : function() {
		var req = new XMLHttpRequest();
	    req.open("GET", this.url_, true);
		//req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		req.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With");
		req.setRequestHeader("Access-Control-Allow-Origin", "http://www.yyets.com");
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	    req.onload = this.showUpdate_.bind(this);
	    req.send(null);
	},
	constructUpdate_ : function(updateList) {
		var rmvb = document.getElementById("RMVB");
		for (var i = 0; i < updateList.length; i++) {
			if (updateList[i].getAttribute("format") == "RMVB") {
				var download = updateList[i].querySelector("div.download>a[type=ed2k]");
				var rmvbNode = document.createElement("a");
				rmvbNode.setAttribute("href", download.getAttribute("href"));
				rmvbNode.setAttribute("class", "link");
				rmvbNode.innerHTML = updateList[i].getAttribute("episode");
				rmvb.appendChild(rmvbNode);
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
	}
}

document.addEventListener('DOMContentLoaded', function() {
	catchUpdate.requestUpdate();
});