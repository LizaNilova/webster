export default () : number[] =>  {
    const numbers = [];
    for (let i = 0; i <= 3; i += 1) {
        numbers.push(Math.floor(Math.random() * (9 - 0) + 0));
    }
    return numbers;
}