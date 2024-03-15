<template>
  <div>
    <div class="container">
      <div class="header">
        <h1>Chirper Mesajlaşma Ekranı</h1>
      </div>
      <div class="message-area">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="{
            'user-message': message.type === 'user',
            'chatgpt-message': message.type === 'chatgpt',
          }"
        >
          <p v-if="message.type === 'chatgpt'" class="response-indicator">→</p>
          <p>{{ message.text }}</p>
        </div>
      </div>
      <div class="input-area">
        <input
          type="text"
          v-model="inputText"
          placeholder="Bir şeyler yazın..."
          class="message-input"
        />
        <button @click="sendMessage" class="send-button">Gönder</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const API_URL =
  "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions";

export default {
  data() {
    return {
      inputText: "",
      messages: [],
    };
  },
  methods: {
    async sendMessage() {
      if (this.inputText.trim() === "") return;

      const userMessage = {
        type: "user",
        text: this.inputText,
      };
      this.messages.push(userMessage);

      const response = await axios.post(
        API_URL,
        {
          prompt: this.inputText,
          max_tokens: 2048,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      );
      const chatGPTResponse = {
        type: "chatgpt",
        text: response.data.choices[0].text.trim(),
      };
      this.messages.push(chatGPTResponse);
      this.inputText = "";
    },
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.message-area {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  min-height: 300px;
  max-height: 300px;
  overflow-y: scroll;
}

.message {
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.user-message {
  text-align: right;
  margin-left: auto;
  margin-right: 0;
  background-color: #cfe2f3;
}

.chatgpt-message {
  text-align: left;
  margin-right: auto;
  margin-left: 0;
  background-color: #e2f3cf;
}

.response-indicator {
  margin-right: 5px;
  display: inline-block;
}

.input-area {
  display: flex;
}

.message-input {
  flex: 1;
  padding: 5px;
  margin-right: 10px;
}

.send-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
