// TO DO Set here the name of the variable w, which can be the length of the TV( -1 maybe...)
var w = lxTab.length - 1;

var r; 

window.set_table = function(table){
    lxTab= table;
    w = lxTab.length;
    alert("The table was correctly set");
}

window.lx = function(x){
    return lxTab[x];
}
window.D_x = function(x, r){
    return lx(x)*Math.pow(1+r,x);
}

window.N_x = function(x, r){
    var N = 0; 
   for (var i=0; i < w-x; i++) {
        N += D_x(x+i,r);
   }
   return N;
}

window.S_x = function(x, r){
    var S = 0; 
    for (var i=0; i < w-x; i++) {
        S += N_x(x+i,r);
   }
   return S; 
}

window.pure_endowment = function(x, n, r, ben){
    return ben*D_x(x+n, r)/D_x(x,r);
}

window.life_annuity_up_to_the_death_end = function(x, r, ben){
    return ben*N_x(x+1,r)/D_x(x, r);
}

window.life_annuity_temporary_end = function(x, n, r, ben){
    return ben*(N_x(x+1,r)-N_x(x+n+1,r))/D_x(x, r);
}

window.life_annuity_deferred_end = function(x, m, r, ben){
    return ben * N_x(x+m+1, r)/D_x(x, r);
}

window.life_annuity_temporary_and_deferred_end = function(x, n, m, r, ben){
    return ben * (N_x(m+x+1,r)-N_x(x+m+n+1,r))/D_x(x, r);
}

window.life_annuity_up_to_the_death_beg = function(x, r,ben){
    return ben * N_x(x,r)/D_x(x, r);
}

window.life_annuity_temporary_beg = function(x, n, r, ben){
    return ben * (N_x(x,r)-N_x(x+n,r))/D_x(x, r);
}

window.life_annuity_deferred_beg = function(x, m, r, ben){
    return ben * N_x(x+m, r)/D_x(x, r);
}

window.life_annuity_temporary_and_deferred_beg = function(x, n, m, r, ben){
    return ben *(N_x(m+x,r)-N_x(x+m+n,r))/D_x(x, r);
}

window.life_annuity_up_to_the_death_several_end = function(x, k, r, ben){
    return ben * (life_annuity_up_to_the_death_end(x,r,ben))+((k-1)/(2*k));
}

window.life_annuity_temporary_several_end = function(x, n, k, r, ben){
    return life_annuity_temporary_end(x, n,r, ben)+((k-1)/(2*k))*(1-pure_endowment(x,n,r, ben)); 
}

window.life_annuity_deferred_several_end = function(x, m, k, r, ben){
    return life_annuity_deferred_end(x, m, r, ben)+((k-1)/(2*k))*pure_endowment(x,m,r, ben);
}

window.life_annuity_temporary_and_deferred_several_end = function(x, n, k, m, r, ben){
    return pure_endowment(x,m,r, ben)*life_annuity_temporary_several_end(x+m, n, k, r, ben);
}

window.life_annuity_up_to_the_death_several_beg = function(x, k, r, ben){
    return ((life_annuity_up_to_the_death_beg(x,r, ben))+((k-1)/(2*k)));
}

window.life_annuity_temporary_several_beg = function(x, n, k, r, ben){
    return life_annuity_temporary_beg(x, n,r, ben)+((k-1)/(2*k))*(1-pure_endowment(x,n,r, ben));
}

window.life_annuity_deferred_several_beg =  function(x, m, k, r, ben){
    return life_annuity_deferred_beg(x, m, r, ben)+((k-1)/(2*k))*pure_endowment(x,m,r, ben);
}

window.life_annuity_temporary_and_deferred_several_beg = function(x, n, k, m, r, ben){
    return pure_endowment(x,m,r, ben)*life_annuity_temporary_several_beg(x+m, n, k, r, ben);
}

$('#tv').on('click', function(){
    set_table(TV);
});

$('#td').on('click', function(){
    set_table(TD);
});

// For the first time, the user have to set the value of r, or if whe wants to change it for any reason
$('#submit_r').on('click', function(){
    var res = $('#interest_rate').val();
    r = res/100;
    sessionStorage.setItem("rate", r);
    alert("The interest rate was set to r = " + res + "%.");
    $('#submit_r').val('');
});

// After setting the value of interest rate, he won't loose the value setted when the page reload
$(function(){
    r = sessionStorage.getItem("rate");
});

