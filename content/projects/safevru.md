---
title: "SAFEVRU"
project_id: safevru # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles] # List of area IDs, separated by commas.
date: 2018-01-01 # started date, approximated if not sure. Just for display purposes and ordering
end_date: 2022-12-31
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  This project presents a research platform termed SafeVRU which focuses on the interaction between self driving vehicles and vulnerable road users like pedestrians and cyclists. A detailed design structure comprising of vehicle localisation, perception and motion planning modules are developed. 
image: /assets/images/projects/safevru.png
# links: # If you have a website for the project, repos, etc. put it here.
#     - name: "Github: multi-robot collision avoidance"
#       url: "https://github.com/tud-amr/mrca_vc"
#     - name: "Github: MPCC implementation"
#       url: "https://github.com/tud-amr/amr-lmpcc"

fundings: This work is funded by the Dutch Science Foundation NWO-TTW Foundation, within the SafeVRU project
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
  
    - name: Oscar de Groot
      extra_info: PhD Candidate
    - name: Prof. Laura Ferranti
    - name: Prof. Javier Alonso-Mora
      # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
    - name: Prof. Dariu Gavrila
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

Every year between 20 and 50 million people are involved in road accidents caused mainly by human erros. A large number of these victims are vulnerable road users (VRUs) such as pedestrians and cyclists. Self driving vehicles are expected to help reduce these fatalities. However, in order for this to be accomplised, appropriate functionalities and rigorous testing must be carried out to ensure its working. The self driving vehicle must be aware of the presence of VRUs and plan its path accordinglt ro prevent collisions. This project presents a research platform SafeVRU which is a self driving vehicle that is able to plan trajectories in the presence of VRUs. Several realistic scenarios have been tested such as a cyclist approach the vehicle in an intersection or pedestrians crossing the road in front of the vehicle. 

The SafeVRU platform firstly has a perception module which provides the planner information about the position and predicted paths of the other road users. These predictions are then used in the planning module which is a model predictive contouring controller (MPCC). The MPCC plans a collision-free path for the vehicle over a time window. To provide additional safety, this planner prevents the vehicle from approaching really close to a road user. Real-life experiments showed that the vehicle was able to adapt to different initial conditions and in all the cases, the local planner provided suitable paths which ensured safety of the VRUs detected. 

Another contribution of this project in addition to the platform is an optimisation method that can be used for motion planning in uncertain dynamic environments. This is especially useful when vehicles have to operate around humans. The proposed framework is termed as scenario-based model predictive contouring control (S-MPCC) and can handle multiple obstacles while accounting for their respective sizes. This allows the vehicle to move continuously while tracking its probability of colliding with nearby obstacles. This method was experimentally validated using a moving robot platform that had to navigate among pedestrians in real-time.



## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/OOMZn5TQ00Q?si=gMRI97EfWVCcmhhX&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/tkRbsAuSTrA?si=PnL1cEa3R16thsAv&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Funding & Partners

This work is funded by the Dutch Science Foundation NWO-TTW Foundation, within the SafeVRU project

<div class="d-flex flex-row gap-2 flex-wrap justify-content-evenly mb-4 mt-4">
  <a itemprop="url" href="https://www.nwo.nl/en/">
  <img class="img-flex" height="90" src="{% include fix_link.html link='/assets/images/projects/safevru/nwo.jpg' %}" alt="AMS Institute">
  </a>
</div>
