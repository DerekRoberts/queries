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
	if ((arguments[i] == undefined) || (typeof arguments[i] === "undefined")) {
	    // at least one of the arguments is undefined
	    return true;
	}
    }

    // No argument were undefined
    return false;
};

/**
 * Returns true if any arguments passed are undefined or null. Defined with no
 * names arguments, it is expecting any any number of arguments can be passed
 * 
 * @return true if any arguments passed are undefined or null Defined with no
 *         names arguments, it is expecting any any number of arguments can be
 *         passed
 */
utils.isUndefinedOrNull = function() {
    for (var i = 0; i < arguments.length; i++) {
	if ((arguments[i] === undefined)
		|| (typeof arguments[i] === "undefined")
		|| (arguments[i] == null)) {
	    // at least one of the arguments is undefined or null
	    return true;
	}
    }

    // No argument were undefined or null
    return false;
};

/**
 * Returns a string indicating which of the arguments to a call to
 * utils.getUndefinedOrNull were undefined or null.
 * 
 * @param argumentNames
 *                array of argument names to use in returned message
 * 
 * @return A string indicating which of the arguments to a call to
 *         utils.getUndefinedOrNull were undefined or null.
 */
utils.getUndefinedOrNullInfo = function(argumentNames) {
    var message = "";

    // Start with second argument to ignore argumentNames
    for (var i = 1; i < arguments.length; i++) {
	if (utils.isUndefinedOrNull(arguments[i])) {
	    if (message.length > 0) {
		// prepend comma
		message = message + ", ";
	    }

	    // add argument name
	    if (!utils.isUndefinedOrNull(argumentNames)
		    && (argumentNames.length >= i)) {
		// we have a supplied argument name.
		message = message + argumentNames[i - 1];
	    } else {
		// no argument name supplied
		message = message + "Argument " + i;
	    }

	    // add value
	    if (arguments[i] === null) {
		message = message + " = " + arguments[i];
	    } else {
		message = message + " is undefined";
	    }
	    
	}
    }

    return message;
};

/**
 * Returns true if the base object passed or any of the objects in the path from
 * the base object passed are undefined or null. Will also return true if any
 * additional arguments passed are undefined or null.
 * 
 * For instance if measurement was passed as the base object and
 * "json.codes.LOINC" was passed as the path, the function would return true if
 * any of measurement, measurement.json, measurement.json.codes, or
 * measurement.json.codes.LOINC are undefined or null.
 * 
 * @param base
 *                The base object to examine.
 * @param path
 *                the object path under the base object to examine.
 * @return true if the base object passed or any of the objects in the path from
 *         the base object passed are undefined or null. Will also return true
 *         if any additional arguments passed are undefined or null.
 */
utils.isUndefinedOrNullPath = function(base, path) {
    if (utils.isUndefinedOrNull(base)) {
	// base is undefined or null
	return true;
    }
    // Split path into elements
    var pathElements = path.split(".");
    // remove any empty elements (i.e. if path contained a leading '.')
    pathElements = pathElements.filter(function(element) {
	return (element.length > 0);
    })

    // navigate down object tree along path
    var current = base;
    for (var ctr = 0; ctr < pathElements.length; ctr++) {
	// current = Reflect.get(current, pathElements[ctr]);
	current = current[pathElements[ctr]];
	if (utils.isUndefinedOrNull(current)) {
	    // An element along the path is undefined or null
	    return true;
	}
    }

    // Check any additional arguments
    if (arguments.length > 2) {
	for (var i = 2; i < arguments.length; i++) {
	    if (utils.isUndefinedOrNull(arguments[i])) {
		// at least one of the additional arguments is undefined or null
		return true;
	    }
	}
    }

    // No undefined or null value found
    return false;
};

