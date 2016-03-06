/**
 * Query Title: TEST-001
 * Query Type:  Count
 * Description: Count all patients, very basic testing only
 */
function map(patient) {
  // Physician ID, value type and time interval
  var pid  = patient.json.primary_care_provider_id;
  var type = 'count';
  var now  = new Date();
  var date = new Date( now.getFullYear(), now.getMonth(), 1).getTime();
 
  emit(
    '{ '+
      '"doctor" : "' + pid           + '", ' +
      '"date" : "'   + date        + '", ' +
      '"type" : "'   + type          + '" ' +
    '}',
    1
  );
}

