class Flag {
  constructor({ title, description, is_active }) {
    this.title = Flag.parseTitle(title);
    this.description = Flag.parseDescription(description);
    this.is_active = Flag.setIsActive(is_active);
  }

  static parseTitle(title) {
    if (!Flag.validateTitle(title)) {
      throw new Error({ error: "Title is required" });
    }

    if (title.length > 100) {
      title = title.slice(0, 100);
    }

    return title;
  }

  static validateTitle(title) {
    return !!title;
  }

  static parseDescription(description) {
    if (!Flag.validateDescription(description)) {
      description = "";
    }

    return description;
  }

  static validateDescription(description) {
    return !!description;
  }

  static setIsActive(is_active) {
    if (is_active === true || is_active === false) {
      return is_active;
    }

    return false;
  }

  updateProps({ title, description, is_active }) {
    if (title) {
      this.title = Flag.parseTitle(title);
    }

    if (description) {
      this.description = Flag.parseDescription(description);
    }

    this.is_active = Flag.setIsActive(is_active);
  }
}

export default Flag;
