$(document).ready(function(){

  // 1 - Get DOM object for the div that's the report container.
  var reportContainer = document.getElementById("embed-container");

  // 2 - Get the report embedding data from the view model.
  var reportId = document.getElementById("reportId").value;
  var embedUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}`;

  // 3 - Embed the report by using the Power BI JavaScript API.
  var models = window['powerbi-client'].models;

  // 4 - Get access token'
  var accessToken = document.getElementById("accessToken").value;
 
  // Embed the report and display it within the div container.

  if(accessToken){
    var config = {
      type: 'report',
      id: reportId,
      embedUrl: embedUrl,
      accessToken: accessToken,
      permissions: models.Permissions.All,
      tokenType: models.TokenType.Embed,
      viewMode: models.ViewMode.View,
      settings: {
        panes: {
          filters: { expanded: false, visible: true },
          pageNavigation: { visible: false }
        }
      }
    };

    var report = powerbi.embed(reportContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    report.on("loaded", function () {
      console.log("Loaded");
    });

    // Report.off removes a given event handler if it exists.
    report.off("rendered");

    // Report.on will add an event handler which prints to Log window.
    report.on("rendered", function () {
      console.log("Rendered");
    });

    report.on("error", function (event) {
      console.log(event.detail);

      report.off("error");
    });

    report.off("saved");
    report.on("saved", function (event) {
      Log.log(event.detail);
      if (event.detail.saveAs) {
        console.log('In order to interact with the new report, create a new token and load the new report');
      }
    });

  }

  // 4 - Add logic to resize the embed container on a window resize event.
  var heightBuffer = 12;
  var newHeight = $(window).height() - ($("header").height() + heightBuffer);
  $("#embed-container").height(newHeight);
  $(window).resize(function () {
    var newHeight = $(window).height() - ($("header").height() + heightBuffer);
    $("#embed-container").height(newHeight);
  });
});
