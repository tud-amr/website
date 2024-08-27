---
title: "SAFEUP"
project_id: safe-up # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles] # List of area IDs, separated by commas.
date: 2017-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  This project focuses on developing methods to validate driving safety for autonomous vehicles and ensure that at each time instance, the vehicle should not have a high probability of colliding with a traffic participant. This is done using reachability analysis and developing probabilistic risk metrics capable of identifying potential crashes in advance. 
image: /assets/images/projects/safe-up.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: "Github: multi-robot collision avoidance"
      url: "https://github.com/tud-amr/mrca_vc"
    - name: "Github: MPCC implementation"
      url: "https://github.com/tud-amr/amr-lmpcc"

fundings: This project is funded by the Netherlands Organisation for Scientific Research (NWO) Applied Sciences with project Veni 15916
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    
      # extra_info: PhD candidates
    - name: Hai Zhu
      extra_info: PhD Candidate
    - name: Bruno Brito
      extra_info: PhD Candidate
    - name: Prof. Javier Alonso-Mora
      extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

Autonomous vehicles are expected to improve road safety and significantly benefit future mobility. Highways are generally structured environments which are designed for vehicles to consistently drive at a high speed. Most autonomous vehicles(AVs) are firstly developed for highway driving and is usually considered to be the first test bench for a transition from human-driven vehicles to high-level AVs. This however makes it essential to address driving safety and develop risk metrics which can be used to assess collision detection systems for these vehicles. This project proposes novel collision detection methods and a risk metric for highway driving applications. 

One key component in safety analysis is identifying a metric capable of quantifying the risk level. Surrogate measures of safety (SMoS) are typically used as they focus on temporal events prior to the crash which can be useful in predicting their occurence. This project focuses on the development of a new SMoS termed as prediction-based probabilistic driving risk field(P-PDRF) which makes use of multi-modal trajectory predictions within a time horizon. This mainly refers to different lane change maneuvers and calculates the sum of weighted risks over each maneuver in a set of maneuver possibilities. This metric is capable of real-time applicaions and is able to classify between a crash and non-crash events. A trajectory dataset is used to validate the benefit of using this metric.

Another contribution of this project was the development of a collision detection method based on a forward reachable set (FRS). This is done using a reachability analysis (RA) which computes a complete set of states that the agent can reach based on initial conditions. This set is then compared with that of the other road users to ensure that there is no overlap. This is done using a neural-network based prediction model that can be trained to minimize vehicle position errors. 


## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/OOMZn5TQ00Q?si=gMRI97EfWVCcmhhX&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/tkRbsAuSTrA?si=PnL1cEa3R16thsAv&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Funding & Partners

This project has received funding from the Netherlands Organisation for Scientific Research (NWO) Applied Sciences with project Veni 15916. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the NWO. Neither the NWO nor the granting authority can be held responsible for them.
