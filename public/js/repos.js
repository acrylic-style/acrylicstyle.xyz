let repos = document.getElementById('repos')
const calculateActivity = data => data.forks_count + data.watchers_count + data.stargazers_count
const material = name => {
  const i = document.createElement('i')
  i.classList.add('material-icons')
  i.textContent = name
  return i
}
const createMenu = (text, clickHandler) => {
  const menu = document.createElement('span')
  menu.classList.add('cmenu-entry')
  menu.textContent = text
  menu.onclick = clickHandler
  return menu
}
const addElement = data => {
  const repo = document.createElement('a')
  repo.classList.add('repo')
  if (data.archived) repo.classList.add('repo-gray')
  if (data.private) repo.classList.add('repo-private')
  repo.href = data.html_url
  const details = document.createElement('p')
  details.classList.add('details')
  const name = document.createElement('span')
  name.classList.add('name')
  name.textContent = data.name
  const menu = document.createElement('span')
  menu.classList.add('menu')
  menu.textContent = '...'
  menu.onclick = e => {
    e.preventDefault();
    const cmenu = document.createElement('span')
    cmenu.classList.add("cmenu")
    cmenu.setAttribute('style', `left: ${e.clientX - 50}px; top: ${e.pageY - 15}px;`)
    cmenu.onmouseleave = () => cmenu.remove()
    cmenu.appendChild(createMenu('Commits', () => openUrl(`${data.html_url}/commits`)))
    cmenu.appendChild(createMenu('Issues List', () => openUrl(`${data.html_url}/issues`)))
    cmenu.appendChild(createMenu('Releases', () => openUrl(`${data.html_url}/releases`)))
    cmenu.appendChild(createMenu('Tags', () => openUrl(`${data.html_url}/tags`)))
    cmenu.appendChild(createMenu('Forks', () => openUrl(`${data.html_url}/forks`)))
    cmenu.appendChild(createMenu('Stargazers', () => openUrl(`${data.html_url}/stargazers`)))
    document.getElementById('main').appendChild(cmenu)
  }
  const description = document.createElement('p')
  description.classList.add('description')
  description.textContent = data.description
  const info = document.createElement('p')
  info.classList.add('info')
  const lang = document.createElement('span')
  lang.classList.add('lang')
  lang.textContent = `${data.language || 'Unspecified'}${data.archived ? ' (Archived)' : ''}`
  const issues = document.createElement('span')
  issues.appendChild(material('error_outline'))
  issues.classList.add('issues')
  const issues2 = document.createElement('span')
  issues2.textContent = data.open_issues_count
  issues2.style = "vertical-align: 25%;"
  issues.appendChild(issues2)
  issues.title = 'Open issues'
  issues.onclick = e => {
    e.preventDefault()
    openUrl(`${data.html_url}/issues`)
  }
  const stars = document.createElement('span')
  stars.classList.add('stars')
  stars.textContent = `${data.stargazers_count}`
  stars.title = 'Stargazers'
  stars.onclick = e => {
    e.preventDefault()
    openUrl(`${data.html_url}/stargazers`)
  }
  const activity = document.createElement('span')
  activity.classList.add('activity')
  activity.textContent = calculateActivity(data)
  activity.onclick = e => e.preventDefault()
  activity.title = 'Stars + Forks + Watchers'
  details.appendChild(name)
  details.appendChild(menu)
  info.appendChild(lang)
  info.appendChild(issues)
  info.appendChild(stars)
  info.appendChild(activity)
  repo.appendChild(details)
  repo.appendChild(description)
  repo.appendChild(info)
  repos.appendChild(repo)
}
const repoList = []
const fetchRepos = async () => {
  const text = document.getElementById('load')
  let index = 0
  let repos = 0
  while (true) {
    if (index === -1) break;
    await fetch(`/api/repos.php?page=${++index}`).then(res => res.json()).then(data => {
      if (data.length === 0) {
        index = -1
        text.textContent = `Listing ${repos} public repositories.`
        return
      }
      repos += data.length
      text.textContent = `Loading... (${repos} repos fetched)`
      data.forEach(repo => {
        repoList.push(repo)
      })
    })
  }
}
const getOptions = () => {
  const hideArchived = document.getElementById('hideArchived').checked
  return {
    hideArchived,
  }
}
const refreshRepoList = async () => {
  repos = document.getElementById('repos')
  const options = getOptions()
  const text = document.getElementById('load')
  if (repoList.length === 0) await fetchRepos()
  const repoClone = []
  repoList.forEach(repo => {
    if (!options.hideArchived || !repo.archived) {
      repoClone.push(repo)
    }
  })
  const sort = document.querySelector('input[name="sort"]:checked').value
  console.log('Sorting repos with ' + sort)
  if (sort === 'name_z-a') {
    repoClone.sort().reverse()
  } else if (sort === 'high_activity') {
    repoClone.sort((a, b) => calculateActivity(b) - calculateActivity(a))
  } else if (sort === 'low_activity') {
    repoClone.sort((a, b) => calculateActivity(a) - calculateActivity(b))
  } else if (sort === 'new_update') {
    repoClone.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  } else if (sort === 'old_update') {
    repoClone.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
  } else if (sort === 'new_create') {
    repoClone.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else if (sort === 'old_create') {
    repoClone.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  }
  //repoList.sort((a, b) => )
  while (repos.firstChild) repos.removeChild(repos.lastChild)
  repoClone.forEach((repo, i) => {
    text.textContent = `Listing ${i+1} public repositories. ${options.hideArchived ? '(Archived repositories are excluded)' : '(Including archived repositories)'}`
    addElement(repo)
  })
}
let a = false
const refetchRepos = async () => {
  if (a) return
  a = true
  repoList.length = 0
  await refreshRepoList()
  a = false
}
const toggleSortBox = () => {
  const element = document.getElementById('sortToggle')
  const box = document.getElementById('sortBox')
  if (element.classList.contains('toggle-closed')) {
    element.classList.remove('toggle-closed')
    element.classList.add('toggle-opened')
    box.classList.remove('hidden')
  } else {
    element.classList.remove('toggle-opened')
    element.classList.add('toggle-closed')
    box.classList.add('hidden')
  }
}
