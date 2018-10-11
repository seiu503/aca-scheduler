$(document).ready(function() {
  var Lang;
  var sep = false;
  var ksa;
  var kpsw;
  var moe = false;
  var opnEnr = false;

  function dateCheckOE() {

    var fDateOE = new Date(2017, 9, 15);
    var lDateOE = new Date(2018, 0, 31);
    var cDateOE = $.now();

    if ((cDateOE <= lDateOE && cDateOE >= fDateOE)) {
      opnEnr = true;
      console.log("Open Enrollment = true");
    }
    opnEnr = false;
  }
  dateCheckOE();

  function dateCheckMOE() {

    var fDate = new Date(2017, 09, 15);
    var lDate = new Date(2017, 11, 8);
    var cDate = $.now();

    if ((cDate <= lDate && cDate >= fDate)) {
      moe = true;
      console.log("Medicare OE: " + moe);
    }
    moe = false;
    console.log("Medicare OE: " + moe);
  }
  dateCheckMOE();


// Q1: Preferred Language
// show next Q2 (Marketplace Plan?) if English
// otherwise show hotline referral Terminal in appropriate language

  $(".lpref").change(function() {
    $("#Mkt-group").hide(); //Mktplace plan
    if ($("#Lpref_0").is(':checked')) { //Eng
      Lang = "Eng";
      $("#Mkt-group").show(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_1").is(':checked')) { //Rus
      Lang = "Rus";
      $("#Mkt-group").hide(); //Mktplace plan
      $("#T1").show(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_2").is(':checked')) { //Span
      Lang = "Span";
      $("#Mkt-group").hide(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").show(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_3").is(':checked')) { //Viet
      Lang = "Viet";
      $("#Mkt-group").hide(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").show(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_4").is(':checked')) { //Chin
      Lang = "Chin";
      $("#Mkt-group").hide(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").show(); //hotline Chinese
      $("#T5").hide(); //hotline English
    } else if ($("#Lpref_5").is(':checked')) { //Other
      Lang = "Oth";
      $("#Mkt-group").hide(); //Mktplace plan
      $("#T1").hide(); //hotline Russian
      $("#T2").hide(); //hotline Spanish
      $("#T3").hide(); //hotline Vietnamese
      $("#T4").hide(); //hotline Chinese
      $("#T5").show(); //hotline English
    }
  });

// Q2: Trust-approved plan for 2019?
// Yes => Q4 (other coverage)
// No => Q3 (change in circumstances)

  $(".Trust2019").change(function() {
    if ($("#Trust2019_0").is(':checked')) { // Yes
      $("#OC-group").show(); // Other coverage
      $("#ReportChange-group").hide(); //
    } else if ($("#Trust2019_1").is(':checked')) { // No
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
        $("#OC-warning2").hide(); //warning b4 continuing
      } else if (!$("#OC-warning_0").is(':checked')) // Not checked
      {
        $("#SEP-group").hide(); // SEP
        $("#OC-warning2").show(); //warning b4 continuing
      }
  });

// Q6 SEP
// Options 0-5 => Q7 (State)
// Option 6 => T15 (Check back SEP outside OE)

  $(".SEP").change(function() {
     if ($("#SEP_6").is(':checked')) { // None of the above
      $("#T15").show(); // check back SEP outside OE
      $("#State-group").hide(); // State
    } else if ($("#SEP_5").is(':checked') ||
               $("#SEP_4").is(':checked') ||
               $("#SEP_3").is(':checked') ||
               $("#SEP_2").is(':checked') ||
               $("#SEP_1").is(':checked') ||
               $("#SEP_0").is(':checked')) { // SEP eligible
      sep = false;
      $("#T15").hide(); //check back SEP outside OE
      $("#State-group").show(); // State
    }
  });



// Q7: State
// OR/WA => Q8 (Over 65?)
// ID or CA => T7/T8 (state-specific Terminal)
// Other => T5 (generic 'call us' Terminal)

  $(".State").change(function() {
    if ($("#State_0").is(':checked')) { // OR
      $("#Over65-group").show(); // over 65
      $("#T7").hide(); // IDPacS
      $("#T8").hide(); // CalMsg
      $("#T5").hide(); // call us Other
    } else if ($("#State_1").is(':checked')) { // WA
      $("#Over65-group").show(); // over 65
      $("#T7").hide(); // IDPacS
      $("#T8").hide(); // CalMsg
      $("#T5").hide(); // call us Other
    } else if ($("#State_2").is(':checked')) { // ID
      $("#Over65-group").hide(); // over 65
      $("#T7").show(); // IDPacS
      $("#T8").hide(); // CalMsg
      $("#T5").hide(); // call us Other
    } else if ($("#State_3").is(':checked')) { // CA
      $("#Over65-group").hide(); // over 65
      $("#T7").hide(); // IDPacS
      $("#T8").show(); // CalMsg
      $("#T5").hide(); // call us Other
    } else if ($("#State_4").is(':checked')) { //Other
      $("#Over65-group").hide(); // over 65
      $("#T7").hide(); // IDPacS
      $("#T8").hide(); // CalMsg
      $("#T5").show(); // call us Other
    }
  });

// Q6: Over 65?
// No: Q7 (Monthly income)
// Yes: T5 (Hotline Referral English)

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

// Q7-Q8: Income and Tax HH size
// Below Medicaid threshhold Oregon: Medicaid Referrer Terminal (T10)
// Below Medicaid threshhold Washington: Medicaid Referrer Terminal (T16)
// Over income: Q9 (EHH: How many enrolling for coverage)

 $(".TaxHH").change(function() {
    if ($('input:radio[name=TaxHH]:checked').val() == 1 && $('input[name=Income]').val() < 1387) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); //call OHA
        $("#T16").hide(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); //call OHA
        $("#T16").show(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 1 && $('input[name=Income]').val() >= 1387) {
      $("#T10").hide(); //call OHA
      $("#T16").hide(); //WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    } else if ($('input:radio[name=TaxHH]:checked').val() == 2 && $('input[name=Income]').val() < 1868) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); //call OHA
        $("#T16").hide(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); //call OHA
        $("#T16").show(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 2 && $('input[name=Income]').val() >= 1868) {
      $("#T10").hide(); //call OHA
      $("#T16").hide(); //WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    } else if ($('input:radio[name=TaxHH]:checked').val() == 3 && $('input[name=Income]').val() < 2348) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); //call OHA
        $("#T16").hide(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); //call OHA
        $("#T16").show(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 3 && $('input[name=Income]').val() >= 2348) {
      $("#T10").hide(); //call OHA
      $("#T16").hide(); //WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    } else if ($('input:radio[name=TaxHH]:checked').val() == 4 && $('input[name=Income]').val() < 2829) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); //call OHA
        $("#T16").hide(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); //call OHA
        $("#T16").show(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 4 && $('input[name=Income]').val() >= 2829) {
      $("#T10").hide(); //call OHA
      $("#T16").hide(); //WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    } else if ($('input:radio[name=TaxHH]:checked').val() == 5 && $('input[name=Income]').val() < 3310) {
      if ($("#State_0").is(':checked')) {
        $("#T10").show(); //call OHA
        $("#T16").hide(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      } else if ($("#State_1").is(':checked')) {
        $("#T10").hide(); //call OHA
        $("#T16").show(); //WA Apple Care
        $("#EHH").hide(); // How many people enrolling?
      }
    } else if ($('input:radio[name=TaxHH]:checked').val() == 5 && $('input[name=Income]').val() >= 3310) {
      $("#T10").hide(); //call OHA
      $("#T16").hide(); //WA Apple Care
      $("#EHH").show(); // How many people enrolling?
    }
  });

// Q9: EHH -- how many people enrolling for coverage?
// One: T11 VIP single
// More than one: T12 VIP family

 $(".EHH").change(function() {
  if ($("#EHH_0").is(':checked')) { // 1 person
      $("#T11").show(); // VIP single
      $("#T12").hide(); // VIP family
    } else if ($("#EHH_1").is(':checked')) { // more than 1
      $("#T11").hide(); // VIP single
      $("#T12").show(); // VIP family
    }
  });

// Q10: Medicare Part B?
// Yes: Q11 (shopping for supplemental plan?)
// No: T14 (Medicare referral)

  $(".MedPB").change(function() {
    if ($("#MedPB_0").is(':checked')) { //Yes
      $("#MedPB-Sup").show(); // Q11 (shopping for supplemental plan?)
      $("#T14").hide(); // T14 (Medicare referral)
    } else if ($("#MedPB_1").is(':checked')) { //No
      $("#MedPB-Sup").hide(); // Q11 (shopping for supplemental plan?)
      $("#T14").show(); // T14 (Medicare referral)
    }
  });

// Q11: Medicare Part B supplemental plan?
// Yes: T13 (Medicare Appointment )
// No: T14 (Medicare referral)

  $(".MedPB-Sup").change(function() {
    if ($("#MedPB-Sup_0").is(':checked')) { //Yes
      $("#T13").show(); // T13 (Medicare appt)
      $("#T14").hide(); // T14 (Medicare referral)
    } else if ($("#MedPB-Sup_1").is(':checked')) { //No
      $("#T13").hide(); // T13 (Medicare appt)
      $("#T14").show(); // T14 (Medicare referral)
    }
  });

  $(".county").change(function() {
    if ($("#county_0").is(':checked')) { //Yes
      ksa = true;
      $("#EHH").show(); //4 county yes, in K svc area, sched link
      $("#zip-group").hide(); //zip field
      $("#contzip").hide(); //zip field
    } else if ($("#county_1").is(':checked')) { //No
      $("#EHH").hide(); //4 county no, not in K svc area
      $("#zip-group").show(); //zip field
       $("#contzip").show(); //zip field
    }
  });

  $("#contzip").click(function() { // ZIP match = Kaiser svc area; nomatch = BS

    var x = ["97002", "97003", "97004", "97005", "97006", "97006", "97007", "97008", "97009", "97010", "97011", "97013", "97014", "97015", "97015", "97017", "97018", "97019", "97020", "97022", "97023", "97024", "97026", "97027", "97030", "97032", "97034", "97035", "97036", "97038", "97042", "97045", "97048", "97049", "97051", "97053", "97054", "97055", "97056", "97060", "97062", "97064", "97067", "97068", "97070", "97071", "97075", "97076", "97077", "97078", "97080", "97086", "97086", "97086", "97089", "97101", "97106", "97109", "97109", "97111", "97113", "97114", "97115", "97116", "97117", "97119", "97123", "97123", "97124", "97125", "97125", "97127", "97128", "97132", "97133", "97137", "97140", "97144", "97148", "97201", "97202", "97203", "97204", "97205", "97206", "97207", "97208", "97209", "97210", "97211", "97212", "97213", "97214", "97215", "97216", "97217", "97218", "97219", "97220", "97221", "97222", "97223", "97224", "97225", "97227", "97228", "97229", "97230", "97231", "97232", "97233", "97236", "97238", "97239", "97240", "97242", "97250", "97251", "97252", "97253", "97254", "97256", "97258", "97266", "97267", "97268", "97269", "97280", "97281", "97282", "97283", "97286", "97290", "97291", "97292", "97293", "97294", "97296", "97298", "97301", "97302", "97303", "97303", "97304", "97305", "97306", "97307", "97307", "97308", "97309", "97310", "97311", "97312", "97313", "97314", "97317", "97321", "97322", "97325", "97330", "97331", "97333", "97335", "97338", "97339", "97342", "97344", "97346", "97347", "97348", "97351", "97352", "97355", "97358", "97360", "97361", "97362", "97370", "97371", "97373", "97374", "97375", "97377", "97378", "97381", "97383", "97384", "97385", "97389", "97392", "97396"];

    if (($.inArray($('#zip').val(), x) != -1)) // kaiser zip match
    {
      $("#contzip").slideUp();
      ksa = true;
      console.log("Kaiser Service Area= " + ksa);
      $("#EHH").show(); //Kaiser ZIP match, THH question
    } else // bridgespan (not in ksa)
    {
      $("#contzip").slideUp();
      ksa = false;
       console.log("Kaiser Service Area= " + ksa);
      $("#EHH").show(); //Kaiser ZIP match, THH question

    }

  });

});