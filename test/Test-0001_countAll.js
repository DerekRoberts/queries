/**
 * Query Title: TEST-0001
 * Query Type:  Count
 * Description: Count all patients, very basic testing only
 */
function map(patient) {
  emit( "records", 1 );
}
