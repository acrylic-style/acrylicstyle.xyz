const url = '/api/ezpp-changelog.json'
const defaultUser = 'oamaok'
const buildDateElement = document.getElementById('build-date')
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
const groupsContainerElement = document.getElementById('groups-container')

const getSelectedGroup = () => {
  const featured = data.groups.find(d => d.featured) || data.groups[0]
  const href = location.href.split('#')
  if (href.length < 2) return featured
  const group = href[1].split('/')[0]
  return data.groups.find(d => d.name === group) || featured
}

const getOrLatest = () => {
  const href = location.href.split('#')
  let index = 0
  const featured = data.groups.find(d => d.featured) || data.groups[0]
  if (!featured) throw new Error('No group defined')
  let nonPre = featured.entries.find((e, i) => {
    if (typeof e.version === 'undefined') console.error('Version not defined for ' + e)
    index = i
    return !e.pre
  })
  if (!nonPre) {
    index = 0
    nonPre = featured.entries[0]
  }
  const fallback = { ...nonPre, index }
  if (href.length < 2) return fallback
  const hash = href[1].split('/')
  const version = hash.length === 1 ? hash[0] : hash[1]
  index = 0
  let result = getSelectedGroup().entries.find((e, i) => {
    index = i
    return e.version === version
  })
  if (!result) {
    index = 0
    result = getSelectedGroup().entries.find((e, i) => {
      index = i
      return !e.pre
    })
    if (!result) result = getSelectedGroup().entries[0]
  }
  return result ? { ...result, index } : fallback
}

/**
 * @typedef {{
 *     version: string
 *     date?: string | number
 *     pre: boolean
 *     entries: [
 *       {
 *         category: string
 *         type?: 'fix' | 'add' | 'remove' | 'auto'
 *         message: string
 *         author?: string
 *         major?: boolean
 *         description?: Array<string>
 *       }
 *     ]
 *   }
 * } ChangelogEntry
 */

/**
 * @typedef {{
 *   display_name: string
 *   name: string
 *   color?: string
 *   featured: boolean
 *   entries: Array<ChangelogEntry>
 * }} GroupData
 */

