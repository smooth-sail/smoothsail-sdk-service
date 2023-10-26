import { Rule } from "./rule";

export class Segment {
  constructor({ s_key, rules_operator, rules }) {
    this.s_key = s_key;
    this.rules_operator = rules_operator;
    this.rules = [];
    if (rules && rules.length !== 0) {
      rules.forEach((rule) => {
        this.rules.push(new Rule(rule));
      });
    }
  }

  updateSegmentBody({ s_key, rules_operator, rules }) {
    this.s_key = s_key;
    this.rules_operator = rules_operator;
    this.rules = [];
    if (rules && rules.length !== 0) {
      rules.forEach((rule) => {
        this.rules.push(new Rule(rule));
      });
    }
  }

  addRule(rule) {
    this.rules.push(new Rule(rule));
  }

  removeRule(removeRule) {
    let newRules = this.rules.filter(
      (rule) => rule["r_key"] !== removeRule["r_key"]
    );
    this.rules = newRules;
  }

  updateSegmentRule(updatedRule) {
    let updatedRules = this.rules.map((rule) => {
      if (updatedRule["r_key"] === rule["r_key"]) {
        return new Rule(updatedRule);
      } else {
        return rule;
      }
    });
    this.rules = updatedRules;
  }
}
