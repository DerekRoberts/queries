/**
 * Manual error call
 *
 * @param message - message to emit with query results
 */
function error( message ) {

	// Emit string and conspicuous number
	emit(
		"Error: "+
		message,
		-1000000000
	);
}
