// Number generator
function numberGenerator(generateNoUpto) {
    let random = Math.floor(Math.random() * generateNoUpto + 1);
    return random;
}

// Operator Generator
function operatorGenerator() {
    let random = Math.floor(Math.random() * 4);
    let operand = ["+", "-", "*", "/"];
    return operand[random];
}

// questionGenerator function arguments
// x: how many operator we need in equation
// y: number upto which operand number must be
// n: if we need same type of operator or random operators
//    n = either (1 or 0) or (true or false) 1 or true for same operator
// 0: if "n" is true then it take operator which we want such as "+", "-", "*", "/"
// example: questionGenerator(2, 455, true, "*");


// Question generator
function questionGenerator(x, y, n, o) {
    let operator = [];
    let operand = [];
    let q = "";

    for (let i = 0; i < x; i++) {
        operator.push(operatorGenerator());
    };
    for (let i = 0; i < x + 1; i++) {
        operand.push(numberGenerator(y));
    };

    if (n === 1 || n === true) {
        for (let i = 0; i < x + 1; i++) {
            if (i < x) {
                q += operand[i] + o;
            } else {
                q += operand[i];
            }
        }
    } else {
        for (let i = 0; i < x + 1; i++) {
            if (i < x) {
                q += operand[i] + operator[i];
            } else {
                q += operand[i];
            }
        }
    }

    //Option Generator
    function optionGenerator(q) {
        let value = "";
        if (eval(q) >= (-1) || eval(q) <= 1) {
            value = eval(eval(q) + operatorGenerator() + Math.random());
        } else {
            value = eval(eval(q) + operatorGenerator + Math.random(Math.pow(10, (Math.trunc(eval(q))).toString().length)));
        }
        return value;
    }

    // Handling option generation
    let option = ["", "", "", ""];
    let corr = Math.floor(Math.random() * 3);

    if ((eval(q) > 1 || eval(q) < -1) && eval(q) !== Math.trunc(eval(q))) {
        option[corr] = eval(q).toFixed(2);
    } else {
        option[corr] = eval(q);
    }

    for (let i = 0; i < 4; i++) {
        // Requiire better option generation Algorithm
        if (i !== (corr)) {
            if (eval(q) === Math.trunc(eval(q))) {
                option[i] = Math.floor(parseInt(optionGenerator(q)));
                // require better option generation techniqe
                while (option[i] == option[corr]) {
                    option[i] = Math.floor(parseInt(optionGenerator(q)));
                }
            } else if ((eval(q) > 1 || eval(q) < -1) && eval(q) !== Math.trunc(eval(q))) {
                option[i] = Number.parseFloat(optionGenerator(q)).toFixed(2);
            } else {
                option[i] = optionGenerator(q);;
            }
        }
    }


    // sending questions and options to object
    data.question.push(q);
    data.opt.push(option);
    data.corrOption.push(corr);
}


// Oject for storing data
let data = {
    level: "",
    question: [],
    opt: [],
    corrOption: [],
}


let counter = -1;

function clicked() {
    counter += 1;
    questionGenerator(1, 100);
    document.getElementById("question").innerHTML = "Q" + (counter + 1) + ". What is value of " + data.question[counter];
    document.getElementById("option1").innerHTML = "(a). " + data.opt[counter][0];
    document.getElementById("option2").innerHTML = "(b). " + data.opt[counter][1];
    document.getElementById("option3").innerHTML = "(c). " + data.opt[counter][2];
    document.getElementById("option4").innerHTML = "(d). " + data.opt[counter][3];

    // console logs
    console.log("Question:", (counter+1), data.question[counter]);
    console.log("Answer: ", eval(data.question[counter]));
    console.log("Options: ", data.opt);

    if (counter > 8) {
        counter = -1;
        data.question = [];
        data.opt = [];
    }
}



