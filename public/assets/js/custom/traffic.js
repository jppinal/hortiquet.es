//chart
var ctx = document.getElementById("forest-chart").getContext("2d");
var data = [
    {
        value: 0.15,
        color:"#333333",
        highlight: "#666666",
        label: "Completado"
    },
    {
        value: 0.85,
        color: "rgba(1,1,1,0.2)",
        highlight: "rgba(1,1,1,0.2)",
        label: ""
    }
];
var forestChart = new Chart(ctx).Doughnut(data, {
  percentageInnerCutout : 80,
  segmentShowStroke : false
});
