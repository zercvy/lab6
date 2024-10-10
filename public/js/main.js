
//блок вопрос - ответ
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const faqAnswer = faqItem.querySelector('.faq-answer');
        faqAnswer.style.display = faqAnswer.style.display === 'block' ? 'none' : 'block';
        button.querySelector('.faq-toggle').textContent = faqAnswer.style.display === 'block' ? '-' : '+';
    });
});

//бургер
document.addEventListener('DOMContentLoaded', function() {
    var burgerIcon = document.querySelector('.burger-icon');
    var burgerContent = document.querySelector('.burger-content');
    var menuOpen = false;

    burgerIcon.addEventListener('click', function() {
        if (menuOpen) {
            burgerContent.style.display = 'none';
            menuOpen = false;
        } else {
            burgerContent.style.display = 'block';
            menuOpen = true;
        }
    });

    document.addEventListener('click', function(event) {
        var isClickInside = burgerIcon.contains(event.target) || burgerContent.contains(event.target);

        if (!isClickInside) {
            burgerContent.style.display = 'none';
            menuOpen = false;
        }
    });
});

///продукт лист
document.addEventListener('DOMContentLoaded', function () {
    const brandButtons = document.querySelectorAll('.brand-button');
    const productLists = document.querySelectorAll('.product-list');
    const productCards = document.querySelectorAll('.product-card');
    const modelLists = document.querySelectorAll('.model-list');
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    
    brandButtons.forEach(button => {
        button.addEventListener('click', function () {
         
            brandButtons.forEach(btn => btn.classList.remove('active'));
        
            this.classList.add('active');

         
            productLists.forEach(list => list.style.display = 'none');

           
            const brand = this.getAttribute('data-brand');
            document.querySelector(`.product-list[data-brand="${brand}"]`).style.display = 'flex';

         
            modelLists.forEach(list => list.style.display = 'none');
            document.querySelectorAll('.price-list').forEach(list => list.style.display = 'none');

            updateBreadcrumbs([{text: 'Услуги', step: 'home'}, {text: this.textContent, step: brand}]);
        });
    });

    productCards.forEach(card => {
        card.addEventListener('click', function () {
            const brand = this.closest('.product-list').getAttribute('data-brand');
            const model = this.getAttribute('data-model');

            productLists.forEach(list => list.style.display = 'none');
          
            document.querySelector(`.model-list[data-brand="${brand}"][data-model="${model}"]`).style.display = 'flex';

           
            document.querySelectorAll('.price-list').forEach(list => list.style.display = 'none');

           
            const brandName = document.querySelector(`.brand-button[data-brand="${brand}"]`).textContent;
            updateBreadcrumbs([{text: 'Услуги', step: 'home'}, {text: brandName, step: brand}, {text: this.querySelector('p').textContent, step: model}]);
        });
    });

    modelLists.forEach(modelList => {
        modelList.addEventListener('click', function (event) {
            if (event.target.closest('.product-card')) {
                const brand = this.getAttribute('data-brand');
                const model = event.target.closest('.product-card').getAttribute('data-model');

                modelLists.forEach(list => list.style.display = 'none');

            
                document.querySelector(`.price-list[data-brand="${brand}"][data-model="${model}"]`).style.display = 'block';

            
                const brandName = document.querySelector(`.brand-button[data-brand="${brand}"]`).textContent;
                const productName = document.querySelector(`.product-list[data-brand="${brand}"] .product-card[data-model="${this.getAttribute('data-model')}"] p`).textContent;
                updateBreadcrumbs([
                    {text: 'Услуги', step: 'home'}, 
                    {text: brandName, step: brand}, 
                    {text: productName, step: this.getAttribute('data-model')}, 
                    {text: event.target.closest('.product-card').querySelector('p').textContent, step: model}
                ]);
            }
        });
    });

    function updateBreadcrumbs(crumbs) {
        breadcrumbContainer.innerHTML = '';
        crumbs.forEach((crumb, index) => {
            const li = document.createElement('li');
            li.classList.add('breadcrumb-item');
            if (index === crumbs.length - 1) {
                li.textContent = crumb.text;
            } else {
                const a = document.createElement('a');
                a.href = '#';
                a.classList.add('breadcrumb-link');
                a.textContent = crumb.text;
                a.setAttribute('data-step', crumb.step);
                a.addEventListener('click', handleBreadcrumbClick);
                li.appendChild(a);
            }
            breadcrumbContainer.appendChild(li);
        });
    }

    function handleBreadcrumbClick(event) {
        event.preventDefault();
        const step = this.getAttribute('data-step');

        if (step === 'home') {
            productLists.forEach(list => list.style.display = 'none');
            modelLists.forEach(list => list.style.display = 'none');
            document.querySelectorAll('.price-list').forEach(list => list.style.display = 'none');
        } else {
            const brandButton = document.querySelector(`.brand-button[data-brand="${step}"]`);
            if (brandButton) {
                brandButton.click();
            } else {
                const productCard = document.querySelector(`.product-card[data-model="${step}"]`);
                if (productCard) {
                    productCard.click();
                } else {
                    const modelList = document.querySelector(`.model-list[data-model="${step}"]`);
                    if (modelList) {
                        modelList.style.display = 'flex';
                        document.querySelectorAll('.price-list').forEach(list => list.style.display = 'none');
                    } else {
                        document.querySelector(`.price-list[data-model="${step}"]`).style.display = 'block';
                    }
                }
            }
        }
    }
});


