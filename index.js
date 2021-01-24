// Same as document.onload
$(function () {
  /**********************************************
   * Turn inputs into an array
   * ==================================
   * serialize()
   ***********************************************/
  $("#contact").submit(function (submitEvent) {
    submitEvent.preventDefault();
    let formData = $(this).serialize();
    console.log(formData);
    let formDataArray = $(this).serializeArray();
    console.log(formDataArray);
    $("#serialize")
      .empty()
      .append("Serialize method: " + formData);
    $("#serializeArray")
      .empty()
      .append(
        "\nSerialize Array method: " +
          formDataArray[0].name +
          formDataArray[1].name
      );
  });

  /**********************************************
   * Kanye Example
   * ==================================
   ***********************************************/
  // on click
  $("#kanyeForm").click(function () {
    // grab the url
    $.ajax({
      url: "https://api.kanye.rest/",
      type: "GET",
      // if I can grab it
    })
      .done(function (data) {
        // console.log the data
        console.log("Data: ", data);
        // append the quote to the div kanye
        $("#kanye").empty().append(data.quote);
      })
      .fail(function (err) {
        console.log("Something messed up: ", err);
      })
      .always(function (data) {
        console.log("This will always fun");
      });
  });

  /**********************************************
   * Lyrics
   * ==================================
   ***********************************************/
  $("#lyricsForm").submit(function (submitEvent) {
    submitEvent.preventDefault();
    let getTitle = $("input[name=title]").val();
    let getArtist = $("input[name=artist]").val();
    console.log("Title: ", getTitle);
    console.log("Artist: ", getArtist);
    let song = getTitle.split(" ").join("").toLowerCase();
    let artist = getArtist
      .split(" ")
      .join("")
      .toLowerCase();
    console.log("Joined and lower cased title: ", song);
    console.log("Joined and lower cased artist: ", artist);
    var apiKey = "1c6fdd4cb29d4a66960f79e845689e9d";
    var query =
      "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=test&q_track=" +
      song +
      "&q_artist=" +
      artist +
      "&apikey=" +
      apiKey;

    $.ajax({
      url: query,
      type: "GET",
    })
      .done(function (data) {
        console.log(typeof data);
        console.log(data.message);
        let index = data.indexOf("lyrics_body");
        console.log(index);
        let endIndex = data.indexOf("*****");
        let finalLyrics = data.slice(index + 13, endIndex);
        $("#lyrics").append(
          `<p>Lyrics: \n${finalLyrics}</p>`
        );
      })
      .fail(function (err) {
        console.log("Something messed up: ", err);
      })
      .always(function (data) {
        console.log("This will always fun");
      });
  });
  /**********************************************
   * Covid Count
   * ==================================
   ***********************************************/

  $("#covidForm").submit(function (submitEvent) {
    submitEvent.preventDefault();
    let country = $("input[name=country]").val();
    console.log("Input country: ", country);
    $.ajax({
      url: `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`,
      headers: {
        "Content-Type": "application/json",
      },
      type: "GET",
    })
      .done(function (data) {
        console.log(typeof data);
        console.log(data);
        console.log(data.All.confirmed);
        $("#covidCount").append(
          `<p>Total number of confirmed cases in ${country}: ${data.All.confirmed}</p>`
        );
      })
      .fail(function (err) {
        console.log("Something messed up: ", err);
      })
      .always(function (data) {
        console.log("This will always fun");
      });
  });

  /**********************************************
   * Covid Count
   * ==================================
   ***********************************************/

  $("#covidCompareForm").submit(function (submitEvent) {
    submitEvent.preventDefault();
    let countryOne = $("input[name=countryOne]").val();
    let countryTwo = $("input[name=countryTwo]").val();
    console.log("Input country: ", countryOne);
    console.log("Input country: ", countryTwo);
    let countryOneData = $.get(
      `https://covid-api.mmediagroup.fr/v1/cases?country=${countryOne}`
    );
    let countryTwoData = $.get(
      `https://covid-api.mmediagroup.fr/v1/cases?country=${countryTwo}`
    );
    let compare = $.when(countryOneData, countryTwoData);
    compare.done(function (
      countryOneCases,
      countryTwoCases
    ) {
      console.log(countryOneCases[0].All.confirmed);
      console.log(
        "Second: ",
        countryTwoCases[0].All.confirmed
      );
      let firstCountryCount =
        countryOneCases[0].All.confirmed;
      let secondCountryCount =
        countryTwoCases[0].All.confirmed;
      let difference;
      if (firstCountryCount > secondCountryCount) {
        difference = firstCountryCount - secondCountryCount;
        $("#covidCompareCount").append(
          `<p>${countryOne} has ${difference} cases more than ${countryTwo}.<br/> ${countryOne}: ${firstCountryCount}<br/>${countryTwo}: ${secondCountryCount}</p>`
        );
      } else {
        difference = secondCountryCount - firstCountryCount;
        $("#covidCompareCount").append(
          `<p>${countryTwo} has ${difference} more than ${countryOne}.<br/>${countryOne}: ${firstCountryCount}<br/>${countryTwo}: ${secondCountryCount}</p>`
        );
      }
    });
  });
});
