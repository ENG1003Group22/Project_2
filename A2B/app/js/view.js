//Download Data from Local Storage

var i = 0, dataPDO = {}, sKey;

for (; sKey = window.localStorage.key(i); i++) {
    dataPDO[sKey] = JSON.parse(localStorage.getItem(sKey));
}
console.log(dataPDO);

