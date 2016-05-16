/**
* Query Title: Test-0100
* Query Type:  Count
* Description: Active, inactive and total
*/
function map( pt ){

  var date     = new Date();
  var active   = profile.active( pt, date );
  var inactive = !active;
  var total    = true;

  emit( "active",   active );
  emit( "inactive", inactive );
  emit( "total",    total );
}
