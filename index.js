const prompt = 'how do i add an eventlistener to a button in jquery?';
const codeContainer = document.querySelector('.contentContainer');

function sendChat() {
    const apiKey = "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";
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    
    
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                },
            ],
            "temperature": 0,
            "max_tokens": 60,
            "top_p": 1,
            "frequency_penalty": 0.5,
            "presence_penalty": 0
      })
    })
      .then(response => response.json())
      .then(data => { handleFormat(data) })
      .catch(error => console.log(error));
}

function handleFormat(data) {
    let content = data.choices[0].message.content;
    console.log(content);

    // Replaces every other instance of "```" with "</code>"
    content = content.split("```").map((item, index) => {
    return index % 2 === 0 ? item : `<pre class="language-xxxx"><code class="language-xxxx">${item}</code></pre>`;
    }).join('');

    codeContainer.innerHTML += content;
    // Output: "<code> This is a code block </code> that needs to be formatted with <code> syntax highlighting </code>."

    
}

sendChat(prompt);
