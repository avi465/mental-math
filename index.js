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
// o: if "n" is true then it take operator which we want such as "+", "-", "*", "/"
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
    data.option.push(option);
    data.correctOption.push(corr);
}

// Oject for storing data
let data = {
    level: "",
    question: [],
    option: [],
    correctOption: [],
    choosenOption: []
}



// Dom manipulations
let score = 0;
let percentScore = 0;
let counter = -1;
let chsnOptCounter = -1;

//on loading function
window.onload = load;

function load() {
    document.getElementById("landing").style.display = "initial";
    document.getElementById("menu").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "none";
}

// landing Page
function landingPage() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("menu").style.display = "initial";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "none";
}

function start() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("quiz").style.display = "initial";
    document.getElementById("result").style.display = "none";
    render();
}

function render(clicked) {
    counter += 1;
    questionGenerator(1, 100);
    document.getElementById("question").innerHTML = "Q" + (counter + 1) + ". What is value of " + data.question[counter];
    document.getElementById("0").innerHTML = "(a). " + data.option[counter][0];
    document.getElementById("1").innerHTML = "(b). " + data.option[counter][1];
    document.getElementById("2").innerHTML = "(c). " + data.option[counter][2];
    document.getElementById("3").innerHTML = "(d). " + data.option[counter][3];

    // if (clicked) {
    //     chsnOptCounter += 1;
    //     data.choosenOption.push(clicked);
    // }

    // console logs
    console.log("Question:", (counter + 1), data.question[counter]);
    console.log("Answer: ", eval(data.question[counter]));
    console.log("Options: ", data.option);
    console.log("correct options", data.correctOption);
    console.log("choosen option", data.choosenOption);

    // if (counter === 9) {
    //     for (let i = 0; i <= counter; i++) {
    //         document.getElementById("q" + i).innerHTML = data.question[i];
    //         document.getElementById(i + "0").innerHTML = data.option[i][0];
    //         document.getElementById(i + "1").innerHTML = data.option[i][1];
    //         document.getElementById(i + "2").innerHTML = data.option[i][2];
    //         document.getElementById(i + "3").innerHTML = data.option[i][3];

    //     }
    // }

// if (data.choosenOption.length == 9) {
//     for (let i = 0; i < 9; i++) {
//         if (data.option[i][data.correctOption[i]] == data.option[i][data.choosenOption[i]]) {
//             score += 10;
//             percentScore = (score/100)*100;
//             console.log("score: ",score);
//             console.log("percent: ", percentScore);
//         }
        
//     }
// }

    // if (counter > 8) {
    //     counter = -1;
    //     data.question = [];
    //     data.option = [];
    //     data.correctOption = [];
    // };

}