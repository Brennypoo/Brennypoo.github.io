const listOfPrompts = [];
const results = [];

function getResult(x, operator, y) {
    if (isNaN(x)) {return "Incorrect Input"}
    else if (isNaN(y)) {return "Incorrect Input"}
    else if (operator=="+"){return parseFloat(x) + parseFloat(y)}
    else if (operator=="-"){return parseFloat(x) - parseFloat(y)}
    else if (operator=="*"){return parseFloat(x) * parseFloat(y)}
    else if (operator=="x"){return parseFloat(x) * parseFloat(y)}
    else if (operator=="%"){return parseFloat(x) % parseFloat(y)}
    else if (operator=="/"){return parseFloat(x) / parseFloat(y)}
    else{ return "Improper Operation"}
}

function promptUser() {listOfPrompts.push({ x: prompt("Value of x"),operator: prompt("Operator"),y: prompt("Value of y"),});}

do {promptUser();} while (confirm("continue?"));

listOfPrompts.forEach(obj => { obj.result = getResult(obj.x, obj.operator, obj.y) });
document.write("<table>");
document.write('<tr> <th>x</th> <th>operator</th> <th>y</th> <th>result</th> </tr>');
listOfPrompts.forEach(obj => { document.write(`<tr><td>${obj.x}</td> <td>${obj.operator}</td> <td>${obj.y}</td> <td>${obj.result} </td></tr>`)});
document.write("</table>");
listOfPrompts.forEach(obj => {
    if (typeof obj.result != 'string') { results.push(getResult(obj.x, obj.operator, obj.y)) } });
document.write("<table>");
document.write("<tr><th>Min</th> <th>Max</th> <th>Average</th> <th>Total</th> </tr>");
document.write(`<tr><td>${Math.min.apply(Math, results).toString()}</td> <td>${Math.max.apply(Math, results).toString()}</td> <td>${(results.reduce((a, b) => a + b, 0) / results.length).toString()}</td> <td>${(results.reduce((a, b) => a + b, 0)).toString()}</td> </tr>`);
document.write("</table>");