$('#pure_endowment').on('click', function(){ 
    console.log('r = ', r);
    var x1 = document.getElementById("age1").value;
    var mat1= document.getElementById("maturity1").value;
    var ben= document.getElementById("benefit1").value;
    console.log('nEx = ', pure_endowment(parseInt(x1), parseInt(mat1), window.r, ben));
    console.log('D_x = ', (1/((1+r)^parseInt(x1))));

    alert(pure_endowment(parseInt(x1), parseInt(mat1), window.r, ben));
    //After the computation, let's clean the input values...
    $('#age1').val('');
    $('#maturity1').val('');
    $('#benefit1').val('');
});

$('#upToDeath').on('click', function() {
    var x2 = document.getElementById("age2").value;
    var ben2 = document.getElementById("benefit2").value;
    alert(life_annuity_up_to_the_death_end(parseInt(x2), r, ben2));
    $('#age2').val('');
    $('#benefit2').val('');
});

$('#life_annuity_temporary_end').on('click', function() {
    var x3 = document.getElementById("age3").value;
    var m3 = document.getElementById("additiveAgem3").value;
    var ben3 = document.getElementById("benefit3").value;
    alert(life_annuity_temporary_end(parseInt(x3), parseInt(m3), r, ben3));
    $('#age3').val('');
    $('#additiveAgem3').val('');
    $('#benefit3').val('');
 });

 $('#life_annuity_deferred_end').on('click', function(){
    var x4 = document.getElementById("age4").value;
    var m4 = document.getElementById("additiveAgem4").value;
    var ben4 = document.getElementById("benefit4").value;
    alert(life_annuity_deferred_end(parseInt(x4), parseInt(m4), r, ben4));
    $('#age4').val('');
    $('#additiveAgem4').val('');
    $('#benefit4').val('');

 });

 $('#life_annuity_temporary_and_deferred_end').on('click', function(){
    var x5 = document.getElementById("age5").value;
    var n5 = document.getElementById("additiveAge5").value;
    var m5 = document.getElementById("additiveAgem5").value;
    var ben5 = document.getElementById("benefit5").value;
    alert(life_annuity_temporary_and_deferred_end(parseInt(x5), parseInt(n5), parseInt(m5), r, ben5));
    $('#age5').val('');
    $('#additiveAge5').val('');
    $('#additiveAgem5').val('');
    $('#benefit5').val('');
 });

 $('#life_annuity_up_to_the_death_beg').on('click', function(){
    var x6 = document.getElementById("age6").value;
    var ben6 = document.getElementById("benefit6").value;
    alert(life_annuity_up_to_the_death_beg(parseInt(x6), r, ben6));
    $('#age6').val('');
    $('#benefit6').val('');
 });

 $('#life_annuity_temporary_beg').on('click', function(){
    var x7 = document.getElementById("age7").value;
    var m7 = document.getElementById("additiveAgem7").value;
    var ben7 = document.getElementById("benefit7").value;   
    alert(life_annuity_temporary_beg(parseInt(x7), parseInt(m7), r, ben7));
    $('#age7').val(''); 
    $('#additiveAgem7').val(''); 
    $('#benefit7').val(''); 
 });

 $('#life_annuity_deferred_beg').on('click', function(){
    var x8 = document.getElementById("age8").value;
    var m8 = document.getElementById("additiveAgem8").value;
    var ben8 = document.getElementById("benefit8").value;
    alert(life_annuity_deferred_beg(parseInt(x8), parseInt(m8), r, ben8));
    $('#age8').val(''); 
    $('#additiveAgem8').val(''); 
    $('#benefit8').val(''); 
 });

$('#life_annuity_temporary_and_deferred_beg').on('click', function(){
    var x9 = document.getElementById("age9").value;
    var n9 = document.getElementById("additiveAge9").value;
    var m9 = document.getElementById("additiveAgem9").value;
    var ben9 = document.getElementById("benefit9").value;
    alert(life_annuity_temporary_and_deferred_beg(parseInt(x9), parseInt(n9), parseInt(m9), r, ben9));
    $('#age9').val(''); 
    $('#additiveAge9').val(''); 
    $('#additiveAgem9').val(''); 
    $('#benefit9').val(''); 
});

