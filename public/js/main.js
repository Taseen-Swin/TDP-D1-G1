// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch future malware predictions from the server
//     fetch('/predict')
//       .then(response => response.json())
//       .then(data => {
//         // Prepare data for Chart.js
//         const labels = data.map(event => new Date(event.datetime).toLocaleString());
//         const malwareCounts = data.map(event => event.malware_prediction !== 'benign' ? 1 : 0);
  
//         // Create the line chart
//         const ctx = document.getElementById('malwareChart').getContext('2d');
//         new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: labels,
//             datasets: [{
//               label: 'Malware Events',
//               data: malwareCounts,
//               borderColor: 'rgba(255, 99, 132, 1)',
//               backgroundColor: 'rgba(255, 99, 132, 0.2)',
//               fill: true,
//             }]
//           },
//           options: {
//             responsive: true,
//             scales: {
//               x: {
//                 type: 'time',
//                 time: {
//                   unit: 'minute'
//                 }
//               },
//               y: {
//                 beginAtZero: true,
//                 title: {
//                   display: true,
//                   text: 'Malware Events'
//                 }
//               }
//             }
//           }
//         });
//       });
//   });
  
