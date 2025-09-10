---
title: Events
permalink: /events/
redirect_from:
  - /workshops/
---

## Workshops
<hr>

{% assign sorted_workshops = site.workshops | sort: 'date' | reverse %}
{% for workshop in sorted_workshops %}
#### [{{ workshop.title }}]({{ workshop.url | relative_url }})

**{{ workshop.venue }} Workshop**  
**Date:** {{ workshop.date | date: "%B %d, %Y" }}  
**Time:** {{ workshop.time }}  
**Location:** {{ workshop.location }}

<!-- [Workshop Details]({{ workshop.url | relative_url }}) -->

---
{% endfor %}

