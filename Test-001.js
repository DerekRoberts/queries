/**
 * Query Title: TEST-001
 * Query Type:  Count
 * Description: Count all patients, very basic testing only
 */
function map(patient) {
  // Physician ID, value type and time interval
  var pid      = patient.json.primary_care_provider_id;
  var title    = 'Test-001';
  var category = 'ReportingCategories';
  var now      = new Date();
  var date     = new Date( now.getFullYear(), now.getMonth(), 1).getTime();

  emit(
    '{ '+
      '"doctor" : "'   + pid      + '", ' +
      '"title" : "'    + title    + '", ' +
      '"date" : "'     + date     + '", ' +
      '"category" : "' + category + '", ' +
      '"result" : "denominator" ' +
    '}',
    2
  );
  emit(
    '{ '+
      '"doctor" : "'   + pid       + '", ' +
      '"title" : "'    + title     + '", ' +
      '"date" : "'     + date      + '", ' +
      '"category" : "' + category  + '", ' +
      '"result" : "numerator" '    +
    '}',
    1
  );
}
