---
title: Events
permalink: /events/
redirect_from:
  - /workshops/
---

## Workshops
<hr>

{% for workshop in site.workshops %}
#### [{{ workshop.title }}]({{ workshop.url | relative_url }})

**IROS 2025 Workshop**  
**Date:** Oct. 20, 2025  
**Time:** 8:00-12:00 AM  
**Location:** Hangzhou, China

<!-- [Workshop Details]({{ workshop.url | relative_url }}) -->

---
{% endfor %}

