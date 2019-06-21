// 配置资源路径
const webConfigLink = './config/webConfig.json', artConfigLink = './config/artConfig.json'

// 首屏动画
$(document).ready(()=>{
  createHtml().then(()=>{
    beginAnimation($('header')).then(()=>
    beginAnimation($('.list'))).then(()=>
    beginAnimation($('article'))).then(()=>
    beginAnimation($('footer')))
  })
})

// ajax(promise version)
function ajaxPromise(method, url) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      method: method || 'GET',
      url: url,
      success: res=>{
        resolve(res)
      },
      error: res=>{
        reject(res)
      }
    })
  })
}

function beginAnimation(node){
  $(node).css({'margin-top': '-20px'})
  return $(node).animate({'opacity': 1, 'margin-top': '0px'}, 600).promise().done()
}

/**
 * 展示文章
 * @param {*} node 
 * @param {*} info 
 */
function showArticle(node, info){
  // 切换选择栏
  $('.list').children().removeClass()
  $(node).addClass('selected')

  // 切换地址
  location.hash = node.id

  // 无缓存，调用ajax获取
  if(!sessionStorage.getItem(info.title)){
    let tagsSpan = ''
    for(let tag of info.tags){
      tagsSpan += `<span class='tag'>${tag}</span>`
    }
    tagsSpan = '<p>' + tagsSpan + '</p>'
    const header = `
      <h2 class='title' onclick='toggleList(this)'>${info.title}</h2>
      <p class='subtitle'>${info.subtitle}</p>
      <p class='date'>
        <img width='20px' height='20px' src='data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik05NTUuOCwxMjcuNkg4MTAuNlY1Mi4zYzAtMTguOC0xNS4zLTM0LjItMzQuMi0zNC4ySDYzOS43Yy0xOC44LDAtMzQuMiwxNS4zLTM0LjIsMzQuMnY3NS40aC0yMDVWNTIuM2MwLTE4LjgtMTUuMy0zNC4yLTM0LjItMzQuMkgyMjkuN2MtMTguOCwwLTM0LjIsMTUuMy0zNC4yLDM0LjJ2NzUuNEg0NC4yQzI1LjMsMTI3LjYsMTAsMTQzLDEwLDE2MS44djc4NS45YzAsMTguOCwxNS4zLDM0LjIsMzQuMiwzNC4yaDQxNS41aDgwLjdoNDE1LjVjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJWNTg5Ljh2LTQyOEM5OTAsMTQzLDk3NC43LDEyNy42LDk1NS44LDEyNy42eiBNNjM5LjcsMTYxLjh2LTM0LjJWNTIuM2gxMzYuN2wwLDc1LjRsMCwzNC4ybDAsNTkuOGMwLDAsMCwwLDAsMEg2MzkuN1YxNjEuOHogTTIyOS43LDE2MS44di0zNC4yVjUyLjNoMTM2LjdsMCw3NS40bDAsMzQuMmwwLDU5LjhjMCwwLDAsMCwwLDBIMjI5LjdWMTYxLjh6IE00NC4yLDE2MS44aDE1MS40djU5LjhjMCwxOC44LDE1LjMsMzQuMiwzNC4yLDM0LjJoMTM2LjdjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJ2LTU5LjhoMjA1djU5LjhjMCwxOC44LDE1LjMsMzQuMiwzNC4yLDM0LjJoMTM2LjdjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJ2LTU5LjhoMTQ1LjJ2MjA1SDQ0LjJWMTYxLjh6IE05NTUuOCw5NDcuN0g1NDAuM2gtODAuN0g0NC4yVjQwMWg5MTEuN3YxODguOFY5NDcuN3oiIHN0eWxlPSJmaWxsOiNhOWI3YjciPjwvcGF0aD48cGF0aCBkPSJNMzUwLDUzNC4xbC01MS4zLDUxLjNjLTQuMyw0LjMtOS40LDYuNC0xNS41LDYuNGMtMTQuOCwwLTIyLjMtNy40LTIyLjMtMjIuM2MwLTYuMSwyLjEtMTEuMiw2LjQtMTUuNWw4Ny4xLTg3LjFjNS44LTUuOCwxMS44LTguOCwxNy45LTguOGMxNC44LDAsMjIuMyw3LjQsMjIuMywyMi4zdjQwMC45YzAsMTQuOC03LjQsMjIuMy0yMi4zLDIyLjNjLTE0LjksMC0yMi4zLTcuNC0yMi4zLTIyLjNMMzUwLDUzNC4xTDM1MCw1MzQuMXoiIHN0eWxlPSJmaWxsOiNhOWI3YjciPjwvcGF0aD48cGF0aCBkPSJNNjExLjUsNzAzLjFINTk1Yy0xNC45LDAtMjIuMy03LjQtMjIuMy0yMi4zYzAtMTQuOSw3LjQtMjIuMywyMi4zLTIyLjNoMjYuM0w2NTYsNTAyLjdINTA1LjljLTE0LjgsMC0yMi4zLTcuNC0yMi4zLTIyLjNzNy40LTIyLjMsMjIuMy0yMi4zaDE3OC4yYzE0LjYsMCwyMiw3LjIsMjIuMywyMS42YzAsMS4zLTAuMiwzLjItMC43LDUuNGwtMzguNSwxNzMuNWgxNi45YzE0LjgsMCwyMi4zLDcuNCwyMi4zLDIyLjNjMCwxNC44LTcuNCwyMi4zLTIyLjMsMjIuM2gtMjdsLTQwLjUsMTgyLjljLTIuNywxMS43LTkuOCwxNy41LTIxLjMsMTcuNWMtMTUuMSwwLTIyLjYtNy40LTIyLjYtMjIuM2MwLTIuMiwwLjEtMy45LDAuMy01LjFMNjExLjUsNzAzLjF6IiBzdHlsZT0iZmlsbDojYTliN2I3Ij48L3BhdGg+PC9nPjwvc3ZnPiAg'>
        ${info.date}
      </p>
      ${tagsSpan}
    `
    $('.markdown-body').html(header)
    
    // 获取文章数据
    $.get(info.path)
    .then(data=>{
      const html = `
        ${header}
        <div class='content'>
          ${marked(data)}
        </div>
      `
      // 保存缓存
      sessionStorage.setItem(info.title, html)
      $('.markdown-body').html(html)
    })
  }

  // 直接获取缓存
  else{
    $('.markdown-body').html(sessionStorage.getItem(info.title))
  }

  $('html, body').css({scrollTop: '0px'})
}

