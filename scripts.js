const g = document.getElementById.bind(document)
const q = document.querySelectorAll.bind(document)

const message = (text) => {
  g('text').innerText = ''
  g('typing').style.visibility = 'visible'
  fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer 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',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      max_tokens: 200,
      model: 'text-davinci-003',
      prompt: text,
      temperature: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      g('typing').style.visibility = 'hidden'
      render(data.choices[0].text, true)
    })
    .catch((error) => {
      render(error)
    })
}

const render = (text, me = false) => {
  const bubble = document.createElement('div')
  bubble.className = `bubble ${me ? 'ai' : 'me'}`
  bubble.innerText = text.trim()
  g('stream').appendChild(bubble)
}

const send = () => {
  const text = g('text').innerText
  render(text)
  message(
    `I'm going to say random things and ask questions and I want you to reply to me like we are having an informal conversation so don’t worry about perfect punctuation. Use slang sometimes. A few expletives are fine, too. The random thing or question is this: ${text}`,
  )
}

const app = () => {
  g('app').style.display = 'block'
  message('Greet me in a unique way and name yourself')
}
