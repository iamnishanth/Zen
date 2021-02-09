const API_URL = "https://6016417c55dfbd00174cabaa.mockapi.io/zen";
let data;
let selectedItem;
let currentPost;

// Basic fetch to return json
const fetchData = (url) => {
  try {
    let data = fetch(url).then((data) => data.json());
    return data;
  } catch (err) {
    console.log(err);
  }
};

// function to truncate the title
const truncate = (str, n) =>
  str?.length > n ? str.substr(0, n - 1) + "..." : str;

// function to update the global data
const updateData = async () => {
  data = await fetchData(API_URL);
};

// Builds Homepage
const buildHomePage = async () => {
  data = await fetchData(API_URL);
  data = data.reverse();
  let postWrapper = document.querySelector(".post-wrapper");
  let postWrapperItems = "";
  for (let item of data) {
    postWrapperItems += `<div class="col-md-4 col-lg-3 card-wrapper">
      <div class="card" id="${item.id}" onclick="handlePostClick(this)">
        <div class="card-body">
          <h5 class="card-title heading">${truncate(item.title, 50)}</h5>
          <p class="card-text">Created by ${item.name}</p>
        </div>
      </div>
    </div>`;
  }
  postWrapper.innerHTML = postWrapperItems;
};

// Handling function to view the post
const handlePostClick = (selectedPost) => {
  currentPost = selectedPost;
  let topWrapper = document.querySelector(".top-wrapper");
  for (let item of data) {
    if (selectedPost.id === item.id) {
      selectedItem = item;
    }
  }
  let comments = "";
  for (let comment of selectedItem.comments) {
    comments += `<div class="card comment-card">
    <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>${comment.comment}</p>
      <footer class="blockquote-footer">${comment.name}</footer>
    </blockquote>
    </div>
    </div>`;
  }
  topWrapper.classList.add("add-flex");
  let topWrapperItems = `<div class="post-details-wrapper">
    <h3 class="heading"><a class="a-link" href=""><i class="fas fa-long-arrow-alt-left"></i></a>  ${selectedItem.title}</h3>
    <p class="heading">Created by <span class="post-details-name">${selectedItem.name}</span></p>
    <br />
    <h6 class="heading">${selectedItem.query}</h6>
    <div class="post-details-coa">
      <button class="btn btn-sm btn-green heading" data-bs-toggle="modal"
      data-bs-target="#createCommentModal">Add comment</button><button class="btn btn-sm btn-green heading" data-bs-toggle="modal"
      data-bs-target="#deletePostModal">Delete Post</button>
    </div>
    <h3 class="heading post-details-comments-title">Comments </h3>
    ${comments}
  </div>`;
  topWrapper.innerHTML = topWrapperItems;
};

// Function to create new post
const createNewPost = async () => {
  let userName = document.querySelector(".post-username").value;
  let password = document.querySelector(".post-pwd").value;
  let title = document.querySelector(".post-title").value;
  let query = document.querySelector(".query-box").value;
  query = query.replace(/(?:\r\n|\r|\n)/g, "<br>");
  if (userName.length === 0) {
    userName = "Anonymous";
  }
  let data = {
    name: userName,
    title: title,
    query: query,
    comments: [],
    password: password,
  };
  let resp = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  resp = await resp.json();
  buildHomePage();
};

// Function to add comment
const createNewComment = async () => {
  let body = selectedItem;
  let name = document.querySelector(".comment-username").value;
  let comment = document.querySelector(".comment-box").value;
  comment = comment.replace(/(?:\r\n|\r|\n)/g, "<br>");
  if (comment.includes("\n")) {
    console.log("yes");
  }
  if (comment.length > 0) {
    if (name.length === 0) {
      name = "Anonymous";
    }
    let commentObj = { name, comment };
    body.comments.push(commentObj);
    let resp = await fetch(API_URL + "/" + body.id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    await updateData();
    document.querySelector(".comment-username").value = "";
    document.querySelector(".comment-box").value = "";
    handlePostClick(currentPost);
  } else {
    alert("Write a comment");
  }
};

// Function to delete a post after validation
const deletePost = async () => {
  let password = document.querySelector(".delete-password").value;
  if (selectedItem.password === password) {
    let resp = await fetch(API_URL + "/" + selectedItem.id, {
      method: "DELETE",
    });
    resp = await resp.json();
    window.location.reload();
  } else {
    alert("Incorret Password");
    document.querySelector(".delete-password").value = "";
  }
};

buildHomePage();
