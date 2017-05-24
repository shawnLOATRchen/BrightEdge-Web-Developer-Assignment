var xhr = new XMLHttpRequest();
var curData, originalData;
var curPage = 0;
var sortby = 'N/A';
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
  var tr, th;

  // render column
  var checkColumns = document.getElementsByClassName('checkColumn');
  var theadTr = document.getElementById('theadTr');
  while (theadTr.firstChild) theadTr.removeChild(theadTr.firstChild);
  appendThToTr(theadTr, '#');
  if (checkColumns[0].checked) appendThToTr(theadTr, 'Name');
  if (checkColumns[1].checked) appendThToTr(theadTr, 'Phone');
  if (checkColumns[2].checked) appendThToTr(theadTr, 'Company');
  if (checkColumns[3].checked) appendThToTr(theadTr, 'Email');

  // render select
  var select = document.getElementById('sort-select');
  while (select.firstChild) select.removeChild(select.firstChild);
  console.log(sortby);
  appendOptionToSelect(select, sortby, true);
  if (checkColumns[0].checked) appendOptionToSelect(select, 'Name');
  if (checkColumns[1].checked) appendOptionToSelect(select, 'Phone');
  if (checkColumns[2].checked) appendOptionToSelect(select, 'Company');
  if (checkColumns[3].checked) appendOptionToSelect(select, 'Email');

  // render table
  for (var i = 10*page; i < Math.min(10*page+10, data.length); i++) {
    user = data[i];
    tr = document.createElement("tr");
    // edit button
    th = document.createElement("th");
    bt = document.createElement("button");
    bt.innerHTML = "edit";
    bt.addEventListener("click", function(){
      editRow(i)
    })
    th.appendChild(bt);
    tr.appendChild(th);

    if (checkColumns[0].checked) appendThToTr(tr, user.name);
    if (checkColumns[1].checked) appendThToTr(tr, user.phone);
    if (checkColumns[2].checked) appendThToTr(tr, user.company);
    if (checkColumns[3].checked) appendThToTr(tr, user.email);
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

function appendThToTr(tr, content){
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
