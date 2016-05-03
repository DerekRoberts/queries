/*
 * A collection of utility functions that are used throughout the queries and library functions
 */
var utils = utils || {};

/**
 * Returns true if any arguments passed are undefined Defined with no named
 * arguments, it is expect any any number of arguments can be passed
 * 
 * @return true if any arguments passed are undefined Defined with no named
 *         arguments, it is expect any any number of arguments can be passed
 */
utils.isUndefined = function() {
    for (var i = 0; i < arguments.length; i++) {
	if (arguments[i] == undefined) {
	    // at least one of the arguments is undefined
	    return true;
	}
    }

    // No argument were undefined
    return false;
};

/**
 * Returns true if any arguments passed are undefined or null Defined with no
 * names arguments, it is expecting any any number of arguments can be passed
 * 
 * @return true if any arguments passed are undefined or null Defined with no
 *         names arguments, it is expecting any any number of arguments can be
 *         passed
 */
utils.isUndefinedOrNull = function() {
    for (var i = 0; i < arguments.length; i++) {
	if ((typeof arguments[i] === "undefined") || (arguments[i] === undefined) || (arguments[i] == null)) {
	    // at least one of the arguments is undefined or null
	    return true;
	}
    }

    // No argument were undefined or null
    return false;
};

/**
 * Returns whether the code passed matches any of the values in the codeset
 * passed.
 * 
 * @param codes
 *                array of Codes to be examined
 * @param codeSet
 *                CodeSet to compare codes to
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 * @return whether the code passed matches any of the values in the codeset
 *         passed.
 */