/**
 * Return a string indicating which of the arguments to a call to
 * utils.getUndefinedOrNullPath were undefined or null.
 * 
 * @param argumentNames
 *                array of argument names to use in returned message
 * @param base
 *                The base object to examine.
 * @param path
 *                the object path under the base object to examine.
 * @return A string indicating which of the arguments to a call to
 *         utils.getUndefinedOrNullPath were undefined or null
 */
utils.getUndefinedOrNullInfoPath = function(argumentNames, base, path) {
    var message = "";

    if (utils.isUndefinedOrNull(base)) {
	// base is undefined or null
	message = message + utils.getUndefinedOrNullInfo(argumentNames, base);
    }

    if (message.length > 0) {
	// prepend comma
	message = message + ", ";
    }

    // Split path into elements
    var pathElements = path.split(".");
    // remove any empty elements (i.e. if path contained a leading '.')
    pathElements = pathElements.filter(function(element) {
	return (element.length > 0);
    })

    // Prepare reference and path label
    var current = base;
    var pathLabel;
    if (!utils.isUndefinedOrNull(argumentNames) && (argumentNames.length > 0)) {
	// a name was supplied for base
	pathLabel = argumentNames[0];
    } else {
	// no name was supplied for base
	pathLabel = "base";
    }

    // navigate down object tree along path
    for (var ctr = 0; ctr < pathElements.length; ctr++) {
	// current = Reflect.get(current, pathElements[ctr]);
	current = current[pathElements[ctr]];
	pathLabel = pathLabel + "." + pathElements[ctr];
	if (utils.isUndefinedOrNull(current)) {
	    // An element along the path is undefined or null
	    if (message.length > 0) {
		// prepend comma
		message = message + ", ";
	    }

	    message = message
		    + utils.getUndefinedOrNullInfo([ pathLabel ], current);
	    
	    // Do not navigate further down path as it does not exist
	    break;
	}
    }

    // Check any additional arguments
    if (arguments.length > 3) {
	var additionalInfo;
	for (var i = 3; i < arguments.length; i++) {
	    // Get any info message for argument
	    additionalInfo = utils.getUndefinedOrNullInfo(
		    ((argumentNames.length >= i-1) ? [ argumentNames[i - 2] ]
			    : null), arguments[i]);
	    if (additionalInfo.length > 0) {
		// there is info to add to message

		if (message.length > 0) {
		    // prepend comma
		    message = message + ", ";
		}

		message = message + additionalInfo;

	    }
	}
    }

    return message;
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
	emit(utils.sanitizeForEmit("Invalid: " + message), -1);
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
	emit(utils.sanitizeForEmit("Error: " + message), -1);
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
	emit(utils.sanitizeForEmit("Warning: " + message), -1);
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
	emit(utils.sanitizeForEmit("Info: " + message), -1);
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
	output.push(utils.sanitizeForEmit(value));
    });

    return output;
};

/**
 * Returns a version of the message passed sanitized for inclusion in an emit
 * 
 * @param message
 *                Message to sanitize
 *                if true, combine multiple instances of the same message
 * 
 * @return A version of the message passed sanitized for inclusion in an emit
 */
utils.sanitizeForEmit = function(message) {
  return message.replace(/[^a-zA-Z\s0-9]/g, "_");
};

/**
 * Returns a string conversation of the object passed and recursively prints any
 * subobjects in a manner that will not break emits. Currently works with
 * objects and arrays.
 * 
 * Lexicon _A_ - Start of array _a_ - End of array _S_ - Array item separator
 * _O_ - Start of object _o_ - End of object
 * 
 * @param item
 *                Item to be converted to string
 * @param maxLevel
 *                how many levels to traverse into objects and arrays
 */
utils.deepPrint = function(item, maxLevel) {
    if (utils.isUndefinedOrNull(maxLevel)) {
	maxLevel = 5;
    }

    if (maxLevel == 0) {
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
	    output = output + key + " _O_ "
		    + utils.deepPrint(item[key], maxLevel - 1) + " _o_ ";
	});
	return output;
    } else {
	return "" + item;
    }
}
