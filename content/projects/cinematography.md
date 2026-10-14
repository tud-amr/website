---
title: "Real time Automated Cinematography using Aerial Vehicles"
project_id: cinematography # ID of the project, used by publications to display in this project.
belongs_to_areas: [entertainment,flying-robots] # List of area IDs, separated by commas.
date: 2014-01-01 # started date, approximated if not sure. Just for display purposes and ordering
end_date: 2018-10-31
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  In this project, automated aerial vehicles are used for real time cinematography so that stunning visuals can be obtained without the need to use expensive gear like helicopters. Algorithms are developed which can provide motion plans to a fleet of drones to enable filming in complex environments. The developed methods are then tested over a number of challenging shots to determine their effectiveness. 
image: /assets/images/projects/cinematography.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: "Github: multi-robot collision avoidance"
      url: "https://github.com/tud-amr/mrca_vc"
    - name: "Github: MPCC implementation"
      url: "https://github.com/tud-amr/amr-lmpcc"

fundings: This project is funded by the Netherlands Organisation for Scientific Research (NWO) Applied Sciences with project Veni 15916
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    
      # extra_info: PhD candidates
    - name: Tobias Nageli
      extra_info: PhD candidate, AIT Lab, ETH Zurich
    - name: Prof. Javier Alonso-Mora
      # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
      # extra_info: Intelligent Vehicles (IV) Group TU Delft
    - name: Prof. Otmar Hilliges
      extra_info: ETH Zurich
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project
Cinematography and film-making is an application where robotics is getting increased attention. Often times movie directors make use of expensive gear like helicopters and high-end cameras for obtaining certain critical shots. Aerial vehicles can be a suitable alternative which help obtain the desired visuals while sticking to specific constraints outlined by the cameraman. This project focuses on this application and aims at developing a system of automated aerial vehicles which are capable of planning collision free paths in real-time. The generated methods have then been used for a fleet of aerial vehicles across a number of complex scenes to demonstrate the effectiveness of real-time automated drone cinematography. 

The first contribution from this project was a model predictive control formulation for a single drone which could plan trajectories based on certain cinematographic constrainsts such as visibility of the actors and their screen positioning. The next step was to then integrate it for multi drones and ensure collision free trajectories. This is done by developing an algorithm that takes high-level plans alongside image-based framing objectives as input from the user and this can be updated in real-time. The algorithm uses this to generate collision free paths for each drone. The real-time nature of this algorithm allows for feedback incorporation while enabling visuals to be captured in cluttered environments with moving actors. 

Another aspect of this project focused on human pose estimation using swarm of aerial vehicles to maximise visibility of the human from different viewpoints during long motion sequences and scenarios including jogging or jumping. The proposed method collects images from all drones, detects and labels 2D joint positions. It then estimates the joint positions of the human skeleton and optimizes the relative positions and orientations of the multi-robot swarm. Finally, it computes control inputs for the drones via model-predictive control (MPC) to keep the human visible during motion. 

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/iSJY-vHDmHQ?si=63Kqmuva2O8_Yz0L&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/_yei6Zh3f20?si=8X1PWHHNiIdmyCEx&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </iframe>
</div>

## Funding & Partners

This project was carried out in collaboration with ETH Zurich.
