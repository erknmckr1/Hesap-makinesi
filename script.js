const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-keys')

let displayValue = "0"

updateDisplay()

function updateDisplay (){
    display.value = displayValue
}

keys.addEventListener('click' , function(event){
    const element = event.target // target ıle olayı tetıkleyen öğe dondurulur.

    if(!element.matches('button')) return; //matches ile elementın buton olup olmadıgın baktık eğer buton degılse return ettık. return demek buradan sonrakı kodların işletılmemesı demek.

    if(element.classList.contains('operator')){ 
        //console.log('operatör ', element.value)
        
        return
    }// burada classı operator olan butonlara erıstık.

    if(element.classList.contains('clear')) { // contains metodu ulatıgımız elemanın clear mı olup olmadıgını sorguluycak
        //console.log('clear',element.value)
        clear()
        updateDisplay()
        return
    }

    if(element.classList.contains('decimal')) {
        //console.log('decimal',element.value)
        inputDecimal()
        updateDisplay()
        return
    }

    //console.log( 'number',element.value)
    inputNumber(element.value) // girilen sayısal degerı karsıladıgımız metot
    updateDisplay()
}) 


function inputNumber (num) {
displayValue= displayValue=== '0' ? num: displayValue + num; // rakamları yan yana yazdırmak ıcın kullandıgımız sart bloğu
}
function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.'
    }
    
}
function clear(){
    displayValue='0'
}