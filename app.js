import Select from './select/select';

const select = new Select('#select', {
  placeholder: 'Выбери элемент',
  selectedId: 4,
  data: [
    { id: 1, value: 'React' },
    { id: 2, value: 'React Native' },
    { id: 3, value: 'Angular' },
    { id: 4, value: 'Vue' },
    { id: 5, value: 'Next' },
    { id: 6, value: 'Nest' },
  ],
  onSelect(item) {
    console.log('Selected item', item);
  },
});

window.select = select;
