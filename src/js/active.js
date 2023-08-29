import axios from 'axios';

const firstApiUrl = 'https://api.npoint.io/069c48c058a42c9d1041/ACCESS_TOKEN';

axios
  .get(firstApiUrl)
  .then(response => {
    const accessToken = response.data;

    const username = 'SoloviovO';
    const githubApiUrl = 'https://api.github.com/graphql';
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

    axios
      .post(
        githubApiUrl,
        { query },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(response => response.data)
      .then(data => {
        const contributions =
          data.data.user.contributionsCollection.contributionCalendar;

        const contributionsAll = contributions.totalContributions;

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
            const date = contributionDay ? contributionDay.date : '';
            const formattedDate = formatDate(date);
            const td = document.createElement('td');
            if (contributionCount === 0) {
              td.dataset.contributionCount = 'No';
            } else {
              td.dataset.contributionCount = contributionCount;
            }
            td.dataset.date = formattedDate;
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

        function formatDate(inputDate) {
          const date = new Date(inputDate);
          const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          };
          return date.toLocaleDateString('en-US', options);
        }
      })
      .catch(error => {
        console.error('Error fetching GitHub contributions:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching accessToken:', error);
  });
