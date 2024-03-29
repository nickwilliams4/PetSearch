"use strict";

const store = {
  species: [],
  pets: [],
  pics: [],
  age: [],
  breed: []
};

function loadSpecies() { // This function populates the searchable pets on the welcome page
  const url = "https://api.rescuegroups.org/http/v2.json";
  const data = {
    apikey: "PlqQjhlx",
    objectType: "animalSpecies",
    objectAction: "publicList"
  };
  try {
    const response = fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => {
        store.species = responseJson.data;
        const speciesList = Object.keys(store.species)
          .map(species => `<option value="${species}">${species}</option>`)
          .join("");
        $(".type").html(speciesList);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

function petSearch(zipCode, radius, typeOf) { // Data pulling from API
  const url = "https://api.rescuegroups.org/http/v2.json";
  const data = {
    apikey: "PlqQjhlx",
    objectType: "animals",
    objectAction: "publicSearch",
    search: {
      resultStart: "0",
      resultLimit: "26",
      resultSort: "animalID",
      resultOrder: "asc",
      filters: [
        {
          fieldName: "animalStatus",
          operation: "equals",
          criteria: "Available"
        },
        {
          fieldName: "animalLocationDistance",
          operation: "radius",
          criteria: `${radius}`
        },
        {
          fieldName: "animalLocation",
          operation: "equals",
          criteria: `${zipCode}`
        },
        {
          fieldName: "animalSpecies",
          operation: "equals",
          criteria: `${typeOf}`
        }
      ],
      fields: [
        "animalSpecies",
        "animalOrgID",
        "animalAdoptionFee",
        "animalAgeString",
        "animalBreed",
        "animalDescription",
        "animalDescriptionPlain",
        "animalGeneralAge",
        "animalGeneralSizePotential",
        "animalLocation",
        "animalLocationCoordinates",
        "animalLocationDistance",
        "animalLocationCitystate",
        "animalName",
        "animalPrimaryBreed",
        "animalPrimaryBreedID",
        "animalRescueID",
        "animalSearchString",
        "animalSex",
        "animalSizeCurrent",
        "animalSizePotential",
        "animalSpecies",
        "animalSpeciesID",
        "animalStatus",
        "animalStatusID",
        "animalSummary",
        "animalThumbnailUrl",
        "animalUrl",
        "locationAddress",
        "locationCity",
        "locationCountry",
        "locationUrl",
        "locationName",
        "locationPhone",
        "locationState",
        "locationPostalcode",
        "animalPictures",
        "animalVideos",
        "animalVideoUrls"
      ]
    }
  };
  try {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson);
        store.pets = responseJson.data;
        render(store.pets);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

function render(pets) { // The Pets and info that are displayed in search results
  const pics = Object.keys(store.pics)
    .map(pics => `<div>${store.pics[pics].animalPictures}</div>`)
    .join("");
  const petList = Object.keys(pets)
    .map(pet =>
      pets[pet].animalPictures.length > 0
        ? `<div class="animal" data-id="${pet}">
              <div class="petImg">
              <img src="${pets[pet].animalPictures[0].original.url}" alt="No Image" class="petResultImg"/>
              </div>
              <div class="animalDescription">
              <div>${pets[pet].animalName}</div>
              <div>${pets[pet].animalBreed}</div>
              <div>${pets[pet].animalAgeString}</div>
              <div>${pets[pet].animalLocationCitystate}</div>
              <a href="#" class="moreInfo">More Info</a>
              <div class="description">${pets[pet].animalDescription}</div>
              </div>
              </div>`
        : ""
    )
    .join("");
  $(".nextButton").show();
  displayResults(petList, pics, showMoreInfoHandler);
}

function showMoreInfoHandler(event) { // More Info Link 
  event.preventDefault();
  const id = $(event.target)
    .parent()
    .parent()
    .data("id");

  const animal = store.pets[id];

  $(".name").html(animal.animalName);
  $(".petDescription").html(animal.animalDescription);
  $(".image").html(
    animal.animalPictures
      .map(pic => `<img src="${pic.original.url} "style="width: 200px"/>`)
      .join("")
  );
  $(".petLocation").html(animal.locationName);
  $(".locationUrl").html(
    `<a href="${animal.locationUrl}" target="blank">${animal.locationUrl}</a>`
  );
  $(".modal").css("display", "flex");
}

function displayResults(results) {
  $(".searchResults").html(results);
  $("body").css("align-items", "start");
  $(".moreInfo").on("click", showMoreInfoHandler);
  if (results == 0) {
    $(".errorMessage").html("No results. Please try your search again.");
    $(".nextButton").hide();
  }
  $("#btnClose").on("click", event => {
    $(".modal").css("display", "none");
  });
}

function searchHandler() {
  const zipCode = $(".zipSearch").val();
  const radius = $(".radiusValue").val();
  const typeOf = $(".type").val();
  $(".searchResults").html("<h2> Loading...</h2>");
  petSearch(zipCode, radius, typeOf);
  $(".searchButtonTwo").show();
  $(".filtersDiv").css("display", "inline-flex");
  $("h3").hide();
  $(".clearFilters").show();
  $(".errorMessage").empty();
  $(".clearFilters").on("click", event => {
    event.preventDefault();
    $(".age").val("0");
    $(".size").val("0");
    $(".sex").val("0");
    $(searchHandler);
  });
}

function newSearch() {
  $(".searchButton").hide();
  $(".newSearchButton").show();
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    searchHandler();
    newSearch();
    $(".nextButton").on("click", previousButtonHandler);
    $(".ageOfPet").show();
    $(".sizeOfPet").show();
    $(".sexOfPet").show();
    filterPets();
  });
  $(".age").change(event => {
    const age = $(".age").val();
    if (age !== "0") {
      const filteredPets = {};
      Object.keys(store.pets).forEach(key => {
        if (store.pets[key].animalGeneralAge === age) {
          filteredPets[key] = store.pets[key];
        }
      });
      render(filteredPets);
    } else {
      render(store.pets);
    }
  });
  $(".size").change(event => {
    const size = $(".size").val();
    if (size !== "0") {
      const filteredPets = {};
      Object.keys(store.pets).forEach(key => {
        if (store.pets[key].animalGeneralSizePotential === size) {
          filteredPets[key] = store.pets[key];
        }
      });
      render(filteredPets);
    } else {
      render(store.pets);
    }
  });
  $(".sex").change(event => {
    const sex = $(".sex").val();
    if (sex !== "0") {
      const filteredPets = {};
      Object.keys(store.pets).forEach(key => {
        if (store.pets[key].animalSex === sex) {
          filteredPets[key] = store.pets[key];
        }
      });
      render(filteredPets);
    } else {
      render(store.pets);
    }
  });
  function filterPets(age, size, sex) {
    let filtered = {};
    Object.keys(store.pets).forEach(key => {
      if (
        (sex != "0" && store.pets[key].animalSex === sex) ||
        (size != "0" && store.pets[key].animalGeneralSizePotential === size) ||
        (age != "0" && store.pets[key].animalGeneralAge === age)
      ) {
        filtered[key] = store.pets[key];
      }
    });
    return filtered;
  }
}
loadSpecies();
$(watchForm);