let question = document.getElementsByClassName("question");
let option1 = document.getElementsByClassName("option1");
let option2 = document.getElementsByClassName("option2");
let option3 = document.getElementsByClassName("option3");
let option4 = document.getElementsByClassName("option4");

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

// console logs
for(let i=0; i<10; i++){
questionGenerator(1, 100);

console.log("Question:",i, data.question[i]);
console.log("Answer: ", eval(data.question[i]));
console.log("Options: ", data.opt[i]);
};