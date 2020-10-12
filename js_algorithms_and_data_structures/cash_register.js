/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
cid is a 2D array listing available currency.
The checkCashRegister() function should always return an object with a status key and a change key.
Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
*/

var denom = [
  {name: "ONE HUNDRED", value: 100.0},
  {name: "TWENTY", value: 20.0},
  {name: "TEN", value: 10.0},
  {name: "FIVE", value: 5.0},
  {name: "ONE", value: 1.0},
  {name: "QUARTER", value: 0.25},
  {name: "DIME", value: 0.1},
  {name: "NICKEL", value: 0.05},
  {name: "PENNY", value: 0.01},
];

function checkCashRegister(price, cash, cid) {
  var change = cash - price;
  var register = cid.reduce(
    function (prev, curr) {
      prev.total += curr[1];
      prev[curr[0]] = curr[1];
      return prev;
    },
    {total: 0}
  );
  var obj = {status: null, change: []};
  if (register.total === change) {
    obj.status = "CLOSED";
    obj.change = cid;
    return obj;
  } else if (register.total < change) {
    obj.status = "INSUFFICIENT_FUNDS";
    return obj;
  }
  var arr = denom.reduce(function (prev, curr) {
    var value = 0;
    while (register[curr.name] > 0 && change >= curr.value) {
      value += curr.value;
      change -= curr.value;
      register[curr.name] -= curr.value;
      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      prev.push([curr.name, value]);
    }
    return prev;
  }, []);
  if (arr.length < 1 || change > 0) {
    obj.status = "INSUFFICIENT_FUNDS";
    return obj;
  }
  obj.status = "OPEN";
  obj.change = arr;
  return obj;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
