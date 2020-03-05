
function formSubmit(){
    $('form').submit(event => {
        event.preventDefault();
        const username = $('input').val().toLowerCase();
        userRepos(username);
      })
}

function userRepos(username){

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => {
          if (response.ok){
              return response.json();
          }
          throw new Error(response.statusText);
      })
      .then(responseJson => displayOwner(responseJson) )
      .then(responseJson => displayRepos(responseJson))
      .catch(err => {alert(`There was an error! Something went wrong: ${err.message}`)});
}

function displayRepos(responseJson){
    
    responseJson.forEach(repo => {
        let {
            name,
            html_url,
            created_at,
            updated_at,
            description, 
        } = repo;
        
        let dateCreated = new Date(created_at);
        let dateUpdated =  new Date(updated_at);

        $('.repos').append(createTemplate(name, html_url, dateCreated, dateUpdated, description));

    });
    
};

function displayOwner(responseJson) {
    
    responseJson.displayOwner( owner =>{
        let {
            login
        } = owner;

        $('.owner').append(createTemplate(login));
    });
}

const createOwnerTemplate = function(login){
    let template = `
    <p>${login}</p>
    `
}

const createTemplate = function(repo_name, url, dtcreated, dtupdated, description) {
    let template = `
    <section>
      <p class="p0"><a href="${url}" title="Click here to redirect to the project">${repo_name.toUpperCase().split('-').join(' ')}</a></p>
      <p class="desc"> ${description} </p>
      <ul>
        <li>Date Created: ${dtcreated.getMonth("00")}/${dtcreated.getDate("00")}/${dtcreated.getFullYear()}</li>
        <li>Last update: ${dtupdated.getMonth()}/${dtupdated.getDate()}/${dtupdated.getFullYear()}</li>
      </ul>
    </section>
    `;
    return template;
};

$(formSubmit());

