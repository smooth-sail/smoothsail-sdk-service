export class Rule {
  constructor({ r_key, type, operator, value, a_key }) {
    this.r_key = r_key;
    this.type = type;
    this.operator = operator;
    this.value = value;
    this.a_key = a_key;
  }
}
