import { createComponent } from ".";

export function bootstrap(container, Ctor, args) {
  const instance = createComponent(Ctor, args);
  container.appendChild(instance);
}
