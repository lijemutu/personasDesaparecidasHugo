function processMediaLinks(content) {
    const imageRegex = /https?:\/\/\S+\.(jpg|png)/g;
    const youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g;
    const linkRegex = /https?:\/\/\S+/g;
    // console.log(content);
    content = content.replace('&amp;ldquo;','\"');
    content = content.replace('&amp;rdquo;','\"');
    content = content.replace('&amp;ldquo;','\"');
    content = content.replace('&amp;rdquo;','\"');
    // content = content.replace('&amp;rddquo;','\"');

    return content.replace(linkRegex, (match) => {
      match = match.replace('</p>', '')
      // console.log(match).

      // Reset lastIndex for each regex
      imageRegex.lastIndex = 0;
      youtubeRegex.lastIndex = 0;

      if (imageRegex.test(match)) {
        // console.log(match)
        // If it's an image link, replace with an image tag
        return `<img src="${match}" alt="Image" />`;
      } else if (youtubeRegex.test(match)) {
        // If it's a YouTube link, replace with an embedded iframe
        // console.log(match.match(youtubeRegex))
        const url = new URL(match);
        const videoId = url.searchParams.get("v");
        const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
        return `<iframe width="560" height="315" src="${iframeSrc}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
      } else {
        // console.log(match)
        // Otherwise, wrap it in an anchor tag
        return `<a href="${match}" target="_blank">${match}</a>`;
      }
    });
  }