/*BOILER GALERÍA SIMPLE*/
window.onload = () =>{
    let imgActual = 0;
    let miniaturas = document.querySelectorAll('.mini');
    console.log(miniaturas[0]);

    let btnIzq = document.querySelector("#izq");
    btnIzq.addEventListener("click", () => {
        imgActual == 0 ? imgActual = miniaturas.length-1: imgActual--;
        console.log(miniaturas.length);
        cambioimagen(miniaturas[imgActual]);
    })

    let btnDcha = document.querySelector("#dcha");
    btnDcha.addEventListener("click", () => {
        imgActual == miniaturas.length-1 ? imgActual = 0 : imgActual++;
        cambioimagen(miniaturas[imgActual]);
    })

    let cambioimagen = (item) => {
        let imagengrande = document.querySelector("#caja");
        imagengrande.src = item.src;
        imagengrande.alt = item.alt;

        miniaturas.forEach(elem => {
            elem.classList.remove("active");
        })
        item.classList.add("active");
    };

    miniaturas.forEach(item => {
    item.addEventListener('click', event => {
        imgActual = item.dataset.num;
      cambioimagen(item);
    })
})
}


/*CARRITO DE LA COMPRA */
let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  const itemExistente = carrito.find(item => item.nombre === nombre);

  if (itemExistente) {
    itemExistente.cantidad++;
    itemExistente.total = itemExistente.cantidad * precio;
  } else {
    const newItem = {
      nombre: nombre,
      precio: precio,
      cantidad: 1,
      total: precio
    };
    carrito.push(newItem);
  }

  total += precio;
  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  total -= carrito[index].total;
  carrito.splice(index, 1);
  mostrarCarrito();
}

function disminuirCantidad(index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
    carrito[index].total -= carrito[index].precio;
    total -= carrito[index].precio;
  }
  mostrarCarrito();
}

function aumentarCantidad(index) {
  carrito[index].cantidad++;
  carrito[index].total += carrito[index].precio;
  total += carrito[index].precio;
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  mostrarCarrito();
}

const items = document.querySelector('.items');
const items2 = document.querySelector('.items2');
const items3 = document.querySelector('.items3');
const carritoIcon = document.querySelector('.carrito-icon');
carritoIcon.addEventListener('click', () => {
  items.classList.toggle('off');
  items2.classList.toggle('off');
  items3.classList.toggle('off');
})

const accountIcon = document.querySelector('.account-icon');
const accountList = document.querySelector('.account-list');
accountIcon.addEventListener('click', () => {
  accountList.classList.toggle('off');
})

function mostrarCarrito() {
  const itemList = document.getElementById('item-list');
  const emptyCartMessage = document.getElementById('empty-cart');
  itemList.innerHTML = '';


  if (carrito.length === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';
    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = `x${item.cantidad} - `;
      li.appendChild(quantitySpan);

      const itemNameSpan = document.createElement('span');
      itemNameSpan.textContent = `${item.nombre} - ${item.total.toFixed(2)}€`;
      li.appendChild(itemNameSpan);

      const decreaseButton = document.createElement('button');
      decreaseButton.textContent = '-';
      decreaseButton.addEventListener('click', () => disminuirCantidad(index));
      li.appendChild(decreaseButton);

      const increaseButton = document.createElement('button');
      increaseButton.textContent = '+';
      increaseButton.addEventListener('click', () => aumentarCantidad(index));
      li.appendChild(increaseButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', () => eliminarDelCarrito(index));
      li.appendChild(deleteButton);

      itemList.appendChild(li);
    });
  }

  const totalElement = document.getElementById('total');
  totalElement.textContent = total.toFixed(2);
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. ¡Agrega productos antes de finalizar la compra!');
  } else {
    alert(`¡Gracias por tu compra! El total a pagar es: ${total.toFixed(2)} €`);
    vaciarCarrito();
  }
}

mostrarCarrito();


/*MODAL*/
let imagenProducto = document.querySelectorAll('.drinks_photo');
console.log(imagenProducto[0])
let nameProducto = document.querySelectorAll('.product_name');
console.log(nameProducto[0].outerText);
let i = 0;
let drinksButtons = document.querySelectorAll('.drinks_buttoms');

drinksButtons.forEach((element) => {
  element.addEventListener('click', (item) => {
    i = item.currentTarget.id;
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const productImage = document.getElementById('product-image');
    productImage.src = imagenProducto[i].src;
  
    const productName = document.getElementById('product-name');
    productName.textContent = nameProducto[i].textContent;

  });
})

function cerrarDetalleModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}
