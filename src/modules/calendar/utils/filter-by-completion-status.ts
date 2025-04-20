type CompletableItem = {
  isDone: boolean;
};

export const filterByCompletionStatus = <T extends CompletableItem>(
  item: T,
  selectedOption: string
): boolean => {
  if (selectedOption === 'left') return !item.isDone;
  if (selectedOption === 'done') return item.isDone;
  return true;
};
