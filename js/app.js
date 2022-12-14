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
    catagories.forEach(catagory => {

        let childDiv = document.createElement('div')
        childDiv.innerHTML =
            `
        <a class="text-muted" onclick="loadNewsByCat('${catagory.category_id}')" href="#">${catagory.category_name}</a>
        
        `

        parentDiv.appendChild(childDiv);

    });

}

//load news according to catagories
const loadNewsByCat = async allNews => {

    //loader start
    loading(true);



    try {

        let url = `https://openapi.programming-hero.com/api/news/category/${allNews}`;

        ;

        // console.log(url)

        const res = await fetch(url);
        let data = await res.json();
        displayNews(data.data);

    }

    catch (error) {

        console.log(error);
    }


}

//display news under every catagories
const displayNews = postNews => {

    console.log(postNews)

    //alert if no phone found
    let text = document.getElementById('error');
    if (postNews.length === 0) {

        text.classList.remove('d-none')

    }

    else {

        text.classList.add('d-none')
    }

    //number of news per catagory
    let catNumber = document.getElementById('items');
    catNumber.innerText = `${postNews.length} news found in this catagory`;

    //call parent div
    let parentDiv = document.getElementById('news');
    parentDiv.textContent = ''


    //sorting the news according to view
    postNews.sort(function (a, b) {

        return b.total_view - a.total_view

    })

    //create a child and append into parent
    postNews.forEach(news => {

        let childDiv = document.createElement('div');
        childDiv.classList.add('row');

        childDiv.innerHTML =
            `
            <hr class="p-3">

        <div class="col-md-4 my-3">
        <img class="img-fluid" src="${news.thumbnail_url ? news.thumbnail_url : "no thumbnail image"}" alt="image">
        </div>
        <div class="col-md-8 my-3">
        <h4>${news.title ? news.title : "No title"}</h4>
        <p class="text-muted my-4">${news.details.slice(0, 320) ? news.details.slice(0, 320) : "No details"}... </p>
        
        <div class="d-flex justify-content-between my-4">
        
        <div class=" my-3 my-lg-5 py-lg-2">
        <h5 class="class=" mx-2><i class="fa-solid fa-eye"></i>
         ${news.total_view ? news.total_view : "No view"}</h5> 
        </div>
        
        
            <h5 class="py-lg-2 my-lg-5 d-none d-lg-inline">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            
            </h5> 

        <div class="d-flex my-lg-5">
                <div>
                <img class="img-fluid img rounded-circle" src="${news.author.img ? news.author.img : "No image"}" alt="author_img">
                </div>
                <div>
                    <p class="fw-bold mx-2 my-0">${news.author.name ? news.author.name : "No author data"}</p>
                    <small class="text-muted mx-2 my-0">${news.author.published_date ? news.author.published_date : "no publised data"}
                </div>
            </div>

          <div class="my-3 my-lg-5 py-lg-2">
          <a href="#" class="fs-3 text-primary" onclick="newsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-sharp fa-solid fa-arrow-right"></i></a>
          </div>
        
        </div>
        </div>
        `

        parentDiv.appendChild(childDiv);



    });


    //loader ends
    loading(false)

}

//load news Details
const newsDetails = async details => {

    try {


        let url = `https://openapi.programming-hero.com/api/news/${details}`;

        // console.log(url)

        const res = await fetch(url);
        let data = await res.json();
        displayNewsDetails(data.data);

    }


    catch (error) {

        console.log(error);
    }

}

const displayNewsDetails = details => {

    // console.log(details)
    details.forEach(detail => {
        let p = document.getElementById('body');
        p.innerHTML =
            `
       <img src="${detail.image_url ? detail.image_url : "No image Found"}" class="img-fluid w-100 mx-auto" alt="image">

       <h5 class="my-3 fw-bold">${detail.title ? detail.title : "No title"}</h5>

       <p class="text-muted">${detail.details ? detail.details : "No details"}</p>

       <div class="d-flex justify-content-between mt-5">
       
       <div>
       
       <h5 class="class=" mx-2><i class="fa-solid fa-eye"></i>
       <span class="text-primary"> ${detail.total_view ? detail.total_view : "No view"}</span></h5> 

       </div>

       <h5>Rating: <span class="text-primary">${detail.rating.number ? detail.rating.number : "No ratings"}</span></h5>

       </div>

       <div class="d-flex justify-content-start mt-5">
                <div>
                <img class="img-fluid img rounded-circle" src="${detail.author.img ? detail.author.img : "No image"}" alt="author_img">
                </div>
                
                <div>
                    <p class="fw-bold mx-2 my-0 text-primary">By ${detail.author.name ? detail.author.name : "No author data"}</p>
                    <small class="text-muted mx-2 my-0">${detail.author.published_date ? detail.author.published_date : "No published data"}
                </div>

            </div>
       
       `
    });

}

//function for loader
const loading = load => {

    let spin = document.getElementById('spin');

    if (load) {

        spin.classList.remove('d-none');
    }
    else {

        spin.classList.add('d-none')
    }

}

//display news by default in home page
loadNewsByCat('01')
//display catagories menu
loadCatagory();

