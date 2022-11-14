const loadAllCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCatagoryName(data.data.news_category));
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
    .then((data) => displaySingleData(data.data));
};

const displaySingleData = (allNews) => {
  console.log(allNews);
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
        <p class="text-gray-900 leading-none">${news.author.name}</p>
        <p class="text-gray-600">${news.author.published_date}</p>
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
    <i class="fa-solid fa-arrow-right"></i>
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
};


loadAllCategory();
loadSingleCategory('8');
