type Processes = '+' | '-' | '*' | '÷' | '=' | 'AC' | '%' | '^²' | '²√'
const processesLabels = ['+' , '-' , '*' , '÷' , '=' , 'AC' , '%' , '^²' , '²√']

let buttonLabels : (string | Processes)[] =[
    'AC' , '=' , '^²' , '²√' ,
    '1' , '2' , '3' , '*' ,
    '4' , '5' , '6' , '÷' ,
    '7' , '8' , '9' , '+' ,
    '.' , '0' , '%' , '-'
]

let keyboard = document.querySelector(".keyboard")as HTMLDivElement;
let head = document.querySelector(".head")as HTMLDivElement;

for(let i: number = 0 ; i < buttonLabels.length ; i++){
    let row = document.createElement("div")as HTMLDivElement
    row.className = "row"
   
    let buttons = document.createElement("input")as HTMLInputElement;
    buttons.addEventListener("click", click)
    buttons.type = "button"
    buttons.className = 'button';
    buttons.value = buttonLabels[i];
            
    row.appendChild(buttons);
    keyboard.appendChild(row);
}
function click(event : Event){
    const buttons = event.currentTarget as HTMLInputElement;
    if(processesLabels.includes(buttons.value)){
        if(buttons.value === '²√' ){
            if(calculationResult.currentNumber === ''){
                alert("ابتدا یک عدد وارد کنید!")
                return
            }
            else calculationResult.currentNumber =  Math.sqrt(+calculationResult.currentNumber).toString();
            head.innerHTML = calculationResult.currentNumber;
        }
        else if(buttons.value === 'AC'){
            calculationResult.clear() ; 
            head.innerHTML = ''
        }
        else if(buttons.value === '^²'){
            calculationResult.currentNumber =  (+calculationResult.currentNumber * +calculationResult.currentNumber).toString()
            head.innerHTML = calculationResult.currentNumber;
        }
        else if(buttons.value === '='){
            calculationResult.calculate() ; 
            head.innerHTML = calculationResult.currentNumber ;
        }
        else if(calculationResult.currentNumber === ''){
            alert("ابتدا یک عدد وارد کنید!")
            return
        }
        else{
            calculationResult.chooseOperation(buttons.value as Processes);
            head.innerHTML = buttons.value
            }
        }
    else{
        calculationResult.selectingNumber(buttons.value)
        head.innerHTML = calculationResult.currentNumber ;
    }
}

interface ICaculator {
    currentNumber : string ;
    previousNumber : string ;
    operations : Processes | undefined ;

    selectingNumber(number : string): void
    chooseOperation(operator: Processes): void;
    calculate(): void ; 
    clear():void ;
}
class Calculator implements ICaculator{
    constructor(
        public currentNumber : string ,
        public previousNumber : string ,
        public operations : Processes | undefined 
    ){}
    selectingNumber(number : string): void{
        console.log(number);
        if(number === '.'){
            if(this.currentNumber.includes('.'))
                return
        }
        this.currentNumber += number
    }
    chooseOperation(operator: Processes): void{
        this.operations = operator ;
        this.previousNumber = this.currentNumber ;
        this.currentNumber = '' ;
    }
    calculate(): void {
        switch(this.operations){
            case '*' :
                this.currentNumber =  (+this.previousNumber * +this.currentNumber).toString()
                break ;
            case '÷' : 
                if(+this.currentNumber === 0){
                  alert("تقسیم بر صفر مجاز نیست!")
                 return
                }
                this.currentNumber =  (+this.previousNumber / +this.currentNumber).toString()
                break ;
            case '+' :
                this.currentNumber =  (+this.previousNumber + +this.currentNumber).toString()
                break ;
            case '-' :
                this.currentNumber =  (+this.previousNumber - +this.currentNumber).toString()
                break ;
            case '%' :
                this.currentNumber =  (+this.previousNumber % +this.currentNumber).toString()
                break ;
        }
    }
    clear(): void {
        this.currentNumber = ''
        this.previousNumber = ''
        this.operations = undefined
    }
}
let calculationResult = new Calculator('' , '' , undefined);