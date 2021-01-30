let ctx = document.getElementById("myChart").getContext("2d");
Chart.defaults.global.legend.display = false;
let chart;
let stateReport;
let districtReport;

const setChart = (data, color) => {
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [...data.keys()],
      datasets: [
        {
          backgroundColor: "transparent",
          borderColor: color,
          data: data,
          borderWidth: 5,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
      elements: {
        point: {
          radius: 4,
        },
      },
      tooltips: {
        callbacks: {
          title: () => null,
        },
        bodyFontSize: 18,
      },
    },
  });
};

const fetchData = (url) => {
  try {
    let data = fetch(url).then((data) => data.json());
    return data;
  } catch (err) {
    console.log(err);
  }
};

const setChartCases = async (caseType, color) => {
  let cases = stateReport;
  cases = cases["cases_time_series"];
  if (caseType === "dailyactive") {
    cases = cases
      .map(
        (item) =>
          parseInt(item["totalconfirmed"]) -
          parseInt(item["totalrecovered"]) -
          parseInt(item["totaldeceased"])
      )
      .slice(cases.length - 30, cases.length - 1);
    setChart(cases, color);
  } else {
    cases = cases
      .map((item) => item[caseType])
      .slice(cases.length - 30, cases.length - 1);
    setChart(cases, color);
  }
};

const setStateCardValue = (infoType, delta = "0", total) => {
  return `<div>${infoType}<h6 class="delta mt-2">+[${delta}]</h6><h1 class="cases mt-2">${total}</h1></div>`;
};

const showStateDetails = (selectedElement) => {
  let selectedState = selectedElement.innerText.split("\n")[0];
  document.querySelector(".modal-title").innerText = selectedState;
  let districtData = districtReport[selectedState].districtData;
  let districtDataElements = "";
  for (let elm of stateReport.statewise) {
    if (elm.state === selectedState) {
      let stateConfirmed = document.querySelector(".state-confirmed");
      let stateActive = document.querySelector(".state-active");
      let stateRecovered = document.querySelector(".state-recovered");
      let stateDeceased = document.querySelector(".state-deceased");
      stateConfirmed.innerHTML = setStateCardValue(
        "Confirmed",
        elm.deltaconfirmed,
        elm.confirmed
      );
      stateActive.innerHTML = setStateCardValue(
        "Active",
        undefined,
        elm.active
      );
      stateRecovered.innerHTML = setStateCardValue(
        "Recovered",
        elm.deltarecovered,
        elm.recovered
      );
      stateDeceased.innerHTML = setStateCardValue(
        "Deceased",
        elm.deltadeaths,
        elm.deaths
      );

      for (let elm in districtData) {
        districtDataElements += `<div class="col-md-4 state-card">
        <div>
          <h3 class="state-name confirmed">${elm}</h3>
          <h6 class="state-delta confirmed">[+${districtData[elm].delta.confirmed}]</h6>
          <h1 class="confirmed">${districtData[elm].confirmed}</h1></div>
        </div>`;
      }

      document.querySelector(".districts").innerHTML = districtDataElements;
    }
  }
};

(async () => {
  try {
    stateReport = await fetchData("https://api.covid19india.org/data.json");
    districtReport = await fetchData(
      "https://api.covid19india.org/state_district_wise.json"
    );

    console.log("Click on cards to change the chart data");
    setChartCases("dailyconfirmed", "#fe0739");
    let todayCaseReport = stateReport;
    let totalConfirmed = +todayCaseReport["statewise"][0]["confirmed"];
    let deltaConfirmed = `[+${
      todayCaseReport["cases_time_series"][
        todayCaseReport.cases_time_series.length - 1
      ]["dailyconfirmed"]
    }]`;
    let totalActive = +todayCaseReport["statewise"][0]["active"];
    let totalRecovered = +todayCaseReport["statewise"][0]["recovered"];
    let deltaRecovered = `[+${
      todayCaseReport["cases_time_series"][
        todayCaseReport.cases_time_series.length - 1
      ]["dailyrecovered"]
    }]`;
    let totalDeceased = +todayCaseReport["statewise"][0]["deaths"];
    let deltaDeceased = `[+${
      todayCaseReport["cases_time_series"][
        todayCaseReport.cases_time_series.length - 1
      ]["dailydeceased"]
    }]`;
    document.querySelector(
      ".confirmed-cases"
    ).innerText = totalConfirmed.toLocaleString();
    document.querySelector(
      ".active-cases"
    ).innerText = totalActive.toLocaleString();
    document.querySelector(
      ".recovered-cases"
    ).innerText = totalRecovered.toLocaleString();
    document.querySelector(
      ".deceased-cases"
    ).innerText = totalDeceased.toLocaleString();
    document.querySelector(".deltaconfirmed").innerText = deltaConfirmed;
    document.querySelector(".deltarecovered").innerText = deltaRecovered;
    document.querySelector(".deltadeceased").innerText = deltaDeceased;

    let states = document.querySelector(".states");
    let statesData = "";
    for (let i = 1; i < todayCaseReport["statewise"].length; i++) {
      statesData += `<div class="col-md-4 state-card" onclick="showStateDetails(this)" data-bs-toggle="modal"
    data-bs-target="#exampleModal">
    <div>
    <h3 class="state-name confirmed">${
      todayCaseReport["statewise"][i]["state"]
    }</h3>
    <h6 class="state-delta confirmed">[+${
      todayCaseReport["statewise"][i]["deltaconfirmed"]
    }]</h6>
    <h1 class="confirmed">${parseInt(
      todayCaseReport["statewise"][i]["confirmed"]
    ).toLocaleString()}</h1></div>
  </div>`;
    }
    states.innerHTML = statesData;
  } catch (err) {
    console.log(err);
  }
})();

