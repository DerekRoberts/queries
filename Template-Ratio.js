/**
 * Query Title: HDC-...
 * Query Type:  Ratio
 * Initiative:  ...
 * Description: ...
 *              ...
 *              ...
 */
function map( patient ){

  // Emit variables
  var pid       = patient.json.primary_care_provider_id,
    title       = 'HDC-...',
    category    = 'ReportingCategories'
    date        = 'Value not provided',
    denominator = 'Value not provided',
    numerator   = 'Value not provided';

  // Start, end (now) and counter dates for monthly results
  var i = defaults.dates.start();
    end = defaults.dates.end();
  for( ; i < end; i.setMonth( i.getMonth() + 1 ))
  {
    // Active patient? Age 65+?  Active statin?
    denominator = activePatient( patient, i ) && ...;
    numerator   = denominator && ...;

    // Emits
    date = i.getTime();
    emit(
      '{ ' +
        '"doctor" : "'   + pid       + '", ' +
        '"title" : "'    + title     + '", ' +
        '"date" : "'     + date      + '", ' +
        '"category" : "' + category  + '", ' +
        '"result" : "denominator" '  +
      '}',
      denominator
    );
    emit(
      '{ '+
        '"doctor" : "'   + pid       + '", ' +
        '"title" : "'    + title     + '", ' +
        '"date" : "'     + date      + '", ' +
        '"category" : "' + category  + '", ' +
        '"result" : "numerator" '    +
      '}',
      numerator
    );
  }
}
