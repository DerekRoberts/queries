/**
 * Query Title: HDC-1921_HMG-CoA65+
 */
function map( patient ){

  // Physician ID, value type and time interval
  var pid      = patient.json.primary_care_provider_id;
  var title    = 'HDC-1921';
  var category = 'ReportingCategories';
  var type     = 'ratio';
  var now      = new Date();
  var date     = new Date( now.getFullYear(), now.getMonth(), 1).getTime();

  // Active patient? Age 65+?  Active statin?
  var active   = activePatient( patient );
  var is_age   = isAge( patient, 65 );
  var statin   = hasActiveStatin( patient );

  // Assemble query
  var denominator = active && is_age;
  var numerator   = denominator && statin;

  // Emits
  emit(
    '{ '+
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
