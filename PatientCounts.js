/**
 * Query Title: HDC-1921
 * Query Type:  Pyramid/count
 * Description: Population Pyramid
 */
function map( patient )
{
  // Physician ID, value type and time interval
  var pid        = patient.json.primary_care_provider_id;
  var title      = 'PatientCounts';
  var category   = 'TenYearRanges';
  var open_ended = 'false';

  // Indexes
  var index_gdrs;
  var index_ages;

  // Store gender (can't change)
  var gdr = getGender( patient );
  if( gdr.toString().toUpperCase() === 'FEMALE' )
    index_gdrs = 0;
  else if( gdr.toString().toUpperCase() === 'MALE' )
    index_gdrs = 1;
  else
    index_gdrs = 2;

  // Constants
  var genders =[ 'Female', 'Male', 'Unspecified' ];
  var age_min =[ '0', '10', '20', '30', '40', '50', '60', '70', '80', '90' ];
  var age_max =[ '9', '19', '29', '39', '49', '59', '69', '79', '89', '120' ];

  // Start, end (now) and counter dates
  var start = new Date( 2016, 2, 1 );//Remember months are zero indexed
  var end   = new Date().getTime();
  var i     = new Date( start.getTime() );
  //
  // Monthly results
  for( ; i.getTime() < end; i.setMonth( i.getMonth() + 1 ))
  {
    // Array to emit from (by age range, then F/M/UN)
    var mask = [
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ]
    ];

    // Store age and date at time i
    var i_age  = patient.age( i );
    var i_date = i.getTime();

    // Add to mask if values check out
    if(
      activePatient( patient, i )&&
      typeof i_age === 'number' &&
      i_age >= 0
    ){
      // Divide age by ten and round down to get age range
      index_ages = Math.floor( i_age / 10 );

      // Cap off ranges at 90+
      if( index_ages > 9 )
        index_ages = 9;

      // Store in mask
      mask[ index_ages ][ index_gdrs ] = 1;
    }

    // Output mask, arranged by g=gender and a=age
    for( var a = 0; a < age_min.length; a++ )
    {
      for( var g = 0; g < genders.length; g++ )
      {
        emit(
          '{ '+
            '"doctor" : "'     + pid          + '", ' +
            '"title" : "'      + title        + '", ' +
            '"date" : "'       + i_date       + '", ' +
            '"category" : "'   + category     + '", ' +
            '"open_ended" : "' + open_ended   + '", ' +
            '"age_min" : "'    + age_min[ a ] + '", ' +
            '"age_max" : "'    + age_max[ a ] + '", ' +
            '"gender" : "'     + genders[ g ] + '"' +
          '}',
          mask[ a ][ g ]
        );
      }
    }
  }
}
