const url = '/api/ezpp-changelog.json'
const buildVersionElement = document.getElementById('build-version')
const buildCurrentVersionLinkElement = document.getElementById('build-current-version-link')
const buildCurrentVersionLabelElement = document.getElementById('build-current-version-label')
const navItemLeftElement = document.getElementById('nav-item-left')
const navItemRightElement = document.getElementById('nav-item-right')
const buildsItemElement = document.getElementById('builds-item')
const iconPlusElement = document.getElementById('fa-plus')
const iconMinusElement = document.getElementById('fa-minus')
const iconCheckElement = document.getElementById('fa-check')
const iconChevronRightElement = document.getElementById('fa-chevron-right')
const iconChevronLeftElement = document.getElementById('fa-chevron-left')

/**
 * @param {ChangelogData} data 
 */
const getOrLatest = data => {
  const href = location.href.split('#')
  if (href.length < 2) {
    let index = 0
    return { ...data.entries.reverse().filter((e, i) => {
      index = i
      return !e.pre
    })[0], index }
  }
  const version = href[1]
  let index = 0
  const result = data.entries.find((e, i) => {
    index = i
    return e.version === version
  })
  return result ? { ...result, index } : { ...data.entries[0], index: 0 }
}

/**
 * @typedef {{
 *     version: string
 *     entries: [
 *       {
 *         category: string
 *         type: 'fix' | 'add' | 'remove' | 'auto'
 *         message: string
 *         author: string
 *         major: boolean
 *       }
 *     ]
 *     pre: boolean
 *   }
 * } ChangelogEntry
 */

/**
 * @typedef {{ entries: Array<ChangelogEntry> }} ChangelogData
 */

/**
 * @type {ChangelogData}
 */
let data

/**
 * @type { ChangelogEntry & { index: number }}
 */
let current

/**
 * @param {ChangelogData?} data 
 */
const process = data_ => {
  if (data_) {
    data = data_
    console.log(data)
  } else {
    if (!data) throw new Error('data not defined')
  }
  current = getOrLatest(data)
  console.log('Current version:', current)
  replaceBuildVersionElements()
  replaceChangelogEntries()
}

const replaceBuildVersionElements = () => {
  buildCurrentVersionLinkElement.href = `#${current.version}`
  buildCurrentVersionLabelElement.classList.toggle('changelog-entry-major', current.pre || false)
  buildCurrentVersionLabelElement.textContent = current.version
  { // left
    const old = buildVersionElement.children.item(0)
    const element = createBuildVersionLinkElement(data.entries[current.index + 1], false)
    buildVersionElement.replaceChild(element, old)
  }
  { // right
    const old = buildVersionElement.children.item(2)
    const element = createBuildVersionLinkElement(data.entries[current.index - 1], true)
    buildVersionElement.replaceChild(element, old)
  }
  { // nav, left
    const entry = data.entries[current.index + 1]
    if (entry) {
      let aElement
      if (navItemLeftElement.children.length === 0) {
        aElement = document.createElement('a')
        navItemLeftElement.appendChild(aElement)
      } else {
        aElement = navItemLeftElement.children.item(0)
      }
      aElement.href = `#${entry.version}`
      if (aElement.children.length === 0) {
        const span = document.createElement('span')
        span.classList.add('nav-item-label')
        span.textContent = entry.version
        aElement.appendChild(iconChevronLeftElement.cloneNode(true))
        aElement.appendChild(span)
      } else {
        aElement.children.item(1).textContent = entry.version
      }
    } else {
      while (navItemLeftElement.children.length > 0) {
        navItemLeftElement.removeChild(navItemLeftElement.children.item(0))
      }
    }
  }
  { // nav, right
    const entry = data.entries[current.index - 1]
    if (entry) {
      let aElement
      if (navItemRightElement.children.length === 0) {
        aElement = document.createElement('a')
        navItemRightElement.appendChild(aElement)
      } else {
        aElement = navItemRightElement.children.item(0)
      }
      aElement.href = `#${entry.version}`
      if (aElement.children.length === 0) {
        const span = document.createElement('span')
        span.classList.add('nav-item-label')
        span.textContent = entry.version
        aElement.appendChild(span)
        aElement.appendChild(iconChevronRightElement.cloneNode(true))
      } else {
        aElement.children.item(0).textContent = entry.version
      }
    } else {
      while (navItemRightElement.children.length > 0) {
        navItemRightElement.removeChild(navItemRightElement.children.item(0))
      }
    }
  }
}

