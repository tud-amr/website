---
title: "	ACT: Perceptive Acting Under Uncertainty"
project_id: nwa-act
belongs_to_areas: [autonomous-vehicles, social-robots]
date: 2021-06-01
# end_date: 2028-01-01 # end date if ended, approximated if not sure.
description: >-
  The ACT project bridges Neuroscenice, Behavioral Psychology, Robotics, and AI to study interactions with humans and autonomous systems and develop new application for safe navigation. Our Lab's role in the project is to create a fundamental understanding of how autonomous agents can cope with uncertainty and demonstrate risk-aware autonomous agents that are demonstrably trustable and predictable.
image: /assets/images/projects/act_alternate.png
links:
    - name: Project Website
      url: "https://nwa-act.nl/index.html"
fundings: This project is funded the the Dutch Research Council NWO-NWA, within the "Acting under Uncertainty (ACT)" project (Grant No. NWA.1292.19.298). 
people:
    - name: Khaled Mustafa 
      extra_info: PhD candidate
    - name: Anna Meszaros
      extra_info: PhD candidate
    - name: Daniel Jarne
      extra_info: Postdoctoral researcher
    - name: Ahmad Gazar
      extra_info: Postdoctoral researcher
    - name: Prof. Jens Kober
    # extra_info: Learning, Autonomous, and Intillegent Robots (LAIR) TU Delft
    - name: Prof. Javier Alonso-Mora
    #  extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- # Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
## About the Project
A successful integration of autonomous robots in the real-world depends on them taking socially acceptable actions. The ACT project bridges Neuroscience, Behavioral Psychology, Robotics, and AI to study interactions with humans and autonomous systems and develop new application for safe navigation. Our Lab's role in the project is to create a fundamental understanding of how autonomous agents can cope with uncertainty and demonstrate risk-aware autonomous agents that are demonstrably trustable and predictable.

This project contributed towards improving the safety of autonomous vehicles(AVs) by introducing a method to learn human-like driving behaviours which are then encoded into a local planner. Such behaviors are desired in AVs so that human drivers can trust these systems and also enables smoother coordination with other agents on the road. This behavior is learnt through an interactive imitation learning approach which is data efficient and is then encoded into a model predictive contouring controller. The proposed method is validated using a simulator which demonstrated it's ability to learn human-like driving behaviors. 

Another contribution from this project has been to predict human behavior in traffic. This is an important and challenging aspect since often times human behavior is not deterministic. Previous research has often struggled with random uncertainties in human movements which are difficult to model. A novel model called TrajFlow is presented which is capable of fitting distributions present in training samples. A recurrent neural network autoencoder is developed which captures the relevant features of a trajectory and the decoder is able to predict trajectories beyond the length of the training data. 
  

## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/UmbrTs14BnU?si=7lgawQiG1Il2TV9g&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/xPomLRHs-II?si=20t0JYx8X6RMxBLb&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Funding & Partners

This project is funded the the Dutch Research Council NWO-NWA, within the "Acting under Uncertainty (ACT)" project (Grant No. NWA.1292.19.298). 

<img class="img-fluid" src="{% include fix_link.html link='/assets/images/projects/ACT-NWA/partners.png' %}" alt="TU Delft partners" style="height: auto; width: 1000px;">

