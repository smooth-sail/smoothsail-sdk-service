export class Rule {
  constructor({ r_key, type, operator, value, a_key }) {
    this.r_key = r_key;
    this.type = type;
    this.operator = operator;
    this.value = value;
    this.a_key = a_key;
  }

  isTrue(userContext) {
    const userAttr = userContext[this.a_key];
    const value = this.value;
    let regex;

    switch (this.operator) {
      case "is":
      case "=":
        return userAttr === value;
      case "is not":
      case "!=":
        return userAttr !== value;
      case "contains":
        regex = new RegExp(value);
        return regex.test(userAttr);
      case "does not contain":
        regex = new RegExp(value);
        return !regex.test(userAttr);
      case ">=":
        return userAttr >= value;
      case "<=":
        return userAttr <= value;
      case "exists":
        return !!userAttr;
      case "does not exist":
        return !userAttr;
      default:
        return false;
    }
  }
}
