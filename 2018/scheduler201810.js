$(document).ready(function() {
  var Lang;
  var sep = false;
  var ksa;
  var kpsw;
  var moe = false;
  var opnEnr = false;
  var appt2019 = false;

  function dateCheckOE() {

    var fDateOE = new Date(2018, 9, 15);
    var lDateOE = new Date(2018, 11, 15);
    var cDateOE = $.now();
    console.log(cDateOE);

    if ((cDateOE <= lDateOE && cDateOE >= fDateOE)) {
      opnEnr = true;
    } else {
      opnEnr = false;
    }

  }
  dateCheckOE();
  console.log(`Open Enrollment = ${opnEnr}`);

  // function dateCheckMOE() {

  //   var fDate = new Date(2017, 09, 15);
  //   var lDate = new Date(2017, 11, 8);
  //   var cDate = $.now();

  //   if ((cDate <= lDate && cDate >= fDate)) {
  //     moe = true;
  //     console.log("Medicare OE: " + moe);
  //   }
  //   moe = false;
  //   console.log("Medicare OE: " + moe);
  // }
  // dateCheckMOE();


// Q1: Preferred Language
// English =>
//  if (opnEnr) => Q2 (Trust-approved plan)
//  else if (!opnEnr) => Q3 (Report Change)
// Others => referral Terminal in appropriate language

  $(".lpref").change(function() {
    // first check whether open enrollment is active
    // and store the next question as a variable
    let nextQ;
    if (opnEnr) {
      nextQ = "#Trust2019-group";
    } else {
      nextQ = "#ReportChange-group";
    }
    console.log(opnEnr);
    console.log(nextQ);
    $(nextQ).hide(); //Mktplace plan
    if ($("#Lpref_0").is(':checked')) { //Eng
      Lang = "Eng";
      $(nextQ).show(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_1").is(':checked')) { //Rus
      Lang = "Rus";
      $(nextQ).hide(); //Mktplace plan
      $("#T1").show(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_2").is(':checked')) { //Span
      Lang = "Span";
      $(nextQ).hide(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").show(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_3").is(':checked')) { //Viet
      Lang = "Viet";
      $(nextQ).hide(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").show(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_4").is(':checked')) { //Chin
      Lang = "Chin";
      $(nextQ).hide(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").show(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_5").is(':checked')) { //Other
      Lang = "Oth";
      $(nextQ).hide(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").show(); //hotline English
    }
  });

// Q2: Trust-approved plan for 2019?
// #### This question only visible during open enrollment (opnEnr == true) ###
// Yes => Q4 (other coverage)
// No => Q3 (change in circumstances)

  $(".Trust2019").change(function() {
    if ($("#Trust2019_0").is(':checked')) { // Yes
      appt2019 = true;
      $("#OC-group").show(); // Other coverage
      $("#ReportChange-group").hide(); //
    } else if ($("#Trust2019_1").is(':checked')) { // No
      appt2019 = false;
      $("#OC-group").hide(); // Other coverage
      $("#ReportChange-group").show(); // Which state?

    }
  });

// Q3: Change in circumstance
// Yes => Q7 (state)
// No => Q4 (other coverage)

  $(".ReportChange").change(function() {
    if ($("#ReportChange_0").is(':checked')) { // Yes
      $("#State-group").show(); // Which state?
      $("#OC-group").hide(); // Other coverage
    } else if ($("#ReportChange_1").is(':checked')) { // No
      $("#State-group").hide(); // Which state?
      $("#OC-group").show(); // Other coverage
    }
  });

// Q4: Other coverage?
// Yes => Q5 (OC warning)
// No => Q6 (SEP)

  $(".OC").change(function() {
    if ($("#OC_0").is(':checked')) //Yes or not sure
    {
      $("#OC-warning").show(); //OC warning
      $("#SEP-group").hide(); //SEP
    } else if ($("#OC_1").is(':checked')) //No
    {
      $("#OC-warning").hide(); //OC warning
      $("#SEP-group").show(); //SEP
    }
  });

// Q5: Other coverage warning / accept responsibility
// checked => Q6 (SEP)

    $("#continue-OC-warning").click(function() {
      if ($("#OC-warning_0").is(':checked')) // checked
      {
        $("#SEP-group").show(); // SEP
        $("#continue-OC-warning").hide(); // continue button
        $("#OC-warning2").hide(); //warning b4 continuing
      } else if (!$("#OC-warning_0").is(':checked')) // Not checked
      {
        $("#SEP-group").hide(); // SEP
        $("#continue-OC-warning").show(); // continue button
        $("#OC-warning2").show(); //warning b4 continuing
      }
  });

// Q6 SEP
// Options 0-5 => Q7 (State)
// Option 6 =>
//  if (opnEnr) => Q7 (State)
//  else if (!opnEnr) => T15 (Check back SEP outside OE)

  $(".SEP").change(function() {
    // check whether open enrollment is active
    // and store the next question as a variable
    let nextQSEP;
    if (opnEnr && appt2019) {
      console.log('opnEnrYes');
      console.log('reportChangeYes')
      nextQSEP = "#State-group";
    } else if (opnEnr && !appt2019){
      nextQSEP = "#T15";
    } else {
      nextQSEP = "#T15";
    }
    console.log(opnEnr);
    console.log(nextQSEP);
     if ($("#SEP_6").is(':checked')) { // None of the above
      console.log(nextQSEP);
      $(nextQSEP).show(); // check back SEP outside OE
      if (nextQSEP === "#T15") {
        $("#State-group").hide(); // State
      }
    } else if ($("#SEP_5").is(':checked') ||
               $("#SEP_4").is(':checked') ||
               $("#SEP_3").is(':checked') ||
               $("#SEP_2").is(':checked') ||
               $("#SEP_1").is(':checked') ||
               $("#SEP_0").is(':checked')) { // SEP eligible
      sep = false;
      $(nextQSEP).hide(); // either T15 or State depending on opnEnr status
      $("#State-group").show(); // State
    }
  });



// Q7: State
// OR/WA => Q8 (Over 65?)
// ID or CA => T7/T8 (state-specific Terminal)
// Other => T5 (Hotline Referral English)

  $(".State").change(function() {
    if ($("#State_0").is(':checked')) { // OR
      $("#Over65-group").show(); // over 65
      $("#T7").hide(); // IDPacS
      $("#T8").hide(); // CalMsg
      $("#T5").hide(); // Hotline Referral English
    } else if ($("#State_1").is(':checked')) { // WA
      $("#Over65-group").show(); // over 65
      $("#T7").hide(); // IDPacS
      $("#T8").hide(); // CalMsg
      $("#T5").hide(); // Hotline Referral English
    } else if ($("#State_2").is(':checked')) { // ID
      $("#Over65-group").hide(); // over 65
      $("#T7").show(); // IDPacS
      $("#T8").hide(); // CalMsg
      $("#T5").hide(); // Hotline Referral English
    } else if ($("#State_3").is(':checked')) { // CA
      $("#Over65-group").hide(); // over 65
      $("#T7").hide(); // IDPacS
      $("#T8").show(); // CalMsg
      $("#T5").hide(); // Hotline Referral English
    } else if ($("#State_4").is(':checked')) { //Other
      $("#Over65-group").hide(); // over 65
      $("#T7").hide(); // IDPacS
      $("#T8").hide(); // CalMsg
      $("#T5").show(); // Hotline Referral English
    }
  });

// Q8: Over 65?
// No => Q9 (Monthly income)
// Yes => T5 (Hotline Referral English)


  $(".Over65").change(function() {
    if ($("#Over65_1").is(':checked')) { // NO: under 65
      $("#Income-group").show(); // monthly income
      $("#TaxHH-group").show(); // Tax HH size
      $("#T5").hide(); // Hotline Referral English
    } else if ($("#Over65_0").is(':checked')) { // YES: over 65
      $("#Income-group").hide(); // monthly income
      $("#TaxHH-group").hide(); // Tax HH size
      $("#T5").show(); // Hotline Referral English
    }
  });

// Q9-Q10: Income and Tax HH size
// Under income OR => T10 (Medicaid Referrer Terminal)
// Undr income WA => T16 (Medicaid Referrer Terminal)
// Over income => Q11 (EHH)

 $(".TaxHH").change(function() {
    if ($('input:radio[name=TaxHH]:checked').val() == 1 && $('input[name=Income]').val() < 1396) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); // call OHA
        $("#T16").hide(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); // call OHA
        $("#T16").show(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 1 && $('input[name=Income]').val() >= 1396) {
      $("#T10").hide(); // call OHA
      $("#T16").hide(); // WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    } else if ($('input:radio[name=TaxHH]:checked').val() == 2 && $('input[name=Income]').val() < 1893) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); // call OHA
        $("#T16").hide(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); // call OHA
        $("#T16").show(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 2 && $('input[name=Income]').val() >= 1893) {
      $("#T10").hide(); // call OHA
      $("#T16").hide(); // WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    } else if ($('input:radio[name=TaxHH]:checked').val() == 3 && $('input[name=Income]').val() < 2390) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); // call OHA
        $("#T16").hide(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); // call OHA
        $("#T16").show(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 3 && $('input[name=Income]').val() >= 2390) {
      $("#T10").hide(); // call OHA
      $("#T16").hide(); // WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    } else if ($('input:radio[name=TaxHH]:checked').val() == 4 && $('input[name=Income]').val() < 2887) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); // call OHA
        $("#T16").hide(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); // call OHA
        $("#T16").show(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 4 && $('input[name=Income]').val() >= 2887) {
      $("#T10").hide(); // call OHA
      $("#T16").hide(); // WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    } else if ($('input:radio[name=TaxHH]:checked').val() == 5 && $('input[name=Income]').val() < 3383) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); // call OHA
        $("#T16").hide(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); // call OHA
        $("#T16").show(); // WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 5 && $('input[name=Income]').val() >= 3383) {
      $("#T10").hide(); // call OHA
      $("#T16").hide(); // WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    }
  });

// Q11: EHH -- how many people enrolling for coverage?
// One => T11 VIP single
// More than one => T12 VIP family

 $(".EHH").change(function() {
  if ($("#EHH_0").is(':checked')) { // 1 person
      $("#T11").show(); // VIP single
      $("#T12").hide(); // VIP family
    } else if ($("#EHH_1").is(':checked')) { // more than 1
      $("#T11").hide(); // VIP single
      $("#T12").show(); // VIP family
    }
  });

});