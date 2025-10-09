// AI Demo Chat
(function() {
    'use strict';

    let responses = null;
    const messagesContainer = document.getElementById('demo-messages');
    const input = document.getElementById('demo-input');
    const sendBtn = document.getElementById('demo-send');
    const exampleBtns = document.querySelectorAll('.example-btn');

    // Load responses
    async function loadResponses() {
        try {
            const res = await fetch('/data/demo-responses.json');
            responses = await res.json();
            initializeChat();
        } catch (error) {
            console.error('Failed to load demo responses:', error);
        }
    }

    // Initialize chat with greeting
    function initializeChat() {
        const greeting = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
        addMessage(greeting, 'bot');
    }

    // Add message to chat
    function addMessage(text, sender = 'bot', delay = 0) {
        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `demo-message ${sender}`;
            
            const avatar = document.createElement('div');
            avatar.className = `message-avatar ${sender}`;
            avatar.textContent = sender === 'bot' ? '🤖' : '👤';
            
            const content = document.createElement('div');
            content.className = 'message-content';
            
            // Parse markdown-like syntax
            const formattedText = formatMessage(text);
            content.innerHTML = formattedText;
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, delay);
    }

    // Format message (simple markdown)
    function formatMessage(text) {
        let formatted = text;
        
        // Bold
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        // Code blocks
        formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, '<code>$2</code>');
        
        // Links
        formatted = formatted.replace(/#contact/g, '<a href="#contact" style="color: inherit; text-decoration: underline;">iletişim formu</a>');
        
        return `<p>${formatted}</p>`;
    }

    // Show typing indicator
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'demo-message bot';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar bot';
        avatar.textContent = '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        
        content.appendChild(typing);
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Remove typing indicator
    function removeTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) {
            typing.remove();
        }
    }

    // Find response based on keywords
    function findResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Check for specific triggers
        for (const [key, data] of Object.entries(responses.triggers)) {
            if (lowerMessage.includes(key)) {
                return data;
            }
        }
        
        // Fallback response
        return {
            response: responses.fallback[Math.floor(Math.random() * responses.fallback.length)],
            followup: []
        };
    }

    // Handle user message
    async function handleMessage(message) {
        if (!message.trim()) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        input.value = '';
        sendBtn.disabled = true;
        
        // Show typing
        showTyping();
        
        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        // Remove typing
        removeTyping();
        
        // Find and add response
        const responseData = findResponse(message);
        addMessage(responseData.response, 'bot');
        
        // Add followup if exists
        if (responseData.followup && responseData.followup.length > 0) {
            setTimeout(() => {
                responseData.followup.forEach((followup, index) => {
                    addMessage(followup, 'bot', index * 1000);
                });
            }, 1000);
        }
        
        sendBtn.disabled = false;
        input.focus();
    }

    // Event listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            handleMessage(input.value);
        });
    }

    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleMessage(input.value);
            }
        });
        
        input.addEventListener('input', () => {
            sendBtn.disabled = !input.value.trim();
        });
    }

    // Example buttons
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent;
            input.value = text;
            handleMessage(text);
        });
    });

    // Initialize
    if (messagesContainer) {
        loadResponses();
    }

    console.log('🤖 AI Demo initialized');
})();

