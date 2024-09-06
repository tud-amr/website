---
title: "AI for Retail: On-Demand Last-Mile Logistics"
project_id: airlab-ondemand # ID of the project, used by publications to display in this project.
belongs_to_areas: [transportation] # List of area IDs, separated by commas.
date: 2020-09-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  Routing and Fleet Sizing for Flash Delivery operations of groceries from multiple depots.

image: /assets/images/projects/airlab.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: Project Website
      url: "https://icai.ai/airlab-delft/"
    # - name: Repository
    #   url: "https://scholar.google.com/citations?user=JydqDdEAAAAJ&hl=en&inst=6173373803492361994&oi=ao"
fundings: This project is funded by Ahold Delhaize.
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Maximilian Kronmueller
      extra_info: PhD candidate
    - name: Andres Fielbaum
      extra_info: Postdoctoral researcher
    - name: Prof. Javier Alonso-Mora
      #extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

The AI for Retail (AIR) Lab Delft is a joint TU Delft-Ahold Delhaize industry lab. A major focus of this lab's research is on improving on-demand last-mile logistics or flash deliveries. These are essential to ensure goods can be transported in a timely manner. More specifically, two fundamental questions critical for the success of these operations are tackled: the associated Vehicle Routing Problem and the associated Fleet Sizing Problem. This project aims to contribute algorithms to improve efficiency and effectiveness in the planning of flash delivery operations.

One method developed during this project focuses on anticipatory routing which derives predicted requests from historical data. These requests are used to understand inherent patterns in the demand. A dynamic vehicle routing solver combines these predictions with the already known requests to assign them to a fleet of vehicles. Simulation experiments are conducted to understand the effectiveness of the proposed method. The results suggested that on an average, vehicles travel shorter distances while requiring a smaller number of vehicles in comparison to other existing methods. 

Another method developed for vehicle routing focuses on deliveries from multiple local stores with an aim to deliver orders as fast as possible within the same day. Previous research assumed robots have to deliver all loaded orders first before servicing new customers. This assumption was removed in this approach adn helps to incorporate new occuring orders within the existing plan of these robots. An optimisation method is proposed which firstly decides which local store is the most optimal to collect each order and then robots are allowed to visit a depot again to receive more parcels if it increases efficiency. The proposed method is scalable to scenarios with thousands of requests.  




## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/WJ5i-X34idk?si=1V-hG24oJcCgpFIp&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>


## Funding & Partners

This project is funded by Ahold Delhaize.
