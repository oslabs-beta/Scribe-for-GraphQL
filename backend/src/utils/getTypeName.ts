export const getTypeName = (typeDef: string) => {
  const typeName = typeDef.match(/type\s+(\w+)\s+{/i);
  if (typeName) {
    return typeName[1];
  }
  return false;
};
