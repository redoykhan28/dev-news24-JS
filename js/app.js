//fetch catagories
const loadCatagory = async () => {

    try {

        const url = ('https://openapi.programming-hero.com/api/news/categories')
        const res = await fetch(url);
        let data = await res.json();
        displayCatagories(data.data.news_category);

    }

    catch (error) {

        console.log(error);
    }

}


//display catagories
const displayCatagories = catagories => {

    // console.log(catagories)

    //call parent div
    let parentDiv = document.getElementById('CatagoryNav');

    //create a child and append into parent

    for (const catagory of catagories) {

        let childDiv = document.createElement('div')
        childDiv.innerHTML =
            `
        <a class="text-muted" onclick="loadNewsByCat('${catagory.category_id}')" href="#">${catagory.category_name}</a>
        
        `

        parentDiv.appendChild(childDiv);

    }

}

//load news according to catagories
const loadNewsByCat = async allNews => {



    try {

        let url = `https://openapi.programming-hero.com/api/news/category/${allNews}`;

        // console.log(url)

        const res = await fetch(url);
        let data = await res.json();
        displayNews(data.data);

    }

    catch (error) {

        console.log(error);
    }

}

//display news underevery catagories
const displayNews = postNews => {

    console.log(postNews)
    let parentDiv = document.getElementById('news');
    parentDiv.textContent = ''

    for (const news of postNews) {

        let childDiv = document.createElement('div');
        childDiv.classList.add('row');

        childDiv.innerHTML =
            `
        <div class="col-md-4 my-3">
        <img class="img-fluid" src="${news.thumbnail_url}" alt="image">
        </div>
        <div class="col-md-8 my-3">
        <h4>${news.title}..</h4>
        <p class="text-muted my-4">${news.details.slice(0, 320)}...</p>
        
        <div class="row my-4">
        <div class="col-md-4">
            <div class="row my-5">
                <div class="col-md-6">
                <img class="img-fluid w-25 rounded-circle" src="${news.author.img}" alt="author_img">
                </div>
                <div class="col-md-6">

                </div>
            </div>
        </div>
        <div class="col-md-4">

        </div>
        <div class="col-md-4">

        </div>
    </div>
        </div>
        
        `

        parentDiv.appendChild(childDiv);
    }

}


loadCatagory();