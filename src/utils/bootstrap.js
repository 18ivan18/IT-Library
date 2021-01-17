import { createComponent } from ".";

export function bootstrap(container, Ctor, args) {
  const instance = createComponent(Ctor, args);
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  container.appendChild(instance);
}
