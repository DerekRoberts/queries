/*
 * A collection of utility functions that are used throughout the queries and library functions
 */
var utils = utils || {};

// Returns true if any arguments passed are undefined
// Defined with no names arguments, it is expectany any number of arguments can
// be passed
utils.isUndefined = function() {
	for(var i = 0; i < arguments.length; i++) {
		if(arguments[i] == undefined){
			// at least one of the arguments is undefined
			return true;
		} 
	}
	
	// No argument were undefined
	return false;
}

// Returns true if any arguments passed are undefined or null
// Defined with no names arguments, it is expecting any any number of arguments can
// be passed
utils.isUndefinedOrNull = function() {
	for(var i = 0; i < arguments.length; i++) {
		if((arguments[i] == undefined) || (arguments[i] == null)) {
			// at least one of the arguments is undefined or null
			return true;
		} 
	}
	
	// No argument were undefined or null
	return false;
}

// Returns whether the code passed matches any of the values in the codeset
// passed
utils.matchCodeSet = function(code, codeSet) {
    if(utils.isUndefinedOrNull(code, codeSet) || (codeSet.length == 0)) {
	// Code or codeset is undefined or empty, no match possible
	return false;
    }
    for(var codeSetIndex = 0; codeSetIndex < codeSet.length; codeSetIndex++ ) {
	if(!utils.isUndefinedOrNull(codeSet[codeSetIndex].codeEquals) 
		&& (utils.isUndefinedOrNull(codeSet[codeSetIndex].codeEquals.length > 0))) {
	    // CodeSet entry has a equality definition
	    if(code === codeSet[codeSetIndex].codeEquals) {
		// we have a match
		return true;
	    }
	}

	if(!utils.isUndefinedOrNull(codeSet[codeSetIndex].codeBeginsWith) 
		&& (utils.isUndefinedOrNull(codeSet[codeSetIndex].codeBeginsWith.length > 0))) {
	    // CodeSet entry has a begins with definition
	    if(code.startsWith(codeSet[codeSetIndex].codeBeginsWith)) {
		// we have a match
		return true;
	    }
	}
    }
    
    // No match was found
    return false;
    
}

/**
 * Mark current patient as being excluded from the query due to invalid data.
 * This is also recorded as an Error-level problem
 * 
 * @param message -
 *                message to store with query results
 * @param errorContainer -
 *                ErrorContainer object to store error in
 * 
 * @return false - function intended to be called as a return
 */
utils.invalid = function(message, errorContainer) {
    if (utils.isUndefinedOrNull(errorContainer)) {
	// We do not have a proper error container in which to store the error
	// Emit string and conspicuous number
	emit("Invalid: " + message, -1);
	return false;
    } else {
	// Ensure invalid and error flags are set
	errorContainer.invalid = true;
	errorContainer.error = true;
	errorContainer.errorMessages.push(message);
    }
};

/**
 * Record an Error-level problem
 * 
 * @param message -
 *                message to store with query results
 * @param errorContainer -
 *                ErrorContainer object to store error in
 * 
 * @return false - function intended to be called as a return
 */
utils.error = function(message, errorContainer) {
    if (utils.isUndefinedOrNull(errorContainer)) {
	// We do not have a proper error container in which to store the error
	// Emit string and conspicuous number
	emit("Error: " + message, -1);
	return false;
    } else {
	// Ensure error flag is set
	errorContainer.error = true;
	errorContainer.errorMessages.push(message);
    }
};

/**
 * Record an Warning-level problem
 * 
 * @param message -
 *                message to store with query results
 * @param errorContainer -
 *                ErrorContainer object to store warning in
 * 
 * @return false - function intended to be called as a return
 */
utils.warning = function(message, errorContainer) {
    if (utils.isUndefinedOrNull(errorContainer)) {
	// We do not have a proper error container in which to store the error
	// Emit string and conspicuous number
	emit("Warning: " + message, -1);
	return false;
    } else {
	// Ensure warning flag is set
	errorContainer.warning = true;
	errorContainer.warningMessages.push(message);
    }
};

/**
 * Record an Information-level event
 * 
 * @param message -
 *                message to store with query results
 * @param errorContainer -
 *                ErrorContainer object to store information message in
 * 
 * @return false - function intended to be called as a return
 */
utils.error = function(message, errorContainer) {
    if (utils.isUndefinedOrNull(errorContainer)) {
	// We do not have a proper error container in which to store the error
	// Emit string and conspicuous number
	emit("Info: " + message, -1);
	return false;
    } else {
	// Ensure info flag is set
	errorContainer.info = true;
	errorContainer.infoMessages.push(message);
    }
};


