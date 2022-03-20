---
title: User Data
date: September 22, 2020
---

## It's All About the Issues

### Request URL: `https://api.github.com/repos/{USERNAME}/{REPONAME}/issues/{ISSUE_NUMBER}/comments`

<div style="width: 100vw;">
<pre><code id="code"></code></pre>
</div>

<script>
    const code = document.querySelector('#code');
    fetch('https://api.github.com/repos/ianschwartz/site/issues/2/comments')
        .then(async (d) => code.innerHTML = JSON.stringify(await d.json(), null, 2))
</script>

[next](/src/slides/210-github-issues.html)