///переключатель заголовков

document.addEventListener('DOMContentLoaded', function () {
    const brandButtons = document.querySelectorAll('.brand-button');
    const productLists = document.querySelectorAll('.product-list');
    const productCards = document.querySelectorAll('.product-card');
    const modelLists = document.querySelectorAll('.model-list');
    const contactForm = document.querySelector('.contact-form');
    const newsSection = document.querySelector('.news-section');
    const titleElement = document.querySelector('.title');

    brandButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            brandButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Hide all product lists
            productLists.forEach(list => list.style.display = 'none');

            // Show the product list corresponding to the clicked button
            const brand = this.getAttribute('data-brand');
            document.querySelector(`.product-list[data-brand="${brand}"]`).style.display = 'flex';

            // Hide all model lists and price lists
            modelLists.forEach(list => list.style.display = 'none');
            document.querySelectorAll('.price-list').forEach(list => list.style.display = 'none');

            // Update the title
            titleElement.textContent = 'Выбери что хочешь отремонтировать';

            // Hide contact form and show news section
            if (contactForm) contactForm.style.display = 'none';
            if (newsSection) newsSection.style.display = 'block';
        });
    });

    productCards.forEach(card => {
        card.addEventListener('click', function () {
            const brand = this.closest('.product-list').getAttribute('data-brand');
            const model = this.getAttribute('data-model');

            // Hide all product lists
            productLists.forEach(list => list.style.display = 'none');

            // Show the model list corresponding to the clicked product card
            document.querySelector(`.model-list[data-brand="${brand}"][data-model="${model}"]`).style.display = 'flex';

            // Hide all price lists
            document.querySelectorAll('.price-list').forEach(list => list.style.display = 'none');

            // Update the title
            titleElement.textContent = 'Выбери модель';

            // Hide contact form and show news section
            if (contactForm) contactForm.style.display = 'none';
            if (newsSection) newsSection.style.display = 'block';
        });
    });

    modelLists.forEach(modelList => {
        modelList.addEventListener('click', function (event) {
            if (event.target.closest('.product-card')) {
                const brand = this.getAttribute('data-brand');
                const model = event.target.closest('.product-card').getAttribute('data-model');

                // Hide all model lists
                modelLists.forEach(list => list.style.display = 'none');

                // Show the price list corresponding to the clicked model card
                document.querySelector(`.price-list[data-brand="${brand}"][data-model="${model}"]`).style.display = 'block';

                // Update the title
                titleElement.textContent = 'Стоимость и виды ремонта';

                // Show contact form and hide news section
                if (contactForm) contactForm.style.display = 'block';
                if (newsSection) newsSection.style.display = 'none';
            }
        });
    });
});

///модалка

document.addEventListener("DOMContentLoaded", function() {
    var chatWidget = document.getElementById("chatWidget");
    var openChatBtn = document.getElementById("openChatBtn");
    var closeChatBtn = document.getElementById("closeChatBtn");
    var sendMessageBtn = document.getElementById("sendMessageBtn");
    var messages = document.getElementById("messages");

    openChatBtn.onclick = function() {
        chatWidget.style.display = "flex";
        openChatBtn.style.display = "none";
    }

    closeChatBtn.onclick = function() {
        chatWidget.style.display = "none";
        openChatBtn.style.display = "block";
    }

    sendMessageBtn.onclick = function() {
        var userMessage = document.getElementById("userMessage").value;
        if (userMessage.trim() !== "") {
            var messageElement = document.createElement("div");
            messageElement.textContent = "Вы: " + userMessage;
            messages.appendChild(messageElement);
            document.getElementById("userMessage").value = "";

            setTimeout(function() {
                var responseElement = document.createElement("div");
                responseElement.textContent = "Ответ: Это ответ на ваше сообщение.";
                messages.appendChild(responseElement);
                messages.scrollTop = messages.scrollHeight;
            }, 1000);
        }
    }
});

///рег





document.addEventListener('DOMContentLoaded', () => {
    const profileTab = document.getElementById('profileTab');
    const ordersTab = document.getElementById('ordersTab');
    const profileContent = document.getElementById('profileContent');
    const ordersContent = document.getElementById('ordersContent');

    profileTab.addEventListener('click', () => {
        profileContent.style.display = 'block';
        ordersContent.style.display = 'none';
        profileTab.classList.add('active');
        ordersTab.classList.remove('active');
    });

    ordersTab.addEventListener('click', () => {
        profileContent.style.display = 'none';
        ordersContent.style.display = 'block';
        profileTab.classList.remove('active');
        ordersTab.classList.add('active');
    });
});
