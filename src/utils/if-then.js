import { directive } from "lit-html";

export const ifThen = directive((cond, html) => (part) => {
  part.setValue(cond ? html : "");
});
