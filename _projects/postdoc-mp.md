---
title: "Parallel Autonomy in Automated Vehicles"
project_id: postdoc-mp # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles] # List of area IDs, separated by commas.
date: 2017-01-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  In this project, the focus is on introducing an alternative approach to autonomous driving termed as "Parallel Autonomy." This method tries to solve the safety problem associated with self driving.   
image: /assets/images/projects/postdoc-mp.png
# links: # If you have a website for the project, repos, etc. put it here.
#     - name: "Github: multi-robot collision avoidance"
#       url: "https://github.com/tud-amr/mrca_vc"
#     - name: "Github: MPCC implementation"
#       url: "https://github.com/tud-amr/amr-lmpcc"

fundings: This project was funded by the Toyota Research Institute(TRI)
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    
      # extra_info: PhD candidates
    - name: Wilko Schwarting
      # extra_info: PhD Candidate
    - name: Daniela Rus
      # extra_info: PhD Candidate
    - name: Liam Paull
    - name: Sertac Karaman
    - name: Prof. Javier Alonso-Mora
      extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

Autonomous driving systems offer higher safety, fuel economy, mobility and comfort. The main problem in developing such systems arise with how much control should be given to the driver and which situations require a transfer of control to the human. It has been observed that humans are proficient in active control tasks but are not suited to monitoring ones. Several companies have developed different approaches to reach higher levels of autonomy. This project proposes an alternative titled "Parallel Autonomy" which keeps the human in control of the vehicle but a fully autonomous system is running in the background which prevents the human from causing an accident. This has the advantage that if the system is unsure about the correct course of action, it can always follow the human commands and thus will never perform worse than a zero autonomy vehicle. 

This project build an entire research platform for this approach and demonstrated its working on an actual vehicle. This required adding certain software and hardware elements to the system. The software side focused on mapping and localisation, object detection and an algorithm to calculate the safe navigation speed for the vehicle at every instance based on the objects surrounding it. These elements were tested on a simulator first to understand its effectiveness. A low level controller was also developed which was used to regulate both the speed and steering angle. On the other hand, additional hardware were also installed. Lidars and a webcam were integrated to sense the environment. The drive-by-wire conversion enables seamless takeover between the human and autonomous system. Experimental results on a Toyota Prius demonstrated the ability of this approach to ensure that the driver cannot leave the path or overspeed. 

This project also focused on other safety issues for an autonomous vehicle. A novel method of trajectory generation was developed for autonomous overtaking of a static obstacle. This would result in the car firstly moving slightly in it's lane to gather information about the road ahead ad then a trajectory is generated to safely execute the maneuver. Another outcome of this project was a proposal to increase the sensing capabilities of an autonomous car using an unmanned aerial vehicle(UAV). The UAV will be able to take off from the car and gather additional data from blind spots which other conventional sensors fail to identify. This would lead to a safer trajectory being planned for the car and identifying potential threats which might be occluded to the driver. 


## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/mHye5V1iC70?si=HClY3f1aRrWBxAht&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/gmpjYLksUx8?si=tu-gowe54hyb0j-s&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Partners
<div class="d-flex flex-row gap-2 flex-wrap justify-content-evenly mb-4 mt-4">
  <a itemprop="url" href="https://www.tri.global/">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/postdoc-mp/tri.png' %}" alt="Toyota Research Institute">
  </a>
</div>