function getWebConfig() {
  return $.get(webConfigLink)
}

function getArtConfig() {
  return $.get(artConfigLink)
}

function createHeader(data) {
  document.title = `${data.title}-${data.subtitle}`
  $('#blogName').text(data.title)
  $('#subName').text(data.subtitle)
  $('#endWords').text(data.end)
}

// 生成文章列表
function createArtList(data) {
  let articles = data.articles.sort(()=>1)

  let finalData = [], index = -1

  articles.forEach(element => {
    let artDate = element.date.split(' ')[0]

    artDate = element.date.split('-')
    artDate = artDate[0] + '-' + artDate[1]

    let alreadyExists = finalData.some((e, i) => {
      if (artDate == e.date) {
        index = i

        return true
      }
    })

    if (!alreadyExists) {
      finalData.push({
        date: artDate,
        data: [element]
      })
    }
    else {
      finalData[index].data.push(element)
    }
  })

  finalData.forEach(element=>{
    let p = document.createElement('p')
    
    p.innerHTML = element.date
    $('.list').append(p)

    for(let item of element.data){
      let li = document.createElement('li')
  
      li.id = `#${item.title}`
      li.onclick = function () {
        showArticle(this, item)
      }
      
      // 文章标题
      li.innerHTML = `
        <p class='title'>${item.title}</p>
        <p class='subtitle subtext'>${item.subtitle || '...'}</p>
      `
      $('.list').append(li)

      // 获取文章内容
      $.get(item.path).then(data=>{
        let tagsSpan = ''
        for(let tag of item.tags){
          tagsSpan += `<span class='tag'>${tag}</span>`
        }
        tagsSpan = '<p>' + tagsSpan + '</p>'
    
        const html = `
          <h2 class='title' onclick='toggleList(this)'>${item.title}</h4>
          <p class='subtitle'>${item.subtitle}</p>
          <p class='date'>
            <img style='margin-right: 10px; width: 16px; height: 16px;' src='data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik05NTUuOCwxMjcuNkg4MTAuNlY1Mi4zYzAtMTguOC0xNS4zLTM0LjItMzQuMi0zNC4ySDYzOS43Yy0xOC44LDAtMzQuMiwxNS4zLTM0LjIsMzQuMnY3NS40aC0yMDVWNTIuM2MwLTE4LjgtMTUuMy0zNC4yLTM0LjItMzQuMkgyMjkuN2MtMTguOCwwLTM0LjIsMTUuMy0zNC4yLDM0LjJ2NzUuNEg0NC4yQzI1LjMsMTI3LjYsMTAsMTQzLDEwLDE2MS44djc4NS45YzAsMTguOCwxNS4zLDM0LjIsMzQuMiwzNC4yaDQxNS41aDgwLjdoNDE1LjVjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJWNTg5Ljh2LTQyOEM5OTAsMTQzLDk3NC43LDEyNy42LDk1NS44LDEyNy42eiBNNjM5LjcsMTYxLjh2LTM0LjJWNTIuM2gxMzYuN2wwLDc1LjRsMCwzNC4ybDAsNTkuOGMwLDAsMCwwLDAsMEg2MzkuN1YxNjEuOHogTTIyOS43LDE2MS44di0zNC4yVjUyLjNoMTM2LjdsMCw3NS40bDAsMzQuMmwwLDU5LjhjMCwwLDAsMCwwLDBIMjI5LjdWMTYxLjh6IE00NC4yLDE2MS44aDE1MS40djU5LjhjMCwxOC44LDE1LjMsMzQuMiwzNC4yLDM0LjJoMTM2LjdjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJ2LTU5LjhoMjA1djU5LjhjMCwxOC44LDE1LjMsMzQuMiwzNC4yLDM0LjJoMTM2LjdjMTguOCwwLDM0LjItMTUuMywzNC4yLTM0LjJ2LTU5LjhoMTQ1LjJ2MjA1SDQ0LjJWMTYxLjh6IE05NTUuOCw5NDcuN0g1NDAuM2gtODAuN0g0NC4yVjQwMWg5MTEuN3YxODguOFY5NDcuN3oiIHN0eWxlPSJmaWxsOiNhOWI3YjciPjwvcGF0aD48cGF0aCBkPSJNMzUwLDUzNC4xbC01MS4zLDUxLjNjLTQuMyw0LjMtOS40LDYuNC0xNS41LDYuNGMtMTQuOCwwLTIyLjMtNy40LTIyLjMtMjIuM2MwLTYuMSwyLjEtMTEuMiw2LjQtMTUuNWw4Ny4xLTg3LjFjNS44LTUuOCwxMS44LTguOCwxNy45LTguOGMxNC44LDAsMjIuMyw3LjQsMjIuMywyMi4zdjQwMC45YzAsMTQuOC03LjQsMjIuMy0yMi4zLDIyLjNjLTE0LjksMC0yMi4zLTcuNC0yMi4zLTIyLjNMMzUwLDUzNC4xTDM1MCw1MzQuMXoiIHN0eWxlPSJmaWxsOiNhOWI3YjciPjwvcGF0aD48cGF0aCBkPSJNNjExLjUsNzAzLjFINTk1Yy0xNC45LDAtMjIuMy03LjQtMjIuMy0yMi4zYzAtMTQuOSw3LjQtMjIuMywyMi4zLTIyLjNoMjYuM0w2NTYsNTAyLjdINTA1LjljLTE0LjgsMC0yMi4zLTcuNC0yMi4zLTIyLjNzNy40LTIyLjMsMjIuMy0yMi4zaDE3OC4yYzE0LjYsMCwyMiw3LjIsMjIuMywyMS42YzAsMS4zLTAuMiwzLjItMC43LDUuNGwtMzguNSwxNzMuNWgxNi45YzE0LjgsMCwyMi4zLDcuNCwyMi4zLDIyLjNjMCwxNC44LTcuNCwyMi4zLTIyLjMsMjIuM2gtMjdsLTQwLjUsMTgyLjljLTIuNywxMS43LTkuOCwxNy41LTIxLjMsMTcuNWMtMTUuMSwwLTIyLjYtNy40LTIyLjYtMjIuM2MwLTIuMiwwLjEtMy45LDAuMy01LjFMNjExLjUsNzAzLjF6IiBzdHlsZT0iZmlsbDojYTliN2I3Ij48L3BhdGg+PC9nPjwvc3ZnPiAg'>
            <span>${item.date}</span>
          </p>
          ${tagsSpan}
          <div class='content'>
            ${marked(data)}
          </div>
        `
        sessionStorage.setItem(item.title, html)
      })
    }
  })

  // 根据URL#后的参数找到对应的文章并点击
  // 伪造搜索功能
  if(decodeURIComponent(location.hash)){
    for(let item of $('.list').children()){
      if(item.id == decodeURIComponent(location.hash))
        return $(item).click()
    }
  }
  $('.list li').first().click()
}

function createHtml() {
  return new Promise(function (resolve, reject) {
    // 获取网站数据
    if(!sessionStorage.getItem('webInfo')){
      $.get(webConfigLink).then(res=>{
        // 保存网页信息缓存
        sessionStorage.setItem('webInfo', JSON.stringify(res))
        createHeader(res)
      })
    }
    else{
      createHeader(JSON.parse(sessionStorage.getItem('webInfo')))
    }

    // 获取文章数据
    if(!sessionStorage.getItem('artInfo')){
      $.get(artConfigLink).then(res=>{
        // 保存文章信息缓存
        sessionStorage.setItem('artInfo', JSON.stringify(res))
        createArtList(res)
      })
    }
    else{
      createArtList(JSON.parse(sessionStorage.getItem('artInfo')))
    }
    resolve()
  })
}