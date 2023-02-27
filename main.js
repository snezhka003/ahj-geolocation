!function(){"use strict";function e(e,t){const n=Object.assign(document.createElement(e),t);for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return n.append(...s),n}(new class{constructor(){this.container=document.getElementById("widget"),this.addTicket=this.addTicket.bind(this),this.elem=null}createWidget(){const t=e("div",{className:"widget-container",innerHTML:'\n      <div class="list"></div>\n      <div class="footer">\n      <form class="form">\n        <input class="form-input" name="input" type="text">\n      </form>\n    </div>'});this.container.appendChild(t),document.querySelector(".form").addEventListener("submit",this.addTicket)}addTicket(t){t.preventDefault(),this.elem=e("span",{textContent:t.target.input.value}),this.getPosition()}getPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition((e=>{const{latitude:t,longitude:n}=e.coords,i=`${t}, ${n}`;this.showTicket(i)}),(e=>{this.showModal(),console.error(e)}))}resetInput(){this.container.querySelector(".form-input").value=""}showTicket(t){const n=document.querySelector(".list"),i=e("div",{className:"ticket",innerHTML:`\n      <div class="elem"></div>\n       <div class="date">${(new Date).toLocaleString()}</div>\n       <div class="geo">[${t}]</div>`});n.insertAdjacentElement("afterbegin",i),this.container.querySelector(".elem").insertAdjacentElement("afterbegin",this.elem),this.resetInput()}showModal(){const t=e("div",{className:"modal",innerHTML:'\n      <div class="modal-text">Что-то пошло не так  \n        <p>\n          К сожалению, нам не удалось определить Ваше местоположение.\n          Пожалуйста, дайте разрешение на использование геолокации \n          либо введите координаты вручную\n        </p>\n        <p>Широта и долгота через запятую:</p>\n        <form class="modal-form">\n          <input class="modal-input" name="modal" type="text">\n          <div class="buttons">\n            <button type="reset" class="reset">Отмена</button>\n            <button type="submit" class="ok">Ok</button>\n          </div>\n        </form>\n      </div>'});this.container.querySelector(".widget-container").appendChild(t),this.container.querySelector(".modal-input").addEventListener("input",this.deleteError),this.container.querySelector(".modal-form").addEventListener("submit",(e=>{e.preventDefault();const t=function(e){let t=e;const n=/^[-—–−-]?[0-9]{1,2}\.[0-9]+, [-—–−-]?[0-9]{1,2}\.[0-9]+/;if(t.includes("[")&&t.includes("]")&&(t=t.slice(t.indexOf("[")+1,t.indexOf("]"))),t.includes(" "))return!!n.test(t)&&t;const i=t.slice(0,t.indexOf(",")),s=t.slice(t.indexOf(",")+1);return t=`${i}, ${s}`,!!n.test(t)&&t}(e.target.modal.value);t?(this.hideModal(),this.showTicket(t)):alert("Координаты введены не верно")})),this.container.querySelector(".modal-form").addEventListener("reset",(e=>{e.preventDefault(),this.hideModal()}))}hideModal(){this.container.querySelector(".modal").remove(),this.resetInput()}}).createWidget()}();