/**
 * @typedef {{ groups: Array<GroupData> }} ChangelogData
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
  current = getOrLatest()
  console.log('Current version:', { ...current, previous: getSelectedGroup().entries[current.index + 1], next: getSelectedGroup().entries[current.index - 1] })
  updateGroups()
  replaceBuildVersionElements()
  replaceChangelogEntries()
}

const updateGroups = () => {
  groupsContainerElement.innerHTML = ''
  data.groups.forEach(group => {
    if (!group.name || !group.display_name || !group.entries) {
      console.warn('One or more of required properties are not defined:', group)
      return
    }
    const aGroupElement = document.createElement('a')
    aGroupElement.href = `#${group.name}`
    aGroupElement.classList.add('groups-item')
    if (group.name === getSelectedGroup().name) aGroupElement.classList.add('groups-item-active')
    if (group.featured) aGroupElement.classList.add('groups-featured')

    const barElement = document.createElement('div')
    barElement.classList.add('groups-bar')
    barElement.style.backgroundColor = group.color || '#fff'
    const nameElement = document.createElement('p')
    nameElement.classList.add('groups-row', 'groups-row-name')
    nameElement.textContent = group.display_name
    const versionElement = document.createElement('p')
    versionElement.classList.add('groups-row', 'groups-row-version')
    versionElement.textContent = (group.entries.find((e, i) => {
      index = i
      return !e.pre
    }) || group.entries[0]).version

    aGroupElement.appendChild(barElement)
    aGroupElement.appendChild(nameElement)
    aGroupElement.appendChild(versionElement)
    groupsContainerElement.appendChild(aGroupElement)
  })
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const replaceBuildVersionElements = () => {
  const group = getSelectedGroup()
  buildCurrentVersionLinkElement.href = `#${group.name}/${current.version}`
  buildCurrentVersionLinkElement.children.item(0).textContent = group.display_name
  buildCurrentVersionLabelElement.classList.toggle('changelog-entry-major', current.pre || false)
  buildCurrentVersionLabelElement.textContent = `${current.version}`
  if (current.date) {
    const date = new Date(current.date)
    if (!isNaN(date.getTime())) {
      buildDateElement.textContent = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
      buildDateElement.title = date.toLocaleString(undefined, { timeZoneName: 'short' })
    } else {
      buildDateElement.textContent = current.date
      buildDateElement.title = current.date
    }
  } else {
    buildDateElement.textContent = ''
    buildDateElement.title = ''
  }
  if (current.pre) {
    buildCurrentVersionLabelElement.title = 'This version is pre-release'
  } else {
    buildCurrentVersionLabelElement.title = ''
  }
  if (!current.pre) {
    buildCurrentVersionLabelElement.style.color = group.color || '#fff'
  } else {
    buildCurrentVersionLabelElement.style.color = null
  }
  { // left
    const old = buildVersionElement.children.item(0)
    const element = createBuildVersionLinkElement(group.entries[current.index + 1], false)
    buildVersionElement.replaceChild(element, old)
  }
  { // right
    const old = buildVersionElement.children.item(2)
    const element = createBuildVersionLinkElement(group.entries[current.index - 1], true)
    buildVersionElement.replaceChild(element, old)
  }
  { // nav, left
    const entry = group.entries[current.index + 1]
    if (entry) {
      let aElement
      if (navItemLeftElement.children.length === 0) {
        aElement = document.createElement('a')
        navItemLeftElement.appendChild(aElement)
      } else {
        aElement = navItemLeftElement.children.item(0)
      }
      aElement.href = `#${group.name}/${entry.version}`
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
    const entry = group.entries[current.index - 1]
    if (entry) {
      let aElement
      if (navItemRightElement.children.length === 0) {
        aElement = document.createElement('a')
        navItemRightElement.appendChild(aElement)
      } else {
        aElement = navItemRightElement.children.item(0)
      }
      aElement.href = `#${group.name}/${entry.version}`
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
  for (let i = 2; i < length; i++) {
    const element = buildsItemElement.children.item(2)
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
      messageElement.innerHTML = processMessage(entry.message)
      const userElement = document.createElement('span')
      userElement.classList.add('changelog-entry-user')
      const byElement = document.createElement('span')
      byElement.textContent = 'by '
      const userLinkElement = document.createElement('a')
      if (entry.author === undefined || entry.author === null) entry.author = 'ghost'
      if (!entry.author.includes(',')) userLinkElement.href = `https://github.com/${entry.author}`
      userLinkElement.textContent = entry.author

      const entryRowDescriptionElement = document.createElement('div')
      if (entry.description) {
        entryRowDescriptionElement.classList.add('changelog-entry-row', 'changelog-entry-row-message')
        const messagesElement = document.createElement('div')
        messagesElement.classList.add('changelog-entry-descriptions')
        entry.description.forEach(m => {
          const messageElement = document.createElement('p')
          messageElement.innerHTML = processMessage(m)
          messagesElement.appendChild(messageElement)
        })
        entryRowDescriptionElement.appendChild(messagesElement)
      }

      titleIconElement.appendChild(iconElement)
      userElement.appendChild(byElement)
      userElement.appendChild(userLinkElement)
      entryRowElement.appendChild(titleIconElement)
      entryRowElement.appendChild(messageElement)
      entryRowElement.appendChild(userElement)
      entryElement.appendChild(entryRowElement)
      if (entry.description) entryElement.appendChild(entryRowDescriptionElement)
      entriesElement.appendChild(entryElement)
    })
    container.appendChild(categoryNameElement)
    container.appendChild(entriesElement)
    buildsItemElement.appendChild(container)
  })
}

const ISSUE_REGEX = /(?!\/)([a-zA-Z0-9\-_]+?)#(\d+)/g
const ISSUE_EXPANDED_REGEX = /([a-zA-Z0-9\-_]+?)\/([a-zA-Z0-9\-_]+?)#(\d+)/g
const MD_URL_REGEX = /\[(.*?)\]\((.*?)\)/g
const MD_BOLD_REGEX = /\*\*(.*?)\*\*/g
const MD_ITALIC_REGEX = /[*_](.*?)[*_]/g
const MD_UNDERLINE_REGEX = /__(.*?)__/g
const MD_STRIKETHROUGH_REGEX = /~~(.*?)~~/g

/**
 * @param {string} message
 */
const processMessage = message => {
  let result = ''
  let pending = ''
  for (let i = 0; i < message.length; i++) {
    const char = message.charAt(i)
    pending += char
    if (/\d/.test(char)) continue
    // the order is *VERY* important!
    if (ISSUE_REGEX.test(pending)) {
      if (ISSUE_EXPANDED_REGEX.test(pending)) {
        pending = pending.replace(ISSUE_EXPANDED_REGEX, '<a href="https://github.com/$1/$2/pull/$3">$&</a>')
        result += pending
        pending = ''
      } else {
        pending = pending.replace(ISSUE_REGEX, '<a href="https://github.com/' + defaultUser + '/$1/pull/$2">$&</a>')
        result += pending
        pending = ''
      }
    }
    if (MD_URL_REGEX.test(pending)) {
      pending = pending.replace(MD_URL_REGEX, '<a href="$2">$1</a>')
      result += pending
      pending = ''
    }
    if (MD_BOLD_REGEX.test(pending)) {
      pending = pending.replace(MD_BOLD_REGEX, '<b>$1</b>')
      result += pending
      pending = ''
    }
    if (MD_ITALIC_REGEX.test(pending)) {
      pending = pending.replace(MD_ITALIC_REGEX, '<i>$1</i>')
      result += pending
      pending = ''
    }
    if (MD_UNDERLINE_REGEX.test(pending)) {
      pending = pending.replace(MD_UNDERLINE_REGEX, '<u>$1</u>')
      result += pending
      pending = ''
    }
    if (MD_STRIKETHROUGH_REGEX.test(pending)) {
      pending = pending.replace(MD_STRIKETHROUGH_REGEX, '<strike>$1</strike>')
      result += pending
      pending = ''
    }
  }
  result += pending
  return result
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
    a.href = `#${getSelectedGroup().name}/${entry.version}`
    a.appendChild(side)
    return a
  }
}

fetch(url).then(res => res.json()).then(data => process(data))

window.addEventListener('hashchange', () => {
  process()
})
