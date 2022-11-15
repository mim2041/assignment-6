const loadAllCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCatagoryName(data.data.news_category))
    .catch((error) => {
      throw error;
    });
  };

const showCatagoryName = (categories) => {
  //    console.log(categories);
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    console.log(category.category_name);
    const li = document.createElement("li");
    li.classList.add("-mb-px");
    li.innerHTML = `
    <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" onclick="loadSingleCategory(${category.category_id
    })">${category.category_name}</a>
    `;
    categoryContainer.appendChild(li);
  });
};

const loadSingleCategory = (search) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${"0"+search}`;
  fetch(url)
  .then((res) => res.json())
  .then((data) => displaySingleData(data.data))
  .catch((error) => {
    throw error;
  })
  toggleSpinner(true);

};

const displaySingleData = (allNews) => {
  const newsContainer = document.getElementById("news-container");
  allNews.sort(function(a,b){
    return  b.total_view - a.total_view;
  });

  allNews.forEach((news) => {
    const li = document.createElement("li");
    li.classList.add("w-full");
    li.innerHTML = `
        <div class="max-w-sm w-full lg:max-w-full lg:flex">
          <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url(${news.thumbnail_url})" title="Woman holding a mug">
          </div>
          <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
      
      <div class="text-gray-900 font-bold text-xl mb-2">${news.title}</div>
      <p class="text-gray-700 text-base">${news.details.length > 50 ? news.details.slice(0,300) + "..." : news.details}</p>
      </div>
      <div class="flex justify-between">
      <div class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="${news.author.img}" alt="Avatar of Jonathan Reinink">
      <div class="text-sm">
        <p class="text-gray-900 leading-none">${news.author.name? news.author.name : "No author found"}</p>
        <p class="text-gray-600">${news.author.published_date ? news.author.published_date : "Date not found"}</p>
      </div>
    </div>
    <div class="flex justify-between align-items-center">
      <i class="fa-solid fa-eye mx-2 pt-1"></i>
      <p>${news.total_view}</p>
      </div>
      <div class="flex">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <div>
        <i id="show-details" class="fa-solid fa-arrow-right"></i>
      </div>
      </div>
      </div>
      </div>
        `;
    newsContainer.appendChild(li);
    const newsLength = document.getElementById('print-length');
    const length = allNews.length;
    // console.log(length);
    newsLength.innerText = `${length} items found for category Entertainment`
  });
  toggleSpinner(false);
  
};

const toggleSpinner = isLoading => {
  const spinnerContainer = document.getElementById('spinner-section');
  if(isLoading){
    spinnerContainer.classList.remove('hidden');
  }
  else{
    spinnerContainer.classList.add('hidden');
  }
}

//  document.getElementById('show-details').addEventListener('click',function(){
//     const modalSection = document.getElementById('modal-section');
//     //modalSection.innerHTML = `
//   //   <div id="defaultModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
//   //     <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
//   //         <!-- Modal content -->
//   //         <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
//   //             <!-- Modal header -->
//   //             <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
//   //                 <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
//   //                     Terms of Service
//   //                 </h3>
//   //                 <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
//   //                     <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
//   //                     <span class="sr-only">Close modal</span>
//   //                 </button>
//   //              </div>
//   //             <!-- Modal body -->
//   //             <div class="p-6 space-y-6">
//   //                 <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//   //                     With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
//   //                 </p>
//   //                 <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//   //                     The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
//   //                 </p>
//   //             </div>
//   //             <!-- Modal footer -->
//   //             <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
//   //                 <button data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
//   //                 <button data-modal-toggle="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
//   //             </div>
//   //         </div>
//   //     </div>
//   // </div>
//   //  `;
//   });

const loadDetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`
  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data.array))
}

const showModalDetails = (arrays) => {
  console.log(arrays);
  // arrays.forEach(array => {
  //   // console.log(array);
  // })
}

loadDetails('08');

loadAllCategory();
loadSingleCategory('8');
