declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  const withInstall: any;
  export { component, withInstall }; 
  export default component;
}