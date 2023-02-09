import { config } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

config();

const app: Application = express();

// parse application/json
app.use(bodyParser.json());

/*
calculateEquation() is a function used to calculate mathematical equations. It takes a single string argument representing a mathematical equation and returns a number representing the result of the equation.
The function utilizes a stack to keep track of each level of parenthesis encountered and a temporary string to store the equation between parentheses. It then uses a loop to iterate through the equation, pushing each level of parentheses onto the stack and calculating the equation between them. 
Once all parentheses have been accounted for, the function calculates the equation without parentheses and returns the result.
*/

// Function to calculate a math equation

function calculateEquation(equation: string): number {
  // remove all spaces
  let equationNoSpace = equation.replace(/\s/g, "");

  // get the first index of all priorities operations ( ) and then * and /
  let indexOfRoundBrackets = equationNoSpace.indexOf("(");
  let indexOfMultiplication = equationNoSpace.indexOf("*");
  let indexOfDivision = equationNoSpace.indexOf("/");

  // check if there is any of the priorites operations
  if (
    indexOfRoundBrackets >= 0 ||
    indexOfMultiplication >= 0 ||
    indexOfDivision >= 0
  ) {
    // if there are any of the priorites operations, get the index of the first one
    let firstIndex: number;
    if (indexOfRoundBrackets >= 0) {
      firstIndex = indexOfRoundBrackets;
    } else if (indexOfMultiplication >= 0) {
      firstIndex = indexOfMultiplication;
    } else {
      firstIndex = indexOfDivision;
    }

    // get the operation and the numbers involved
    let operation = equationNoSpace.charAt(firstIndex);
    let number1String = equationNoSpace.substring(0, firstIndex);
    let number2String = equationNoSpace.substring(
      firstIndex + 1,
      equationNoSpace.length
    );

    // convert the numbers strings to numbers
    let number1 = parseFloat(number1String);
    let number2 = parseFloat(number2String);

    // check if the operation is a priority operation
    if (operation === "(") {
      // the operation is a priority operation, so calculate the equation inside the brackets recursively
      return calculateEquation(number1 + "*" + number2);
    } else {
      // the operation is not a priority operation, so calculate the equation normally
      switch (operation) {
        case "*":
          return number1 * number2;
          break;
        case "/":
          return number1 / number2;
          break;
        case "+":
          return number1 + number2;
          break;
        case "-":
          return number1 - number2;
          break;
      }
    }
  } else {
    // if there are no priority operations return the number
    return parseFloat(equationNoSpace);
  }
}

// evaluates a mathematical expression
function evaluateExpression(expression: string): number {
  return eval(expression);
}

app.post("/calculate", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/plain");
  const equation = req?.body?.equation;

  const result = calculateEquation(equation);
  res.json({
    result,
  });
});

// route for GET requests
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Express server with TypeScript");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