$('#life_annuity_up_to_the_death_several_end').on('click', function(){
    var x10 = document.getElementById("age10").value;
    var k10 = document.getElementById("k10").value;
    var ben10 = document.getElementById("benefit10").value ;
    alert(life_annuity_up_to_the_death_several_end(parseInt(x10), parseInt(k10), r, ben10));
    $('#age10').val(''); 
    $('#k10').val(''); 
    $('#benefit10').val('');
});

$('#life_annuity_temporary_several_end').on('click', function(){
    var x11 = document.getElementById("age11").value;
    var n11 = document.getElementById("additiveAgem11").value;
    var k11 = document.getElementById("k11").value;
    var ben11 = document.getElementById("benefit11").value;
    alert(life_annuity_temporary_several_end(parseInt(x11), parseInt(n11), parseInt(k11), r, ben11));
    $('#age11').val('');
    $('#additiveAgem11').val('');
    $('#k11').val('');
    $('#benefit11').val('');
}); 

$('#life_annuity_deferred_several_end').on('click', function(){
    var x12 = document.getElementById("age12").value;
    var m12 = document.getElementById("additiveAgem12").value;
    var k12 = document.getElementById("k12").value;
    var ben12 = document.getElementById("benefit12").value;
    alert(life_annuity_deferred_several_end(parseInt(x12), parseInt(m12), parseInt(k12), r, ben12));
    $('#age12').val('');
    $('#additiveAgem12').val('');
    $('#k12').val('');
    $('#benefit12').val('');
}); 

$('#life_annuity_temporary_and_deferred_several_end').on('click', function(){
    var x13 = document.getElementById("age13").value;
    var n13 = document.getElementById("additiveAge13").value;
    var m13 = document.getElementById("additiveAgem13").value;
    var k13 = document.getElementById("k13").value;
    var ben13 = document.getElementById("benefit13").value;
    alert(life_annuity_temporary_and_deferred_several_end(parseInt(x13), parseInt(n13), parseInt(k13), parseInt(m13), r, ben13));
    $('#age13').val('');
    $('#additiveAge13').val('');
    $('#additiveAgem13').val('');
    $('#k13').val('');
    $('#benefit13').val('');
});

$('#life_annuity_up_to_the_death_several_beg').on('click', function(){
    var x14 = document.getElementById("age14").value;
    var k14 = document.getElementById("k14").value;
    var ben14 = document.getElementById("benefit14").value ;
    alert(life_annuity_up_to_the_death_several_beg(parseInt(x14), parseInt(k14), r, ben14));
    $('#age14').val('');   
    $('#k14').val('');   
    $('#benefit14').val('');   
});

$('#life_annuity_temporary_several_beg').on('click', function(){
    var x15 = document.getElementById("age15").value;
    var n15 = document.getElementById("additiveAgem15").value;
    var k15 = document.getElementById("k15").value;
    var ben15 = document.getElementById("benefit15").value;
    alert(life_annuity_temporary_several_beg(parseInt(x15), parseInt(n15), parseInt(k15), r, ben15));
    $('#age15').val(''); 
    $('#additiveAgem15').val(''); 
    $('#k15').val(''); 
    $('#benefit15').val(''); 
});

$('#life_annuity_deferred_several_beg').on('click', function(){
    var x16 = document.getElementById("age16").value;
    var m16 = document.getElementById("additiveAgem16").value;
    var k16 = document.getElementById("k16").value;
    var ben16 = document.getElementById("benefit16").value;
    alert(life_annuity_deferred_several_beg(parseInt(x16), parseInt(m16), parseInt(k16), r, ben16));
    $('#age16').val(''); 
    $('#additiveAgem16').val(''); 
    $('#k16').val(''); 
    $('#benefit16').val('');  
});

$('#life_annuity_temporary_and_deferred_several_beg').on('click', function(){
    var x17 = document.getElementById("age17").value;
    var n17 = document.getElementById("additiveAge17").value;
    var m17 = document.getElementById("additiveAgem17").value;
    var k17 = document.getElementById("k17").value;
    var ben17 = document.getElementById("benefit17").value;
    alert(life_annuity_temporary_and_deferred_several_beg(parseInt(x17), parseInt(n17), parseInt(k17), parseInt(m17), r, ben17));
    $('#age17').val(''); 
    $('#additiveAge17').val(''); 
    $('#additiveAgem17').val(''); 
    $('#k17').val('');  
    $('#benefit17').val('');  
});