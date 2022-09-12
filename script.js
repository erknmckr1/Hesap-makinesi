const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-keys')

let displayValue = "0";
let firsValue = null; // ılk gırdıgımız degerı bu parametrede saklayacagız operatore tıkladıktan sonra  displayValue degerımız ekrandan kalkacak. Operatore tıkladıktan sonra tekrarda bır bılgı gırısı gerekecek ve oncekı bılgılerı bır parametrede saklamamız gerekecek
let operator = null; // operator bılgısını tutacagımız parametre 
let waitingForSecondValue = false; // 2. deger icin beklenıyor mu seklınde bir deger olusturduk ne zaman bir bılgı gırısı yapıp operatore tıkladıgımız zaman waitingForSecondValue degıskenımız True degerı alacak 2. bir deger gırdıgımızde dısplayValue kaldırılacak ve son gırdıgımız deger displayValue da gozukecek

updateDisplay()

function updateDisplay() {
    display.value = displayValue
}

keys.addEventListener('click', function (event) {
    const element = event.target // target ıle olayı tetıkleyen öğe dondurulur.

    if (!element.matches('button')) return; //matches ile elementın buton olup olmadıgın baktık eğer buton degılse return ettık. return demek buradan sonrakı kodların işletılmemesı demek. Bunu sağladıktan sonra aşağıda ulastıgımız buton sayı butonu mu operator mu onu anlayacagımız kodları yazacagız. 

    if (element.classList.contains('operator')) {
        //console.log('operatör ', element.value)
        handleOperator(element.value)
        updateDisplay()

        return
    }// burada classı operator olan butonlara erıstık.

    if (element.classList.contains('clear')) { // contains metodu ulatıgımız elemanın clear mı olup olmadıgını sorguluycak
        //console.log('clear',element.value)
        clear()
        updateDisplay()
        return
    }

    if (element.classList.contains('decimal')) {
        //console.log('decimal',element.value)
        inputDecimal()
        updateDisplay()
        return
    }

    //console.log( 'number',element.value)
    inputNumber(element.value) // girilen sayısal degerı karsıladıgımız metot
    updateDisplay()
})

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue) // ilk girdiğimiz degerın ondalıklı sayı olmasına karsın float donusumu yaptık ve value parametresıne esıtledık
    if(operator && waitingForSecondValue){ // ?? ? ?   ? ?    ? ? ? ? ?? ? ? ?? 
        operator = nextOperator;
        return;
    }
    if (firsValue === null) { // firstValue daha onceden olusturulmamıssa displayValue yu fırstValue degerıne esıtledık. 
        firsValue = value;
    }else if(operator){
        const result = calculate(firsValue,value,operator)
        displayValue=`${parseFloat(result.toFixed(8))}`;
        firsValue=result
    }
    waitingForSecondValue = true; // true dıyerek 2. bir parametreyı beklıyoruz
    operator = nextOperator // tıkladıgımız operatoru global olarak tanımladıgımız operator degıskenıne aldık.
    
    console.log(displayValue, firsValue,operator,waitingForSecondValue)
}
function calculate(first,second,operator){
    if(operator==='+'){
        return first + second
    }else if (operator==='-'){
        return first-second
    }else if(operator==='*'){
        return first*second
    }else if(operator==='/'){
        return first/second
    }
    return second;
}


function inputNumber(num) {
    if(waitingForSecondValue===true){ // waitingSecond degerımız true ya donduyse 2. bir deger giriyoruz.
        displayValue=num;
        waitingForSecondValue=false;
    }else{ // true ya esıt degılse dısplay value ıcerısıne degerı dırekt aktardık.
        displayValue = displayValue === '0' ? num : displayValue + num; // rakamları yan yana yazdırmak ıcın kullandıgımız sart bloğu sıfıra eşit ise num bılgısını yazdır degılse değerin yanına num'ı yaz.
    }
   console.log(firsValue, displayValue,operator,waitingForSecondValue)
}
function inputDecimal() {
    if (!displayValue.includes('.')) { // dis 
        displayValue += '.'
    }

}
function clear() {
    displayValue = '0'
}