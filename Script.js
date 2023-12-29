const API_KEY = 'AIzaSyDiDKImHuDaRI2CftpUq1LxU0B3Y3_AjyE';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

document.getElementById('searchButton').addEventListener('click', searchYouTube);

    function searchYouTube() {
        const query = document.getElementById('searchInput').value;
        const maxResults = 10; // You can adjust this as needed
        const url = `${BASE_URL}?part=snippet&key=${API_KEY}&q=${query}&maxResults=${maxResults}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data.items))
            .catch(error => console.error('Error:', error));
    }

    function displayResults(videos) {
        const resultsDiv = document.getElementById('searchResults');
        resultsDiv.innerHTML = '';
        videos.forEach(video => {
            const videoLink = `https://www.youtube.com/watch?v=${video.id.videoId}`;
            const videoTitle = video.snippet.title;
            const videoThumbnail = video.snippet.thumbnails.default.url;
            const videoElement = document.createElement('div');
            videoElement.innerHTML = `
                <a href="${videoLink}" target="_blank">
                    <img src="${videoThumbnail}" alt="Video Thumbnail" style="width: 120px; height: 90px;">
                    ${videoTitle}
                </a>
                <p></p>`;
            resultsDiv.appendChild(videoElement);
        });
    }
                    
    let VideoQueue = [];
    let TitleQueue = ["",];
    let VideoLink;
    let VideoSource = "";
    let Arrayindex = 1;
                
    function AddtoQueue(){
        let QueueList = document.getElementById("QueueList");
        let ListItem = document.createElement("li");
        VideoQueue.push(document.getElementById("SearchBar").value);
        console.log(VideoQueue);
        //create a list item element in QueueList
        ListItem.setAttribute("id", "QueueItem");
        ListItem.innerHTML = VideoQueue[VideoQueue.length-1];
        Arrayindex++;
        QueueList.appendChild(ListItem); //This adds the list item to the list
        document.getElementById("SearchBar").value = "";
    }
    
    function playNextVideo() {
        if (VideoQueue.length > 0) {
            VideoLink = GetCodeFromLink(VideoQueue.shift());
            VideoSource = "https://www.youtube.com/embed/" + VideoLink;
            document.getElementById("VideoPlayer").src = VideoSource;
            let QueueList = document.getElementById("QueueList");
            QueueList.removeChild(QueueList.firstChild);
        }
    }
    
    function GetCodeFromLink(link){
        let videoID = link.match(/(?<=v=)[^&]+/)[0];
        return videoID;
    }

    