//CalcType Json object similar to Enum

var CalcType = { "AddType": 1, "SubtractType": 2, "MultiplyType": 3, "DivideType": 4 };

function cleanUp(numberArray) {
    $("#txtInput").val("0");
    $("#txtResult").css({ color: "black" }).val("0");
    //empty array
    numberArray.splice(0, numberArray.length);
}

function getResult(numberArray, calcType) {
    var result = 0;
    for (x in numberArray) {
        var temp = parseInt(numberArray[x]);
        var index = parseInt(x);
        calcType == CalcType.AddType ?
          result = temp + result :
        calcType == CalcType.SubtractType ?
          result = (index ? result - temp : temp) :
        calcType == CalcType.MultiplyType ?
          result = (index ? result * temp : temp) : 0;

        if (CalcType.DivideType == calcType) {
            if (temp == 0 && index > 0) {
                $("#txtInput").val("You cannot divide by zero!");
                break;
            }
            else
                result = (index ? result / temp : temp);
        }
    }

    cleanUp(numberArray);
 
    $("#txtResult").css({ color: "red" }).val(result);
}

$(document).ready(function () {

    var numberArray = [];
    var calculateType = 0;
    var btnval = 0;
    var accumNum2;

    $("#txtInput").on("gatherVals", function (event, temp) {

        var newVal;
        if (accumNum2) {
            numberArray.push(temp);
            newVal = temp;
            accumNum2 = 0;
        }
        else {
            if (numberArray.length) {
                var arrayVal = numberArray.pop();
                if (parseInt(arrayVal) == Number.MAX_VALUE) {
                    numberArray.push(arrayVal);
                    alert("Entered maximum allowed value - Clear (CE / C) entry and start over!")
                }
                else
                    newVal = arrayVal + temp;
            }
            else
                newVal = temp;

            numberArray.push(newVal);
        }
        $("#txtInput").val(newVal);
    });

    $(".numberGrp button").click(function () {

        var temp = $(this).html();

        $("#txtInput").triggerHandler("gatherVals", temp);
    });

    $("#btnClearEntry").click(function () {
        $("#txtInput").val("0");
        if (numberArray.length)
            numberArray.pop();
    });

    $("#btnClear").click(function () {
        cleanUp();
    });

    $(".calculateBtns button").click(function () {
        accumNum2 = 1;
        var buttonType = $(this).val();

        switch (buttonType) {
            case "btnPlus":
                btnval = 1;
                break;
            case "btnMinus":
                btnval = 2;
                break;
            case "btnMultiply":
                btnval = 3;
                break;
            case "btnDivide":
                btnval = 4;
                break;
            default:
                break;
        }
    });

    $("#equalBtn").click(function () {
        getResult(numberArray, btnval);
    });
});

