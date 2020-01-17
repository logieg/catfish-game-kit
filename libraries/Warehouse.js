// WAREHOUSE.JS - LOCALSTORAGE AND SESSIONSTORAGE MANAGER
// By Logan G.

// NOTE: It has been recently found that Warehouse.js already exists as a node.js database manager

var Warehouse = {
	isSupported: function() {if(typeof(Storage) !== "undefined") {return true;} else {return false;}},
	set: function(key, value) {localStorage.setItem(key, value);},
	get: function(key) {return localStorage.getItem(key);},
	remove: function(key) {localStorage.removeItem(key);},
	setSession: function(key, value) {sessionStorage.setItem(key, value);},
	getSession: function(key) {return sessionStorage.getItem(key);},
	removeSession: function(key) {sessionStorage.removeItem(key);},
	saveObject: function(key, obj) {localStorage.setObject(key,obj);},
	restoreObject: function(key) {return localStorage.getObject(key);}
};
// Helper for storage of objects, using JSON stringing (works for both local and session)
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};
