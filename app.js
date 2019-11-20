'use strict';

const store = {
  species: [],
  colors: []
};
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
  const url = 'https://api.rescuegroups.org/http/v2.json';
const data = { "apikey": "PlqQjhlx", "objectType": "animals", "objectAction": "publicSearch",  "search":
{
    "resultStart": "0",
    "resultLimit": "20",
    "resultSort": "animalID",
    "resultOrder": "asc",
    "filters":
    [
        {
            "fieldName": "animalStatus",
            "operation": "equals",
            "criteria": "Available"
        },
        {
            "fieldName": "animalLocationDistance",
            "operation": "radius",
            "criteria": `${radius}`
        },
        {
            "fieldName": "animalLocation",
            "operation": "equals",
            "criteria": `${zipCode}`
        },
        {
          "fieldName": "animalSpecies",
          "operation": "equals",
          "criteria": `${typeOf}`
      },
    ],
    "filterProcessing": "1",
    "fields":
    [
      "animalSpecies","animalOrgID","animalActivityLevel","animalAdoptedDate","animalAdoptionFee","animalAgeString","animalAltered","animalAvailableDate","animalBirthdate","animalBirthdateExact","animalBreed","animalCoatLength","animalColor","animalColorID","animalColorDetails","animalCourtesy","animalDeclawed","animalDescription","animalDescriptionPlain","animalDistinguishingMarks","animalEarType","animalEnergyLevel","animalExerciseNeeds","animalEyeColor","animalFence","animalFound","animalFoundDate","animalFoundPostalcode","animalGeneralAge","animalGeneralSizePotential","animalGroomingNeeds","animalHousetrained","animalIndoorOutdoor","animalKillDate","animalKillReason","animalLocation","animalLocationCoordinates","animalLocationDistance","animalLocationCitystate","animalMicrochipped","animalMixedBreed","animalName","animalSpecialneeds","animalSpecialneedsDescription","animalNeedsFoster","animalNewPeople","animalNotHousetrainedReason","animalObedienceTraining","animalOKWithAdults","animalOKWithCats","animalOKWithDogs","animalOKWithKids","animalOwnerExperience","animalPattern","animalPatternID","animalAdoptionPending","animalPrimaryBreed","animalPrimaryBreedID","animalRescueID","animalSearchString","animalSecondaryBreed","animalSecondaryBreedID","animalSex","animalShedding","animalSizeCurrent","animalSizePotential","animalSizeUOM","animalSpecies","animalSpeciesID","animalSponsorable","animalSponsors","animalSponsorshipDetails","animalSponsorshipMinimum","animalStatus","animalStatusID","animalSummary","animalTailType","animalThumbnailUrl","animalUptodate","animalUpdatedDate","animalUrl","animalVocal","animalYardRequired","animalAffectionate","animalApartment","animalCratetrained","animalDrools","animalEagerToPlease","animalEscapes","animalEventempered","animalFetches","animalGentle","animalGoodInCar","animalGoofy","animalHasAllergies","animalHearingImpaired","animalHypoallergenic","animalIndependent","animalIntelligent","animalLap","animalLeashtrained","animalNeedsCompanionAnimal","animalNoCold","animalNoFemaleDogs","animalNoHeat","animalNoLargeDogs","animalNoMaleDogs","animalNoSmallDogs","animalObedient","animalOKForSeniors","animalOKWithFarmAnimals","animalOlderKidsOnly","animalOngoingMedical","animalPlayful","animalPlaysToys","animalPredatory","animalProtective","animalSightImpaired","animalSkittish","animalSpecialDiet","animalSwims","animalTimid","fosterEmail","fosterFirstname","fosterLastname","fosterName","fosterPhoneCell","fosterPhoneHome","fosterSalutation","locationAddress","locationCity","locationCountry","locationUrl","locationName","locationPhone","locationState","locationPostalcode","animalPictures","animalVideos","animalVideoUrls"
    ]
     
} }
  try {
    const response = fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(responseJson => 
      displayResults(responseJson))
    } catch (error) {
    console.error('Error:', error);
  }
}

function displayResults(results) {
  console.log(results);
  $('.searchResults').html(results.data)
  if (results.total == 0) {
    $('.error-message').html('No results. Please try your search again.')
  }
}

function searchHandler() {
  const zipCode = $('.zipSearch').val();
  const radius = $('.radiusValue').val();
  const typeOf = $('.type').val();
  petSearch(zipCode, radius, typeOf);
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    searchHandler();
  });
}
loadSpecies();
$(watchForm);