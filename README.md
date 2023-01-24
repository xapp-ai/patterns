# @xapp/patterns

Common TypeScript design patterns.

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

## Graph

A graph is a data structure with vertices and edges that make the connections between them.

## Tree

A tree is a data structure with a root and nodes that then expand from the root.

# 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
