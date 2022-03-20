import Email from "./fetchEmails/fetchEmails";

Email.fetch().then((data) => {
    console.log(data)
})
