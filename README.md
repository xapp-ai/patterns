# @xapp/patterns

Common TypeScript design patterns and data structures.

## Builder

Extend the `AbstractBuilder` to leverage your own builder pattern.

```typescript
import { AbstractBuilder } from "@xapp/patterns";

export interface MyObject {
  foo: string;
}

export class MyBuilder extends AbstractBuilder<MyObject> {
  private foo: string = "defaultFooValue";

  public withFoo(foo: string): MyBuilder {
    return this;
  }

  public build(): MyObject {
    const { foo } = this;
    return {
      foo,
    };
  }
}
```

- [Example - Unit Test](https://github.com/xapp-ai/patterns/blob/main/src/Builder/__test__/AbstractBuilder.test.ts)
- [Example - Real World](https://github.com/stentorium/stentor/blob/master/packages/stentor-request/src/Builders.ts)
- [Builder Pattern - Wikipedia](https://en.wikipedia.org/wiki/Builder_pattern)

## Graph

A graph is an abstract data type with vertices and edges that make the connections between them.

- [Example - Unit Test](https://github.com/xapp-ai/patterns/blob/main/src/Graph/__test__/AbstractGraph.test.ts)
- [Graph (abstract data type) - Wikipedia](<https://en.wikipedia.org/wiki/Graph_(abstract_data_type)>)

## Tree

A tree is a data structure with a root and nodes that then expand from the root.

- [Example - Unit Test](https://github.com/xapp-ai/patterns/blob/main/src/Tree/__test__/AbstractTree.test.ts)
- [Tree (data structure) - Wikipedia](<https://en.wikipedia.org/wiki/Tree_(data_structure)>)
