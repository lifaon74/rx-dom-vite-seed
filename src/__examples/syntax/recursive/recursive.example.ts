import { bootstrap } from '../../../component/bootstrap';
import { AppRecursiveExampleComponent, IAppRecursiveExampleComponentConfig } from './component/recursive-example.component';

export function recursiveExample() {
  const node = bootstrap(AppRecursiveExampleComponent);

  const generateConfig = (
    name: string,
    childrenCount: number,
    depth: number,
  ): IAppRecursiveExampleComponentConfig => {
    return {
      name,
      children: (depth <= 0)
        ? []
        : Array.from({ length: 10 }, (_, index: number): IAppRecursiveExampleComponentConfig => {
          return generateConfig(`${name}-${index}`, childrenCount, depth - 1);
        }),
    };
  };

  node.sources.set('config', generateConfig(`node-0`, 10, 3));

  // setTimeout(() => node.detach(), 2000);
}
