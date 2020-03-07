
function formSubmit(){
    $('form').submit(event => {

        event.preventDefault();

        const username = $('input').val().toLowerCase();
        
        loadUsers(username);
        userRepos(username);

      })
}

$(formSubmit());

function loadUsers(username){

    var xhr = new XMLHttpRequest();
        
    xhr.open('GET' , `https://api.github.com/users/${username}` , true);

    xhr.onload = function(){
        if(this.status == 200){

            var users = JSON.parse(this.responseText);

            var output = `
            <h3 class="head-user">${users.name}</h3>
            <table>
                <tr>
                    <td rowspan="5"><img src="${users.avatar_url}"></td>
                    <td></td>
                    <td>Repositórios : ${users.public_repos}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Gists : ${users.public_gists}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Location : ${users.location}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Bio : ${users.bio}</td>
                </tr>
                <tr>
                    <td></td>
                    <td><a class="btn btn-default" target="_blank" href="${users.html_url}">Visit Github</a></td>
                </tr>             
            </table>
            
            <th><h3 class="head-user">Avalilable Repositories List</h3><th>

            `

            document.getElementById('users').innerHTML = output;
        }

    }
        xhr.send();
}

function userRepos(username){

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => {
          if (response.ok){
              return response.json();
          }
          throw new Error(response.statusText);
      })
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

const createTemplate = function(repo_name, url, dtcreated, dtupdated, description) {

    let template = `
    <section>
        <table>
            <tr>
                <td colspan="4" class="p0"><a href="${url}" title="Click here to redirect to the project">${repo_name.toUpperCase().split('-').join(' ')}</a></td>
            </tr>
            <tr><td colspan="4" class="desc">${description}</td></tr>
            <tr style="text-align:center;">
                <td>Date Created:</td>
                <td>Last update:</td>
            </tr>
            <tr style="text-align:center;">
                <td>${dtcreated.getMonth()}/${dtcreated.getDate()}/${dtcreated.getFullYear()}</td>
                <td>${dtupdated.getMonth()}/${dtupdated.getDate()}/${dtupdated.getFullYear()}</td>
            </tr>
        </table>
    </section>
    `;

    
    return template;
};





