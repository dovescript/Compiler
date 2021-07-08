# Solve Strategy

## Lexical References

By default, a lexical reference resolves to a variable, virtual or method slot, except where type expressions are expected. When the context tells the dot operator follows the lexical reference, then the lexical reference resolves to either a type, module, variable slot, virtual slot or method slot, based on which declaration supports the member name of the dot operator.

## Conversions

When `CType` or `CTryCast` result into `ConversionValue`, adjust the corresponding properties: `byCType` and `byTryCast`.