utils.matchCodeSet = function(codes, codeSet, errorContainer) {
    if (utils.isUndefinedOrNull(codes, codeSet) || (codes.length == 0)
	    || (codeSet.length == 0)) {
	// codes or codeset is undefined or empty, no match possible
	return utils.error(
		"Undefined or empty codeset passed into utils.matchCodeSet",
		errorContainer);
    }

    // Check each code against all entries in codeset
    var code;
    for (var codeIndex = 0; codeIndex < codes.length; codeIndex++) {
	code = codes[codeIndex];

	for (var codeSetIndex = 0; codeSetIndex < codeSet.length; codeSetIndex++) {
	    if (!utils.isUndefinedOrNull(codeSet[codeSetIndex].codeEquals)
		    && (codeSet[codeSetIndex].codeEquals.length > 0)) {
		// CodeSet entry has a equality definition
		if (code === codeSet[codeSetIndex].codeEquals) {
		    // we have a match
		    return true;
		}
	    }

	    if (!utils.isUndefinedOrNull(codeSet[codeSetIndex].codeBeginsWith)
		    && (codeSet[codeSetIndex].codeBeginsWith.length > 0)) {
		// CodeSet entry has a begins with definition
		if (code.startsWith(codeSet[codeSetIndex].codeBeginsWith)) {
		    // we have a match
		    return true;
		}
	    }
	}
    }

    // No match was found
    return false;

};

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
utils.info = function(message, errorContainer) {
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

/**
 * Emit the contents of the error container passed based on the other parameters
 * 
 * @param errorContainer
 *                ErrorContainer to emit
 * @param doctorKey
 *                Unique key for doctor so that output from multiple doctors
 *                will not be combined via reduction. Defaults to null which
 *                allows results to be combined via reduction.
 * @param level
 *                The level of output to emit. "info", "warning", or "error".
 *                Higher levels will result in more output. Defaults to "info"
 *                if not specified which will emit all information available
 * @param combineMultiples
 *                If true, multiple instances of the same message will be
 *                combined and only displayed once
 */
utils.emitErrorContainer = function(errorContainer, doctorKey, level,
	combineMultiples) {
    if (utils.isUndefinedOrNull(doctorKey)) {
	// default to null which allows results to be combined via reduction.
	doctorKey = null;
    }

    // Determine effective error level
    var levelNumber;
    if (utils.isUndefinedOrNull(level)) {
	// Default to all
	levelNumber = 3;
    } else if (typeof level == "number") {
	// Use level number passed within range of [0, 3]
	levelNumber = Math.max(0, Math.min(3, level));
    } else if (level.toLowerCase().trim() == "error") {
	levelNumber = 1;
    } else if (level.toLowerCase().trim() == "warning") {
	levelNumber = 2;
    } else if (level.toLowerCase().trim() == "info") {
	levelNumber = 3;
    }

    if (utils.isUndefinedOrNull(combineMultiples)) {
	// default to true
	combineMultiples = true;
    }

    var errorEmit = {};

    if (doctorKey != null) {
	// Add doctor value to prevent combining of multiple doctors via
	// reduction
	errorEmit.doctor = doctorKey;
    }

    var doEmit = false;
    // Add any Error messages
    if (errorContainer.error && (levelNumber >= 1)) {
	doEmit = true;
	if (!combineMultiples) {
	    // Output count for clarity as different counts will not reduce
	    // anyways
	    errorEmit.errorMessagesCount = errorContainer.errorMessages.length;
	}
	errorEmit.errorMessages = utils.buildMessagesOutput(
		errorContainer.errorMessages, combineMultiples)
    }

    // Add any Warning messages
    if (errorContainer.warning && (levelNumber >= 2)) {
	doEmit = true;
	if (!combineMultiples) {
	    // Output count for clarity as different counts will not reduce
	    // anyways
	    errorEmit.warningMessagesCount = errorContainer.warningMessages.length;
	}
	errorEmit.warningMessages = utils.buildMessagesOutput(
		errorContainer.warningMessages, combineMultiples);
    }
    // Add any Informational messages
    if (errorContainer.info && (levelNumber >= 3)) {
	doEmit = true;
	if (!combineMultiples) {
	    // Output count for clarity as different counts will not reduce
	    // anyways
	    errorEmit.infoMessagesCount = errorContainer.infoMessages.length;
	}
	errorEmit.infoMessages = utils.buildMessagesOutput(
		errorContainer.infoMessages, combineMultiples);
    }

    if (doEmit) {
	emit(JSON.stringify(errorEmit), 1);
    }

};

/**
 * Build and return array to output for the messages passed
 * 
 * @param messages
 *                Messages to be output
 * @param combineMultiples
 *                if true, combine multiple instances of the same message
 * 
 * @return Array of messages prepared for output via emit inside hQuery
 */
utils.buildMessagesOutput = function(messages, combineMultiples) {
    var output = [];
    var items;
    if (combineMultiples) {
	// Create items as a Set so that multiples are combined
	items = new Set(messages);
    } else {
	items = messages;
    }

    // Replace any characters that are not letters with underscores to ensure we
    // don't break hQuery
    // and push to output array so it displays nicely
    items.forEach(function(value) {
	output.push(value.replace(/[^a-zA-Z\s0-9]/g, "_"));
    });

    return output;
};

/**
 * Returns a string conversation of the object passed and recursively prints any subobjects in a manner that will not break emits.
 * Currently works with objects and arrays.
 * 
 * Lexicon
 * _A_ - Start of array
 * _a_ - End of array
 * _S_ - Array item separator
 * _O_ - Start of object
 * _o_ - End of object
 * 
 * @param item Item to be converted to string
 * @param maxLevel how many levels to traverse into objects and arrays
 */
utils.deepPrint = function(item, maxLevel) {
    if(utils.isUndefinedOrNull(maxLevel)) {
	maxLevel = 5;
    }
    
    if(maxLevel == 0) {
	return "Level Limit";
    }
    
    if (utils.isUndefinedOrNull(item)) {
	return "" + item;
    } else if (Array.isArray(item)) {
	var output = " _A_ ";
	item.forEach(function(arrayItem, index) {
	    if (index > 0) {
		output = output + " _S_ ";
	    }
	    output = output + utils.deepPrint(arrayItem, maxLevel - 1);

	});
	return output + " _a_ ";
    } else if (typeof item === 'object') {
	
	var keys = Object.keys(item);
	var output = "";
	// we have an object
	keys.forEach(function(key, index) {
	    output = output + key + " _O_ " + utils.deepPrint(item[key], maxLevel - 1) + " _o_ ";
	});
	return output;
    } else {
	return "" + item;
    }
}
