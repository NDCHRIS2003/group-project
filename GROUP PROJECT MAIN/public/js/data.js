//Project: "Travel Experts" - group website
//Filename:data.js
//Target Dir: ./public/js
//Description: Declares a Javascript Object: "packages" with an array of el;ements to create travel package cards at the bottom of index.html.
//creates output bottom of  ./public/register.html
//Authors: Wayne Frisch, Keith Wang, Chris Okpala
//Date: 2020-02-20

//Credits: 
//Tony Grimes 2020, SAIT instructor - sait.ca
//.git repository - https://github.com/acidtone/cprg210-frontend-winter-2020.git


//Declare a Javascript Object: "packages"
//Manually create object and element Data to create the packages or "cards" to display in a responsive flex gallery below the hero section.

//TODO(DONE)
//*Pull this data using a sql statement and parse returned data rather than use a static data.js file for final project.
//*TODO make text wrap in flex item in index_packages.pug .

const packages = [
  {
    name:     'Diving',
    image:   'ocean.jpg',
    textDescription:  '<p>A 30 min diving underwater adventure.</p>',
    wikiLink: 'https://en.wikipedia.org/wiki/Underwater_Diving'
  },
  {
    name:     'Camel Trek',
    image:   'camelride.jpg',
    textDescription:  '<p>Ride a camel in Egypt past the Giza pyramids.</p>',
    wikiLink: 'https://en.wikipedia.org/wiki/Camel'
  },
  {
    name:     'Everest Trek',
    image:   'everest.jpg',
    textDescription:  'Climb the highest point on earth.',
    wikiLink: 'https://en.wikipedia.org/wiki/Mount_Everest'
  },
  {
    name:     'Sky Diving',
    image:   'skydiving.jpg',
    textDescription:  '<p>Jump from 10,000 feet and live to tell.</p>',
    wikiLink: 'https://en.wikipedia.org/wiki/Sky_Diving'
  },
  {
    name:     'Stonehendge',
    image:   'stonehendge.jpg',
    textDescription:  '<p>Visit Stonehendge a Druid Relic.</p>',
    wikiLink: 'https://en.wikipedia.org/wiki/Stonehendge'
  },
  {
    name:     'African Safari',
    image:   'safari.jpg',
    textDescription:  '<p>Safari through the Serengeti National Park.</p>',
    wikiLink: 'https://en.wikipedia.org/wiki/Serengeti_National_Park'
  },
  {
    name:     'Paris',
    image:   'paris.jpg',
    textDescription:  '<p>Take in Paris at night.</p>',
    wikiLink: 'https://en.wikipedia.org/wiki/Paris'
  },
  {
    name:     'North Pole',
    image:   'northernlights.jpg',
    textDescription:  '<p>Great Polar trek adventure.</p>',
    wikiLink: 'https://en.wikipedia.org/wiki/North_Pole'
  }

]

//declare the variable named "content" to later hold the snippet of HTML created below to then embed into the flex item.
let content = '';

//Loop through each element (package) in the array/object (packages) and append to content 
//*note from in class SAIT lecture
packages.forEach(function(package){

//ES6 added template literals - an easier way to concatenate strings *note from in class SAIT lecture
//**TODO google "template literals" to improve code
  content +=  `<galleryitems>
                <a href=${package.wikiLink} target='_blank'><h1>${package.name}</h1></a>
                <p><a href=${package.wikiLink} target='_blank'><img src=.//images/${package.image} height=200px></a></p>
                <p>${package.textDescription}</p>
               </galleryitems>`;
});

//TODO 
//**Add the line below back to the loop above once fixed flex items to properly wrap text
//<p>Description: ${package.textDescription}</p>

//assign our container element to a variable *note from in class SAIT lecture
const main = document.querySelector('cardContainer');

//innerHTML will parse the content string as HTML and create the proper elements in the DOM *note from in class lecture
main.innerHTML = content;

//console.log(main); //my debug code
