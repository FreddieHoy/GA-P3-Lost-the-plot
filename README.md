# Project 3: Lost the Plot

SEI42 collaborative project - Lost the plot

The site:
[Lost The Plot](lost-the-plot-sei42.herokuapp.com)

## Collaborators

* Ejike Chiboka
* Prash Mohan
* Sian Alcock
* Freddie Hoy

## Project Overview

The idea for this website was for users to share space in their garden for other users to grow food! A lot of people don't make the most of their garden space so by allowing others to use the soil space it increases the amount of food grown in London.

This is the third project on the 3 month, GA software engineering immersive course. The project took 7 days to complete.

It was also my first group project that extensively uses Git to collaborate on the project. The project used Node.js and React in the front end and express.js and mongoDB in the back end along with Mocha and supertest for the test driven development.

![Lost the Plot screen shot](https://user-images.githubusercontent.com/51379192/65055779-b438f000-d967-11e9-9f1f-e50ec749bc25.png)

# Brief

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end. Improve your employability by demonstrating a good understanding of testing principals.

## Technologies used:

* HTML5 & SCSS,
* Javascript ES6
* Node.js
* React
* express.js
* mangoDB
* npm
* Webpack
* Bulma
* filestack-react
* Babel
* Insomnia
* Heroku
* Git
* GitHub
* react-mapbox
* Chai
* supertest


### All features
* User login & out
* Register User
* Edit User information
* Post Plot
* Edit Plot
* View individual plot.
* Comment on Plot
* See the in season vegetables
* Search for plots on the map
* See how far away from the user each plot is

### Pages:
* Home
* OurPlots (By Index / By Map)
* Profile
* Plants
* About

### Parallax Home Page
![Homepage](https://user-images.githubusercontent.com/51379192/65058021-776ef800-d96b-11e9-9dec-05230d79f6dc.gif)

### Search by index or map
![Index](https://user-images.githubusercontent.com/51379192/65058053-88b80480-d96b-11e9-88b2-127cb7596da8.gif)

### Get info on Suitable Plants to grow
![Plants](https://user-images.githubusercontent.com/51379192/65058106-9d949800-d96b-11e9-96a4-caa654f7ea74.gif)

## ProjectLog

| Day      | Task         |
| ------------- |:-------------:|
| **1**  | Project ideas, Designing models, drawing wireframe    |
| **2**  | Testing and backend setup   |
| **3**  | Front end, MVP achieved.  |
| **4**  | Bugs, Styling, Additional features - Map, Plants page etc     |
| **5**  | Bugs, Styling, Additional features - Distance away, sorting and filtering   |
| **6**  | Bugs, and styling    |
| **7**  | Deployment, presentation planning, ReadME    |

## My work

* Project idea
* Parallax Home Page
* Our Plots page tab system Index / Map
* Mapping on Plots page and Individual Plots page
* Extensive styling and design
* Once Logged in User can see distance away from their location

## Challenges

### Distance away
Personally one of the most exciting features to create was to display the distance away from the user on the index page.

![Distance away](https://user-images.githubusercontent.com/51379192/65060461-cd459f00-d96f-11e9-9428-3c6b7943caf8.png)

Although a simple feature which doesn't have a huge impact there was a lot of work that went into it.

First off all the post codes of the plots and the user were converted into lat and long by a API in the back end models.

> Models/Plot.js

```
plotSchema.pre('validate', function getGeolocation(done) {
  if(!this.isModified('postCode')) return done()

  axios.post('https://postcodes.io/postcodes?filter=longitude,latitude', { postcodes: [this.postCode] })
    .then((res) => {
      if(!res.data.result[0].result) {
        this.invalidate('postCode', 'Invalid post code')
        return done()
      }
      const { latitude, longitude } = res.data.result[0].result
      this.latitude = latitude
      this.longitude = longitude

      done()
    })
})
```

With the user giving there postCode on register, this was also converted into lat & long in the User model.

With two sets of latitude and longitude this distance between them could be calculated in the front end.

> plots/Index.js

```
calculateDistance(plot) {
  const user = Auth.getUser()

  const lat1 = plot.latitude
  const lon1 = plot.longitude
  const lat2 = user.latitude
  const lon2 = user.longitude

  const earthRadius = 6371e3
  const φ1 = lat1 * (Math.PI / 180)
  const φ2 = lat2 * (Math.PI / 180)
  const Δφ = (lat2-lat1) * (Math.PI / 180)
  const Δλ = (lon2-lon1) * (Math.PI / 180)

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const d = earthRadius * c
  return Math.round( (d * 0.000621371) * 10 ) / 10
}
```


### Using React-mapbox

A new feature which was learn't for this project using React-mapbox. The map on the index page has number of features including:

* Displays all the plots that meet the index search criteria.
* First click displays a pop up with basic information.
* Each plot displayed on the map is a clickable link which takes you to the details of that plot.

![Plots Map](https://user-images.githubusercontent.com/51379192/65068765-2833c200-d981-11e9-8abb-a0281cc2d8a0.png)


### Moving Forward

* Build in instant messaging as a feature.
* A news Feed of latest comments, posts and changes to the Plant page
* Add a gardening tip of the day.
* I discovered that the home page parallax could be done using a package called react-lazy-hero.
* Maybe add success story of people growing food in their gardens.

# Contact information

Freddie Hoy

Email: freddiehoy0@gmail.com

[Portfolio](https://freddiehoy.github.io/) | [LinkedIn](https://www.linkedin.com/in/freddie-hoy/) |
[GitHub](https://github.com/FreddieHoy?tab=repositories)
