---
title: User Data
date: September 22, 2020
---

## It's All About the Issues
<style>
    img {
        height: 100px;
        width: 100px;
    }
    ul {
        list-style: none;
    }
</style>

[Join the conversation](https://github.com/ianschwartz/site/issues/2)
<ul id="comments"></ul>

<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/2.0.3/showdown.min.js" async defer></script>
<script>
    const comments = document.querySelector('#comments');
    const getData = async () => {
        const res = await fetch('https://api.github.com/repos/ianschwartz/site/issues/2/comments');
        return res.json();
    };
    const buildComments = async () => {
        const comments = await getData();
        return comments.map(c => {
            const userdata = `
<li>
    <a href="${c.user.html_url}">
        <img src="${c.user.avatar_url}" />
    </a>
    <small>${c.created_at}</small>
    <div><a href="${c.user.html_url}">${c.user.login} commented: </a></div>
    
</li>`;

            const body = `<div>${new showdown.Converter().makeHtml(c.body)}</div>`
            return `${userdata} ${body}`
        }).join('');
    };
    buildComments().then(d => {
        comments.innerHTML = d;
    })
</script>

[next](/src/slides/210-github-issues.html)
