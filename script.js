widow.onload = functioon(){
 alert("Welcome to Mumbi's Thrift Haven");
};

setTimeout(functin(){
           document.getElementById("PromoBox").style.display = "block";
},3000);

functiom closePromo(){
  document.getElementById("promobox").style.display = "none";
},3000);

document.getElementById("userForm").addEventListener("submit",function(event){
  event.preventDefault();
  alert("Thank you! Your details have been submitted successfully.");
});

