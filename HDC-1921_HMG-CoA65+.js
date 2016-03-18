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
  var pid      = patient.json.primary_care_provider_id;
  var title    = 'HDC-1921';
  var category = 'ReportingCategories';
  var type     = 'ratio';

  // Denominator, numerator and other for loop variables
  var i_age       = "Value not provided";
  var i_date      = "Value not provided";
  var denominator = "Value not provided";
  var numerator   = "Value not provided";

  // Start, end (now) and counter dates for monthly results
  var start = new Date( 2016, 2, 1 );//Remember months are zero indexed
  var end   = new Date().getTime();
  var i     = new Date( start.getTime() );
  for( ; i.getTime() < end; i.setMonth( i.getMonth() + 1 ))
  {
    // Store age and date at time i
    i_age  = patient.age( i );
    i_date = i.getTime();

    // Active patient? Age 65+?  Active statin?
    denominator = activePatient( patient, i ) && ages.isMin( patient, i, 65 );
    numerator   = denominator && medications.hasActiveStatin( patient, i );

    // Emits
    emit(
      '{ ' +
        '"doctor" : "'   + pid       + '", ' +
        '"title" : "'    + title     + '", ' +
        '"date" : "'     + i_date    + '", ' +
        '"category" : "' + category  + '", ' +
        '"result" : "denominator" ' +
      '}',
      denominator
    );
    emit(
      '{ '+
        '"doctor" : "'   + pid      + '", ' +
        '"title" : "'    + title    + '", ' +
        '"date" : "'     + i_date   + '", ' +
        '"category" : "' + category + '", ' +
        '"result" : "numerator" '  +
      '}',
      numerator
    );
  }
}
