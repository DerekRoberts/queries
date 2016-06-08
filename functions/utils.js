/*
 * A collection of utility functions that are used throughout the queries and
 * library functions
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
	if ((arguments[i] == undefined)
		|| (typeof arguments[i] === "undefined")) {
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
 * Returns true if any of the checks passed fail an isUndefinedOrNull check.
 * Arguments must be arrays. If an array contains 2 elements and the second is a
 * non-empty string a path check will be performed. If an array contains only a
 * single element a simple check will be performed.
 *
 * @return true if any of the checks passed fail an isUndefinedOrNull check.
 */
utils.isUndefinedOrNullPath = function() {
    for (var i = 0; i < arguments.length; i++) {
	if ((arguments[i].length > 1)
		&& (!utils.isUndefinedOrNull(arguments[i][1]))
		&& (arguments[i][1].length > 0)) {
	    // do a path check
	    if (utils.isUndefinedOrNullPathSingle(arguments[i][0],
		    arguments[i][1])) {
		// failed check
		return true;
	    }
	} else {
	    // do a simple check
	    if (utils.isUndefinedOrNull(arguments[i][0])) {
		// failed check
		return true;
	    }
	}
    }

    // No check failed
    return false;
}

/**
 * Returns true if the base object passed or any of the objects in the path from
 * the base object passed are undefined or null.
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
 *         the base object passed are undefined or null.
 */
utils.isUndefinedOrNullPathSingle = function(base, path) {
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
	current = current[pathElements[ctr]];
	if (utils.isUndefinedOrNull(current)) {
	    // An element along the path is undefined or null
	    return true;
	}
    }

    // No undefined or null value found
    return false;
};

/**
 * Returns a string indicating which of the checks passed fails a
 * isUndefinedOrNull check. Each check consists of an array in one of the
 * following 2 formats:
 *
 * [value, label] Perform a simple check where value is the value to check and
 * label is the label to use in any failure message
 *
 * OR
 *
 * [base, label, path] Perform a path check where base is the base object of the
 * path to check, label is the label to use in any failure message, and path is
 * the path to check under the base object.
 *
 * @return a string indicating which of the checks passed fails a
 *         isUndefinedOrNull check.
 */
utils.getUndefinedOrNullInfo = function() {
    var check;
    var checkValue;
    var checkLabel;
    var checkPath;
    var message = "";
    for (var argIndex = 0; argIndex < arguments.length; argIndex++) {
	check = arguments[argIndex];

	// the first element of the array is the value to examine
	checkValue = check[0];
	// the second element of the array is the label to use in any messages
	checkLabel = check[1];
	if (check.length > 2) {
	    // We have a third element in the array.
	    // Use it as a path and do a path check instead of a simple check
	    checkPath = check[2];

	    if (utils.isUndefinedOrNull(checkValue)) {
		// base is undefined or null
		message = utils.getUndefinedOrNullInfo_AddMessageHelper(
			message, checkValue, checkLabel);
	    } else {
		// Split path into elements
		var pathElements = checkPath.split(".");
		// remove any empty elements (i.e. if path contained a leading
		// '.')
		pathElements = pathElements.filter(function(element) {
		    return (element.length > 0);
		})

		// Prepare reference and path label
		var current = checkValue;
		var pathLabel = checkLabel;
		// navigate down object tree along path
		for (var ctr = 0; ctr < pathElements.length; ctr++) {
		    current = current[pathElements[ctr]];
		    pathLabel = pathLabel + "." + pathElements[ctr];
		    if (utils.isUndefinedOrNull(current)) {
			// this element along the path is undefined or null
			message = utils
				.getUndefinedOrNullInfo_AddMessageHelper(
					message, current, pathLabel);

			// Do not navigate further down path as it does not
			// exist
			break;
		    }
		}
	    }
	} else {
	    // Array only has 2 elements.
	    // Do a simple check

	    if (utils.isUndefinedOrNull(checkValue)) {

		message = utils.getUndefinedOrNullInfo_AddMessageHelper(
			message, checkValue, checkLabel);
	    }
	}

    }

    return message;
};

/**
 * Helper function to utils.getUndefinedOrNullInfo. Adds a message to the
 * messages string passed
 *
 * @param value
 *                Value that failed a check
 * @param label
 *                Label to use in message
 * @returns The messages string passed with a message added to it
 */
