// script.js
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainHeader = document.getElementById('mainHeader');
    const mainContent = document.getElementById('mainContent');
    
    // Перевіряємо, чи існують елементи
    if (!menuToggle || !mainHeader || !mainContent) {
        console.log('Не знайдено необхідні елементи для меню');
        return;
    }

    // Просте перемикання меню (згортання/розгортання на місці)
    menuToggle.addEventListener('click', function() {
        const isCollapsed = mainHeader.classList.contains('collapsed');
        
        if (isCollapsed) {
            // Розгортаємо меню
            mainHeader.classList.remove('collapsed');
            mainContent.classList.remove('menu-collapsed');
            menuToggle.title = 'Згорнути меню';
            menuToggle.innerHTML = '☰';
        } else {
            // Згортаємо меню
            mainHeader.classList.add('collapsed');
            mainContent.classList.add('menu-collapsed');
            menuToggle.title = 'Розгорнути меню';
            menuToggle.innerHTML = '☰';
        }
    });

    // Інший код залишається без змін...
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            if (targetId !== '#' && targetId.length > 1) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Кнопка "Нагору"
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('title', 'Нагору');
    scrollBtn.id = 'scrollToTopBtn';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: rgba(57, 32, 45, 0.9);
        color: #FFD700;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Обробники кліків для контактних карток
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const link = this.querySelector('a');
            if (link) {
                if (link.getAttribute('href').startsWith('tel:')) {
                    window.location.href = link.getAttribute('href');
                } else if (link.getAttribute('target') === '_blank') {
                    window.open(link.getAttribute('href'), '_blank');
                } else {
                    link.click();
                }
            }
        });
    });

    // Обробка форми зворотного зв'язку
    const emailForm = document.getElementById('emailForm');
    
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            const subject = 'Повідомлення з сайту';
            const body = `Ім'я: ${name}%0AПошта: ${email}%0A%0AПовідомлення:%0A${message}`;
            const mailtoLink = `mailto:bogdan.shipuk@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            window.location.href = mailtoLink;
            
            const formMessage = document.getElementById('formMessage');
            if (formMessage) {
                formMessage.textContent = 'Форма заповнена успішно! Відкривається додаток пошти...';
                formMessage.style.display = 'block';
                formMessage.style.color = 'green';
                
                setTimeout(() => {
                    emailForm.reset();
                    formMessage.style.display = 'none';
                }, 3000);
            }
        });
    }
});