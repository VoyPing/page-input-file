import { type App } from 'vue';

const shared: Record<string, any> = import.meta.glob('./components/shared/*.vue', { eager: true });

export default function loadComponents(app: App<Element>) {
  for (const path in shared) {
    const componentName = path.split('/').at(-1)?.split('.')[0];
    app.component(`${componentName}`, shared[path].default);
  }
}
