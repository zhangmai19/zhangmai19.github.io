---
layout: page
title: Bookshelf
description: A personal reading record, from mathematics to fiction.
permalink: /books/
nav: true
nav_order: 3
---

<div class="bookshelf" id="bookshelf">
  <div class="bookshelf-toolbar">
    <div class="bookshelf-filters" role="group" aria-label="Filter books by reading status" hidden>
      <button type="button" data-filter="all" class="active" aria-pressed="true">All books</button>
      <button type="button" data-filter="Read" aria-pressed="false">Read</button>
      <button type="button" data-filter="Currently reading" aria-pressed="false">Reading</button>
      <button type="button" data-filter="Want to read" aria-pressed="false">To read</button>
    </div>
    <div class="bookshelf-search-wrap" hidden>
      <label class="sr-only" for="bs-search">Search by book title or author</label>
      <input type="search" id="bs-search" class="bookshelf-search" placeholder="Find a title or author…" autocomplete="off">
    </div>
  </div>
  <p class="bookshelf-stats" id="bs-stats" role="status" aria-live="polite" aria-atomic="true">{{ site.data.books.size }} books on the shelf</p>
  <div class="bookshelf-grid" id="bs-grid">
    {% for book in site.data.books %}
      <article class="book-card" data-status="{{ book.status | escape }}">
        <div class="book-index" aria-hidden="true">{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}</div>
        <div class="book-details">
          <p class="book-type">{{ book.type | escape }}</p>
          <h2 class="book-title"><a href="https://www.google.com/search?q={{ book.name | append: ' ' | append: book.author | url_encode }}" target="_blank" rel="noopener noreferrer">{{ book.name | escape }}</a></h2>
          <p class="book-author">{{ book.author | escape }}</p>
          <div class="book-meta">
            <span class="book-status">{% case book.status %}{% when 'Currently reading' %}Reading{% when 'Want to read' %}To read{% when 'Do Not Finished' %}Unfinished{% else %}{{ book.status | escape }}{% endcase %}</span>
            {% if book.score contains '⭐' %}
              {% assign rating = book.score | remove: '️' | size %}
              <span class="book-score" role="img" aria-label="Rated {{ rating }} out of 5"><span aria-hidden="true">{% for star in (1..rating) %}★{% endfor %}</span></span>
            {% endif %}
          </div>
        </div>
      </article>
    {% endfor %}
  </div>
  <div class="bookshelf-empty" id="bs-empty" hidden>
    <p>No books found. Try another title, author, or reading status.</p>
    <button type="button" class="text-link" id="bs-reset">Show all books <span aria-hidden="true">↗</span></button>
  </div>
</div>
<script defer src="{{ '/assets/js/bookshelf.js' | relative_url | bust_file_cache }}"></script>
