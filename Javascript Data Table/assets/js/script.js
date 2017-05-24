// https://api.myjson.com/bins/155o01

var xhr = new XMLHttpRequest();
var curData, originalData;
var curPage = 0;
xhr.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200){
    originalData = JSON.parse(this.responseText);
    curData = originalData;
    showData(curData, 0);
  }
}
xhr.open(
  "GET",
  "https://api.myjson.com/bins/smx5d",
  true
)
xhr.send();

var pages = document.getElementsByClassName("page-link");
for (var i = 0; i < pages.length; i++) {
  pages[i].addEventListener("click", function(){
    var attr = this.getAttribute("aria-label");
    switch (attr) {
      case 'Previous':
        showData(curData, Math.max(0, curPage-1));
        break;
      case 'Next':
        console.log(Math.min(parseInt(curData.length/10-1), curPage+1));
        showData(curData, Math.min(parseInt(curData.length/10-1), curPage+1));
        break;
      default:
        showData(curData, parseInt(attr));
    }
  })
}

/**************/
/** funciton **/
/**************/
function showData(data, page){
  var tablebody = document.getElementById('tablebody');
  tablebody.innerHTML = "";
  curPage = page;
  var tr, th;

  for (var i = 10*page; i < Math.min(10*page+10, data.length); i++) {
    user = data[i];
    // console.log(user.index);
    tr = document.createElement("tr");
    // first name
    th = document.createElement("th");
    th.innerHTML = user.name;
    tr.appendChild(th);
    // last name
    th = document.createElement("th");
    th.innerHTML = user.phone;
    tr.appendChild(th);
    // phone
    th = document.createElement("th");
    th.innerHTML = user.company;
    tr.appendChild(th);
    // email
    th = document.createElement("th");
    th.innerHTML = user.email;
    tr.appendChild(th);

    tablebody.appendChild(tr);
  }
  // render page-item
  var pages = document.getElementsByClassName("page-item");
  for (var i = 0; i < pages.length-1; i++) {
    if (i > parseInt(curData.length/10)){
      pages[i].style.display = "none";
    } else {
      pages[i].style.display = "list-item";
    }
  }
}

function sortData(order){
  var newData = curData.slice();
  switch (order) {
    case 'name':
      newData.sort(function(a, b){
        return getCompareResult(a.name.toLowerCase(), b.name.toLowerCase());
      })
      break;
    case 'phone':
      newData.sort(function(a, b){
        return getCompareResult(a.phone.toLowerCase(), b.phone.toLowerCase());
      })
      break;
    case 'company':
      newData.sort(function(a, b){
        return getCompareResult(a.company.toLowerCase(), b.company.toLowerCase());
      })
      break;
    case 'email':
      newData.sort(function(a, b){
        return getCompareResult(a.email.toLowerCase(), b.email.toLowerCase());
      })
      break;
    default:
      break;
  }
  curData = newData;
  showData(newData, curPage);
}

function getCompareResult(a, b){
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0
}

function search(){
  var searchedWord = document.getElementById("searchedWord").value.toLowerCase();
  var resultData = [];
  originalData.forEach(function(user){
    for(prop in user){
      if (user.hasOwnProperty(prop)) {
        var val = user[prop];
        if (val.includes(searchedWord)){
          resultData.push(user);
          break;
        }
      }
    }
  })
  curData = resultData;
  curPage = 0;
  showData(resultData, 0);
}
