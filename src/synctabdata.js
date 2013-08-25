
(function(win,undefined){
		win["syntabdata"]= {
			//__cachekey: location.hostname+"__synctabdata",
			lastIndexOfArray: function(arr,str) {
				for(var i=0; i<arr;i++){
				 	if(arr[i]==str){
				 		return 1;
				 	}
				}
				return -1;
			},
			pub: function (subject,message) {
				//fix the IE8 missing storageEvent.key, we store the key in the messge
				/*if(this.isIE8()) {
					message={
						subject: message
					};
					message=JSON.stringify(message);
				}*/
				message=JSON.stringify(message);
				localStorage.setItem(subject,message);

				/*var keystr=localStorage.getItem(this.__cachekey),
					keys=keystr.split(",");

				//put the subject into local storage cache if no subject before
				if(this.lastIndexOfArray(keys,subject)==-1) {
					!!keystr?localStorage.setItem(keystr+","+subject):localStorage.setItem(this.__cachekey,subject);
				}*/

			},

			sub: function (subject,fcb) {
				$(window).on('storage', function(e) {
					var key=e.originalEvent.key;
					if(key==subject) {
						fcb.apply(null,[subject,localStorage.getItem(subject)]);
					}
				});

				// IE8 fix missing storageEvent.key
			    if (this.isIE8()) {
			        $(document).on('storage', function(e) {
			        	fcb.apply(null,[subject,localStorage.getItem(subject)]);
			        });
			    }
			},
			isIE8: function() {
				if ('onstorage' in document) {
					return true;
				}
				return false;
			},
			init: function() {

				//location.hostname
				/*if(!!localStorage.getItem(this.__cachekey)){
					localStorage.setItem(this.__cachekey,"");
				}*/
			}
		}
	})(window,undefined);
