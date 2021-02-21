const CLIENT_ID =
  "453285145951-8mah9nh2fpjrgto1g41pm9baf348u7tc.apps.googleusercontent.com";
const API_KEY = "AIzaSyA005AzEC4Ag1htOVVR8XqjXuxjodEnqZc";

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
];

const SCOPES = "https://www.googleapis.com/auth/gmail.modify";

var authorizeButton = document.getElementById("authorize_button");
var signoutButton = document.getElementById("signout_button");

const handleClientLoad = () => {
  gapi.load("client:auth2", initClient);
};

const initClient = () => {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      },
      function (error) {
        appendPre(JSON.stringify(error, null, 2));
      }
    );
};

const updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
    let navItems = document.querySelectorAll(".nav-items");
    for (let elm of navItems) {
      elm.classList.add("d-block");
    }
    // listLabels();
    listMails("INBOX");
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
  }
};

const handleAuthClick = (event) => {
  gapi.auth2.getAuthInstance().signIn();
};

const handleSignoutClick = (event) => {
  gapi.auth2.getAuthInstance().signOut();
};

const handleNavClick = (type) => {
  listMails(type);
};

const listMails = (type) => {
  gapi.client.gmail.users.messages
    .list({
      userId: "me",
      labelIds: type,
      maxResults: "30",
    })
    .then((response) => {
      emailList = `<h3 class="heading text-center mt-3 mb-5">${
        type[0].toUpperCase() + type.slice(1, type.length).toLowerCase()
      }</h3>`;
      let result = response.result.messages;
      for (let item of result) {
        listMessages(item.id, `onclick="handleEmailClick(this)"`);
      }
      setTimeout(() => {
        let emailContainer = document.querySelector(".email-container");
        emailContainer.innerHTML = emailList;
      }, 750);
    });
};

let emailList = "";

const truncate = (str, n) =>
  str?.length > n ? str.substr(0, n - 1) + "..." : str;

const handleEmailClick = (clickedEmail) => {
  viewMail(clickedEmail.id);
};

const listMessages = (messageID, options) => {
  gapi.client.gmail.users.messages
    .get({
      userId: "me",
      id: messageID,
    })
    .then(function (response) {
      let messages = response.result;
      let subject = "";
      let from = "";
      let time = "";
      for (let item of messages.payload.headers) {
        if (item.name === "From") {
          from = item.value;
        }
        if (item.name === "Subject") {
          subject = item.value;
        }
        if (item.name === "Date") {
          time = item.value;
        }
      }
      let emailContainerItems = `
      <div class="row email-item" id="${messages.id}" ${options}>
        <div class="col-md-3 email-from">${from}</div>
        <div class="col-md-7 email-content"><span style="font-weight: bold;">${truncate(
          subject,
          100
        )}</span></div>
        <div class="col-md-2">${time}</div>
      </div>
      `;
      emailList += emailContainerItems;
    });
};

const viewMail = (messageID) => {
  gapi.client.gmail.users.messages
    .get({
      userId: "me",
      id: messageID,
    })
    .then(function (response) {
      let messages = response.result;
      let messageInStr;
      console.log(messages);
      if (messages.payload.body.size !== 0) {
        messageInStr = messages.payload.body.data;
      } else if (messages.payload.mimeType === "multipart/mixed") {
        messageInStr = messages.payload.parts[0].parts[0].body.data;
      } else {
        messageInStr = messages.payload.parts[0].body.data;
      }
      let subject = "";
      let from = "";
      let time = "";
      for (let item of messages.payload.headers) {
        if (item.name === "From") {
          from = item.value;
        }
        if (item.name === "Subject") {
          subject = item.value;
        }
        if (item.name === "Date") {
          time = item.value;
        }
      }
      let emailContainer = document.querySelector(".email-container");
      let emailContainerItems = `
        <h3 class="mt-5"><a href="" style="color:inherit;"><i class="fas fa-long-arrow-alt-left"></i></a>  ${subject}</h3>
        <p>${from}</p>
        <p>${time}</p>
        <p>${atob(messageInStr.replace(/-/g, "+").replace(/_/g, "/")).replace(
          /(?:\r\n|\r|\n)/g,
          "<br>"
        )}</p>
      `;
      emailContainer.innerHTML = emailContainerItems;
    });
};

