const iconSvg = {
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"></path></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"></path><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"></path></svg>',
  location: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"></path></svg>',
  person: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"></path><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"></path></svg>'
};

function escapeHtml(value = '') {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function metaItem(icon, text) {
  if (!text) return '';
  return `<span class="event-meta-item">${iconSvg[icon]}${escapeHtml(text)}</span>`;
}

function eventLinks(event) {
  const links = Array.isArray(event.links) ? event.links : [];
  const actionLinks = links.map(link => `<a class="btn btn-sm btn-outline-primary" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join('');
  const calendarLink = event.calendarUrl ? `<a class="event-calendar-link" href="${escapeHtml(event.calendarUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Add ${escapeHtml(event.title)} to Google Calendar">${iconSvg.plus}</a>` : '';
  return `<div class="event-actions">${actionLinks}${calendarLink}</div>`;
}

function eventCard(event, isPast = false) {
  return `
    <article class="event-card ${isPast ? 'event-card-past' : ''}">
      <div class="event-date-block">
        <span>${escapeHtml(event.date || 'Date TBA')}</span>
      </div>
      <div class="event-card-body">
        <h3>${escapeHtml(event.title)}</h3>
        <div class="event-meta">
          ${metaItem('clock', event.time)}
          ${metaItem('location', event.location)}
          ${metaItem('person', event.speaker)}
        </div>
        <p>${escapeHtml(event.description)}</p>
        ${eventLinks(event)}
      </div>
    </article>`;
}

function renderEvents(data) {
  const upcomingContainer = document.getElementById('upcoming-events-list');
  const pastContainer = document.getElementById('past-events-list');
  const status = document.getElementById('events-status');
  const upcoming = Array.isArray(data.upcoming) ? data.upcoming : [];
  const past = Array.isArray(data.past) ? data.past : [];

  upcomingContainer.innerHTML = upcoming.length
    ? upcoming.map(event => eventCard(event)).join('')
    : '<div class="event-empty">No upcoming events are listed right now. Check back soon or subscribe to the calendar below.</div>';

  pastContainer.innerHTML = past.length
    ? past.map(event => eventCard(event, true)).join('')
    : '<div class="event-empty">Past events will appear here once they are added.</div>';

  status.remove();
}

fetch('assets/data/events.json')
  .then(response => {
    if (!response.ok) throw new Error(`Could not load events: ${response.status}`);
    return response.json();
  })
  .then(renderEvents)
  .catch(error => {
    const status = document.getElementById('events-status');
    status.classList.add('event-status-error');
    status.textContent = 'Events could not be loaded. Please try again later.';
    console.error(error);
  });
