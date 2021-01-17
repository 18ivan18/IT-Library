export function createComponent(Ctor, args) {
  const instance = new Ctor(args);
  return instance;
}
