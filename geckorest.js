	/*
	GeckoRest Library
	Version 0.0.1
	Made by GeckoRest with Love <3
	Copy Right 2017
	GeckoRest library is dependent to Jquery Library
*/

(function(window){
	'use strict'

	function define_library( ) {
		var GeckoREST = {};
		var stack_gecko_id = '';
		var stack_gecko = 'https://geckorest.com/';
		var stack_gecko_secret = '';
		var stack_gecko_key = '';

		$.extend({
		    keyCount : function(o) {
		        if(typeof o == "object") {
		            var i, count = 0;
		            for(i in o) {
		                if(o.hasOwnProperty(i)) {
		                    count++;
		                }
		            }
		            return count;
		        } else {
		            return false;
		        }
		    }
		});

		GeckoREST.init = function(id, secret, key) {
			stack_gecko_id = id;
			stack_gecko_secret = secret;
			stack_gecko_key = key;
		}

		GeckoREST.checkScriptAvailability = function( ) {
			var check = $('script[src*="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"]').length;
			if(check > 0) {
				GeckoREST.initializeGoogleApi( );
			}
		}

		GeckoREST.initializeGoogleApi = function( ) {
			console.log('google firebase initialize');
			var config = {
			    apiKey: "AIzaSyAsPlsKf4ABs35zNnEG5_8didnfVR7RExk",
			    authDomain: "glowing-heat-5953.firebaseapp.com",
			    databaseURL: "https://glowing-heat-5953.firebaseio.com",
			    storageBucket: "glowing-heat-5953.appspot.com",
			    messagingSenderId: "74439407033"
			  };
		  	firebase.initializeApp(config);
		}


		GeckoREST.signinWithGoogle = function(done) {
			var provider = new firebase.auth.GoogleAuthProvider();
			return new Promise(function (resolve, reject) {
				firebase.auth().signInWithPopup(provider).then(function(result) {
				  return resolve({
				  	uid: result.user.providerData[0].uid,
				  	name: result.user.providerData[0].displayName,
				  	email: result.user.providerData[0].email,
				  	photo: result.user.providerData[0].photoURL,
				  	providerId: result.user.providerData[0].providerId
				  });
				}).catch(function(error) {
				 return reject(error);
				});
			});
			return GeckoREST;
		}

		GeckoREST.signinWithFacebook = function( ) {
			var provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope('email');
			return new Promise(function (resolve, reject) {
				firebase.auth().signInWithPopup(provider).then(function(result) {
				  return resolve({
				  	uid: result.user.providerData[0].uid,
				  	name: result.user.providerData[0].displayName,
				  	email: result.user.providerData[0].email,
				  	photo: result.user.providerData[0].photoURL,
				  	providerId: result.user.providerData[0].providerId
				  });
				}).catch(function(error) {
				 return reject(error);
				});
			});
			return GeckoREST;

		}

		GeckoREST.signout = function( ) {
			window.localStorage.removeItem('token');
		}

		GeckoREST.register = function(end_point, email, password) {
			return new Promise(function (resolve, reject) {
		    var xhr = new XMLHttpRequest();

		   	xhr.open('POST', stack_gecko + stack_gecko_id + '/' + end_point , false);

		    xhr.onload = function () {
		      if (this.status >= 200 && this.status < 300) {
		        var data = JSON.parse(xhr.response);
		        console.log(data);
		       	resolve({
			        	status: this.status,
						statusText: xhr.statusText,
						data : JSON.parse(xhr.response)
			        });
		      } else {
		      	if(this.status == 409) {
		      		var messageStatus = 'Email Address Already taken.';
		      	}
		        reject({
		          status: this.status,
		          statusText: xhr.statusText,
		          statusMessage: messageStatus
		        });
		      }
		    };
		    xhr.onerror = function () {
		      reject({
		        status: this.status,
		        statusText: xhr.statusText
		      });
		    };
		    xhr.send(JSON.stringify({ email: email, password: password }));
		  });
		}

		GeckoREST.signin = function(end_point, email, password, options) {
			return new Promise(function (resolve, reject) {
		    var xhr = new XMLHttpRequest();

		   	xhr.open('POST', stack_gecko + stack_gecko_id + '/' + end_point , false);
		   	setHeaders( options, xhr);

		    xhr.onload = function () {
		      if (this.status >= 200 && this.status < 300) {
		        var data = JSON.parse(xhr.response);
		        window.localStorage.setItem('token', data.jwt);
		        resolve({
			        	status: this.status,
						statusText: xhr.statusText,
						data : JSON.parse(xhr.response)
			        });
		      } else {
		        reject({
		          status: this.status,
		          statusText: xhr.statusText
		        });
		      }
		    };
		    xhr.onerror = function () {
		      reject({
		        status: this.status,
		        statusText: xhr.statusText
		      });
		    };
		    xhr.send(JSON.stringify({ email: email, password: password }));
		  });
		}

		GeckoREST.list = function(end_point, query, options) {
			return new Promise(function (resolve, reject) {
		    var xhr = new XMLHttpRequest();

		    	var opt = getQuery(query);

		    	xhr.open('GET', stack_gecko + stack_gecko_id + '/' + end_point + opt, false);

			    setHeaders( options, xhr);

			    xhr.onload = function () {
			      if (this.status >= 200 && this.status < 300) {
			        resolve({
			        	status: this.status,
						statusText: xhr.statusText,
						data : JSON.parse(xhr.response)
			        });
			      } else {
			        reject({
			          status: this.status,
			          statusText: xhr.statusText,
			          data : JSON.parse(xhr.response)
			        });
			      }
			    };
			    xhr.onerror = function () {
			      reject({
			        status: this.status,
			        statusText: xhr.statusText
			      });
			    };
			    xhr.send();
		  });
		}

		GeckoREST.fetch = function(end_point, id, options) {
			return new Promise(function (resolve, reject) {
		    var xhr = new XMLHttpRequest();
		    var token = window.localStorage.getItem('token');
		    console.log(token);

			   	xhr.open('GET', stack_gecko + stack_gecko_id + '/' + end_point + '/' + id , false);

			    setHeaders( options, xhr);
			    
			    xhr.onload = function () {
			      if (this.status >= 200 && this.status < 300) {
			        resolve({
			        	status: this.status,
						statusText: xhr.statusText,
						data : JSON.parse(xhr.response)
			        });
			      } else {
			        reject({
			          status: this.status,
			          statusText: xhr.statusText
			        });
			      }
			    };
			    xhr.onerror = function () {
			      reject({
			        status: this.status,
			        statusText: xhr.statusText
			      });
			    };
			    xhr.send();
		  });
		}

		GeckoREST.create = function(end_point, data, options) {
			return new Promise(function (resolve, reject) {
		    var xhr = new XMLHttpRequest();
		    var token = window.localStorage.getItem('token');
		   	xhr.open('POST', stack_gecko + stack_gecko_id + '/' + end_point , false);
		   	setHeaders( options, xhr);

		    xhr.onload = function () {
		      if (this.status >= 200 && this.status < 300) {
		        var data = JSON.parse(xhr.response);
		        resolve({
			        	status: this.status,
						statusText: xhr.statusText,
						data : JSON.parse(xhr.response)
			        });
		      } else {
		        reject({
		          status: this.status,
		          statusText: xhr.statusText
		        });
		      }
		    };
		    xhr.onerror = function () {
		      reject({
		        status: this.status,
		        statusText: xhr.statusText
		      });
		    };
		    xhr.send(JSON.stringify(data));
		  });
		}

		GeckoREST.update = function(end_point, id, data, options) {
			return new Promise(function (resolve, reject) {
		    var xhr = new XMLHttpRequest();
		    var token = window.localStorage.getItem('token');

		   	xhr.open('POST', stack_gecko + stack_gecko_id + '/' + end_point + '/' + id , false);
		   	setHeaders( options, xhr);

		    xhr.onload = function () {
		      if (this.status >= 200 && this.status < 300) {
		        var result = JSON.parse(xhr.response);
		        resolve({
			        	status: this.status,
						statusText: xhr.statusText,
						data : JSON.parse(xhr.response)
			        });
		      } else {
		        reject({
		          status: this.status,
		          statusText: xhr.statusText
		        });
		      }
		    };
		    xhr.onerror = function () {
		      reject({
		        status: this.status,
		        statusText: xhr.statusText
		      });
		    };
		    xhr.send(JSON.stringify(data));
		  });
		}

		GeckoREST.delete = function(end_point, id) {
			return new Promise(function (resolve, reject) {
		    	var xhr = new XMLHttpRequest();
		    	var token = window.localStorage.getItem('token');
		    	xhr.open('POST', stack_gecko + stack_gecko_id + '/' + end_point + '/' + id + '/delete' , false);

			    xhr.onload = function () {
			      if (this.status >= 200 && this.status < 300) {
			        resolve({
			        	status: this.status,
						statusText: xhr.statusText,
						data : JSON.parse(xhr.response)
			        });
			      } else {
			        reject({
			          status: this.status,
			          statusText: xhr.statusText
			        });
			      }
			    };
			    xhr.onerror = function () {
			      reject({
			        status: this.status,
			        statusText: xhr.statusText
			      });
			    };
			    xhr.send();
			});
		}
		

		// ----------- OPTIONS SYNTAX ------------- //
		// var options = {
			//   "Authorization" : "qwerty"
		// }
		
		// ----------- QUERY SYNTAX ------------- //
		// var query = {
			// from : 1,
			// size : 99,
			// sort : "name",
			// order : "asc",
			// name : "jeamar", 
			// age_lt : 7
		// }

		function getQuery(query){
			if( query ){
				var no_of_opt = $.keyCount(query);
		    	var opt = "?";
		    	var ctr = 0;

		    	$.each(query, function(i, elem) {
	    			opt += i + "=" + elem + "&";
			        ctr++;

			        if( ctr == no_of_opt ) {
			        	opt = opt.slice(0, -1);
			        }
			    });

			    return opt;
			}else{
				return "";
			}
			
		}

		function setHeaders(options,xhr){
			if( options ){
	    		$.each(options, function(i, elem) {

		    		xhr.setRequestHeader(i,elem);
			    });
			}
	    	
		}

		GeckoREST.checkScriptAvailability( );
		return GeckoREST;
	}
	

	if(typeof(GeckoREST) == 'undefined') {
		window.GeckoREST = define_library( );
	} else {
		console.log('Library already defined');
	}
})(window);