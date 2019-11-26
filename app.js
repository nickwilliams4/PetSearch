"use strict";

const store = {
  species: [],
  pets: [],
  pics: [],
  age: []
};

function loadAge() {
  const url = "https://api.rescuegroups.org/http/v2.json";
  const data = {
    apikey: "PlqQjhlx",
    objectType: "animalGeneralAge",
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
        store.age = responseJson.data;
        const ageList = Object.keys(store.age)
          .map(age => `<option value="${age}">${age}</option>`)
          .join("");
        $(".age").html(ageList);
      });
  } catch (error) {
    console.error("Error:", error);
  }
  $(".ageOfPet").show();
}

function loadSpecies() {
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

function petSearch(zipCode, radius, typeOf) {
  const url = "https://api.rescuegroups.org/http/v2.json";
  const data = {
    apikey: "PlqQjhlx",
    objectType: "animals",
    objectAction: "publicSearch",
    search: {
      resultStart: "0",
      resultLimit: "25",
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
        "animalActivityLevel",
        "animalAdoptedDate",
        "animalAdoptionFee",
        "animalAgeString",
        "animalAltered",
        "animalAvailableDate",
        "animalBirthdate",
        "animalBirthdateExact",
        "animalBreed",
        "animalCoatLength",
        "animalColor",
        "animalColorID",
        "animalColorDetails",
        "animalCourtesy",
        "animalDeclawed",
        "animalDescription",
        "animalDescriptionPlain",
        "animalDistinguishingMarks",
        "animalEarType",
        "animalEnergyLevel",
        "animalExerciseNeeds",
        "animalEyeColor",
        "animalFence",
        "animalFound",
        "animalFoundDate",
        "animalFoundPostalcode",
        "animalGeneralAge",
        "animalGeneralSizePotential",
        "animalGroomingNeeds",
        "animalHousetrained",
        "animalIndoorOutdoor",
        "animalKillDate",
        "animalKillReason",
        "animalLocation",
        "animalLocationCoordinates",
        "animalLocationDistance",
        "animalLocationCitystate",
        "animalMicrochipped",
        "animalMixedBreed",
        "animalName",
        "animalSpecialneeds",
        "animalSpecialneedsDescription",
        "animalNeedsFoster",
        "animalNewPeople",
        "animalNotHousetrainedReason",
        "animalObedienceTraining",
        "animalOKWithAdults",
        "animalOKWithCats",
        "animalOKWithDogs",
        "animalOKWithKids",
        "animalOwnerExperience",
        "animalPattern",
        "animalPatternID",
        "animalAdoptionPending",
        "animalPrimaryBreed",
        "animalPrimaryBreedID",
        "animalRescueID",
        "animalSearchString",
        "animalSecondaryBreed",
        "animalSecondaryBreedID",
        "animalSex",
        "animalShedding",
        "animalSizeCurrent",
        "animalSizePotential",
        "animalSizeUOM",
        "animalSpecies",
        "animalSpeciesID",
        "animalSponsorable",
        "animalSponsors",
        "animalSponsorshipDetails",
        "animalSponsorshipMinimum",
        "animalStatus",
        "animalStatusID",
        "animalSummary",
        "animalTailType",
        "animalThumbnailUrl",
        "animalUptodate",
        "animalUpdatedDate",
        "animalUrl",
        "animalVocal",
        "animalYardRequired",
        "animalAffectionate",
        "animalApartment",
        "animalCratetrained",
        "animalDrools",
        "animalEagerToPlease",
        "animalEscapes",
        "animalEventempered",
        "animalFetches",
        "animalGentle",
        "animalGoodInCar",
        "animalGoofy",
        "animalHasAllergies",
        "animalHearingImpaired",
        "animalHypoallergenic",
        "animalIndependent",
        "animalIntelligent",
        "animalLap",
        "animalLeashtrained",
        "animalNeedsCompanionAnimal",
        "animalNoCold",
        "animalNoFemaleDogs",
        "animalNoHeat",
        "animalNoLargeDogs",
        "animalNoMaleDogs",
        "animalNoSmallDogs",
        "animalObedient",
        "animalOKForSeniors",
        "animalOKWithFarmAnimals",
        "animalOlderKidsOnly",
        "animalOngoingMedical",
        "animalPlayful",
        "animalPlaysToys",
        "animalPredatory",
        "animalProtective",
        "animalSightImpaired",
        "animalSkittish",
        "animalSpecialDiet",
        "animalSwims",
        "animalTimid",
        "fosterEmail",
        "fosterFirstname",
        "fosterLastname",
        "fosterName",
        "fosterPhoneCell",
        "fosterPhoneHome",
        "fosterSalutation",
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
        console.log(responseJson)
        store.pets = responseJson.data;
        const pics = Object.keys(store.pics)
          .map(pics => `<div>${store.pics[pics].animalPictures}</div>`)
          .join("");
        const petList = Object.keys(store.pets)
          .map(
            pets =>
            (store.pets[pets].animalPictures.length > 0) ?
              `<div class="animal" data-id="${pets}">
              <div><img src="${store.pets[pets].animalPictures[0].small.url}" alt="No Image"/></div>
              <div>${store.pets[pets].animalName}</div>
              <div>${store.pets[pets].animalBreed}</div>
              <div>${store.pets[pets].animalAgeString}</div>
              <a href="#" class="moreInfo">More Info</a><br>
              <div class="description">${store.pets[pets].animalDescription}</div>
              </div>` : ''
          )
          .join(""); 
        $(".nextButton").show();
        displayResults(petList, pics, showMoreInfoHandler);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

function showMoreInfoHandler(event) {
  event.preventDefault();
  const id = $(event.target)
    .parent()
    .data("id");

  const animal = store.pets[id];

  $(".name").html(animal.animalName);
  $(".petDescription").html(animal.animalDescription);
  $(".image").html(
    animal.animalPictures.map(pic => `<img src="${pic.small.url}"/>`).join("")
  );

  $(".modal").css("display", "flex");
}

function previousButtonHandler(event) {
  event.preventDefault();
  $(".previous").show();
}

function displayResults(results) {
  $(".searchResults").html(results);
  $(".moreInfo").on("click", showMoreInfoHandler);
  if (results == 0) {
    $(".errorMessage").html("No results. Please try your search again.");
    $('.nextButton').hide();
  }
  $("#btnClose").on("click", event => {
    $(".modal").css("display", "none");
    searchHandler();
  });
}

function searchHandler() {
  const zipCode = $(".zipSearch").val();
  const radius = $(".radiusValue").val();
  const typeOf = $(".type").val();
  petSearch(zipCode, radius, typeOf);
  $(".searchButtonTwo").show();
}

function newSearch() {
  $(".searchButton").hide();
  $(".newSearchButton").show();
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    searchHandler();
    loadAge();
    newSearch();
    $(".nextButton").on("click", previousButtonHandler);
  });
}
loadSpecies();
$(watchForm);