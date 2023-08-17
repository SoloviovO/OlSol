const username = 'SoloviovO';
const accessToken = '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';
const apiUrl = 'https://api.github.com/graphql';

const query = `
  query {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

fetch(apiUrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(response => response.json())
  .then(data => {
    const contributions =
      data.data.user.contributionsCollection.contributionCalendar;

    const contributionsAll = contributions.totalContributions;
    console.log(contributionsAll);

    const weeks = contributions.weeks;

    const contributionTable = document.getElementById('contribution-table');
    const contributionCount = document.getElementById('contribution-count');

    const monthRow = document.createElement('tr');
    const emptyCell = document.createElement('th');
    monthRow.appendChild(emptyCell);

    let prevMonth = -1;
    for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
      const week = weeks[weekIndex];
      const contributionDay = week.contributionDays[0];
      const date = new Date(contributionDay.date);
      const currentMonth = date.getMonth();
      if (currentMonth !== prevMonth) {
        const monthCell = document.createElement('th');
        monthCell.textContent = monthNames[currentMonth];
        monthCell.className = 'month-name';
        monthRow.appendChild(monthCell);
        prevMonth = currentMonth;
      } else {
        const emptyMonthCell = document.createElement('th');
        monthRow.appendChild(emptyMonthCell);
      }
    }

    contributionTable.appendChild(monthRow);
    contributionCount.textContent = contributionsAll;

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const row = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = daysOfWeek[dayOfWeek];
      th.className = 'day-of-week';
      row.appendChild(th);

      for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
        const week = weeks[weekIndex];
        const contributionDay = week.contributionDays[dayOfWeek];
        const contributionCount = contributionDay
          ? contributionDay.contributionCount
          : 0;
        const td = document.createElement('td');
        let contributionColor;
        if (contributionCount < 1) {
          contributionColor = 0;
        } else if (contributionCount < 8) {
          contributionColor = 1;
        } else if (contributionCount < 13) {
          contributionColor = 2;
        } else if (contributionCount < 21) {
          contributionColor = 3;
        } else {
          contributionColor = 4;
        }
        td.className = `color-${contributionColor} day-contribution`;
        row.appendChild(td);
      }

      contributionTable.appendChild(row);
    }
  })
  .catch(error => {
    console.error('Error fetching GitHub contributions:', error);
  });
