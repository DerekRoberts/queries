var emitter = emitter ||{};
emitter.ratio = function( patient, query ){
	// Emit variables
	var denominator = 'Value not provided',
	  numerator     = 'Value not provided',
	  jsonEmit      = {
	    doctor      : patient.json.primary_care_provider_id,
	    category    : 'ReportingCategories',
	    result      : 'Value not provided'
	  };

	// Counter (date) variables
	var i = dictionary.defaults.dates.start(),
		end = dictionary.defaults.dates.end();
	for( ; i < end; i.setMonth( i.getMonth() + 1 ))
	{
		denominator = query.denominator( patient, i );
		numerator   = query.numerator( patient, i, denominator );

		jsonEmit.date = i.getTime().toString();
		jsonEmit.result = "denominator";
		emit( JSON.stringify( jsonEmit ), denominator );

		jsonEmit.result = "numerator";
		emit( JSON.stringify( jsonEmit ), numerator );
	}
};
