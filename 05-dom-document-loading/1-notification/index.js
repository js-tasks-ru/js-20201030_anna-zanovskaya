export default class NotificationMessage {
  static activeNotification;

  constructor(message, {
    duration = 2000,
    type = 'success',
  } = {}) {

    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }

    this.message = message;
    this.durationInSeconds = (duration / 1000) + 's';
    this.type = type;
    this.duration = duration;

    this.render();
    NotificationMessage.activeNotification = this.element;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  get template() {
    return `<div class="notification ${this.type}" style="--value:${this.durationInSeconds}">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">Notification</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
  }

  show(parent = document.body) {
    parent.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    NotificationMessage.activeNotification = null;
  }
}