const replaceChangelogEntries = () => {
  const length = buildsItemElement.children.length
  for (let i = 1; i < length; i++) {
    const element = buildsItemElement.children.item(1)
    buildsItemElement.removeChild(element)
  }
  current.entries.map(e => e.category).filter((v, i, a) => a.indexOf(v) === i).forEach(categoryName => {
    const container = document.createElement('div')
    container.classList.add('changelog-entries-container')
    const categoryNameElement = document.createElement('div')
    categoryNameElement.classList.add('changelog-entries-category')
    categoryNameElement.textContent = categoryName
    const entriesElement = document.createElement('div')
    entriesElement.classList.add('changelog-entries')
    current.entries.filter(e => e.category === categoryName).forEach(entry => {
      const entryElement = document.createElement('div')
      entryElement.classList.add('changelog-entry')
      const entryRowElement = document.createElement('div')
      entryRowElement.classList.add('changelog-entry-row')
      if (entry.major) entryRowElement.classList.add('changelog-entry-major')
      const titleIconElement = document.createElement('span')
      titleIconElement.classList.add('changelog-entry-title-icon')
      let iconElement = iconCheckElement
      if (entry.type === 'add') {
        iconElement = iconPlusElement
      } else if (entry.type === 'remove') {
        iconElement = iconMinusElement
      } else if (entry.type === 'fix') {
        iconElement = iconCheckElement
      } else {
        const lowerCase = entry.message.toLowerCase()
        if (lowerCase.startsWith('fix')) {
          iconElement = iconCheckElement
        } else if (lowerCase.startsWith('add')) {
          iconElement = iconPlusElement
        } else if (lowerCase.startsWith('remove')) {
          iconElement = iconMinusElement
        } else {
          iconElement = iconCheckElement
        }
      }
      iconElement = iconElement.cloneNode(true)
      iconElement.classList.add('changelog-entry-icon')
      const messageElement = document.createElement('span')
      messageElement.innerHTML = entry.message
      const userElement = document.createElement('span')
      userElement.classList.add('changelog-entry-user')
      const byElement = document.createElement('span')
      byElement.textContent = 'by '
      const userLinkElement = document.createElement('a')
      if (entry.author === undefined || entry.author === null) entry.author = 'ghost'
      if (!entry.author.includes(',')) userLinkElement.href = `https://github.com/${entry.author}`
      userLinkElement.textContent = entry.author

      titleIconElement.appendChild(iconElement)
      userElement.appendChild(byElement)
      userElement.appendChild(userLinkElement)
      entryRowElement.appendChild(titleIconElement)
      entryRowElement.appendChild(messageElement)
      entryRowElement.appendChild(userElement)
      entryElement.appendChild(entryRowElement)
      entriesElement.appendChild(entryElement)
    })
    container.appendChild(categoryNameElement)
    container.appendChild(entriesElement)
    buildsItemElement.appendChild(container)
  })
}

/**
 * @param {ChangelogEntry?} entry
 * @param {boolean} right
 */
const createBuildVersionLinkElement = (entry, right) => {
  const side = right ? iconChevronRightElement.cloneNode(true) : iconChevronLeftElement.cloneNode(true)
  if (!entry) {
    const span = document.createElement('span')
    span.classList.add('build-version-link', 'half-transparent')
    span.appendChild(side)
    return span
  } else {
    const a = document.createElement('a')
    a.classList.add('build-version-link')
    a.href = `#${entry.version}`
    a.appendChild(side)
    return a
  }
}

fetch(url).then(res => res.json()).then(data => process(data))

window.addEventListener('hashchange', () => {
  process()
})
