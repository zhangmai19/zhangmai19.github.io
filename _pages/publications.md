---
layout: page
permalink: /publications/
title: Research
description: Modeling uncertainty in complex systems.
nav: true
nav_order: 2
---

My interests lie at the intersection of statistics and economics: how we think about data, make decisions, and draw inferences under uncertainty.

{% capture papers %}{% bibliography %}{% endcapture %}
{% if papers contains '<li' %}

## Publications

{% include bib_search.liquid %}
<div class="publications">
{{ papers }}
</div>
{% else %}
<p class="quiet-note">For enquiries about my research, please <a href="mailto:{{ site.data.socials.email | encode_email }}">get in touch</a>.</p>
{% endif %}
