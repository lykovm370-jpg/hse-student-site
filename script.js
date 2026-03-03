window.onload = function() {
    const mapContainer = document.getElementById('map');
    
    if (mapContainer && typeof L !== 'undefined') {
        const miemCoords = [55.8034, 37.4086];
        const map = L.map('map').setView(miemCoords, 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker(miemCoords).addTo(map)
            .bindPopup('<b>МИЭМ НИУ ВШЭ</b><br>Таллинская ул., д. 34')
            .openPopup();
    }

    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const voiceBtn = document.getElementById('chat-voice-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatToggle = document.getElementById('chat-header');
    const chatBody = document.getElementById('chat-body');

    if (chatInput && sendBtn && chatMessages) {
        chatToggle.onclick = function() {
            chatBody.style.display = chatBody.style.display === 'none' ? 'block' : 'none';
        };

        const replies = {
            "привет": ["Привет!", "Здравствуйте!", "Рад видеть в моем чате!"],
            "вшэ": ["Да, Вышка - классное место!", "Учиться здесь сложно, но интересно."],
            "миэм": ["МИЭМ - топ! Наша программа по математике очень сильная.", "Обожаю свой факультет."],
            "математика": ["Матан и линал - наше все!", "Математика требует больших усилий."],
            "оценка": ["Надеюсь на отличную оценку за это задание!", "Стараюсь учиться на отлично."],
            "default": ["Интересная мысль.", "Расскажите подробнее!", "Понял вас.", "Круто!"]
        };

        function appendMessage(text, senderType) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('chat-msg', senderType);
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function generateBotReply(userText) {
            const lowerText = userText.toLowerCase();
            let matchedKey = "default";

            for (let key in replies) {
                if (key !== "default" && lowerText.includes(key)) {
                    matchedKey = key;
                    break;
                }
            }

            const possibleReplies = replies[matchedKey];
            const randomIndex = Math.floor(Math.random() * possibleReplies.length);
            return possibleReplies[randomIndex];
        }

        function sendMessage() {
            const text = chatInput.value.trim();
            if (text === "") return;

            appendMessage(text, 'user');
            chatInput.value = '';

            setTimeout(() => {
                appendMessage(generateBotReply(text), 'bot');
            }, 1000);
        }

        sendBtn.onclick = sendMessage;
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });

        let isRecording = false;
        voiceBtn.onclick = function() {
            if (isRecording) return;
            
            isRecording = true;
            voiceBtn.style.color = 'red';
            voiceBtn.textContent = '⏺';

            setTimeout(() => {
                isRecording = false;
                voiceBtn.style.color = 'white';
                voiceBtn.textContent = '🎤';
                
                appendMessage("🔊 [Голосовое сообщение 0:02]", 'user');

                setTimeout(() => {
                    appendMessage("К сожалению, мне сейчас неудобно слушать аудио. Напишите, пожалуйста, текстом!", 'bot');
                }, 1500);

            }, 2500);
        };
    }
};