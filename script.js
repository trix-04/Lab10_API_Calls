//Task 1: GET request using FETCH()
document.getElementById("fetch-butn").addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { 
            document.getElementById("display-area").innerHTML = `
                <div class="fetch-title">Title: ${data.title}</div>
                <br>
                <div class="fetch-body">Body: ${data.body}</div>
            `;
        })
        .catch(error => { 
            document.getElementById("display-area").innerHTML = `
                <div class="fetch-error">Error: ${error.message}</div>
            `;
        });
});

//Task 2: XMLHttpRequest 
document.getElementById("xhr-butn").addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2", true);
    xhr.onload = function() { 
        console.log(this);
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById("display-area").innerHTML = `
                <div class="XHR-title">Title: ${data.title}</div>
                <br>
                <div class="XHR-body">Body: ${data.body}</div>
            `;
        } else {
            document.getElementById("display-area").innerHTML = `
                <div class="XHR-error">Error: ${xhr.status}</div>
            `;
        }
    };
    xhr.onerror = function() {
        document.getElementById("display-area").innerHTML = `
            <div class="XHR-fail-error">Request failed</div>
        `;
    };
    xhr.send();
});

//Task 3: Send data using POST
document.getElementById("post-form").addEventListener("submit", (event) => {
    event.preventDefault(); //stops page from refreshing after submit
    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-body").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("form-display-area").innerHTML = `
                <div class="post-ID-msg">Post successfully created with ID: ${data.id}</div>
            `;
        })
        .catch(error => { 
            document.getElementById("form-display-area").innerHTML = `
                <div class="post-error">Error: ${error.message}</div>
            `;
        });
});

//Task 4: Update Data using PUT
document.getElementById("post-form").addEventListener("submit", (event) => {
    const id = document.getElementById("post-id").value;
    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-body").value;
    var data = {};
    data.id = parseInt(id);
    data.title = title;
    data.body = body;
    var json = JSON.stringify(data);

    if (id) {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`, true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = function() {
            if (this.readyState == 4 && this.status === 200) {
                const data = JSON.parse(xhr.responseText);
                document.getElementById("form-display-area").innerHTML = `
                    <div class="update-title">Updated post title: ${data.title}</div>
                    <div class="update-body">Updated post body: ${data.body}</div>
                `;
            } else {
                document.getElementById("form-display-area").innerHTML = `
                    <div class="update-error">Error: ${xhr.status}</div>
                `;
            }
        };
        xhr.onerror = function() { //change <p> for CSS styling
            document.getElementById("form-display-area").innerHTML = `
                <div class="update-fail">Request failed</div>
            `;
        };
       xhr.send(json);
    }
});

