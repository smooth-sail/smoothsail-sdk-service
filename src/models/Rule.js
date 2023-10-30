export class Rule {
  constructor({ rKey, type, operator, value, aKey }) {
    this.rKey = rKey;
    this.type = type;
    this.operator = operator;
    this.value = value;
    this.aKey = aKey;
  }
}
