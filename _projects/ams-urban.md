---
title: "AMS Urban"
project_id: ams-urban # ID of the project, used by publications to display in this project.
belongs_to_areas: [transportation] # List of area IDs, separated by commas.
date: 2017-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  In this project, the focus is on enabling mobile robots to coexist with humans by developing novel control and communication methods to demonstrate safe motion in dynamic environments. These methods are then tested in real-life situations using autonomous boats navigating in canals and autonomous cars which will drive in an urban environment.  
image: /assets/images/projects/ams-urban.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: "Github: multi-robot collision avoidance"
      url: "https://github.com/tud-amr/mrca_vc"
    - name: "Github: MPCC implementation"
      url: "https://github.com/tud-amr/amr-lmpcc"

fundings: Amsterdam Institute for Advanced Metropolitan Solutions (AMS).
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    
    - name: Michal Cap
      extra_info: Postdoctoral researcher
    - name: Prof. Javier Alonso-Mora
      # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

The use of automation is expected to revolutionise transportation of goods and people. Self-driving technology is being given increased attention as it can help provide personal point-to-point transportation that is affordable and leads to a reduction of parking capacity requirements. In addition to this, the focus must also be given to other forms of transportation like ships and improve the existing navigation methods for autonomous vessels. This would increase their reliability and ensure they can be increasingly used for transportation over water. This project focuses on both of these aspects by looking at fleet routing for self driving vehicles that provide ride sharing services. The other focus area is to develop a social trajectory planner for autonomous surface vessels. 

Ridesharing has several advantages in modern day transportation systems. It can help reduce the number of vehicles required and also drastically reduce road traffic. This project models ridesharing using a fleet of self driving vehicles and aims to maximise service quality and minimise operation cost. This introduces a trade-off between these objectives and a scalable solution is introduced which can help service providers to make decisions about required fleet size and performance constraints. 

This project also looks at waterways and introduces a trajectory planner for autonomous vessels which can help generate trajectories that resemble those of human-operated vessels. This can help these vessels learn socially compliant navigation behavior. This is essential when these have to operate in populated waterways with human-operated vessels as well. Unlike road vehicles, waterways do not have universal regulations or guidelines and thus are expected to operate in unstructured space. This is done by developing global trajectories for vessels and any deviation from nominal movements are penalized. 

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe src="https://www.youtube.com/embed/i8HRGeOmcH4?si=KPr0cvrksuNYPG1G&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/crGTsiiilHo?si=rPH4SBRroHrIKA_4&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
  </iframe>
</div>

## Funding & Partners

This project is funded by the Amsterdam Institute for Advanced Metropolitan Solutions (AMS).

<div class="d-flex flex-row gap-2 flex-wrap justify-content-evenly mb-4 mt-4">
  <a itemprop="url" href="https://www.ams-institute.org/">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/trilogy/ams.png' %}" alt="AMS Institute">
  </a>
</div>
