export default class ColumnChart {

  constructor({
                data = [],
                label = '',
                value = '',
                link = ''
              } = {}) {

    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.chartHeight = 50;

    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
        <div class="column-chart ${!this.data.length ? 'column-chart_loading' : ''}" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                Total ${this.label}
                ${this.getLink()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.value}</div>
                <div data-element="body" class="column-chart__chart"> ${this.getColumn(this.data)}</div>
            </div>
        </div>
    `;

    this.element = element.firstElementChild;
  }


  getColumn(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
    return [...data].map(x => {
      const percent = (x / maxValue * 100).toFixed(0);
      return `<div style="--value: ${Math.floor(x * scale)}" data-tooltip="${percent}%"></div>`;
    }).join('');
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  update(data) {
    this.data = data;
    this.render();
  }
}
