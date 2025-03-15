function loadCategories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos));
};
const loadVideoByCategories = (id) =>{
    
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url)
    fetch(url).then((res) => res.json()).then((data)=> displayVideo(data.category))
}
 
function displayCategories(categories) {
  // get btn container
  const buttonContainer = document.getElementById("btn-container");
  // loop operation on array
  for (cat of categories) {
    console.log(cat)
    // create new element
    const btnContainerDiv = document.createElement("div");
    btnContainerDiv.innerHTML = `
    <button onclick="loadVideoByCategories(${cat.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white"> ${cat.category}</button>
    `;
    // append
    buttonContainer.append(btnContainerDiv);
  }
}

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";
  videos.forEach((video) => {
    console.log(video);
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
         <div class="bg-base-100 ">
            <figure class="relative">
              <img class="w-full h-[200px] object-cover"
                src="${video.thumbnail}" />
                <p class="text-xs bg-black text-white absolute bottom-2 right-2 px-2 py- rounded">3hrs 56 min ago</p>
            </figure>
            <div class="flex gap-3 py-3">
                <div>
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                          <img class="" src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>

                </div>
                <div>
                    <h2 class="card-title font-bold">${video.title}</h2>
                    <div class="flex gap-3"> <p class="text-sm text-gray-600">${video.authors[0].profile_name}</p>
                        <img class="w-5" src="./assets/icons8-verified-badge-32.png" alt="">
                    </div>
                   
                    <p class="text-sm text-gray-600">${video.others.views}views</p>

                </div>
              
               
              
                 
              </div>
            </div>
          
        `;
    videoContainer.append(videoDiv);
  });
};

loadCategories();
 
