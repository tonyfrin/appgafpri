function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

function getItem<T>(itemName: string, initialValue: T): T {
  if (!hasWindow()) {
    return initialValue;
  }

  const localStorageItem = window.localStorage.getItem(itemName);
  let parsedItem: T;

  if (!localStorageItem) {
    window.localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem) as T;
  }

  return parsedItem;
}

const saveItem = <T>(itemName: string, newItem: T): void => {
  if (hasWindow()) {
    const stringifiedItem = JSON.stringify(newItem);
    window.localStorage.setItem(itemName, stringifiedItem);
  }
};

export { getItem, saveItem };
