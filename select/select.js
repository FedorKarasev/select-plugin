class Select {
  constructor(selector, options) {
    this.el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;
    this.#render();
    this.#setup();
  }

  open() {
    this.el.classList.add('open');
    this.arrow.classList.remove('fa-chevron-down');
    this.arrow.classList.add('fa-chevron-up');
  }

  close() {
    this.el.classList.remove('open');
    this.arrow.classList.remove('fa-chevron-up');
    this.arrow.classList.add('fa-chevron-down');
  }

  destroy() {
    this.el.removeEventListener('click', this.handleClick);
    this.el.innerHTML = ' ';
  }

  handleClick(event) {
    const { type } = event.target.dataset;

    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      this.el.querySelectorAll('[data-type="item"]').forEach((item) => item.classList.remove('selected'));
      this.select(event.target.dataset.id);
      this.close();
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  select(id) {
    this.selectedId = id;
    this.selectedValue.textContent = this.getCurrentSelectedItem().value;
    this.el.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.options.onSelect ? this.options.onSelect(this.getCurrentSelectedItem(id)) : null;
  }

  getCurrentSelectedItem() {
    return this.options.data.find((item) => item.id == this.selectedId);
  }

  get isOpen() {
    return this.el.classList.contains('open');
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  #render() {
    const { data, placeholder } = this.options;
    this.el.classList.add('select');
    this.el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.handleClick = this.handleClick.bind(this);
    this.el.addEventListener('click', this.handleClick);
    this.arrow = this.el.querySelector('[data-type="arrow"]');
    this.selectedValue = this.el.querySelector('[data-type="selectedValue"]');
  }
}

function getTemplate(data = [], placeholder = 'Список элементов', selectedId) {
  let items = data
    .map((item) => {
      if (item.id == selectedId) {
        placeholder = item.value;
      }
      return `<li data-type="item" data-id="${item.id}" class="select__item ${
        item.id == selectedId ? 'selected' : ''
      }">${item.value}</li>`;
    })
    .join('');

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
    <span data-type="selectedValue">${placeholder}</span>
    <i data-type="arrow" class="fa-solid fa-chevron-down"></i>
    </div>
    <div class="select__dropdown">
    <ul class="select__list">
    ${items}
    </ul>
    </div>
    `;
}

export default Select;
