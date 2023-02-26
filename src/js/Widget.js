import createElement from './createElement';
import coordValidation from './coordValidation';

export default class Widget {
  constructor() {
    this.container = document.getElementById('widget');
    this.addTicket = this.addTicket.bind(this);
    this.elem = null;
  }

  createWidget() {
    const widget = createElement('div', {
      className: 'widget-container',
      innerHTML: `
      <div class="list"></div>
      <div class="footer">
      <form class="form">
        <input class="form-input" name="input" type="text">
      </form>
    </div>`,
    });

    this.container.appendChild(widget);

    document.querySelector('.form').addEventListener('submit', this.addTicket);
  }

  addTicket(event) {
    event.preventDefault();

    this.elem = createElement('span', {
      textContent: event.target.input.value,
    });

    this.getPosition();
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const activeLatitude = latitude;
          const activeLongitude = longitude;
          const data = `${activeLatitude}, ${activeLongitude}`;

          this.showTicket(data);
        },
        (error) => {
          this.showModal();
          console.error(error);
        },
      );
    }
  }

  resetInput() {
    this.container.querySelector('.form-input').value = '';
  }

  showTicket(data) {
    const list = document.querySelector('.list');
    const ticket = createElement('div', {
      className: 'ticket',
      innerHTML: `
      <div class="elem"></div>
       <div class="date">${new Date().toLocaleString()}</div>
       <div class="geo">[${data}]</div>`,
    });

    list.insertAdjacentElement('afterbegin', ticket);
    this.container
      .querySelector('.elem')
      .insertAdjacentElement('afterbegin', this.elem);
    this.resetInput();
  }

  showModal() {
    const modal = createElement('div', {
      className: 'modal',
      innerHTML: `
      <div class="modal-text">Что-то пошло не так  
        <p>
          К сожалению, нам не удалось определить Ваше местоположение.
          Пожалуйста, дайте разрешение на использование геолокации 
          либо введите координаты вручную
        </p>
        <p>Широта и долгота через запятую:</p>
        <form class="modal-form">
          <input class="modal-input" name="modal" type="text">
          <div class="buttons">
            <button type="reset" class="reset">Отмена</button>
            <button type="submit" class="ok">Ok</button>
          </div>
        </form>
      </div>`,
    });

    this.container.querySelector('.widget-container').appendChild(modal);

    this.container
      .querySelector('.modal-input')
      .addEventListener('input', this.deleteError);

    this.container
      .querySelector('.modal-form')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        const isValid = coordValidation(event.target.modal.value);

        if (isValid) {
          this.hideModal();
          this.showTicket(isValid);
        } else {
          alert('Координаты введены не верно');
        }
      });

    this.container
      .querySelector('.modal-form')
      .addEventListener('reset', (event) => {
        event.preventDefault();
        this.hideModal();
      });
  }

  hideModal() {
    this.container.querySelector('.modal').remove();
    this.resetInput();
  }
}
