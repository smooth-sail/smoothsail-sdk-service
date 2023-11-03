import bcrypt from "bcrypt";
import jsm from "../nats";

class Key {
  constructor() {
    this.key = undefined;
  }

  async storeKey(key) {
    this.key = await this.hashSdkKey(key);
  }

  noKeyInMemory() {
    return this.key === undefined;
  }

  async compareKeyAgainstKeyMemory(otherKey) {
    console.log("compared to key from memory");
    const match = await bcrypt.compare(otherKey, this.key);
    return match;
  }

  clearKeyInMemory() {
    this.key = undefined;
  }

  async compareKeyAgainstManager(key) {
    const allowAccess = await jsm.validateSdkKey(key);
    console.log("fetched key from manager..");
    console.log("allow access results: ", allowAccess);
    if (allowAccess["isValid"]) {
      console.log("is this working...");
      this.storeKey(key);
      return true;
    }

    return false;
  }

  async hashSdkKey(key) {
    const saltRounds = 10;
    const hashedKey = await bcrypt.hash(key, saltRounds);
    return hashedKey;
  }
}

let keyMemory = new Key();

export default keyMemory;
