// Get a reference to the table body and other elements
var tbody = d3.select("tbody");
var datetimes = d3.select("#datetime");
var states = d3.select("#state");
var countries = d3.select("#country");
var shapes = d3.select("#shape");
var row;

// Function to capitalize strings (mostly used for city names and shapes)
function capitalize_Words(str)
{return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// Define the various input/select fields
var filteredData = data;
var dateinputElement = d3.select("#datetime");
var dateinputValue = dateinputElement.property("value");
var cityinputElement = d3.select("#city");
var cityinputValue = cityinputElement.property("value").toLowerCase();
var stateinputElement = d3.select("#state");
var stateinputValue = stateinputElement.property("value").toLowerCase();
var countryinputElement = d3.select("#country");
var countryinputValue = countryinputElement.property("value").toLowerCase();
var shapeinputElement = d3.select("#shape");
var shapeinputValue = shapeinputElement.property("value").toLowerCase();

// Find a list of unique values from the data set
let uniquedates = [...new Set(filteredData.map(item => item.datetime))];
let uniquestates = [...new Set(filteredData.map(item => item.state))].sort();
let uniquecountries = [...new Set(filteredData.map(item => item.country))];
let uniqueshapes = [...new Set(filteredData.map(item => item.shape))].sort();

// Populate the dropdown options with the unique values
uniquedates.forEach(entry => {
    option = datetimes.append("option");
    option.append("value").text(entry);
});
uniquestates.forEach(entry => {
    option = states.append("option");
    option.append("value").text(entry.toUpperCase());
});
uniquecountries.forEach(entry => {
    option = countries.append("option");
    option.append("value").text(entry.toUpperCase());
});
uniqueshapes.forEach(entry => {
    option = shapes.append("option");
    option.append("value").text(capitalize_Words(entry));
});

// Set the initial drop down values to null
document.getElementById('datetime').value = '';
document.getElementById('city').value = '';
document.getElementById('state').value = '';
document.getElementById('country').value = '';
document.getElementById('shape').value = '';

// Build the initial table with the unfiltered data set
data.forEach(entry => {
    row = tbody.append("tr");
    row.append("td").text(entry.datetime);
    row.append("td").text(capitalize_Words(entry.city));
    row.append("td").text(entry.state.toUpperCase());
    row.append("td").text(entry.country.toUpperCase());
    row.append("td").text(capitalize_Words(entry.shape));
    row.append("td").text(entry.durationMinutes);
    row.append("td").text(entry.comments);
});

// Define the table filter and reset buttons
var fbutton = d3.select("#filter-btn");
var rbutton = d3.select("#reset-btn");

// Filter function that evaluates the values of drop downs and builds table accordingly
fbutton.on("click", function() {
    d3.event.preventDefault();
    var filteredData = data;
    var dateinputElement = d3.select("#datetime");
    var dateinputValue = dateinputElement.property("value");
    var cityinputElement = d3.select("#city");
    var cityinputValue = cityinputElement.property("value").toLowerCase();
    var stateinputElement = d3.select("#state");
    var stateinputValue = stateinputElement.property("value").toLowerCase();
    var countryinputElement = d3.select("#country");
    var countryinputValue = countryinputElement.property("value").toLowerCase();
    var shapeinputElement = d3.select("#shape");
    var shapeinputValue = shapeinputElement.property("value").toLowerCase();
    if (dateinputValue !== ""){
        filteredData = filteredData.filter(entry => entry.datetime === dateinputValue);
    };
    if (cityinputValue !== ""){
        filteredData = filteredData.filter(entry => entry.city === cityinputValue);
    };
    if (stateinputValue !== ""){
        filteredData = filteredData.filter(entry => entry.state === stateinputValue);
    };
    if (countryinputValue !== ""){
        filteredData = filteredData.filter(entry => entry.country === countryinputValue);
    };
    if (shapeinputValue !== ""){
        filteredData = filteredData.filter(entry => entry.shape === shapeinputValue);
    };
    tbody.html("");
    filteredData.forEach(entry => {
        row = tbody.append("tr");
        row.append("td").text(entry.datetime);
        row.append("td").text(capitalize_Words(entry.city));
        row.append("td").text(entry.state.toUpperCase());
        row.append("td").text(entry.country.toUpperCase());
        row.append("td").text(capitalize_Words(entry.shape));
        row.append("td").text(entry.durationMinutes);
        row.append("td").text(entry.comments);
    });
});

// Reset function that clears the drop downs and rebuilds the initial table
rbutton.on("click", function() {
    d3.event.preventDefault();
    document.getElementById('datetime').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('country').value = '';
    document.getElementById('shape').value = '';
    tbody.html("");
    data.forEach(entry => {
        row = tbody.append("tr");
        row.append("td").text(entry.datetime);
        row.append("td").text(capitalize_Words(entry.city));
        row.append("td").text(entry.state.toUpperCase());
        row.append("td").text(entry.country.toUpperCase());
        row.append("td").text(capitalize_Words(entry.shape));
        row.append("td").text(entry.durationMinutes);
        row.append("td").text(entry.comments);
    });
});