function evaluateCondition(value, condition) {
  if (typeof condition !== 'string') return false;

  const operatorMatch = condition.match(/^(>=|<=|>|<|=)/);
  if (!operatorMatch) return false;

  const operator = operatorMatch[0];
  const threshold = condition.slice(operator.length).trim();

  switch (operator) {
    case '>':
      return Number(value) > Number(threshold);
    case '<':
      return Number(value) < Number(threshold);
    case '>=':
      return Number(value) >= Number(threshold);
    case '<=':
      return Number(value) <= Number(threshold);
    case '=':
      return String(value).toLowerCase() === threshold.toLowerCase(); // support strings
    default:
      return false;
  }
}

function evaluateCustomer(customer, rule) {
  for (let field in rule) {
    const condition = rule[field];
    const customerValue = customer[field];

    if (!evaluateCondition(customerValue, condition)) {
      return false; 
    }
  }
  return true; // all rules passed
}

module.exports = { evaluateCustomer };
