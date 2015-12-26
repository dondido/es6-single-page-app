exports = module.exports = function (name) {
  	try { 
  		return require(name);
  	}
  	catch(e) { 
  		return false;
  	}
}