$(document).ready(function() {

    let previousNumber = 0.0;
    let previousOperation = "";
    let resetCheck = false

    console.log("ready!");

    const getNewDisplay = (number) => {
        let newDisplay = "";
            let wholeNumber = "" + Math.floor(parseFloat(number));
            let decimal = "" + (number - wholeNumber).toFixed(2).substring(2);
            console.log(decimal)
            console.log(wholeNumber)

            let counter = 0;
            for(let i = wholeNumber.length - 1; i >= 0; i--){
                if(counter % 3 == 0 && counter != 0){
                    newDisplay = wholeNumber[i] + "," + newDisplay;
                }
                else{
                    newDisplay = wholeNumber[i] + newDisplay;
                }
                counter++;
            }
            if(decimal != 0){
                newDisplay += "." + decimal;
            }

            console.log("this is new: " + newDisplay)

            $(".display").children().text(newDisplay);
    }

    $(".theme").each(function(){
        $(this).on("click", function(){
            $(".theme").each(function(){
                $(this).children().attr("checked", false)
            
            })

            $(this).children().attr("checked", true)
        })
    })

    $(".keypadNumbers").each(function(){
        $(this).on("click", function(){
            const number = $(this).text();
            const display = $(".display").children().text();

            let noComma = display.replaceAll(',', '');
            noComma += number;

            if(!resetCheck){
                if(display.indexOf(".") !== -1){
                    $(".display").children().text(display + number);
                }
                else{
                    getNewDisplay(noComma);
                }
            }
            else{
                    getNewDisplay(number);
                    resetCheck = false;
            }
        })
    })

    $(".deleteButton").on("click", function(){
        const display = $(".display").children().text();

        getNewDisplay(display.substring(0, display.length - 1).replaceAll(',', ''));

    })

    $(".resetButton").on("click", function(){
        $(".display").children().text("");
        previousNumber = 0;
    })

    $(".operation").each(function(){
        $(this).on("click", function(){
            const operation = $(this).text();
            const display = $(".display").children().text();
            
            if(previousOperation == ""){
                previousNumber = parseFloat(display.replaceAll(',', ''));
            }
            else{
                switch(previousOperation){
                    case "+":
                        previousNumber += parseFloat(display.replaceAll(',', ''));
                        break;
                    case "-":
                        previousNumber -= parseFloat(display.replaceAll(',', ''));
                        break;
                    case "x":
                        previousNumber *= parseFloat(display.replaceAll(',', ''));
                        break;
                    case "/":
                        previousNumber /= parseFloat(display.replaceAll(',', ''));
                        break;
                }
            }
            $(".display").children().text("");

            previousOperation = operation;

        })
    })

    $(".decimalButton").on("click", function(){
        const display = $(".display").children().text();
        if(!display.includes(".")){
            $(".display").children().text(display + ".");
        }
    })

    $(".equalButton").on("click", function(){
        console.log(previousNumber)
        console.log(previousOperation)
        const display = $(".display").children().text();
        let newDisplay = "";
        switch(previousOperation){
            case "+":
                newDisplay = previousNumber + parseFloat(display.replaceAll(',', ''));
                break;
            case "-":
                newDisplay = previousNumber - parseFloat(display.replaceAll(',', ''));
                break;
            case "x":
                newDisplay = previousNumber * parseFloat(display.replaceAll(',', ''));
                break;
            case "/":
                newDisplay = previousNumber / parseFloat(display.replaceAll(',', ''));
                break;
            default:
                newDisplay = parseFloat(display.replaceAll(',', ''));
                break;
        }
        previousNumber = 0;
        previousOperation = "";
        resetCheck = true;
        getNewDisplay(newDisplay.toString());
    })

})