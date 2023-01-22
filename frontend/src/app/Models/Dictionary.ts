//https://stackoverflow.com/questions/38213926/interface-for-associative-object-array-in-typescript/38213971#38213971

export interface Dictionary<Type> {
    [key: string]: Type;
 }