---
title: Events
permalink: /events/
redirect_from:
  - /workshops/
---

<!-- ## Workshops -->
<!-- <hr> -->

{% for workshop in collections.workshops %}
#### [{{ workshop.data.title }}]({{ workshop.url }})

**{{ workshop.data.venue }}**  
**Date:** {{ workshop.data.date | date: "%B %d, %Y" }}  
**Time:** {{ workshop.data.time }}  
**Location:** {{ workshop.data.location }}

---
{% endfor %}

