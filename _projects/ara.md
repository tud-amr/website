---
title: "Predictive Fleet Routing and Assignment"
project_id: ara # ID of the project, used by publications to display in this project.
belongs_to_areas: [transportation, autonomous-vehicles] # List of area IDs, separated by commas.
date: 2017-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  In this project, the focus is on developing algorithms for fleet routing and assignment. This is useful for robots and autonomous vehicles which can provide delivery services for supermarkets or logistic companies. The focus is on minimising time taken and improve the routes taken by each individual robot or vehicle.  
image: /assets/images/projects/ara.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: "Github: multi-agent pickup and delivery"
      url: "https://github.com/nobodyczcz/MCA-RMCA"
    # - name: "Github: MPCC implementation"
    #   url: "https://github.com/tud-amr/amr-lmpcc"

fundings: This project is funded by an Amazon Research Award (ARA)
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    
      # extra_info: PhD candidates
    - name: Xiaoshan Bai
      extra_info: Postdoctoral researcher
    - name: Prof. Javier Alonso-Mora
      # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

An increasing number of logistics and delivery companies are today working with large fleet of vehicles or robots that navigate around a specific city or area and complete their deliveries. In addition to this, several robotic applications like terrain mapping, environmental monitoring or search-and-rescue require multi agent task assignment. This can be mathematically challenging as the number of vehicles can keep increasing or the area over which they have to operate gets extended. This project focuses on building several algorithmic solutions which can resolve task assignment and routing solutions for individual robots or vehicles. The solutions provided in this project can enable these fleets to dynamically update routes in real-time based on incoming requests as well as ensure the total distance traversed by each robot in the fleet is reduced substantially while sticking to the time constraints provided. 

Previous research into multi agent pickup and delivery(MAPD) solve the problem sequentially by firstly assigning tasks and then paths. However, this project contributed an integrated solution which solves them simultaneously. This is achieved by using the real collision-free costs to guide the multi-task multi-robot assignment process. Numerical simulations demonstrated a marked improvement in time taken by each robot as well as the runtime required for computing these solutions. Another contribution has been to extend this work and consider cases where each robot can carry more than one task at a time which resembles modern robotic warehouse systems.  

Another interesting outcome from this project has been a novel anticipatory insertion method for vehicle routing that solves for routes based on a combination of known requests and predicted requests based on historical data. This helps to exploit demand patterns in historical data which can help anticipate future delivery requests and reduce waiting time. Experimental simulations have shown that this solution helps to both reduce total distance traveled by the fleet as well as the number of vehicles required to fulfill all requests. 

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/WJ5i-X34idk?si=JtP1HjdjgnQA4-fS&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<!-- <div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/crGTsiiilHo?si=rPH4SBRroHrIKA_4&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
  </iframe>
</div> -->

## Funding & Partners

This project is funded by Amazon through an Amazon Research Award.
