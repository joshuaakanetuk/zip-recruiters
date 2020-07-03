
function renderRepoList(str) {
    $('#repolist').html(str);
}

function createRepoList(arr) {
    console.log(arr)
    let formattedList = '';
    formattedList = arr.map(repo => {
        return `<li><h2>${repo.owner.login}/${repo.name}</h2><a href="${repo.url}">${repo.url}</a></li>`
    })
    console.log(formattedList)
    return formattedList.join('');
}

function getRepos() {
  const url = `https://api.github.com/users/${$('#repo').val()}/repos?=per_page='100'`;
  
 const options = {
    headers: new Headers({
      "Accept": "application/vnd.github.v3+json",
      
    }),
    mode: 'cors'
  };
  // do we need to get all repos?
  fetch(url, options)
    .then(response => response.json())
    .then(responseJson => createRepoList(responseJson))
    .then(str => renderRepoList(str))
    .catch(err => alert('Something definitely went wrong.', err));
}


function init() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        console.log('On submit');
        getRepos();
    })
}

$(init);