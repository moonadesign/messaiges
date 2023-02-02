const g = document.getElementById.bind(document)

const message = (text) => {
  console.log(text)
  g('text').innerText = ''
  g('typing').style.visibility = 'visible'
  fetch('https://us-central1-samantha-374622.cloudfunctions.net/messaiges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      g('typing').style.visibility = 'hidden'
      render(data.choices[0].text, true)
    })
    .catch((error) => {
      render(error, true)
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
    `I'm going to say random things and ask questions and I want you to reply to me like we are having an informal conversation so don’t worry about perfect punctuation. Use slang sometimes. A few expletives are fine, too. The random thing or question is this: ${text}.`,
  )
}

const app = () => {
  document.querySelector('body').style.overflow = 'hidden'
  g('app').style.display = 'block'
  message(
    'Greet me in a fun, silly, or surprising way and name yourself something clever',
  )
}
