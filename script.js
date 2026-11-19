const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
const orderForm = document.querySelector('#orderForm');
const toast = document.querySelector('#toast');

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('#mainNav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const dateField = document.querySelector('#date');
if (dateField) {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - offset * 60 * 1000).toISOString().split('T')[0];
  dateField.min = localToday;
}

orderForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(orderForm);
  const name = data.get('name');
  const order = data.get('order');
  const date = data.get('date');
  const time = data.get('time');
  const notes = data.get('notes');
  const formattedDate = date ? new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR') : 'a combinar';
  const message = [
    'Olá, Panificadora Brasil! Quero fazer uma encomenda.',
    '',
    `*Nome:* ${name}`,
    `*Pedido:* ${order}`,
    `*Retirada:* ${formattedDate} às ${time}`,
    notes ? `*Observações:* ${notes}` : '',
    '',
    'Aguardo a confirmação. Obrigado(a)!',
  ].filter(Boolean).join('\n');
  const whatsappUrl = `https://wa.me/5566996506337?text=${encodeURIComponent(message)}`;
  toast?.classList.add('show');
  window.setTimeout(() => {
    toast?.classList.remove('show');
    window.open(whatsappUrl, '_blank', 'noopener');
  }, 500);
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a:not(.nav-cta)');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));
