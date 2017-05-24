// https://api.myjson.com/bins/155o01

var xhr = new XMLHttpRequest();
var allData;
xhr.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200){
    allData = JSON.parse(this.responseText);
    showData(allData);
  }
}

xhr.open(
  "GET",
  "https://api.myjson.com/bins/155o01",
  true
)
xhr.send();

function showData(data){
  var tablebody = document.getElementById('tablebody');
  tablebody.innerHTML = "";
  // console.log(data);
  var tr, th;
  for (var i = 0; i < 6; i++) {
    user = data[i];
    console.log(user.phone);
    tr = document.createElement("tr");
    // first name
    th = document.createElement("th");
    th.innerHTML = user.name.first;
    tr.appendChild(th);
    // last name
    th = document.createElement("th");
    th.innerHTML = user.name.last;
    tr.appendChild(th);
    // phone
    th = document.createElement("th");
    th.innerHTML = user.phone;
    tr.appendChild(th);
    // email
    th = document.createElement("th");
    th.innerHTML = user.email;
    tr.appendChild(th);

    tablebody.appendChild(tr);
  }
  // data.forEach(function(user){
  //   console.log(user.name.first[0]);
  //   tr = document.createElement("tr");
  //   // first name
  //   th = document.createElement("th");
  //   th.innerHTML = user.name.first;
  //   tr.appendChild(th);
  //   // last name
  //   th = document.createElement("th");
  //   th.innerHTML = user.name.first;
  //   tr.appendChild(th);
  //   // phone
  //   th = document.createElement("th");
  //   th.innerHTML = user.phone;
  //   tr.appendChild(th);
  //   // email
  //   th = document.createElement("th");
  //   th.innerHTML = user.email;
  //   tr.appendChild(th);
  //
  //   tablebody.appendChild(tr);
  // })
}

function sortData(order){
  var newData = allData.slice();
  switch (order) {
    case 'firstname':
      newData.sort(function(a, b){
        return a.name.first.toLowerCase() - b.name.first.toLowerCase();
      })
      break;
    case 'phone':
      newData.sort(function(a, b){
        return a.phone - b.phone;
      })
      break;
    default:
      break;
  }
  // newData.sort(function(a, b){
  //   return a.phone.toLowerCase() - b.phone.toLowerCase();
  // })
  showData(newData);
}
