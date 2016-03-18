/*
* Handles medication function, so far just hasActiveStatin
* - Uses the definition of a statin provided in isStatin().
* - Uses the definition of a an active medication defined in isActiveMed
*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active statin medication
*               false otherwise.
*/

var medications = medications ||{};

medications.isActiveMed = function( med, referenceTime ){
  //check for valid input, if invalid then we can't operate on the medication, return false.
  if (med === undefined || med === null || med.json === undefined || med.json === null) {
    return false;
  }

  //set up time stamps to use as a reference for the medication.
  var now = null;

  if (referenceTime !== undefined && referenceTime !== null && !isNaN(referenceTime)) {
    now = new Date(referenceTime * 1000);
  }
  else {
    now = new Date();
  }

  now = Math.floor(now.getTime() / 1000);  //need to make this an absolute time in seconds.

  //check the status of the medication for integral values.
  if (
    med.json.statusOfMedication !== undefined &&
    med.json.statusOfMedication !== null &&
    med.json.statusOfMedication.value !== undefined &&
    med.json.statusOfMedication.value !== null
  ) {
    if (med.json.statusOfMedication.value === 'active') {
      //if the medication is marked as active, we just return true.
      return true;
    }
    else if (med.json.statusOfMedication.value === 'completed') {
      var start = med.json.start_time;
      var stop = med.json.end_time;
      var extend = (stop - start) * 1.2; //get the amount of padding required
      if (
        ( start !== undefined && start !== null ) &&
        ( stop === undefined || stop === null ) &&
        start < now
      ) {
        return true;
      }
      else if (
        ( start === null || start === undefined ) &&
        ( stop !== undefined && stop !== null ) &&
        ( stop > now )
      ) {
        return true;
      }
      else if (
        ( start !== undefined && start !== null ) &&
        ( stop !== undefined || stop !== null ) &&
        ( start < now && stop < now ) &&
        ( !isNaN(extend) && (start + extend) > now )
      ) {
        return true;
      }
      else {
        return false;
      }
    }
    else {

      //default case, if neither of these is true return false.
      return false;
    }
  }
  else {
    return false;
  }
}

medications.hasActiveMed = function( patient, med, doseLim, doseMin, doseMax ){
  // Check input
  if(
    patient === undefined || patient === null ||
    med     === undefined || med     === null ||
    doseLim === undefined || doseLim === null ||
    doseMin === undefined || doseMin === null ||
    doseMax === undefined || doseMax === null
  ){
    return error( "hasActiveMed input" );
  }

  // Get patient medication list
  var meds = patient.medications();

  if(
    meds === undefined || meds === null ||
    meds.length === 0
  ){
    return false;
  }

  meds = meds.filter(
    function (m) {
      atcCoded = m.json.codes !== null &&
      m.json.codes !== undefined &&
      m.json.codes.whoATC !== null &&
      m.json.codes.whoATC !== undefined &&
      m.json.codes.whoATC.length > 0;

      return medications.isActiveMed(m) && atcCoded;
    }
  );

  for (var i = 0; i < meds.length; i++) {

    var m = meds[i];
    for (var j = 0; j < m.json.codes.whoATC.length; j++) {
      var c = m.json.codes.whoATC[j];

      if (c.match(med)) {
        if (!doseLim) {
          return true;
        }

        if (m.json.values && m.json.values[0].scalar) {
          var v = parseFloat(m.json.values[0].scalar);
          if (v >= doseMin) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

medications.hasActiveStatin = function( patient ){
  /*
  var code1 = "^C10BAA";
  var code2 = "^C10BX";
  var codes3 = "^C10BA";
  */
  var code = "^C10(AA|BX|BA).*";
  var doseMin = doseMin || 0;
  var doseMax = doseMax || Number.POSITIVE_INFINITY;

  return this.hasActiveMed( patient, code, false, doseMin, doseMax );
}
