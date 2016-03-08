/**
 * Query Title: HDC-1921_HMG-CoA65+
 */
function map( patient ){

  // Physician ID, value type and time interval
  var pid   = patient.json.primary_care_provider_id;
  var title = 'HDC-1921';
  var type  = 'ratio';
  var now   = new Date();
  var date  = new Date( now.getFullYear(), now.getMonth(), 1).getTime();

  // Active patient? Age 65+?  Active statin?
  var ap = activePatient( patient );
  var ia = isAge( patient, 65 );
  var hm = hasActiveStatin( patient );

  // Assemble query
  var denominator = ap && ia;
  var numerator   = denominator && hm;

  // Emits
  emit(
    '{ '+
      '"doctor" : "' + pid  + '", ' +
      '"date" : "'   + date + '", ' +
      '"type" : "'   + type + '", ' +
      '"result" : "denominator", ' +
      '"amcare_xml_path" :[ ScoreCard, ReportingCategories, ' + title + ' ]' +
    '}',
    denominator
  );
  emit(
    '{ '+
    '"doctor" : "' + pid  + '", ' +
    '"date" : "'   + date + '", ' +
    '"type" : "'   + type + '", ' +
    '"result" : "numerator", ' +
      '"amcare_xml_path" : [ScoreCard, ReportingCategories, ' + title +' ] ' +
    '}',
    numerator
  );
}
