import axios from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Fingerprint2 from 'fingerprintjs2';

firebase.initializeApp(firebaseConfig);

var domain = 'https://www.mobileads.com';
var apiDomain = 'https://api.mobileads.com';

var userCollection = 'BodyMainteUsers';
var couponCollection = 'BodyMainteCoupons';
var functionsDomain = 'https://us-central1-bodymainteo2o-1366e.cloudfunctions.net/twitter';

var localStorageName = 'BodyMainte';

var campaignId = '634501954374a87c6b6f4dde00493ded';
var adUserId = '4831';
var rmaId = '3';
var generalUrl = 'https://track.richmediaads.com/a/analytic.htm?rmaId={{rmaId}}&domainId=0&pageLoadId={{cb}}&userId={{adUserId}}&pubUserId=0&campaignId={{campaignId}}&callback=trackSuccess&type={{type}}&value={{value}}&uniqueId={{userId}}&customId={{source}}';

var trackingUrl = generalUrl.replace('{{rmaId}}', rmaId).replace('{{campaignId}}', campaignId).replace('{{adUserId}}', adUserId).replace('{{cb}}', Date.now().toString());

var user = {
	isWanderer: false,
	twitter: {
		token: '',
		secret: '',
		name: ''
	},
	info: {
		answers: [],
		couponCode: '',
		id: '',
		noQuestionAnswered: 0,
		state: '-',
		source: '',
	},
	fingerprint:'',
	generateFingerPrint() {
		new Fingerprint2().get((result, components) => {
			this.fingerprint = result;
	        return result;
        });
	},
	get: function(userId, source) {
		/* this is using the old mysql database. Not using Now */
    return axios.get(apiDomain + '/coupons/o2o/user_info', {
      params: {
        id: userId,
        source: source
      }
    });
	},
	register: function(userId, source) {
		return axios.post(apiDomain + '/coupons/o2o/user_register?id=' + userId + '&source=' + source + '&fingerprint=' + userId);
	},
	trackFirstImp: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'imp_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackSecondImp: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'imp_2_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackTermsPage: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'imp_tnc_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackRegistrationPage: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'register_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackTwitterAlreadyFollow: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'twitter_followed_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackTwitterFollowPage: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'imp_twf_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackTwitterLoginClick: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'twitter_click_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackEmailLogin: function(userId, source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var type = 'email_link';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{userId}}', userId).replace('{{source}}', source);
			// console.log(url);
			return axios.get(url);
		}
	},
	trackEmailLoginClick: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'email_click_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackTwitterFollowClick: function(source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var localObj = this.getLocal(source);
			var type = 'follow_click_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{source}}', source);
			if (localObj.status == true) {
				url = url.replace('{{userId}}', localObj.data.id);
			}
			else {
				url = url.replace('{{userId}}', '');
			}
			// console.log(url);
			return axios.get(url);
		}
	},
	trackExist: function(userId, source, retrievedFingerprint) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var type = 'exist_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', retrievedFingerprint + '_' + userId).replace('{{userId}}', userId).replace('{{source}}', source);
			// console.log(url);
			return axios.get(url);
		}
	},
	trackRegister: function(userId, source, method) {
    // track as impression
	    if (window.location.hostname.indexOf('localhost') < 0) {
	    	var type = 'page_view';
	    	if (method == 'twitter') {
	    		type = 'page_view_tw';
	    	}
	    	else if (method == 'email') {
	    		type = 'page_view_email';
	    	}
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{userId}}', userId).replace('{{source}}', source);
			// console.log(url);
			return axios.get(url);
	    }
	},
	sendEmail: function(email, subjectTitle, content) {
  	var formData = new FormData();
    formData.append('sender', 'Couponcampaign.predelistyle.com');
    formData.append('subject', subjectTitle);
    formData.append('recipient', email);
    formData.append('content', content);
    axios.post(domain + '/mail/send', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function(resp) {
      console.log(resp);
    }).catch(function(error) {
      console.log(error);
    });
	},
	registerTwitter: function() {
		console.log('registerTwitter');
		firebase.auth().languageCode = 'ja';
		var provider = new firebase.auth.TwitterAuthProvider();
	  // return firebase.auth().signInWithPopup(provider);
	  firebase.auth().signInWithRedirect(provider);
	},
	getRedirectResult: function() {
		return new Promise(function(resolve, reject) {
			console.log('redirect result');
			firebase.auth().getRedirectResult().then(function(result) {
			  resolve(result);
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  reject(error);
			  // ...
			});	
		});
	},
	isFollowingTwitter: function() {
		return axios.post(functionsDomain + '/checkFriendship', {
      token: this.twitter.token,
      tokenSecret: this.twitter.secret,
      id: this.info.id
	  });
	},
	followTwitter: function() {
		return axios.post(functionsDomain + '/followUs', {
      token: this.twitter.token,
      tokenSecret: this.twitter.secret
    });
	},
	messageTwitter: function(message) {
		return axios.post(functionsDomain + '/sendMessage', {
      token: this.twitter.token,
      tokenSecret: this.twitter.secret,
      recipientId: this.info.id,
      text: message
     })/*.then((response) => {
		 if (!response.data.event) {
		 	this.trackMessageError(this.info.id, this.twitter.name, this.info.source);
		 	if (response.data.message) {
		 		this.sendEmail('yk@mobileads.com', 'Twitter Message Error', response.data.message + ' ' + this.twitter.name);
		 		this.sendEmail('april.cheong@mobileads.com', 'Twitter Message Error', response.data.message + ' ' + this.twitter.name);
		 	}
		 }
     }).catch((err) => {
     	console.error(err);
     	this.trackMessageError(this.info.id, this.twitter.name, this.info.source);
     	this.sendEmail('yk@mobileads.com', 'Twitter Message Error',  'Twitter Message Error ' + this.twitter.name);
     	this.sendEmail('april.cheong@mobileads.com', 'Twitter Message Error', response.data.message + ' ' + this.twitter.name);
     });*/
	},
	trackAnswer: function(userId, questionNo, answer, source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var type = 'q_a_new';
			var value = 'q' + questionNo.toString() + '_' + encodeURIComponent(answer);
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', value).replace('{{userId}}', userId).replace('{{source}}', source);
			return axios.get(url);
		}
	},
	trackMessageError: function(userId, twitterName, source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var type = 'messageError_new';
			var value = twitterName;
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', value).replace('{{userId}}', userId).replace('{{source}}', source);
			return axios.get(url);
		}
	},
	mark: function(userId, state, groups, source) {
		// var groupJSON = JSON.stringify(groups);
		var groupJSON = groups[0];
		return axios.post(apiDomain + '/coupons/o2o/mark_user?id=' + userId + '&state=' + state + '&group=' + groupJSON + '&source=' + source);
	},
	trackWin: function(userId, couponCode, source) {
		// put in couponCode in value
		if (window.location.hostname.indexOf('localhost') < 0) {
			var type = 'win_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', couponCode).replace('{{userId}}', userId).replace('{{source}}', source);
			url += '&tt=E&ty=E';
			return axios.get(url);
		}
	},
	trackLose: function(userId, source) {
		if (window.location.hostname.indexOf('localhost') < 0) {
			var type = 'lose_new';
			var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', '').replace('{{userId}}', userId).replace('{{source}}', source);
			url += '&tt=E&ty=E';
			return axios.get(url);
		}
	},
	passResult: function(userId, flag, source, couponLink) { // flag: 1 = win, 0 = lose
		var psForm = new FormData();
		psForm.append('user_id', userId);
		psForm.append('flag', flag);
	    psForm.append('campaign_id', 'ca8ca8c34a363fa07b2d38d007ca55c6');
		psForm.append('source', source);
		if (couponLink) {
			psForm.append('coupon_url', encodeURIComponent(couponLink));
		}
		return axios.post(domain + '/api/coupon/softbank/api_call', psForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
	},
	saveLocal: function(userObj, source) {
		if (window.localStorage.getItem(localStorageName)) {
			try {
				var dataObj = JSON.parse(window.localStorage.getItem(localStorageName));
				if (dataObj[source]) {
					dataObj[source] = Object.assign(userObj, {source: source, answers: dataObj[source].answers});
					window.localStorage.setItem(localStorageName, JSON.stringify(dataObj));
				}
				else {
					dataObj[source] = Object.assign(userObj, {source: source, answers: []});
					window.localStorage.setItem(localStorageName, JSON.stringify(dataObj));
				}
			}
			catch(err) {
				console.error(err);
			}
		}
		else {
			var dataObj = {};
			dataObj[source] = Object.assign(userObj, {source: source, answers: []});
			window.localStorage.setItem(localStorageName, JSON.stringify(dataObj));
		}
	},
	saveLocalAnswers:function(answers, source) {
		if (window.localStorage.getItem(localStorageName)) {
			try {
				var dataObj = JSON.parse(window.localStorage.getItem(localStorageName));
				if (dataObj[source]) {
					dataObj[source].answers = answers;
					window.localStorage.setItem(localStorageName, JSON.stringify(dataObj));
				}
			}
			catch(err) {
				console.error('error getting local user info');
			}
		}
	},
	getLocal: function(source) {
		if (window.localStorage.getItem(localStorageName)) {
			try {
				var dataObj = JSON.parse(window.localStorage.getItem(localStorageName));
				if (dataObj[source] && dataObj[source].id) {
					return {
						data: dataObj[source],
						status: true
					}
				}
				else {
					return {
						status: false
					}
				}
			}
			catch(err) {
				console.error(err);
				return {
					status: false
				}
			}
		}
		else {
			return {
				status: false
			}
		}
	},
	loadLocal: function(source) {
		if (window.localStorage.getItem(localStorageName)) {
			try {
				var dataObj = JSON.parse(window.localStorage.getItem(localStorageName));
				if (dataObj[source] && dataObj[source].id) {
					user.info.id = dataObj[source].id;
					user.info.couponCode = dataObj[source].couponCode;
					user.info.state = dataObj[source].state;
					user.info.answers = dataObj[source].answers;
					user.info.source = dataObj[source].source;
				}
			}
			catch(err) {
				console.error(err);
			}
		}
	},
	clearLocal: function(source) {
		if (window.localStorage.getItem(localStorageName)) {
			try {
				var dataObj = JSON.parse(window.localStorage.getItem(localStorageName));
				if (dataObj[source]) {
					delete dataObj[source];
					window.localStorage.setItem(localStorageName, JSON.stringify(dataObj));
				}
			}
			catch(err) {
				console.error(err);
			}
		}
	},
	clearLocalClean: function() {
		window.localStorage.removeItem(localStorageName);
	}
};

export default user;