utils.getUndefinedOrNullInfo_AddMessageHelper = function(messages, value, label) {
    var messageForCheck = label;
    // add value
    if (value === null) {
	messageForCheck = messageForCheck + " = " + value;
    } else {
	messageForCheck = messageForCheck + " is undefined";
    }

    if (messages.length > 0) {
	// prepend comma
	messages = messages + ", ";
    }

    // Add to message string
    messages = messages + messageForCheck;

    return messages;
}

/**
 * Returns a whether all of the checks passed meet a isUndefinedOrNull check and
 * logs any failures. Each check consists of an array in one of the following 2
 * formats:
 *
 * [value, label] Perform a simple check where value is the value to check and
 * label is the label to use in any failure message
 *
 * OR
 *
 * [base, label, path] Perform a path check where base is hte base object of hte
 * path to check, label is the label to use in any failure message, and path is
 * the path to check under the base object.
 *
 * @param baseMessage
 *                Message to prepend to any resulting log
 * @param logFunction
 *                function to call to perform any required logging
 * @param errorContainer
 *                Error Container to pass to logging function
 * @return whether all of the checks passed meet a isUndefinedOrNull check.
 */
utils.isUndefinedOrNullAndLog = function(baseMessage, logFunction,
	errorContainer) {
    // Cycle through additional arguments which should be arrays of length 2 or
    // 3 which are each a check to be performed
    var check;
    var checkValue;
    var checkLabel;
    var checkPath;
    var problem = false;
    var message = "";
    for (var argIndex = 3; argIndex < arguments.length; argIndex++) {
	check = arguments[argIndex];

	// the first element of the array is the value to examine
	checkValue = check[0];
	// the second element of the array is the label to use in any messages
	checkLabel = check[1];
	if (check.length > 2) {
	    // We have a third element in the array.
	    // Use it as a path and do a path check instead of a simple check
	    checkPath = check[2];

	    if (utils.isUndefinedOrNullPathSingle(checkValue, checkPath)) {
		// problem found
		problem = true;

		if (message.length > 0) {
		    // prepend comma
		    message = message + ", ";
		}

		message = message + utils.getUndefinedOrNullInfo(check);
	    }
	} else {
	    // Array only has 2 elements.
	    // Do a simple check

	    if (utils.isUndefinedOrNull(checkValue)) {
		// problem found
		problem = true;

		if (message.length > 0) {
		    // prepend comma
		    message = message + ", ";
		}

		message = message + utils.getUndefinedOrNullInfo(check);
	    }
	}

    }

    if (problem) {
	// Problem was found, call log function
	logFunction(baseMessage + " " + message, errorContainer);
	return true;
    } else {
	return false;
    }

}

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
 * Returns A date that is the number of years before the date passed.
 *
 * Any time component in the original date is ignored.
 */
utils.yearsBefore = function(date, years) {
    return utils.before(date, years, 0);
}

/**
 * Returns A date that is the number of months before the date passed.
 *
 * Any time component in the original date is ignored.
 */
utils.monthsBefore = function(date, months) {
    return utils.before(date, 0, months);
}

/**
 * Returns A date that is the number of years after the date passed.
 *
 * Any time component in the original date is ignored.
 */
utils.yearsAfter = function(date, years) {
    return utils.before(date, -years, 0);
}

/**
 * Returns A date that is the number of months after the date passed.
 *
 * Any time component in the original date is ignored.
 */
utils.monthsAfter = function(date, months) {
    return utils.before(date, 0, -months);
}


/**
 * Returns A date that is the number of years, and months after the date
 * passed.
 *
 * Any time component in the original date is ignored.
 */
utils.after = function(date, years, months) {
    return utils.before(date, -years, -months);
}

/**
 * Returns A date that is the number of years, and months before the date
 * passed.
 *
 * Any time component in the original date is ignored.
 */
utils.before = function(date, years, months) {
    // Default parameters to 0
    if (utils.isUndefinedOrNull(years)) {
	years = 0;
    }
    if (utils.isUndefinedOrNull(months)) {
	months = 0;
    }

    // construct the new date
    return new Date(date.getFullYear() - years, date.getMonth() - months, date.getDate());
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
 * @param code - Code value that the container contains information for, if applicable
*/
utils.emitErrorContainer = function(errorContainer, doctorKey, level,
	combineMultiples, code) {
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

    // Set Category
    errorEmit.type = "Message";

    if(!utils.isUndefinedOrNull(code)) {
	// Set code
	errorEmit.code = code;
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
 *                Message to sanitize if true, combine multiple instances of the
 *                same message
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
