var w = lxTab.length - 1;
var r = 0.2;

window.set_table = function (table) {
    lxTab = table;
    w = lxTab.length;
    alert("The table was correctly set");
}

window.v = function (x, r) {
    return 1 / Math.pow((1 + r), x);
}

window.lx = function (x) {
    return lxTab[x];
}

window.d = function (x) {
    return (lx(x) - lx(x + 1));
}

window.D_x = function(x, r){
    return lx(x)*Math.pow(1+r,x);;
}

window.C = function (x, r) {
    return v(x + 1, r) * d(x);
}

window.M = function (x, r) {
    var M = 0;
    for (var k = 0; k < w - x; k++) {
        M += C(x + k, r);
    }
    
    return M;
}

window.R = function (x, r) {
    var R = 0;
    for (var k = 0; k < w - x; k++) {
        R += M(x + k, r);
    }
    return R;
}

window.whole_life = function (x, r, ben) {
    return ben * M(x, r) / D_x(x, r);
}

window.term_insurance = function (x, r, n, ben) {
    return ben * ((M(x, r) - M(x + n, r)) / D_x(x, r));
}

window.term_insurance_defered = function(x, r, m, n, ben){
    return ben * ((M(x+m, r) - M(x+m+n, r))/D_x(x,r));
}

window.whole_life_differed = function(x, r, m, ben){
    return ben * (M(x+m, r)/D_x(x, r)); 
}

window.term_insurance_with_increasing_life_annuities = function(x, r, n, ben){
    return ben * ((R(x, r) - R(x+n, r) - n*M(x+n, r))/D_x(x, r));
}

window.term_insurance_with_decreasing_life_annuities = function(x, r, n, ben){
    return ben * (n*M(x, r) - (R(x+1, r) - R(x+n+1, r))/D_x(x,r)); 
}

$('#tv').on('click', function(){
    set_table(TV);
});

$('#td').on('click', function(){
    set_table(TD);
});

$('#submit_r').on('click', function(){
    var res = $('#interest_rate').val();
    r = res/100;
    alert("The interest rate was set to r = " + res + "%.");
    $('#interest_rate').val('');
});

$('#whole_life').on('click', function () {
    var x1 = document.getElementById("age1").value;
    var ben1 = document.getElementById("benefit1").value;
    alert(whole_life(parseInt(x1), r, ben1));
    $('#age1').val('');
    $('#benefit1').val('');
});

$('#term_insurance').on('click', function () {
    var x2 = document.getElementById("age2").value;
    var n2 = document.getElementById("additiveAge2").value;
    var ben2 = document.getElementById("benefit2").value; 
    alert(term_insurance(parseInt(x2), r, parseInt(n2), ben2));
    $('#age2').val('');
    $('#additiveAge2').val('');
    $('#benefit2').val('');
});

//Pas rrès  logique comme résultat;
$('#term_insurance_defered').on('click', function () {
    var x3 = document.getElementById("age3").value;
    var m3 = document.getElementById("additiveAgem3").value;
    var n3 = document.getElementById("additiveAge3").value;
    var ben3 = document.getElementById("benefit3").value;
    alert(term_insurance_defered(parseInt(x3), r, parseInt(m3), parseInt(n3), ben3));
    $('#age3').val('');
    $('#additiveAgem3').val('');
    $('#additiveAge3').val('');
    $('#benefit3').val('');
});

$('#whole_life_differed').on('click', function () {
    var x4 = document.getElementById("age4").value;
    var m4 = document.getElementById("additiveAgem4").value;
    var ben4 = document.getElementById("benefit4").value   ;
    alert(whole_life_differed(parseInt(x4), r, parseInt(m4), ben4));
    $('#age4').val('');
    $('#additiveAgem4').val('');
    $('#benefit4').val('');
});

$('#term_insurance_with_increasing_life_annuities').on('click', function () {
    var x5 = document.getElementById("age5").value;
    var n5 = document.getElementById("additiveAge5").value;
    var ben5 = document.getElementById("benefit5").value;
    alert(term_insurance_with_increasing_life_annuities(parseInt(x5), r, parseInt(n5),  ben5));
    $('#age5').val('');
    $('#additiveAge5').val('');
    $('#benefit5').val('');
});

$('#term_insurance_with_decreasing_life_annuities').on('click', function () {
    var x6 = document.getElementById("age6").value;
    var n6 = document.getElementById("additiveAge6").value;
    var ben6 = document.getElementById("benefit6").value;
    alert(term_insurance_with_decreasing_life_annuities(parseInt(x6), r, parseInt(n6), ben6));
    $('#age6').val('');
    $('#additiveAge6').val('');
    $('#benefit6').val('');
});

$('#id').on('click', function () {

    alert((parseInt(x1), r, ben1));
    $('#age1').val('');
    $('#benefit1').val('');
});