const handleComposeMail = () => {
  let toAddress = document.querySelector("#toInput");
  let subject = document.querySelector("#subject");
  let message = document.querySelector("#mailInput");

  gapi.client.gmail.users
    .getProfile({
      userId: "me",
    })
    .then((res) => res)
    .then((name) => {
      let from = name.result.emailAddress;
      let body =
        `From: ${from} \r\n` +
        `To: ${toAddress.value} \r\n` +
        `Subject: ${subject.value} \r\n\r\n` +
        `${message.value}`;
      body = btoa(body);
      body = body.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      gapi.client.gmail.users.messages
        .send({
          userId: "me",
          resource: {
            raw: body,
          },
        })
        .then(function () {
          console.log("done!");
        });
    });
};

const listDrafts = (id, options) => {
  gapi.client.gmail.users.drafts
    .get({
      userId: "me",
      id: id,
    })
    .then(function (response) {
      let drafts = response.result;
      let subject = "";
      let from = "";
      let time = "";
      for (let item of drafts.message.payload.headers) {
        if (item.name === "From") {
          from = item.value;
        }
        if (item.name === "Subject") {
          subject = item.value;
        }
        if (item.name === "Date") {
          time = item.value;
        }
      }
      let emailContainerItems = `
      <div class="row email-item" id="${drafts.id}" ${options}>
        <div class="col-md-3 email-from">${from}</div>
        <div class="col-md-7 email-content"><span style="font-weight: bold;">${truncate(
          subject,
          100
        )}</span></div>
        <div class="col-md-2">${time}</div>
      </div>
      `;
      emailList += emailContainerItems;
    });
};

const handleDraftMail = () => {
  let toAddress = document.querySelector("#draftTo");
  let subject = document.querySelector("#draftSubject");
  let message = document.querySelector("#draftMail");

  gapi.client.gmail.users
    .getProfile({
      userId: "me",
    })
    .then((res) => res)
    .then((name) => {
      let from = name.result.emailAddress;
      let body =
        `From: ${from} \r\n` +
        `To: ${toAddress.value} \r\n` +
        `Subject: ${subject.value} \r\n\r\n` +
        `${message.value}`;
      body = btoa(body);
      body = body.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      gapi.client.gmail.users.messages
        .send({
          userId: "me",
          resource: {
            raw: body,
          },
        })
        .then(() => {
          gapi.client.gmail.users.drafts
            .delete({
              userId: "me",
              id: selectedDraftID,
            })
            .then(() => {
              handleDraftNavClick();
            });
        });
    });
};

let selectedDraftID;

const handleDraftClick = (selectedDraft) => {
  let toAddressElm = document.querySelector("#draftTo");
  let subjectElm = document.querySelector("#draftSubject");
  let messageElm = document.querySelector("#draftMail");
  selectedDraftID = selectedDraft.id;
  gapi.client.gmail.users.drafts
    .get({
      userId: "me",
      id: selectedDraft.id,
    })
    .then((res) => {
      let subject = "";
      let to = "";
      let message = "";
      for (let item of res.result.message.payload.headers) {
        if (item.name === "To") {
          to = item.value;
        }
        if (item.name === "Subject") {
          subject = item.value;
        }
      }
      console.log(res);
      if (res.result.message.payload.parts[0]) {
        message = res.result.message.payload.parts[0].body.data;
      }
      toAddressElm.value = to;
      subjectElm.value = subject;
      messageElm.value = atob(message.replace(/-/g, "+").replace(/_/g, "/"));
    });
};

const handleDraftNavClick = () => {
  gapi.client.gmail.users.drafts
    .list({
      userId: "me",
    })
    .then((response) => {
      emailList = `<h3 class="heading text-center mt-3 mb-5">Draft</h3>`;
      let result = response.result.drafts;
      for (let item of result) {
        listDrafts(
          item.id,
          `onclick="handleDraftClick(this)" data-bs-toggle="modal"
            data-bs-target="#draftModal"`
        );
      }
      setTimeout(() => {
        let emailContainer = document.querySelector(".email-container");
        emailContainer.innerHTML = emailList;
      }, 750);
    });
};
