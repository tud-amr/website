---
title: "HARMONY: Assistive Robots for Healthcare"
project_id: harmony # ID of the project, used by publications to display in this project.
belongs_to_areas: [social-robots, mobile-manipulation] # List of area IDs, separated by commas.
date: 2021-01-01 # started date, approximated if not sure. Just for display purposes and ordering
end_date: 2024-06-30
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  Within this project we combine robotic mobility and manipulation modalities in complex, human-centred environments.
image: /assets/images/projects/harmony/harmony_illustration_robot.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: Project Website
      url: "https://harmony-eu.org/"
    - name: GitHub
      url: "https://github.com/harmony-eu"
    - name: Youtube
      url: "https://www.youtube.com/channel/UCgvtwk6dc_VWLUYq1TJWflQ"
    - name: Twitter
      url: "https://twitter.com/eu_harmony"
fundings: This project has received funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No 101017008. 
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Luzia Knoedler 
      extra_info: PhD candidate
    - name: Dr. Nils Wilde 
      extra_info: Postdoctoral researcher
    - name: Prof. Javier Alonso-Mora
    # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

<div class="d-flex justify-content-start mb-2">
  <img class="img-fluid" style="max-height: 2cm;" src="{% include fix_link.html link='/assets/images/projects/harmony/harmony_logo.png' %}" alt="TU Delft partners">
</div>

Harmony is a Horizon 2020 project which develops assistive robotic mobile manipulation technologies for environments shared with humans, i.e., hospitals. Specifically, Harmony addresses two use cases:


1. The automation of on-demand delivery tasks around the hospital
2. The automation of bio-assay sample flow
   
Current robotic automation solutions only offer “islands of automation” where either mobility or manipulation is dealt with in isolation. Harmony aims to fill this gap in knowledge by combining both robotic mobility and manipulation modalities in complex, human-centred environments. We at AMR focus on providing adaptive task and motion planning with multiple robots in human-centred environments.

Traditionally task scheduling and planning has been decoupled from motion planning. Yet, when robots navigate in critical and dynamic environments, plans may have to be adapted online to take into account congestion and interaction with other robots and human co-workers. 

We devise methods for multi-robot motion planning that schedule plans for the robots and adapt them online taking into account the priority of tasks, their associated uncertainty and the preferences and needs of human co-workers. This includes novel methods for Multi-Robot Task Assignment (MRTA) that consider uncertain environments and homogenous robot fleets. Further, we design novel multi-objective planning frameworks that can efficiently explore Pareto-optimal trade-offs. Our results include general solutions for a wide range of motion planning problems as well as specialized methods for multi-objective MRTA.

<div class="image-div mb-3 d-flex justify-content-center">
    <figure class="figure">
        <img src="{% include fix_link.html link='/assets/images/projects/harmony/multi_objective_MRTA.png' %}" alt="Multi-Objective Task Assignment" class="figure-img img-fluid" width="500">
        <figcaption class="figure-caption text-center">Multi-Objective Task Assignment</figcaption>
    </figure>
</div>

Furthermore, we develop local-motion planning approaches which do not only account for collision avoidance but also consider social interactions. We design integrated approaches for navigation as well as mobile manipulation in uncertain and dynamic environments shared with humans, which accounts for social interactions, navigation and coordination tasks, and that provides performance guarantees (in expectation).

<div class="image-div mb-3 d-flex justify-content-center">
    <figure class="figure">
        <img src="{% include fix_link.html link='/assets/images/projects/harmony/local_planner.png' %}" alt="Socially interactive local motion planning" class="figure-img img-fluid" width="600">
        <figcaption class="figure-caption text-center">Socially interactive local motion planning</figcaption>
    </figure>
</div>

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/X8vEKe2i508?si=pCe79i5PdG0gyOMk&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/sZBbWMnwle8?si=ngmtFusLo2cTxrJO&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/qsyd7NVgfRI?si=gq0ylGr3xbVtF_tD&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>


## Partners

This project has received funding from the European Union's Horizon 2020 research and innovation programme under grant agreement No 101017008. 

  <img class="img-fluid" height="200" src="{% include fix_link.html link='/assets/images/projects/harmony/harmony_partners_logos.png' %}" alt="TU Delft partners">




