import { Web5 } from "@tbd54566975/web5";

export const DidManager = {
  async createDids() {
    try {
      const didIon = await Web5.did.create("ion");
      console.info(`Did ion created, id is: ${didIon.id}`);

      const didKey = await Web5.did.create("key");
      console.info(`Did key created, id is: ${didKey.id}`);

      return { didIon, didKey };
    } catch (e) {
      console.error("Unable to create dids", e);
    }
  },
};
