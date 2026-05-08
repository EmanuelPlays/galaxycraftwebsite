const rulesData = {
  version: 'v1.0',
  server: 'GalaxyCraftYT',
  discordUrl: 'https://discord.gg/3PjHS2ZUzX',
  sections: [
    {
      category: 'rispetto',
      title: '1. Rispetto tra i giocatori',
      items: [
        'È vietato insultare, minacciare o discriminare altri giocatori.',
        'Non sono ammessi comportamenti tossici, flame o provocazioni continue.',
        'Rispetta staff, moderatori e amministratori.'
      ]
    },
    {
      category: 'chat',
      title: '2. Chat e comunicazione',
      items: [
        'Vietato spam, flood e uso eccessivo delle maiuscole.',
        'Non condividere link sospetti o pubblicità di altri server.',
        'È vietato impersonare membri dello staff.'
      ]
    },
    {
      category: 'gameplay',
      title: '3. Gameplay corretto',
      items: [
        'Vietati cheat, hack, x-ray, autoclicker e qualsiasi mod che dia vantaggi sleali.',
        'Non sfruttare bug o glitch del server.',
        'Duping di oggetti severamente proibito.'
      ]
    },
    {
      category: 'costruzioni',
      title: '4. Costruzioni e protezione',
      items: [
        'Vietato griefare o distruggere costruzioni altrui.',
        'Non rubare nei claim o nelle basi degli altri giocatori.',
        'Costruzioni offensive o inappropriate saranno rimosse.'
      ]
    },
    {
      category: 'pvp',
      title: '5. PvP e combattimenti',
      items: [
        'Il PvP è consentito solo nelle aree abilitate.',
        'Vietato il combat logging (uscire durante un combattimento).',
        'Non abusare di trappole illegali o exploit PvP.'
      ]
    },
    {
      category: 'economia',
      title: '6. Economia e scambi',
      items: [
        'Truffe negli scambi non consentite.',
        'Vietata la vendita di oggetti ottenuti illegalmente.',
        'Lo staff può intervenire in caso di problemi economici.'
      ]
    },
    {
      category: 'account',
      title: '7. Account e sicurezza',
      items: [
        'Ogni giocatore è responsabile del proprio account.',
        'Non condividere password o dati personali.',
        'Multiaccount consentiti solo se autorizzati.'
      ]
    },
    {
      category: 'staff',
      title: '8. Staff e sanzioni',
      items: [
        'Le decisioni dello staff devono essere rispettate.',
        'Le punizioni possono includere: Richiamo, Mute, Jail, Ban temporaneo, Ban permanente.'
      ]
    },
    {
      category: 'eventi',
      title: '9. Eventi e minigiochi',
      items: [
        'Seguire sempre le istruzioni dello staff durante gli eventi.',
        'Vietato rovinare eventi o disturbare gli altri partecipanti.'
      ]
    },
    {
      category: 'generale',
      title: '10. Regola generale',
      items: [
        'Usa il buon senso. Se un comportamento rovina l’esperienza degli altri, potrebbe essere punibile anche se non scritto esplicitamente nel regolamento.'
      ]
    }
  ]
}


const versionText = document.getElementById('versionText')
versionText.textContent = rulesData.version

const searchInput = document.getElementById('search')
const content = document.getElementById('content')

let activeCategory = 'tutte'

function normalize(s) {
  return (s || '').toString().toLowerCase().trim()
}

function render() {
  const q = normalize(searchInput.value)

  const sections = rulesData.sections.filter((sec) => {
    const catOk = activeCategory === 'tutte' || sec.category === activeCategory
    if (!catOk) return false
    if (!q) return true
    const hay = normalize(sec.title + ' ' + sec.items.join(' '))
    return hay.includes(q)
  })

  content.innerHTML = sections
    .map((sec) => {
      const idx = rulesData.sections.findIndex((s) => s.category === sec.category) + 1
      return `
        <div class="section" data-category="${sec.category}">
          <h2>${sec.title}</h2>
          <p style="margin:0 0 10px; color: rgba(255,255,255,.7); font-size:13px;">Sezione ${idx} • GalaxyCraftYT</p>
          <ol class="rules">
            ${sec.items.map((it) => `<li>${it}</li>`).join('')}
          </ol>
        </div>
      `
    })
    .join('')

  if (sections.length === 0) {
    content.innerHTML = `
      <div class="section">
        <h2>Nessun risultato</h2>
        <p>Nessuna regola corrisponde al filtro attuale.</p>
      </div>
    `
  }
}

function setActiveCategory(next) {
  activeCategory = next
  document.querySelectorAll('.chip').forEach((c) => {
    c.dataset.active = c.dataset.category === next ? 'true' : 'false'
  })
}

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    setActiveCategory(chip.dataset.category)
    render()
  })

  chip.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      chip.click()
    }
  })
})

searchInput.addEventListener('input', render)

window.addEventListener('keydown', (e) => {
  const target = e.target
  const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')

  if (e.key === '/' && !isTyping) {
    e.preventDefault()
    searchInput.focus()
    return
  }

  if (e.key === 'Escape') {
    if (!isTyping) setActiveCategory('tutte')
    searchInput.value = ''
    render()
  }
})

render()

