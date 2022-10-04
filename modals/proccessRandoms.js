function generator(rad) {
  const arr = [];
  const obj = {};

  for (let index = 1; index <= 1000; index++) {
    arr.push({ id: index, amount: 0 });
  }

  for (let index = 0; index < rad; index++) {
    let numb = Math.floor(Math.random() * 1000 + 1);
    ++arr[numb - 1].amount;
  }
  arr.forEach((element) => {
    obj[element.id] = element.amount;
  });
  return obj;
}

process.on("message", (msg) => {
  if (msg.type === "calculate") {
    const result = generator(msg.radius);
    process.send(result);
  }
});