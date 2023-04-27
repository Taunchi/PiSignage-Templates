let items = [];
fetch('https://nhccnm.org/events/feed', { mode: 'cors'})
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
items = Array.from(data.querySelectorAll('item'));
channel = data.getElementsByTagName('channel').item(0).getElementsByTagName('title').item(0).innerHTML;
console.log(channel)
media = []
for (let i = 0; i < items.length -1; i++) {
    if(items[i].getElementsByTagName('media:content').item(0) != null) {
        media.push(items[i].getElementsByTagName('media:content').item(0).getAttribute('url'));
    }else {
        media.push('https://i.ibb.co/CJ5tS1X/thumbnail-dca-logo.png');
    }
}
console.log(media.length)
media.forEach(element => console.log());
showItem(0);
for(let i = 0; i < 10; i++) {
    if (i < items.length - 1) {
    showItem(i);
  } else {
    showItem(0);
  }
}
});

function showItem(index) {
    currentItem = index;
    const item = items[currentItem];
    const imageUrl = media[currentItem]
    const htmlFeed = `
        <div id="content" class="fade-in" style="height:90%; width:100%; padding:9px;">
            <h1>${item.querySelector('title').textContent}</h1>
            <h5>${item.querySelector('pubDate').textContent} </h5>
            <br>
            <p>${item.querySelector('description').textContent}</p>
        </div>
      `;
    const html2 = `
            <img id="content-image" src="${imageUrl}" alt="Image" width=400px class="fade-in">
      `;
    const html3 =  `
            ${channel}
      `;
    rssFeed = '#rss-feed' + currentItem.toString();
    imgFeed = '#img-box' + currentItem.toString();
    document.querySelector(rssFeed).innerHTML = htmlFeed;
    document.querySelector(imgFeed).innerHTML = html2;
    document.querySelector('#name').innerHTML = html3;
}