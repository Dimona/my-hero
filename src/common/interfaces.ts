interface IIterator<T> {
  // Return the current element.
  current(): T;

  // Return the current element and move forward to next element.
  next(): T;

  // Return the key of the current element.
  key(): number;

  // Checks if current position is valid.
  valid(): boolean;
}

interface Aggregator<T> {
  // Retrieve an external iterator.
  getIterator(): IIterator<T>;
}
