var xhr = new XMLHttpRequest();
var curData, originalData;
var curPage = 0;
var sortby = 'N/A';
xhr.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200){
    originalData = JSON.parse(this.responseText);
    curData = originalData.slice();
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
        showData(curData, Math.min(parseInt(curData.length/10-1), curPage+1));
        break;
      default:
        showData(curData, parseInt(attr));
        break;
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
  curData = data;
  indexToEdit = 0;
  var tr, th;
  var itemArray = ['Name', 'Phone', 'Company', 'Email'];

  // render column
  var checkColumns = document.getElementsByClassName('checkColumn');
  var theadTr = document.getElementById('theadTr');
  while (theadTr.firstChild) theadTr.removeChild(theadTr.firstChild);
  appendThToTr(theadTr, '#');
  for (var i = 0; i < itemArray.length; i++) {
    if (checkColumns[i].checked) appendThToTr(theadTr, itemArray[i]);
  }

  // render select
  var select = document.getElementById('sort-select');
  while (select.firstChild) select.removeChild(select.firstChild);
  appendOptionToSelect(select, sortby, true);
  for (var i = 0; i < itemArray.length; i++) {
    if (checkColumns[i].checked) appendOptionToSelect(select, itemArray[i]);
  }

  // render table
  for (var i = 10*page; i < Math.min(10*page+10, data.length); i++) {
    user = data[i];
    tr = document.createElement("tr");

    // edit button
    th = document.createElement("th");
    var bt = document.createElement("div");
    bt.className = "edit-icon"
    var att = document.createAttribute('index');
    att.value = i;
    bt.setAttributeNode(att);
    bt.addEventListener("click", function(){editRow(this);});
    th.appendChild(bt);
    tr.appendChild(th);

    // edit other item
    var userArray = [user.name, user.phone, user.company, user.email];
    for (var j = 0; j < userArray.length; j++) {
      if (checkColumns[j].checked) appendThToTr(tr, userArray[j]);
    }

    tablebody.appendChild(tr);
  }
  // render page-item
  renderPages();
}

function renderPages(){
  var pages = document.getElementsByClassName("page-item");
  for (var i = 0; i < pages.length-1; i++) {
    if (i > parseInt(curData.length/10)){
      pages[i].style.display = "none";
    } else {
      pages[i].style.display = "list-item";
    }
  }
}

function appendThToTr(tr, content, index){
  var th = document.createElement("th");
  th.innerHTML = content;
  tr.appendChild(th);
}
function appendOptionToSelect(select, content, display){
  var option = document.createElement("option");
  if (!display && content === sortby) option.innerHTML = 'N/A';
  else option.innerHTML = content;
  select.appendChild(option);
}

function sortData(select){
  sortby = select.value;
  switch (select.value) {
    case 'Name':
      curData.sort(function(a, b){
        return getCompareResult(a.name.toLowerCase(), b.name.toLowerCase());
      })
      break;
    case 'Phone':
      curData.sort(function(a, b){
        return getCompareResult(a.phone.toLowerCase(), b.phone.toLowerCase());
      })
      break;
    case 'Company':
      curData.sort(function(a, b){
        return getCompareResult(a.company.toLowerCase(), b.company.toLowerCase());
      })
      break;
    case 'Email':
      curData.sort(function(a, b){
        return getCompareResult(a.email.toLowerCase(), b.email.toLowerCase());
      })
      break;
    default:
      curData = originalData.slice();
      break;
  }
  showData(curData, curPage);
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
  showData(resultData, 0);
}

function switchColumn(){
  showData(curData, curPage);
}
function editRow(item){
  indexToEdit = item.getAttribute('index');
  document.getElementById('name').value = curData[indexToEdit].name;
  document.getElementById('phone').value = curData[indexToEdit].phone;
  document.getElementById('company').value = curData[indexToEdit].company;
  document.getElementById('email').value = curData[indexToEdit].email;
  document.getElementById('pop-up').style.display = "block";
}
function submitEdit(){
  curData[indexToEdit] = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    company: document.getElementById('company').value,
    email: document.getElementById('email').value
  }
  originalData = curData.slice();
  showData(curData,curPage);
  document.getElementById('pop-up').style.display = "none";
}
function cancel(){
  document.getElementById('pop-up').style.display = "none";
}
