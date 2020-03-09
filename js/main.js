
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
            <h1 align="center">${users.name}</h1>

            <div class="flex-container">
                
                <div style="width: auto"><img src="${users.avatar_url}"></div>

                <div class="w3-tag w3-round w3-blue" style="padding:5px">
                    <div class="w3-tag w3-round w3-blue">
                        <label style="font-size: 14px;">Repositories</label><br>
                        <p class="w3-tag w3-teal">${users.public_repos}</p>
                    </div>
                </div>

                <div class="w3-tag w3-round w3-blue w3-border-white" style="padding:5px">
                    <div class="w3-tag w3-round w3-blue">
                        <label style="font-size: 14px;">Gists</label><br>
                        <p class="w3-tag w3-red">0${users.public_gists}</p>
                    </div>
                </div>

                <div class="w3-tag w3-round w3-blue" style="padding:3px; width: auto;">
                    <div class="w3-tag w3-round w3-blue" style="width: 250px">
                        <label style="font-size: 14px;">Location</label><br>
                        <label style="font-size: 16px;">${users.location}</label>
                    </div>
                </div>

                <div class="w3-tag w3-round w3-blue" style="padding:3px; width: 900px; text-align: left;">
                    <div class="w3-tag w3-round w3-blue">
                    <label style="font-size: 14px;">User Biography</label><br>
                    <label style="font-size: 16px;">${users.bio}</label>
                    </div>
                </div>
            </div>

            <a class="btn btn-default" target="_blank" href="${users.html_url}">Visit Github</a>
            
            <h1 align="center">Available Repositories List</h1>
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
        
        let dateCreated = created_at;
        let dateUpdated = updated_at;

        $('.repos').append(createTemplate(name, html_url, dateCreated, dateUpdated, description));

    });
    
};

const createTemplate = function(repo_name, url, dtcreated, dtupdated, description) {

    let template = `
    <section>

        <div class="flex-container">
            <div class="w3-tag w3-round w3-blue" style="padding:3px; width: 320px; text-align: left;">
                <div class="ex1">
                    <label style="font-size: 14px; text-align: left;">Project Name</label><br>
                    <a class="a1" href="${url}" title="Click here to redirect to the project">${repo_name.split('-').join(' ')}</a>
                </div>
            </div>
            <div class="w3-tag w3-round w3-blue" style="padding:3px; width: 220px;">
                <label style="font-size: 14px; text-align: left;">Created</label><br>
                <div class="ex2">${dtcreated.substring(0,10)}</div>
            </div>
            <div class="w3-tag w3-round w3-blue" style="padding:3px; width: 220px;">
                <label style="font-size: 14px; text-align: left;">Updated</label><br>
                <div class="ex2">${dtupdated.substring(0,10)}</div>
            </div>
            <div class="w3-tag w3-round w3-blue" style="padding:3px; width: 900px; text-align: left;">
                <div class="titulo-center">
                <label style="font-size: 14px; text-align: left;">Project Description</label><br>
                </div>
                <div class="ex3">${description}</div>
            </div>
        </div>


    </section>
    `;

    return template;
};





