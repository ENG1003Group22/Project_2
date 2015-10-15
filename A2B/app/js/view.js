//Download Data from Local Storage

var i = 0, dataPDO = [], sKey;

for (; sKey = window.localStorage.key(i); i++) {
    dataPDO[sKey] = JSON.parse(localStorage.getItem(sKey));
}

var myTable= "<table><tr><td style='width: 100px; color: red;'>Col Head 1</td>";
    myTable+= "<td style='width: 100px; color: red; text-align: right;'>Col Head 2</td>";
    myTable+="<td style='width: 100px; color: red; text-align: right;'>Col Head 3</td></tr></table>"
document.getElementById("tableOutput").innerHTML = myTable
    
    
console.log(dataPDO);

var htmltable;

function tableBuilding(dataPDO){
    
    var endOfTable = "</tbody></table>";
    //output = document.getElementById("tableOutput").innerHTML;
    
    htmltable = "<table><thead><tr><th>Name</th><th>Distance</th><th>Duration</th><th>Speed</th><th>Calories Burnt</th></tr></thead><tbody>";
    
    for (i in dataPDO){
        
 //   htmltable +="<tr><td>"+dataPDO[i].name+"</td><td>"+dataPDO[i].distance+"</td><td>"+dataPDO[i].duration+ "</td></td>"+dataPDO[i].speed+"</td></td>"+dataPDO[i].burnt+"</td></tr>";
        
    }
    
    htmltable += endOfTable;
    
    document.getElementById("tableOutput").innerHTML = htmltable;
}



/*

<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">Name</th>
      <th>Distance</th>
      <th>Duration</th>
        <th>Speed</th>
    <th>Calories Burnt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
      <td>25</td>
      <td>$2.90</td>
        <td>$2.90</td>
        <td>$2.90</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
      <td>50</td>
      <td>$1.25</td>
        <td>$2.90</td>
        <td>$2.90</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
      <td>10</td>
      <td>$2.35</td>
        <td>$2.90</td>
        <td>$2.90</td>
    </tr>
  </tbody>
</table>

*/