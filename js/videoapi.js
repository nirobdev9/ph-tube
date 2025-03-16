const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("videos-container").classList.add("hidden");

}
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("videos-container").classList.remove("hidden");

}

function removeActive (){
  const activeBtn = document.getElementsByClassName("active");
  for (let btn of activeBtn){
    btn.classList.remove("active")
  }
}

function loadCategories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
const loadVideo = (searchText = "") => {
  showLoader()
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      document.getElementById("btn-all").classList.add("active");
      displayVideo(data.videos)
    });
};
const loadVideoByCategories = (id) =>{
    
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url).then((res) => res.json()).then((data)=> {
      const buttonClicked = document.getElementById(`btn-${id}`)
      removeActive ()
      buttonClicked.classList.add("active")
      displayVideo(data.category)

    })
}
const loadVideoByDetail = (id) =>{
  const url = "https://openapi.programming-hero.com/api/phero-tube/video/aaac";
  fetch(url).then((res) => res.json()).then((data)=>displayVideoDetail(data.video))
} 
const displayVideoDetail = (video) => {
   document.getElementById("video_details").showModal()
   const videoDetailContainer = document.getElementById("details-container");
   videoDetailContainer.innerHTML = `
   <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
   
   `

}
 
 
function displayCategories(categories) {
  // get btn container
  const buttonContainer = document.getElementById("btn-container");
  // loop operation on array
  for (cat of categories) {
    // create new element
    const btnContainerDiv = document.createElement("div");
    btnContainerDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="loadVideoByCategories(${cat.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white"> ${cat.category}</button>
    `;
    // append
    buttonContainer.append(btnContainerDiv);
  }
}

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";
  if(videos.length == 0){
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
            <img class="w-[150px]" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">oops ! There is no content here</h2>
        </div>
      
    `
    return;
  }
  videos.forEach((video) => {
     
    
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
                    ${video.authors[0].verified == true ? `<img class="w-5" src="./assets/icons8-verified-badge-32.png" alt="">` : ``} 
                    </div>
                   
                    <p class="text-sm text-gray-600">${video.others.views}views</p>

                </div>
              
               
              
                 
              </div>
              <button onclick="loadVideoByDetail('${video.video_id}')" class="btn btn-block">Show details</button>
            </div>
          
        `;
    videoContainer.append(videoDiv);
    hideLoader();
  });
};
document.getElementById("search").addEventListener("keyup",(e) =>{
const input = e.target.value;
 loadVideo(input);
})

loadCategories();
 
