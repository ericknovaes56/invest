const form = document.getElementById('search-form');
const nameInput = document.getElementById('name-input');

var price = ""
var longName = ""
var shortname = ""
setInterval(() => {
  if (nameInput.value != ""){
    chamar(nameInput.value)
    if (longName != undefined && longName != "" && shortname != ""){
      chamar(nameInput.value)
      colocar()
    }
}else{
    document.querySelector('.boxdown').style.display=''
}
}, 100);

function colocar(){
  const companyName = shortname;
  var logo=document.querySelector(".logo img")
  shortname = shortname.toLowerCase()
  shortname = shortname.replace('.', ' ')
  shortname = shortname.replace("inc", ' ')
  shortname = shortname.replace("corporation", ' ')
  shortname = shortname.replace("unt", ' ')
  shortname = shortname.replace("n2", ' ')
  shortname = shortname.replace(",", ' ')
  shortname = shortname.trim()
  logo.src='https://logo.clearbit.com/'+shortname+'.com'
  document.querySelector('.boxdown').style.display='flex'
  document.getElementById("name").innerHTML=longName
  document.getElementById("price").innerHTML="R$ "+price
}
nameInput.addEventListener('input', () => {
    if (nameInput.value != ""){
        chamar(nameInput.value)
        if (longName != undefined && longName != "" && shortname != ""){
          colocar()
        }
    }else{
        document.querySelector('.boxdown').style.display=''
    }
});
function chamar(value){
    const name = value;
    fetch("https://query1.finance.yahoo.com/v1/finance/search?q="+name)
      .then(response => response.json())
      .then(data => {
        const symbol = data.quotes[0].symbol;
        longName = ""
        shortname = ""
        longName = data.quotes[0].longname;
        shortname = data.quotes[0].shortname
        fetch("https://query1.finance.yahoo.com/v8/finance/chart/"+symbol+"?interval=1mo")
          .then(response => response.json())
          .then(data => {
            price = 0
            price = data.chart.result[0].meta.regularMarketPrice;
          })
          .catch(error => {
            console.log('Erro ao obter dados de ações:', error);
          });
      })
      .catch(error => {
        console.log('Erro ao obter símbolo da ação:', error);
      });
}