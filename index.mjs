import * as Carousel from "./Carousel.mjs";


const breedSelect = document.getElementById("breedSelect");

const infoDump = document.getElementById("infoDump");

const progressBar = document.getElementById("progressBar");

const getFavouritesBtn = document.getElementById("getFavouritesBtn");


const API_KEY = "live_rvhz0KL0IJqA1gMZnOQQHSwWRw191QTWFCz9kgogZ2xQ2w4Z1R2nEeNvMWq5T7Qo";

/// USING FETCH ONLY HERE
// initialLoad()
// async function initialLoad(){
  
//   const url = `https://api.thecatapi.com/v1/breeds`;
//   const response = await fetch(`${url}`,{
//     headers:{
//       'Content-Type':'application/json',
//       'x-api-key':API_KEY
//     }
//   })
//   const data = await response.json();

  
//   data.forEach((kityo)=>{
//     // Carousel.clear()
//     let option = document.createElement('option');
//     option.setAttribute('value',kityo.id)
//     option.textContent = kityo.name;
  
//     breedSelect.appendChild(option)
  


//   });
 

//   breedSelect.addEventListener('click',async (e)=>{
//     e.preventDefault();
//     // console.log(breedSelect.value)
//      await handleBreed(breedSelect.value)
//       });
 
// };




//  async function handleBreed(id){
 
//   console.log(id)
 

//   const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${id}`,{
//     headers:{
//       'Content-Type':'application/json',
//       'x-api-key':API_KEY,

//     }
//   });
//   const data = await response.json()
//   Carousel.clear();
//   data.forEach((kityo)=>{
//     console.log(kityo);

//     let html = Carousel.createCarouselItem(kityo.url,'cat',kityo.id);
//    Carousel.start()
 
//     Carousel.appendCarousel(html)
//     infoDump.innerHTML = `<div>
//       <p>Name: ${kityo.breeds[0].name}</p>
//       <p>Height: ${kityo.height}</p>
//       <p>Width: ${kityo.width}</p>
    
    
//     </div>`

//   })



// };

//FETCH ENDS HERE


//AXIOS BEGINS BELOW
initialLoad()
async function initialLoad(){
  
  try{


  const url = `https://api.thecatapi.com/v1/breeds`;
  //using axios
  const response = await axios.get(`${url}`)
  const data = await response.data;

  
  data.forEach((kityo)=>{
    // Carousel.clear()
    let option = document.createElement('option');
    option.setAttribute('value',kityo.id)
    option.textContent = kityo.name;
    // console.log(kityo)
    breedSelect.appendChild(option)
  


  });
 

  breedSelect.addEventListener('click',async (e)=>{
    e.preventDefault();
    // console.log(breedSelect.value)
     await handleBreed(breedSelect.value)
 
      });

      

  }catch(err){
    console.error(err)
  }
 
};




 async function handleBreed(id){
 
 try{

  console.log(id)
 
//using axios
  const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${id}`,{
    headers:{
      'Content-Type':'application/json',
      'x-api-key':API_KEY,

    }, onDownloadProgress: function (progressEvent) {
      updateProgess(progressEvent)
    }
  });
  //interceptor helper function
  intercept()
  const data = await response.data
  Carousel.clear();
  data.forEach((kityo)=>{
    // console.log(kityo);

    let html = Carousel.createCarouselItem(kityo.url,'cat',kityo.id);
    favourite(kityo.id)
   Carousel.start()
 
    Carousel.appendCarousel(html)
    infoDump.innerHTML = `<div>
      <p>Name: ${kityo.breeds[0].name}</p>
      <p>Height: ${kityo.height}</p>
      <p>Width: ${kityo.width}</p>
    
    
    </div>`

  })



 }catch(err){console.error(err)}


};


let start;
async function intercept(){
axios.interceptors.request.use(request=>{
  //progress bar
  progressBar.style.width =`0%`;
  // document.getElementsByName('body').style.cursor=`progress`;
  start = new Date().getTime();
  return request;
})

  axios.interceptors.response.use(response=>{
    // document.getElementsByName('body').style.cursor=`default`;
    console.log('Sucessful GET!');
    let end = new Date().getTime();
    console.log(end-start)
    return response;


  },(err)=>{
  console.error(err)
  
  });


}

async function updateProgess(ProgressEvent){
console.log(ProgressEvent)
}





export async function favourite(imgId) {
  // your code here
  try{
   
 let response =   await axios({
      methood:'post',
      url:`https://api.thecatapi.com/v1/favourites/`,
      headers:{
        
        'x-api-key':API_KEY,
      },
      data:{
        
          "image_id":imgId
        
  
    }})
 
//  console.log(response.data)

  }catch(err){
    console.error(err)
  }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

