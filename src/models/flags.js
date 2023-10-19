class Flag {
  constructor({ title, description, is_active }) {
    this.title = this.validateTitle(title);
    this.description = this.validateDescription(description);
    this.is_active = this.validateIsActive(is_active);
  }
  validateTitle(title) {
    if (!title) {
      throw new Error({ error: "Title is required" });
    }

    if (title.length > 100) {
      title = title.slice(0, 100);
    }

    return title;
  }
  validateDescription(description) {
    if (!description) {
      description = "";
    }

    return description;
  }
  validateIsActive(is_active) {
    if (is_active === true || is_active === false) {
      return is_active;
    }

    return false;
  }
  updateAttr({ title, description, is_active }) {
    if (title) {
      this.title = this.validateTitle(title);
    }

    if (description) {
      this.description = this.validateDescription(description);
    }

    this.is_active = this.validateIsActive(is_active);
  }
}

export default Flag;
