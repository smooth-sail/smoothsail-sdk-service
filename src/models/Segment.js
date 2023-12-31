import { Rule } from "./Rule";

export class Segment {
  constructor({ sKey, rulesOperator, rules }) {
    this.sKey = sKey;
    this.rulesOperator = rulesOperator;
    this.rules = [];
    if (rules && rules.length !== 0) {
      rules.forEach((rule) => {
        this.rules.push(new Rule(rule));
      });
    }
  }

  updateSegmentBody({ sKey, rulesOperator }) {
    this.sKey = sKey;
    this.rulesOperator = rulesOperator;
  }

  addRule(rule) {
    this.rules.push(new Rule(rule));
  }

  removeRule(removeRule) {
    let newRules = this.rules.filter(
      (rule) => rule["rKey"] !== removeRule["rKey"]
    );
    this.rules = newRules;
  }

  updateSegmentRule(updatedRule) {
    let updatedRules = this.rules.map((rule) => {
      if (updatedRule["rKey"] === rule["rKey"]) {
        return new Rule(updatedRule);
      } else {
        return rule;
      }
    });
    this.rules = updatedRules;
  }
}
