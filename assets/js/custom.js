/* Source Themes Academic v4.8.0 | https://sourcethemes.com/academic/ */

;
/*!
  * Bootstrap v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
 
/* Source Themes Academic v4.8.0 | https://sourcethemes.com/academic/ */

function searchPublications(searchText) {
    // Assuming you have a variable named 'publications' that contains the publication data in JSON format
    // You can replace 'publications' with the actual variable name in your code

    // Filter the publications based on the search text
    const filteredPublications = publications.filter(publication => {
        // Assuming the publication title is stored in the 'title' property
        // You can replace 'title' with the actual property name in your code
        const titleMatch = publication.title.toLowerCase().includes(searchText.toLowerCase());

        // Assuming the author names are stored in the 'authors' property as an array
        // You can replace 'authors' with the actual property name in your code
        const authorMatch = publication.authors.some(author => author.toLowerCase().includes(searchText.toLowerCase()));

        // Assuming the venue is stored in the 'venue' property
        // You can replace 'venue' with the actual property name in your code
        const venueMatch = publication.venue.toLowerCase().includes(searchText.toLowerCase());

        // Assuming the type is stored in the 'type' property
        // You can replace 'type' with the actual property name in your code
        const typeMatch = publication.type.toLowerCase().includes(searchText.toLowerCase());

        // Assuming the abstract is stored in the 'abstract' property
        // You can replace 'abstract' with the actual property name in your code
        const abstractMatch = publication.abstract.toLowerCase().includes(searchText.toLowerCase());

        // Return true if any of the fields match the search text
        return titleMatch || authorMatch || venueMatch || typeMatch || abstractMatch;
    });

    // Return the filtered publications
    return filteredPublications;
}

function displayPublications(filteredPublications) {
    const publicationsContainer = document.getElementById('publications-container');

    // Clear the container
    publicationsContainer.innerHTML = '';

    // Iterate over the filtered publications
    filteredPublications.forEach(publication => {
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Create title element
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = publication.title;

        // Create authors element
        const authors = document.createElement('p');
        authors.classList.add('card-text');
        authors.textContent = 'Authors: ' + publication.authors.join(', ');

        // Create venue element
        const venue = document.createElement('p');
        venue.classList.add('card-text');
        venue.textContent = 'Venue: ' + publication.venue;

        // Create type element
        const type = document.createElement('p');
        type.classList.add('card-text');
        type.textContent = 'Type: ' + publication.type;

        // Create abstract element
        const abstract = document.createElement('p');
        abstract.classList.add('card-text');
        abstract.textContent = 'Abstract: ' + publication.abstract;

        // Append elements to card body
        cardBody.appendChild(title);
        cardBody.appendChild(authors);
        cardBody.appendChild(venue);
        cardBody.appendChild(type);
        cardBody.appendChild(abstract);

        // Append card body to card
        card.appendChild(cardBody);

        // Append card to publications container
        publicationsContainer.appendChild(card);
    });
}
