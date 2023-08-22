export const checkFetchErrorFirstLetter = (selected: string, inputValue: string) => {
  if (selected === 'firstLetter' && inputValue.length !== 1) {
    return window.alert('Your search must have only 1 (one) character');
  }
};
