---
layout: page
title: bookshelf
permalink: /books/
nav: true
nav_order: 4
---

<style>
  .bookshelf-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    align-items: center;
  }
  .bookshelf-search {
    flex: 1;
    min-width: 180px;
    padding: 0.45rem 0.75rem;
    border: 1px solid var(--global-border-color, #ddd);
    border-radius: 6px;
    font-size: 0.9rem;
    background: var(--global-bg-color, #fff);
    color: var(--global-text-color, #333);
    outline: none;
  }
  .bookshelf-search:focus {
    border-color: var(--global-theme-color, #7a4a8b);
    box-shadow: 0 0 0 2px rgba(122, 74, 139, 0.15);
  }
  .bookshelf-filters {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }
  .bookshelf-filters button {
    padding: 0.35rem 0.75rem;
    border: 1px solid var(--global-border-color, #ddd);
    border-radius: 20px;
    font-size: 0.78rem;
    cursor: pointer;
    background: var(--global-bg-color, #fff);
    color: var(--global-text-color, #333);
    transition: all 0.15s;
  }
  .bookshelf-filters button:hover {
    border-color: var(--global-theme-color, #7a4a8b);
  }
  .bookshelf-filters button.active {
    background: var(--global-theme-color, #7a4a8b);
    color: #fff;
    border-color: var(--global-theme-color, #7a4a8b);
  }
  .bookshelf-stats {
    font-size: 0.8rem;
    color: var(--global-text-color-light, #888);
    margin-bottom: 1rem;
  }
  .bookshelf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 0.8rem;
  }
  .book-card {
    padding: 0.9rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--global-border-color, #e8e8e8);
    background: var(--global-bg-color, #fff);
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .book-card:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
  html[data-theme='dark'] .book-card:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  }
  .book-card .book-title {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.2rem;
  }
  .book-card .book-title a {
    color: var(--global-text-color, #333);
    text-decoration: none;
  }
  .book-card .book-title a:hover {
    color: var(--global-theme-color, #7a4a8b);
  }
  .book-card .book-author {
    font-size: 0.82rem;
    color: var(--global-text-color-light, #777);
    margin-bottom: 0.4rem;
  }
  .book-card .book-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    align-items: center;
    font-size: 0.73rem;
  }
  .bs-badge {
    display: inline-block;
    padding: 0.1rem 0.5rem;
    border-radius: 10px;
    font-size: 0.7rem;
    font-weight: 500;
    white-space: nowrap;
  }
  .bs-badge-read {
    background: #e8f5e9;
    color: #2e7d32;
  }
  html[data-theme='dark'] .bs-badge-read {
    background: #1b3a1b;
    color: #66bb6a;
  }
  .bs-badge-reading {
    background: #e3f2fd;
    color: #1565c0;
  }
  html[data-theme='dark'] .bs-badge-reading {
    background: #0d2b4a;
    color: #42a5f5;
  }
  .bs-badge-want {
    background: #fff3e0;
    color: #e65100;
  }
  html[data-theme='dark'] .bs-badge-want {
    background: #3e2200;
    color: #ff9800;
  }
  .bs-badge-other {
    background: #f5f5f5;
    color: #616161;
  }
  html[data-theme='dark'] .bs-badge-other {
    background: #2a2a2a;
    color: #9e9e9e;
  }
  .book-card .book-score {
    font-weight: 500;
  }
  .book-card .book-type {
    color: var(--global-text-color-light, #999);
  }
  .bookshelf-empty {
    text-align: center;
    padding: 2rem;
    color: var(--global-text-color-light, #999);
  }

  @media (max-width: 576px) {
    .bookshelf-grid {
      grid-template-columns: 1fr;
    }
    .bookshelf-toolbar {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>

<div class="bookshelf-toolbar">
  <input
    type="text"
    id="bs-search"
    class="bookshelf-search"
    placeholder="Search by title or author..."
    aria-label="Search books"
  >
  <div class="bookshelf-filters" id="bs-filters">
    <button data-filter="all" class="active">All</button>
    <button data-filter="Read">Read</button>
    <button data-filter="Currently reading">Reading</button>
    <button data-filter="Want to read">Want to read</button>
  </div>
</div>

<div class="bookshelf-stats" id="bs-stats"></div>
<div class="bookshelf-grid" id="bs-grid"></div>

<script type="application/json" id="bs-data">
{{ site.data.books | jsonify }}
</script>

<script>
(function () {
  var books = JSON.parse(document.getElementById('bs-data').textContent);
  var grid = document.getElementById('bs-grid');
  var stats = document.getElementById('bs-stats');
  var search = document.getElementById('bs-search');
  var filterBtns = document.querySelectorAll('#bs-filters button');

  var currentFilter = 'all';
  var currentQuery = '';

  function render() {
    var filtered = books.filter(function (b) {
      if (currentFilter !== 'all' && b.status !== currentFilter) return false;
      if (currentQuery) {
        var q = currentQuery.toLowerCase();
        return (
          b.name.toLowerCase().indexOf(q) !== -1 ||
          b.author.toLowerCase().indexOf(q) !== -1
        );
      }
      return true;
    });

    stats.textContent = 'Showing ' + filtered.length + ' of ' + books.length + ' books';

    if (!filtered.length) {
      grid.innerHTML = '<div class="bookshelf-empty">No books match.</div>';
      return;
    }

    var html = '';
    filtered.forEach(function (b) {
      var sc = 'bs-badge-other';
      if (b.status === 'Read') sc = 'bs-badge-read';
      else if (b.status === 'Currently reading') sc = 'bs-badge-reading';
      else if (b.status === 'Want to read') sc = 'bs-badge-want';

      html += '<div class="book-card">';
      html += '<div class="book-title"><a href="https://www.google.com/search?q=' +
        encodeURIComponent(b.name + ' ' + b.author) +
        '" target="_blank" rel="noopener">' + escapeHtml(b.name) + '</a></div>';
      html += '<div class="book-author">' + escapeHtml(b.author) + '</div>';
      html += '<div class="book-meta">';
      if (b.score) html += '<span class="book-score">' + escapeHtml(b.score) + '</span>';
      html += '<span class="bs-badge ' + sc + '">' + escapeHtml(b.status) + '</span>';
      html += '<span class="book-type">' + escapeHtml(b.type) + '</span>';
      html += '</div></div>';
    });
    grid.innerHTML = html;
  }

  search.addEventListener('input', function () {
    currentQuery = this.value.trim();
    render();
  });

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  render();
})();
</script>
