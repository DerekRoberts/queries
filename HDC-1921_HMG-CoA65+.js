/**
 * Query Title: HDC-1921_HMG-CoA65+
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: This metric shows the percentage of active patients, 65 and
 *              over, on an active medication for an HMG-CoA reductase
 *              inhibitors (statins)
 */
function map( patient ){

  // Physician ID, value type and time interval
  var pid    = patient.json.primary_care_provider_id,
    title    = 'HDC-1921',
    category = 'ReportingCategories';

  // Denominator, numerator and any other for loop variables
  var i_date    = "Value not provided",
    denominator = "Value not provided",
    numerator   = "Value not provided";

  // Start, end (now) and counter dates for monthly results
  var i = defaults.dates.start();
    end = defaults.dates.end();
  for( ; i < end; i.setMonth( i.getMonth() + 1 ))
  {
    // Active patient? Age 65+?  Active statin?
    denominator = activePatient( patient, i ) && ages.isMin( patient, i, 65 );
    numerator   = denominator && medications.hasActiveStatin( patient, i );

    // Emits
    date = i.getTime();
    emit(
      '{ ' +
        '"doctor" : "'   + pid       + '", ' +
        '"title" : "'    + title     + '", ' +
        '"date" : "'     + date      + '", ' +
        '"category" : "' + category  + '", ' +
        '"result" : "denominator" ' +
      '}',
      denominator
    );
    emit(
      '{ '+
        '"doctor" : "'   + pid      + '", ' +
        '"title" : "'    + title    + '", ' +
        '"date" : "'     + date     + '", ' +
        '"category" : "' + category + '", ' +
        '"result" : "numerator" '  +
      '}',
      numerator
    );
  }
}
