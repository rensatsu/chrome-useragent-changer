// Saves options to chrome.storage.sync.
var LinkOptions = {
	settings: {
		myUA: "Mozilla/5.0 (X11; Linux x86_64) %(webkit) (KHTML, like Gecko) Ubuntu/16.04 %(chrome) %(safari)"
	},
	
	save: function() {
		var myUA = document.getElementById('myUA').value;
		LinkOptions.settings.myUA = myUA;
		var bg = chrome.extension.getBackgroundPage();
		if (typeof bg != 'undefined' && bg) {
			bg.LinkOptions.settings.myUA = myUA;
		}
		
		chrome.storage.sync.set({
			myUA: myUA
		}, function() {
			// Update status to let user know options were saved.
			var status = document.getElementById('status');
			status.textContent = '[OK] Preferences saved';
			setTimeout(function() {
				status.textContent = 'Preferences';
			}, 750);
		});
	},
	
	load: function() {
		chrome.storage.sync.get({
			myUA: LinkOptions.settings.myUA
		}, function(items) {
			LinkOptions.settings.myUA = items.myUA;
			
			if (document.getElementById('myUA') === null) {
				// nothing to do
			} else {
				document.getElementById('myUA').value = items.myUA;
				document.getElementById('save').addEventListener('click', LinkOptions.save);
				document.getElementById('myUA-copy').addEventListener('click', function() {
					document.getElementById('myUA').value = document.getElementById('myUA-copy').innerHTML;
				});
			}
		});
	},
}

document.addEventListener('DOMContentLoaded', LinkOptions.load);